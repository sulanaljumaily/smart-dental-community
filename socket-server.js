// Socket.IO Server للرسائل الفورية
// يمكن تشغيله بشكل منفصل أو دمجه مع Next.js

const { createServer } = require('http')
const { Server } = require('socket.io')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const httpServer = createServer()

const io = new Server(httpServer, {
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    credentials: true,
  },
})

// Store active users
const activeUsers = new Map()

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  // User joins
  socket.on('user:join', (userId) => {
    activeUsers.set(userId, socket.id)
    socket.userId = userId
    socket.join(`user:${userId}`)

    // Broadcast online status
    io.emit('user:online', userId)
  })

  // User typing
  socket.on('message:typing', ({ to, from }) => {
    const recipientSocketId = activeUsers.get(to)
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('message:typing', { from })
    }
  })

  // Send message
  socket.on('message:send', async (data) => {
    try {
      // Save message to database
      const message = await prisma.message.create({
        data: {
          senderId: data.senderId,
          receiverId: data.receiverId,
          content: data.content,
          type: data.type || 'STAFF',
          clinicId: data.clinicId,
          attachments: data.attachments || [],
        },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              avatar: true,
              role: true,
            },
          },
          receiver: {
            select: {
              id: true,
              name: true,
              avatar: true,
              role: true,
            },
          },
        },
      })

      // Send to recipient
      const recipientSocketId = activeUsers.get(data.receiverId)
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('message:receive', message)
      }

      // Confirm to sender
      socket.emit('message:sent', message)

      // Create notification
      await prisma.notification.create({
        data: {
          userId: data.receiverId,
          type: 'MESSAGE',
          title: 'رسالة جديدة',
          message: `رسالة جديدة من ${message.sender.name}`,
          link: `/messages?chat=${data.senderId}`,
        },
      })

      // Send notification via socket
      if (recipientSocketId) {
        const unreadCount = await prisma.notification.count({
          where: {
            userId: data.receiverId,
            isRead: false,
          },
        })
        io.to(recipientSocketId).emit('notification:new', { unreadCount })
      }
    } catch (error) {
      console.error('Error sending message:', error)
      socket.emit('message:error', { error: 'فشل إرسال الرسالة' })
    }
  })

  // Mark message as read
  socket.on('message:read', async ({ messageId, userId }) => {
    try {
      await prisma.message.update({
        where: { id: messageId },
        data: { isRead: true },
      })

      // Notify sender
      const message = await prisma.message.findUnique({
        where: { id: messageId },
      })

      if (message) {
        const senderSocketId = activeUsers.get(message.senderId)
        if (senderSocketId) {
          io.to(senderSocketId).emit('message:read', { messageId, userId })
        }
      }
    } catch (error) {
      console.error('Error marking message as read:', error)
    }
  })

  // Join clinic room (for clinic-specific updates)
  socket.on('clinic:join', (clinicId) => {
    socket.join(`clinic:${clinicId}`)
  })

  // Leave clinic room
  socket.on('clinic:leave', (clinicId) => {
    socket.leave(`clinic:${clinicId}`)
  })

  // Broadcast to clinic
  socket.on('clinic:broadcast', ({ clinicId, event, data }) => {
    io.to(`clinic:${clinicId}`).emit(event, data)
  })

  // Disconnect
  socket.on('disconnect', () => {
    if (socket.userId) {
      activeUsers.delete(socket.userId)
      io.emit('user:offline', socket.userId)
    }
    console.log('User disconnected:', socket.id)
  })
})

const PORT = process.env.SOCKET_PORT || 3001

httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`)
})

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing Socket.IO server')
  await prisma.$disconnect()
  httpServer.close(() => {
    console.log('Socket.IO server closed')
    process.exit(0)
  })
})

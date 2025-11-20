"use client"

import { useEffect } from "react"
import { useNotificationStore } from "@/lib/stores/notification-store"
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function NotificationToast() {
  const { notifications, markAsRead, removeNotification } = useNotificationStore()

  // إظهار فقط آخر 3 إشعارات غير مقروءة
  const visibleNotifications = notifications.filter(n => !n.read).slice(0, 3)

  // إخفاء الإشعار تلقائياً بعد 5 ثوانٍ
  useEffect(() => {
    visibleNotifications.forEach((notification) => {
      const timer = setTimeout(() => {
        markAsRead(notification.id)
        setTimeout(() => {
          removeNotification(notification.id)
        }, 300)
      }, 5000)

      return () => clearTimeout(timer)
    })
  }, [visibleNotifications.length])

  if (visibleNotifications.length === 0) return null

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5" />
      case 'error':
        return <AlertCircle className="w-5 h-5" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />
      default:
        return <Info className="w-5 h-5" />
    }
  }

  const getColors = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-900'
      case 'error':
        return 'bg-red-50 border-red-200 text-red-900'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-900'
      default:
        return 'bg-blue-50 border-blue-200 text-blue-900'
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-600'
      case 'error':
        return 'text-red-600'
      case 'warning':
        return 'text-yellow-600'
      default:
        return 'text-blue-600'
    }
  }

  return (
    <div className="fixed top-4 left-4 z-50 space-y-2 w-full max-w-sm pointer-events-none" dir="rtl">
      {visibleNotifications.map((notification, index) => (
        <div
          key={notification.id}
          className={cn(
            "pointer-events-auto p-4 rounded-lg border-2 shadow-lg animate-in slide-in-from-top duration-300",
            getColors(notification.type)
          )}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start gap-3">
            <div className={cn("flex-shrink-0 mt-0.5", getIconColor(notification.type))}>
              {getIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm mb-1">{notification.title}</h4>
              <p className="text-sm opacity-90">{notification.message}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="flex-shrink-0 h-6 w-6 p-0 hover:bg-black/10"
              onClick={() => {
                markAsRead(notification.id)
                removeNotification(notification.id)
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadToCloudinary = async (
  file: File,
  folder: string = 'smart-dental'
): Promise<{ url: string; publicId: string }> => {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            resource_type: 'auto',
          },
          (error, result) => {
            if (error || !result) {
              reject(error || new Error('Upload failed'))
            } else {
              resolve({
                url: result.secure_url,
                publicId: result.public_id,
              })
            }
          }
        )
        .end(buffer)
    })
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw new Error('فشل رفع الملف')
  }
}

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    throw new Error('فشل حذف الملف')
  }
}

export default cloudinary

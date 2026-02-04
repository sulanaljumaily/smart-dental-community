/**
 * خدمة إرسال البريد الإلكتروني
 * يمكن استخدام أي من الخدمات التالية:
 * - Resend
 * - SendGrid
 * - AWS SES
 * - Nodemailer
 */

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

/**
 * إرسال بريد إلكتروني
 */
export async function sendEmail({ to, subject, html, text }: EmailOptions): Promise<boolean> {
  try {
    // التحقق من وجود مفاتيح API للبريد الإلكتروني
    const emailApiKey = process.env.EMAIL_API_KEY
    const emailFrom = process.env.EMAIL_FROM || "noreply@smartdental.iq"

    if (!emailApiKey) {
      console.warn("لم يتم تكوين مفتاح API للبريد الإلكتروني")
      return false
    }

    // يمكنك اختيار أحد الحلول التالية:

    // 1. استخدام Resend (موصى به)
    if (process.env.EMAIL_SERVICE === "resend") {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${emailApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: emailFrom,
          to: [to],
          subject,
          html,
          text: text || "",
        }),
      })

      return response.ok
    }

    // 2. استخدام SendGrid
    if (process.env.EMAIL_SERVICE === "sendgrid") {
      const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${emailApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: to }] }],
          from: { email: emailFrom },
          subject,
          content: [
            { type: "text/html", value: html },
            ...(text ? [{ type: "text/plain", value: text }] : []),
          ],
        }),
      })

      return response.ok
    }

    console.warn("لم يتم تحديد خدمة بريد إلكتروني")
    return false
  } catch (error) {
    console.error("خطأ في إرسال البريد الإلكتروني:", error)
    return false
  }
}

/**
 * إرسال بريد تأكيد الحجز
 */
export async function sendBookingConfirmationEmail(
  email: string,
  bookingDetails: {
    clinicName: string
    patientName: string
    appointmentDate: string
    appointmentTime: string
    confirmationCode: string
    status: string
  }
) {
  const { clinicName, patientName, appointmentDate, appointmentTime, confirmationCode, status } = bookingDetails

  const subject = status === "CONFIRMED"
    ? "تأكيد الحجز - Smart Dental"
    : "طلب حجز قيد المراجعة - Smart Dental"

  const html = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
        .header { background: linear-gradient(135deg, #2563eb, #9333ea); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; }
        .info-box { background: #f0f9ff; border-right: 4px solid #2563eb; padding: 15px; margin: 15px 0; }
        .confirmation-code { background: #10b981; color: white; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; border-radius: 8px; margin: 20px 0; letter-spacing: 2px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        .button { display: inline-block; background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🦷 Smart Dental Community</h1>
          <p>${status === "CONFIRMED" ? "تأكيد حجزك" : "استلام طلب الحجز"}</p>
        </div>
        <div class="content">
          <h2>مرحباً ${patientName}،</h2>
          <p>
            ${status === "CONFIRMED"
              ? "تم تأكيد حجزك بنجاح! نحن نتطلع لرؤيتك في الموعد المحدد."
              : "تم استلام طلب حجزك وسيتم التواصل معك قريباً من العيادة للتأكيد."
            }
          </p>

          <div class="info-box">
            <h3>📋 تفاصيل الحجز:</h3>
            <p><strong>العيادة:</strong> ${clinicName}</p>
            <p><strong>التاريخ:</strong> ${appointmentDate}</p>
            <p><strong>الوقت:</strong> ${appointmentTime}</p>
          </div>

          <div class="confirmation-code">
            <div>رمز التأكيد</div>
            <div>${confirmationCode}</div>
          </div>

          <p style="text-align: center; color: #666;">
            يُرجى الاحتفاظ برمز التأكيد هذا وإظهاره عند الوصول للعيادة
          </p>

          ${status === "CONFIRMED" ? `
            <div style="text-align: center; margin: 20px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" class="button">
                زيارة الموقع
              </a>
            </div>
          ` : ""}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
            <p style="font-size: 14px; color: #666;">
              <strong>ملاحظة مهمة:</strong><br>
              • يُرجى الحضور قبل 10 دقائق من الموعد المحدد<br>
              • في حالة الرغبة بإلغاء أو تعديل الموعد، يُرجى التواصل مع العيادة
            </p>
          </div>
        </div>
        <div class="footer">
          <p>Smart Dental Community Platform</p>
          <p>منصة المجتمع الطبي الذكية للأسنان</p>
          <p style="font-size: 12px; color: #999;">
            هذا البريد الإلكتروني تم إرساله تلقائياً، الرجاء عدم الرد عليه
          </p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
مرحباً ${patientName}،

${status === "CONFIRMED"
  ? "تم تأكيد حجزك بنجاح! نحن نتطلع لرؤيتك في الموعد المحدد."
  : "تم استلام طلب حجزك وسيتم التواصل معك قريباً من العيادة للتأكيد."
}

تفاصيل الحجز:
العيادة: ${clinicName}
التاريخ: ${appointmentDate}
الوقت: ${appointmentTime}

رمز التأكيد: ${confirmationCode}

يُرجى الاحتفاظ برمز التأكيد هذا وإظهاره عند الوصول للعيادة.

Smart Dental Community Platform
منصة المجتمع الطبي الذكية للأسنان
  `.trim()

  return sendEmail({ to: email, subject, html, text })
}

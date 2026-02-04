/**
 * خدمة إرسال الرسائل النصية (SMS)
 * يمكن استخدام أي من الخدمات التالية:
 * - Twilio
 * - SMS.to
 * - Nexmo (Vonage)
 * - خدمات محلية عراقية
 */

interface SMSOptions {
  to: string // رقم الهاتف بصيغة دولية (مثال: +9647XXXXXXXXX)
  message: string
}

/**
 * إرسال رسالة نصية (SMS)
 */
export async function sendSMS({ to, message }: SMSOptions): Promise<boolean> {
  try {
    // التحقق من وجود مفاتيح API للرسائل النصية
    const smsApiKey = process.env.SMS_API_KEY
    const smsApiSecret = process.env.SMS_API_SECRET
    const smsFrom = process.env.SMS_FROM || "SmartDental"

    if (!smsApiKey) {
      console.warn("لم يتم تكوين مفتاح API للرسائل النصية")
      return false
    }

    // يمكنك اختيار أحد الحلول التالية:

    // 1. استخدام Twilio (عالمي)
    if (process.env.SMS_SERVICE === "twilio") {
      const accountSid = smsApiKey
      const authToken = smsApiSecret

      const response = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        {
          method: "POST",
          headers: {
            "Authorization": `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            To: to,
            From: smsFrom,
            Body: message,
          }),
        }
      )

      return response.ok
    }

    // 2. استخدام SMS.to (بسيط وسهل)
    if (process.env.SMS_SERVICE === "sms.to") {
      const response = await fetch("https://api.sms.to/sms/send", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${smsApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to,
          message,
          sender_id: smsFrom,
        }),
      })

      return response.ok
    }

    // 3. استخدام Nexmo/Vonage
    if (process.env.SMS_SERVICE === "vonage") {
      const response = await fetch("https://rest.nexmo.com/sms/json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: smsApiKey,
          api_secret: smsApiSecret,
          to,
          from: smsFrom,
          text: message,
        }),
      })

      return response.ok
    }

    console.warn("لم يتم تحديد خدمة رسائل نصية")
    return false
  } catch (error) {
    console.error("خطأ في إرسال الرسالة النصية:", error)
    return false
  }
}

/**
 * إرسال رسالة تأكيد الحجز عبر SMS
 */
export async function sendBookingConfirmationSMS(
  phone: string,
  bookingDetails: {
    clinicName: string
    appointmentDate: string
    appointmentTime: string
    confirmationCode: string
    status: string
  }
) {
  const { clinicName, appointmentDate, appointmentTime, confirmationCode, status } = bookingDetails

  // التأكد من أن رقم الهاتف بصيغة دولية
  let formattedPhone = phone
  if (!formattedPhone.startsWith("+")) {
    // تحويل الأرقام العراقية إلى صيغة دولية
    if (formattedPhone.startsWith("07")) {
      formattedPhone = "+964" + formattedPhone.substring(1)
    } else if (formattedPhone.startsWith("7")) {
      formattedPhone = "+964" + formattedPhone
    } else {
      formattedPhone = "+" + formattedPhone
    }
  }

  const message = status === "CONFIRMED"
    ? `🦷 Smart Dental

تأكيد حجزك:
${clinicName}
📅 ${appointmentDate}
⏰ ${appointmentTime}

رمز التأكيد: ${confirmationCode}

يُرجى الحضور قبل 10 دقائق من الموعد`
    : `🦷 Smart Dental

تم استلام طلب حجزك في:
${clinicName}
📅 ${appointmentDate}
⏰ ${appointmentTime}

رمز المتابعة: ${confirmationCode}

سنتواصل معك قريباً للتأكيد`

  return sendSMS({ to: formattedPhone, message })
}

/**
 * إرسال رسالة تذكير بالموعد
 */
export async function sendAppointmentReminderSMS(
  phone: string,
  reminderDetails: {
    clinicName: string
    appointmentDate: string
    appointmentTime: string
  }
) {
  const { clinicName, appointmentDate, appointmentTime } = reminderDetails

  // التأكد من صيغة الرقم الدولية
  let formattedPhone = phone
  if (!formattedPhone.startsWith("+")) {
    if (formattedPhone.startsWith("07")) {
      formattedPhone = "+964" + formattedPhone.substring(1)
    } else if (formattedPhone.startsWith("7")) {
      formattedPhone = "+964" + formattedPhone
    } else {
      formattedPhone = "+" + formattedPhone
    }
  }

  const message = `🦷 تذكير بموعدك

${clinicName}
📅 ${appointmentDate}
⏰ ${appointmentTime}

يُرجى الحضور قبل 10 دقائق من الموعد

Smart Dental Community`

  return sendSMS({ to: formattedPhone, message })
}

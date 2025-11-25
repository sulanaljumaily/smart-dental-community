import crypto from 'crypto'

interface ZainCashInitPayload {
  amount: number
  serviceType: string
  orderId: string
  redirectUrl?: string
  production?: boolean
}

interface ZainCashInitResponse {
  transactionId: string
  paymentUrl: string
}

export class ZainCashService {
  private merchantId: string
  private secret: string
  private msisdn: string
  private redirectUrl: string
  private production: boolean

  constructor() {
    this.merchantId = process.env.ZAINCASH_MERCHANT_ID || ''
    this.secret = process.env.ZAINCASH_SECRET || ''
    this.msisdn = process.env.ZAINCASH_MSISDN || ''
    this.redirectUrl = process.env.ZAINCASH_REDIRECT_URL || ''
    this.production = process.env.NODE_ENV === 'production'
  }

  private generateToken(data: string): string {
    const hmac = crypto.createHmac('sha256', this.secret)
    hmac.update(data)
    return hmac.digest('hex')
  }

  async initializePayment(payload: ZainCashInitPayload): Promise<ZainCashInitResponse> {
    try {
      const amount = Math.round(payload.amount * 1000) // Convert to fils
      const redirectUrl = payload.redirectUrl || this.redirectUrl

      const requestData = {
        amount,
        serviceType: payload.serviceType,
        msisdn: this.msisdn,
        orderId: payload.orderId,
        redirectUrl,
        iat: Date.now(),
        exp: Date.now() + 3600000, // 1 hour
      }

      const dataString = JSON.stringify(requestData)
      const token = this.generateToken(dataString)

      const apiUrl = this.production
        ? 'https://api.zaincash.iq/transaction/pay'
        : 'https://test.zaincash.iq/transaction/pay'

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.merchantId}`,
        },
        body: JSON.stringify({
          token,
          merchantId: this.merchantId,
          lang: 'ar',
          ...requestData,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'فشل إنشاء عملية الدفع')
      }

      return {
        transactionId: result.id,
        paymentUrl: result.url,
      }
    } catch (error) {
      console.error('ZainCash init error:', error)
      throw error
    }
  }

  async verifyPayment(transactionId: string): Promise<boolean> {
    try {
      const token = this.generateToken(`${this.merchantId}:${transactionId}`)

      const apiUrl = this.production
        ? 'https://api.zaincash.iq/transaction/get'
        : 'https://test.zaincash.iq/transaction/get'

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.merchantId}`,
        },
        body: JSON.stringify({
          token,
          merchantId: this.merchantId,
          transactionId,
        }),
      })

      const result = await response.json()

      return result.status === 'success'
    } catch (error) {
      console.error('ZainCash verify error:', error)
      return false
    }
  }
}

export const zaincashService = new ZainCashService()

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { proName, proEmail, fromName, fromEmail, fromPhone, projectType, date, budget, message, turnstileToken } = body

    if (!fromName || !fromEmail || !message || !proEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify Turnstile token
    if (!turnstileToken) {
      return NextResponse.json({ error: 'Please complete the human verification' }, { status: 400 })
    }

    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: turnstileToken,
      }),
    })

    const verifyData = await verifyRes.json()
    if (!verifyData.success) {
      return NextResponse.json({ error: 'Human verification failed. Please try again.' }, { status: 400 })
    }

    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'GCPN <noreply@gulfcoastproductionnetwork.com>',
      to: proEmail,
      reply_to: fromEmail,
      subject: `New Project Inquiry via GCPN — ${projectType || 'General Inquiry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A1628; color: #ffffff; padding: 32px; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <span style="color: #FF5C3A; font-size: 10px;">●</span>
            <span style="color: #00C9B1; font-size: 18px; font-weight: bold; letter-spacing: 4px;"> GULF COAST PRODUCTION NETWORK</span>
          </div>
          <h2 style="color: #ffffff; font-size: 24px; margin-bottom: 8px;">New Project Inquiry</h2>
          <p style="color: #888; margin-bottom: 24px;">Hi ${proName}, someone wants to hire you through GCPN!</p>
          <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="color: #888; padding: 6px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">From</td><td style="color: #fff; padding: 6px 0;">${fromName}</td></tr>
              <tr><td style="color: #888; padding: 6px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Email</td><td style="color: #00C9B1; padding: 6px 0;">${fromEmail}</td></tr>
              ${fromPhone ? `<tr><td style="color: #888; padding: 6px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Phone</td><td style="color: #fff; padding: 6px 0;">${fromPhone}</td></tr>` : ''}
              ${projectType ? `<tr><td style="color: #888; padding: 6px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Project Type</td><td style="color: #fff; padding: 6px 0;">${projectType}</td></tr>` : ''}
              ${date ? `<tr><td style="color: #888; padding: 6px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Date</td><td style="color: #fff; padding: 6px 0;">${date}</td></tr>` : ''}
              ${budget ? `<tr><td style="color: #888; padding: 6px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Budget</td><td style="color: #FFB800; padding: 6px 0; font-weight: bold;">${budget}</td></tr>` : ''}
            </table>
          </div>
          <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Message</p>
            <p style="color: #fff; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <a href="mailto:${fromEmail}" style="display: block; text-align: center; background: #00C9B1; color: #0A1628; padding: 14px; border-radius: 8px; text-decoration: none; font-weight: bold; letter-spacing: 2px; text-transform: uppercase;">Reply to ${fromName}</a>
          <p style="color: #444; font-size: 11px; text-align: center; margin-top: 24px;">Sent via gulfcoastproductionnetwork.com</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}

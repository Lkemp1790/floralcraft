import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resendApiKey = process.env.RESEND_API_KEY
const toEmail = 'liamkemp1790@gmail.com'

export async function POST(req: NextRequest) {
  try {
    if (!resendApiKey) {
      return NextResponse.json({ ok: false, error: 'Missing RESEND_API_KEY' }, { status: 500 })
    }

    const body = await req.json()
    const { name, email, phone, message, topic } = body ?? {}

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 })
    }

    const resend = new Resend(resendApiKey)

    const subject = `New contact from Floralcraft: ${name}${topic ? ` (${topic})` : ''}`
    const text = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '-'}\nTopic: ${topic || '-'}\n\nMessage:\n${message}`

    const result = await resend.emails.send({
      from: 'Floralcraft <noreply@floralcraft.local>',
      to: [toEmail],
      subject,
      text,
    })

    if ('error' in result && result.error) {
      return NextResponse.json({ ok: false, error: result.error.message || 'Email send failed' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Unexpected error' }, { status: 500 })
  }
}



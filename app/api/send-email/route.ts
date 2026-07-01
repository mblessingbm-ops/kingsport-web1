import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Shared send endpoint for every form on the site (quote request, contact
// form, imported-gifts enquiry). Each caller already builds its own
// nicely-formatted subject/body text client-side (matching what used to go
// into a mailto: link) — this route's only job is to validate that payload
// and hand it to Resend, replacing the old "hope the visitor's mail client
// is configured" flow with a real, observable delivery.

const SALES_EMAIL = process.env.SALES_EMAIL || 'sales@kingsport.co.zw'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Kingsport Website <website@kingsport.co.zw>'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { subject, text, replyTo } = (payload ?? {}) as Record<string, unknown>

  if (typeof subject !== 'string' || !subject.trim() || subject.length > 200) {
    return NextResponse.json({ error: 'Missing or invalid subject.' }, { status: 400 })
  }
  if (typeof text !== 'string' || !text.trim() || text.length > 10_000) {
    return NextResponse.json({ error: 'Missing or invalid message body.' }, { status: 400 })
  }
  if (replyTo !== undefined && (typeof replyTo !== 'string' || !EMAIL_RE.test(replyTo))) {
    return NextResponse.json({ error: 'Invalid reply-to email address.' }, { status: 400 })
  }

  // Config check comes after validation: a malformed request should always
  // read as "bad request", not "server isn't set up yet".
  if (!process.env.RESEND_API_KEY) {
    console.error('POST /api/send-email: RESEND_API_KEY is not set')
    return NextResponse.json(
      { error: 'Email delivery is not configured yet. Please email or call us directly.' },
      { status: 503 },
    )
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: SALES_EMAIL,
      replyTo: replyTo as string | undefined,
      subject,
      text,
    })

    if (error) {
      console.error('POST /api/send-email: Resend error', error)
      return NextResponse.json({ error: 'Failed to send — please try again.' }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('POST /api/send-email: unexpected error', err)
    return NextResponse.json({ error: 'Failed to send — please try again.' }, { status: 500 })
  }
}

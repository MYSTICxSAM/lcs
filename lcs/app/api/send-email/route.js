import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    const { name, phone, loanType, loanAmount } = await req.json()

    await resend.emails.send({
      from: 'leads@lendingcapitalsolutions.com',
      to: 'cscafrica@gmail.com',
      subject: `🔔 New Lead: ${name} - ${loanType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px; border-radius: 12px;">
          <div style="background: #1e3a8a; padding: 24px; border-radius: 8px; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 22px;">🏦 New Loan Lead Received</h1>
            <p style="color: #93c5fd; margin: 4px 0 0;">Lending Capital Solution</p>
          </div>
          
          <div style="background: white; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px 0; color: #64748b; font-size: 14px; width: 40%;">Name</td>
                <td style="padding: 12px 0; color: #1e293b; font-weight: 600; font-size: 14px;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px 0; color: #64748b; font-size: 14px;">Phone</td>
                <td style="padding: 12px 0; color: #1e293b; font-weight: 600; font-size: 14px;">${phone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px 0; color: #64748b; font-size: 14px;">Loan Type</td>
                <td style="padding: 12px 0; color: #1e293b; font-weight: 600; font-size: 14px;">${loanType}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #64748b; font-size: 14px;">Loan Amount</td>
                <td style="padding: 12px 0; color: #1e293b; font-weight: 600; font-size: 14px;">₹${loanAmount}</td>
              </tr>
            </table>
          </div>

          <div style="margin-top: 16px; text-align: center;">
            <a href="tel:${phone}" style="display: inline-block; background: #1e3a8a; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
              📞 Call ${name}
            </a>
          </div>

          <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 20px;">
            This lead was submitted on ${new Date().toLocaleString('en-IN')}
          </p>
        </div>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
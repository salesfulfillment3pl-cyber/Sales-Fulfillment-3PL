import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const quoteSchema = z.object({
  name: z.string().trim().min(2, "Name is required.").max(120),
  email: z.string().trim().email("Valid email is required."),
  company: z.string().trim().min(2, "Company name is required.").max(160),
  brandUrl: z.string().trim().max(240).optional().or(z.literal("")),
  channels: z.string().trim().min(2, "Sales channel is required.").max(100),
  monthlyOrders: z.string().trim().min(2, "Monthly order volume is required.").max(100),
  details: z.string().trim().min(10, "Please include a few details.").max(3000),
  website: z.string().optional(),
});

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = quoteSchema.parse(json);

    // Honeypot spam field. Real users never see this input.
    if (data.website) {
      return NextResponse.json({ ok: true });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const leadEmail = process.env.LEAD_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Sales Fulfillment 3PL <onboarding@resend.dev>";

    if (!resendApiKey || !leadEmail) {
      return NextResponse.json(
        {
          error:
            "Quote form is built, but email is not configured yet. Add RESEND_API_KEY and LEAD_EMAIL in Vercel environment variables.",
        },
        { status: 500 }
      );
    }

    const safe = {
      name: escapeHtml(data.name),
      email: escapeHtml(data.email),
      company: escapeHtml(data.company),
      brandUrl: escapeHtml(data.brandUrl || "Not provided"),
      channels: escapeHtml(data.channels),
      monthlyOrders: escapeHtml(data.monthlyOrders),
      details: escapeHtml(data.details).replace(/\n/g, "<br />"),
    };

    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: fromEmail,
      to: leadEmail,
      replyTo: data.email,
      subject: `New Sales Fulfillment 3PL Quote Request — ${data.company}`,
      text: `New quote request\n\nName: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company}\nWebsite: ${data.brandUrl || "Not provided"}\nChannels: ${data.channels}\nMonthly Orders: ${data.monthlyOrders}\n\nDetails:\n${data.details}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;max-width:680px;margin:auto;">
          <h1 style="margin:0 0 12px;font-size:24px;">New Sales Fulfillment 3PL Quote Request</h1>
          <p style="margin:0 0 20px;color:#475569;">A potential customer submitted the quote form.</p>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px;border:1px solid #e2e8f0;font-weight:bold;">Name</td><td style="padding:10px;border:1px solid #e2e8f0;">${safe.name}</td></tr>
            <tr><td style="padding:10px;border:1px solid #e2e8f0;font-weight:bold;">Email</td><td style="padding:10px;border:1px solid #e2e8f0;">${safe.email}</td></tr>
            <tr><td style="padding:10px;border:1px solid #e2e8f0;font-weight:bold;">Company</td><td style="padding:10px;border:1px solid #e2e8f0;">${safe.company}</td></tr>
            <tr><td style="padding:10px;border:1px solid #e2e8f0;font-weight:bold;">Website</td><td style="padding:10px;border:1px solid #e2e8f0;">${safe.brandUrl}</td></tr>
            <tr><td style="padding:10px;border:1px solid #e2e8f0;font-weight:bold;">Channels</td><td style="padding:10px;border:1px solid #e2e8f0;">${safe.channels}</td></tr>
            <tr><td style="padding:10px;border:1px solid #e2e8f0;font-weight:bold;">Monthly Orders</td><td style="padding:10px;border:1px solid #e2e8f0;">${safe.monthlyOrders}</td></tr>
          </table>
          <h2 style="margin:24px 0 8px;font-size:18px;">Details</h2>
          <div style="padding:14px;border:1px solid #e2e8f0;background:#f8fafc;border-radius:12px;">${safe.details}</div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0]?.message || "Invalid form data." }, { status: 400 });
    }

    console.error(error);
    return NextResponse.json({ error: "Unable to send quote request right now." }, { status: 500 });
  }
}

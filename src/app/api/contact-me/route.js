import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/schemas";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: "Invalid input" },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.RESEND_TO,
      subject: `New message from ${name}`,
      reply_to: email,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error(error);
      return NextResponse.json(
        { ok: false, message: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { ok: true, message: "Email sent" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Unexpected error" },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json(
    { error: "Method Not Allowed" },
    { status: 405 }
  );
}

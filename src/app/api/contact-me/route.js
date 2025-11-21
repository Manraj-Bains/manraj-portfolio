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
        {
          ok: false,
          message: "Invalid input",
          errors: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.RESEND_TO,
      reply_to: email,
      subject: `New portfolio contact from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, message: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { ok: true, message: "Email sent", data },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { ok: false, message: "Unexpected server error" },
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
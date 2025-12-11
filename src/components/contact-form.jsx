"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { contactSchema } from "@/lib/schemas";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);
    const values = {
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
    };

    // Zod validation
    const validated = contactSchema.safeParse(values);

    if (!validated.success) {
      toast({
        title: "Invalid input",
        description: "Double-check your name, email, and message.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/contact-me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        toast({
          title: "Failed to send",
          description:
            data?.message ||
            "The server could not send the message. Please try again later.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // SUCCESS TOAST
      toast({
        title: "Message sent!",
        description: "Your message has been delivered successfully.",
      });

      e.target.reset();
    } catch (err) {
      toast({
        title: "Unexpected error",
        description: "Something went wrong on the server.",
        variant: "destructive",
      });
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Your name</label>
        <input
          name="name"
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
          placeholder="Your name…"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          name="email"
          type="email"
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium">Message</label>
        <textarea
          name="message"
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
          placeholder="How can I help?"
          rows={4}
          required
        />
      </div>

      <button
        disabled={loading}
        className="rounded-md bg-black text-white px-4 py-2 text-sm disabled:opacity-50"
      >
        {loading ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

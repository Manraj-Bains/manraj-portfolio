import ContactForm from "@/components/contact-form";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-4 text-2xl font-bold tracking-tight">Contact</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Have a question or want to collaborate? Send me a message below.
      </p>
      <ContactForm />
    </main>
  );
}
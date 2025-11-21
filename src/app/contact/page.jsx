import ContactForm from "@/components/contact-form";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Contact | ManrajPortfolio",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Contact</h1>

      <Card className="p-6">
        <ContactForm />
      </Card>
    </main>
  );
}
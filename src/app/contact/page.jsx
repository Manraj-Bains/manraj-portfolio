import ContactForm from "@/components/contact-form";


export const metadata = {
  title: "Contact | ManrajPortfolio",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Contact</h1>
      <ContactForm />
    </main>
  );
}
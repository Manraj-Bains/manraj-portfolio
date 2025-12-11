"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function NewProjectForm() {
  const router = useRouter();
  const { toast } = useToast();

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
    keywords: "",
  });
  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      const keywords = form.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          image: form.image,
          link: form.link,
          keywords,
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();

      toast({ title: "Project created" });

      router.push(`/projects/${data.id}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "Create failed",
        description: "Please try again.",
        variant: "destructive",
      });
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Project title"
        className="w-full rounded border px-3 py-2"
        required
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Short description"
        rows={4}
        className="w-full rounded border px-3 py-2"
        required
      />

      <input
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full rounded border px-3 py-2"
      />

      <input
        name="link"
        value={form.link}
        onChange={handleChange}
        placeholder="Project link"
        className="w-full rounded border px-3 py-2"
      />

      <input
        name="keywords"
        value={form.keywords}
        onChange={handleChange}
        placeholder="Keywords (comma separated)"
        className="w-full rounded border px-3 py-2"
      />

      <button
        type="submit"
        disabled={saving}
        className="rounded bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {saving ? "Creating…" : "Create project"}
      </button>
    </form>
  );
}

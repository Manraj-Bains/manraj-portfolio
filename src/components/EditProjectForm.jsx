"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function EditProjectForm({ project }) {
  const router = useRouter();
  const { toast } = useToast();

  const [form, setForm] = useState({
    title: project.title || "",
    description: project.description || "",
    image: project.image || "",
    link: project.link || "",
    keywords: (project.keywords || []).join(", "),
  });

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function save(e) {
    e.preventDefault();
    setSaving(true);

    try {
      const keywords = form.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);

      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, keywords }),
      });

      if (!res.ok) throw new Error("Update failed");

      toast({ title: "Project updated" });

      router.push(`/projects/${project.id}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "Update failed",
        description: "Please try again.",
        variant: "destructive",
      });
      setSaving(false);
    }
  }

  async function remove() {
    if (!confirm("Delete this project?")) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      toast({ title: "Project deleted" });

      router.push("/projects");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "Delete failed",
        description: "Please try again.",
        variant: "destructive",
      });
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={save} className="space-y-4">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        className="w-full rounded border px-3 py-2"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        className="w-full rounded border px-3 py-2"
        rows={4}
      />

      <input
        name="image"
        value={form.image}
        onChange={handleChange}
        className="w-full rounded border px-3 py-2"
      />

      <input
        name="link"
        value={form.link}
        onChange={handleChange}
        className="w-full rounded border px-3 py-2"
      />

      <input
        name="keywords"
        value={form.keywords}
        onChange={handleChange}
        className="w-full rounded border px-3 py-2"
      />

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving || deleting}
          className="rounded bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>

        <button
          type="button"
          disabled={saving || deleting}
          onClick={remove}
          className="rounded border border-red-500 px-4 py-2 text-sm font-medium text-red-500 disabled:opacity-50"
        >
          {deleting ? "Deleting…" : "Delete"}
        </button>
      </div>
    </form>
  );
}

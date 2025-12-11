"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const initialState = {
  avatar: "",
  full_name: "",
  short_description: "",
  long_description: "",
};

export default function HeroEditorForm() {
  const [hero, setHero] = useState(initialState);
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/hero", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (!cancelled && data?.hero) {
            setHero({
              avatar: data.hero.avatar || "",
              full_name: data.hero.full_name || "",
              short_description: data.hero.short_description || "",
              long_description: data.hero.long_description || "",
            });
            setPreview(data.hero.avatar || "");
          }
        }
      } catch (e) {
        console.error("Failed to load hero", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setHero((prev) => ({ ...prev, [name]: value }));
  }

  function handleAvatar(e) {
    const file = e.target.files?.[0];
    if (!file) {
      setAvatarFile(null);
      setPreview(hero.avatar || "");
      return;
    }
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result?.toString() || "");
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("full_name", hero.full_name);
      formData.append("short_description", hero.short_description);
      formData.append("long_description", hero.long_description);
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      } else if (hero.avatar) {
        // Preserve existing avatar when no new file is chosen
        formData.append("avatar", hero.avatar);
      }

      const res = await fetch("/api/hero", {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Update failed");
      }

      toast({ title: "Hero updated" });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "Update failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-md border p-4 text-sm text-muted-foreground">
        Loading hero…
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border p-5">
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 rounded-full border bg-muted overflow-hidden">
          {preview ? (
            <img
              src={preview}
              alt="Avatar preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-muted" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatar}
            className="text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Optional. Upload an image; it will be stored as a data URL.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Name / Title</label>
        <input
          name="full_name"
          value={hero.full_name}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Short description</label>
        <input
          name="short_description"
          value={hero.short_description}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Long description</label>
        <textarea
          name="long_description"
          value={hero.long_description}
          onChange={handleChange}
          rows={4}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="rounded bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save hero"}
      </button>
    </form>
  );
}


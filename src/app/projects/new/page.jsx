"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ----------------------
// ZOD SCHEMA
// ----------------------
const newProjectSchema = z.object({
  title: z.string().min(2, { message: "Title too short." }).max(200),
  description: z.string().min(5, { message: "Description too short." }),
  img: z.string().url({ message: "Must be a valid URL." }),
  link: z.string().url({ message: "Must be a valid URL." }),
  keywords: z.array(z.string()).optional(),
});

export default function NewProjectPage() {
  const [draftKeyword, setDraftKeyword] = useState("");

  const form = useForm({
    resolver: zodResolver(newProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      img: "https://placehold.co/300x300",
      link: "",
      keywords: [],
    },
  });

  // ----------------------
  // SUBMIT HANDLER
  // ----------------------
  async function onSubmit(values) {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("img", values.img);
    formData.append("link", values.link);

    values.keywords.forEach((k) => formData.append("keywords", k));

    try {
      const res = await fetch("/api/projects/new", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Server response:", data);
      alert("Project submitted! Check server logs.");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  }

  // ----------------------
  // KEYWORDS LOGIC
  // ----------------------
  const addKeyword = () => {
    const kw = draftKeyword.trim();
    if (!kw) return;

    const current = form.getValues("keywords") || [];
    if (current.includes(kw)) return;

    const updated = [...current, kw];
    form.setValue("keywords", updated);

    setDraftKeyword("");
  };

  const removeKeyword = (kw) => {
    const updated = form.getValues("keywords").filter((k) => k !== kw);
    form.setValue("keywords", updated);
  };

  const handleKeywordKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword();
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">New Project</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {/* TITLE */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Title</FormLabel>
                <FormControl>
                  <Input placeholder="My awesome project..." {...field} />
                </FormControl>
                <FormDescription>This is the title of your project.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* DESCRIPTION */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Short description..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* IMAGE URL */}
          <FormField
            control={form.control}
            name="img"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormDescription>URL for the project thumbnail.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PROJECT LINK */}
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Link</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* KEYWORDS */}
          <FormField
            control={form.control}
            name="keywords"
            render={() => {
              const currentKeywords = form.watch("keywords") ?? [];

              return (
                <FormItem>
                  <FormLabel>Keywords</FormLabel>

                  <div className="flex gap-2">
                    <Input
                      value={draftKeyword}
                      onChange={(e) => setDraftKeyword(e.target.value)}
                      onKeyDown={handleKeywordKeyDown}
                      placeholder="Add keyword + Enter"
                    />
                    <Button type="button" onClick={addKeyword}>
                      Add
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {currentKeywords.map((kw) => (
                      <Badge
                        key={kw}
                        className="cursor-pointer"
                        onClick={() => removeKeyword(kw)}
                      >
                        {kw} ✕
                      </Badge>
                    ))}
                  </div>

                  <FormDescription>Press Enter to add keywords.</FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* SUBMIT */}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </main>
  );
}

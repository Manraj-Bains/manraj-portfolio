import { neon } from "@neondatabase/serverless";
import { randomUUID } from "crypto";

export async function GET() {
  try {
    const db = neon(process.env.NEON_DB_URL);

    // make sure table exists
    await db`
      CREATE TABLE IF NOT EXISTS projects (
        id UUID PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        image TEXT,
        link TEXT,
        keywords JSONB,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // Insert example projects
    const exampleProjects = [
      {
        title: "Modern Portfolio Website",
        description: "A fully responsive portfolio site built with Next.js 16, Tailwind, and Neon Postgres.",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        link: "https://example.com",
        keywords: ["nextjs", "react", "design"],
      },
      {
        title: "AI Resume Analyzer",
        description: "An AI-powered resume evaluator with keyword scanning and scoring.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        link: "https://example.com",
        keywords: ["ai", "resume", "nlp"],
      },
      {
        title: "E-Commerce Dashboard",
        description: "A dashboard for tracking sales, orders, and visitor analytics with real-time updates.",
        image: "https://images.unsplash.com/photo-1556155092-8707de31f9c4",
        link: "https://example.com",
        keywords: ["ecommerce", "dashboard", "analytics"],
      }
    ];

    for (const p of exampleProjects) {
      await db`
        INSERT INTO projects (id, title, description, image, link, keywords)
        VALUES (
          ${randomUUID()},
          ${p.title},
          ${p.description},
          ${p.image},
          ${p.link},
          ${JSON.stringify(p.keywords)}
        )
      `;
    }

    return Response.json({ ok: true, message: "Seeded example projects!" });

  } catch (err) {
    return Response.json({ ok: false, error: err.message });
  }
}

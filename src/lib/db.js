import { neon } from "@neondatabase/serverless";
import { randomUUID } from "crypto";

let cachedSql = null;
function getSql() {
  const url = process.env.NEON_DB_URL;
  if (!url) return null;
  if (cachedSql) return cachedSql;
  cachedSql = neon(url);
  return cachedSql;
}

// ----------------------------------------------------
// PROJECTS TABLE
// ----------------------------------------------------
export async function ensureProjectsTable() {
  const sql = getSql();
  if (!sql) return;
  await sql`
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
}

export async function getProjects() {
  const sql = getSql();
  if (!sql) return [];
  await ensureProjectsTable();

  const rows = await sql`
    SELECT *
    FROM projects
    ORDER BY created_at DESC
  `;

  return rows;
}

export async function getProject(id) {
  const sql = getSql();
  if (!sql) return null;
  await ensureProjectsTable();

  const rows = await sql`
    SELECT *
    FROM projects
    WHERE id = ${id}::uuid
    LIMIT 1
  `;

  return rows[0] || null;
}

export async function createProject(data) {
  const sql = getSql();
  if (!sql) {
    throw new Error("Database not configured");
  }
  await ensureProjectsTable();

  const id = randomUUID();
  const { title, description, image, link, keywords } = data;

  await sql`
    INSERT INTO projects (id, title, description, image, link, keywords)
    VALUES (
      ${id},
      ${title},
      ${description},
      ${image},
      ${link},
      ${JSON.stringify(keywords || [])}
    )
  `;

  return id;
}

export async function updateProject(id, data) {
  const sql = getSql();
  if (!sql) {
    throw new Error("Database not configured");
  }
  await ensureProjectsTable();

  const { title, description, image, link, keywords } = data;

  await sql`
    UPDATE projects
    SET
      title = ${title},
      description = ${description},
      image = ${image},
      link = ${link},
      keywords = ${JSON.stringify(keywords || [])},
      updated_at = NOW()
    WHERE id = ${id}::uuid
  `;
}

export async function deleteProject(id) {
  const sql = getSql();
  if (!sql) {
    throw new Error("Database not configured");
  }
  await ensureProjectsTable();

  await sql`
    DELETE FROM projects
    WHERE id = ${id}::uuid
  `;
}

// ----------------------------------------------------
// HERO TABLE (LAB 5)
// ----------------------------------------------------
export async function ensureHeroTable() {
  const sql = getSql();
  if (!sql) return;
  await sql`
    CREATE TABLE IF NOT EXISTS hero (
      id UUID PRIMARY KEY,
      avatar TEXT,
      full_name TEXT,
      short_description TEXT,
      long_description TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
}

export async function getHero() {
  const sql = getSql();
  if (!sql) return null;
  await ensureHeroTable();

  const rows = await sql`
    SELECT *
    FROM hero
    LIMIT 1
  `;

  return rows[0] || null;
}

export async function updateHero(data) {
  const sql = getSql();
  if (!sql) {
    throw new Error("Database not configured");
  }
  await ensureHeroTable();

  const existing = await getHero();
  const id = existing?.id || randomUUID();

  const { avatar, full_name, short_description, long_description } = data;

  if (!existing) {
    await sql`
      INSERT INTO hero (
        id,
        avatar,
        full_name,
        short_description,
        long_description
      ) VALUES (
        ${id},
        ${avatar},
        ${full_name},
        ${short_description},
        ${long_description}
      )
    `;
  } else {
    await sql`
      UPDATE hero
      SET
        avatar = ${avatar},
        full_name = ${full_name},
        short_description = ${short_description},
        long_description = ${long_description},
        updated_at = NOW()
      WHERE id = ${id}::uuid
    `;
  }

  return id;
}

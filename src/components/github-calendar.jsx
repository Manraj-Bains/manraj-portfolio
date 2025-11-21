import { Card } from "@/components/ui/card";

const GITHUB_USERNAME = "manraj-bains";

export default async function GithubCalendar() {
  let svg = null;

  try {
    const res = await fetch(`https://ghchart.rshah.org/${GITHUB_USERNAME}`, {
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!res.ok) {
      throw new Error(`GitHub calendar fetch failed: ${res.status}`);
    }

    svg = await res.text();
  } catch (err) {
    console.error("Error fetching GitHub calendar:", err);
  }

  return (
    <Card className="p-6 overflow-hidden">
      <h2 className="text-lg font-semibold mb-4">GitHub activity</h2>

      <div className="flex justify-center w-full overflow-x-auto">
        <div
          className="scale-[1.111] origin-top"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>
    </Card>
  );
}

import { Card } from "@/components/ui/card";

const GITHUB_USERNAME = "manraj-bains";

export default async function GithubCalendar() {
  let svg = null;

  try {
    const res = await fetch(`https://ghchart.rshah.org/${GITHUB_USERNAME}`, {
      next: { revalidate: 86400 },
    });

    if (res.ok) {
      svg = await res.text();
    }
  } catch (error) {
    console.error("Error fetching GitHub calendar:", error);
  }

  return (
    <Card className="p-6 flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-6">GitHub activity</h3>

      {svg ? (
        <div
          className="github-calendar w-full flex justify-center overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <p className="text-sm text-muted-foreground">
          Unable to load GitHub contribution graph right now.
        </p>
      )}
    </Card>
  );
}

export async function GET() {
  const projects = [
    {
      title: "Conway's Game of Life",
      description: "Cellular automaton visualizer.",
      image: "/images/placeholder-300x300.png",
      link: "https://example.com/game-of-life",
      keywords: ["algorithms", "simulation"],
    },
    {
      title: "Portfolio v2",
      description: "Dynamic portfolio built with Next.js and Tailwind.",
      image: "/images/placeholder-300x300.png",
      link: "https://example.com/portfolio-v2",
      keywords: ["nextjs", "tailwind"],
    },
    {
      title: "Pizza Order Dashboard",
      description: "Dashboard for managing online pizza orders.",
      image: "/images/placeholder-300x300.png",
      link: "https://example.com/pizza-dashboard",
      keywords: ["react", "dashboard"],
    },
  ];

  return Response.json({ projects });
}
import { notFound } from "next/navigation";
import { PROJECTS_DATA } from "@/lib/productsData";
import ProjectDetailView from "@/components/sections/ProjectDetailView";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return Object.keys(PROJECTS_DATA).map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const project = PROJECTS_DATA[id];
  if (!project) return { title: "Project Not Found | First Logic Meta Lab" };

  return {
    title: `${project.name} Case Study | First Logic Meta Lab`,
    description: project.headline
  };
}

export default async function DedicatedProjectPage({ params }: Props) {
  const { id } = await params;
  const project = PROJECTS_DATA[id];

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <ProjectDetailView project={project} />
    </main>
  );
}

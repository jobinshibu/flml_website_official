import { PROJECTS_DATA } from "@/lib/productsData";
import ProjectDetailView from "@/components/sections/ProjectDetailView";

export const metadata = {
  title: "Qaro Automotive Platform Case Study | First Logic Meta Lab",
  description: "UAE automotive garage booking & emergency roadside assistance platform engineered by First Logic Meta Lab."
};

export default function QaroDedicatedPage() {
  const project = PROJECTS_DATA["qaro"];

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <ProjectDetailView project={project} />
    </main>
  );
}

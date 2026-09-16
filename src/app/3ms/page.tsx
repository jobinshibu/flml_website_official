import { PROJECTS_DATA } from "@/lib/productsData";
import ProjectDetailView from "@/components/sections/ProjectDetailView";

export const metadata = {
  title: "3MS Analytics & QARO AI Case Study | First Logic Meta Lab",
  description: "Predictive vector neural decision platform engineered by First Logic Meta Lab."
};

export default function ThreeMSDedicatedPage() {
  const project = PROJECTS_DATA["3ms"];

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <ProjectDetailView project={project} />
    </main>
  );
}

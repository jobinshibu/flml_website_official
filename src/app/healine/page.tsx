import { PROJECTS_DATA } from "@/lib/productsData";
import ProjectDetailView from "@/components/sections/ProjectDetailView";

export const metadata = {
  title: "My Healine Case Study | First Logic Meta Lab",
  description: "Comprehensive UAE healthcare super-app and B2B employee wellness platform engineered by First Logic Meta Lab."
};

export default function HealineDedicatedPage() {
  const project = PROJECTS_DATA["healine"];

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <ProjectDetailView project={project} />
    </main>
  );
}

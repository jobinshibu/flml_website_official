import { PROJECTS_DATA } from "@/lib/productsData";
import ProjectDetailView from "@/components/sections/ProjectDetailView";

export const metadata = {
  title: "American Board Case Study | First Logic Meta Lab",
  description: "Robotic process automation and educational accreditation platform integrating legacy databases."
};

export default function AmericanBoardPage() {
  const project = PROJECTS_DATA["american-board"];

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <ProjectDetailView project={project} />
    </main>
  );
}


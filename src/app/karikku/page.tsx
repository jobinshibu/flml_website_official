import { PROJECTS_DATA } from "@/lib/productsData";
import ProjectDetailView from "@/components/sections/ProjectDetailView";

export const metadata = {
  title: "Karikku E-Commerce Case Study | First Logic Meta Lab",
  description: "D2C FMCG e-commerce platform for organic coconut water and virgin coconut oil."
};

export default function KarikkuDedicatedPage() {
  const project = PROJECTS_DATA["karikku"];

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <ProjectDetailView project={project} />
    </main>
  );
}

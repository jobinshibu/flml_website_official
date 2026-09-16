import { PROJECTS_DATA } from "@/lib/productsData";
import ProjectDetailView from "@/components/sections/ProjectDetailView";

export const metadata = {
  title: "Thara Cart E-Commerce Case Study | First Logic Meta Lab",
  description: "Multi-vendor B2B and B2C e-commerce platform engineered by First Logic Meta Lab."
};

export default function TharaCartDedicatedPage() {
  const project = PROJECTS_DATA["thara-cart"];

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <ProjectDetailView project={project} />
    </main>
  );
}

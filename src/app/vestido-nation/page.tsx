import ProjectDetailView from "@/components/sections/ProjectDetailView";
import { PROJECTS_DATA } from "@/lib/productsData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vestido Nation | D2C Fashion & Apparel E-Commerce Store | FLML",
  description:
    "Vestido Nation Boutique Dress & Fashion E-Commerce Platform built with React, Node.js, and Firebase by First Logic Meta Lab.",
};

export default function VestidoNationPage() {
  const project = PROJECTS_DATA["vestido-nation"];
  return <ProjectDetailView project={project} />;
}

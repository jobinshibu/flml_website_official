import ProjectDetailView from "@/components/sections/ProjectDetailView";
import { PROJECTS_DATA } from "@/lib/productsData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flexifold Interior Design Platform | Studio Workflow & ERP | FLML",
  description:
    "Flexifold Interior Design Project Management & Studio Workflow SaaS Platform. Built with React, Node.js, and Flutter by First Logic Meta Lab.",
};

export default function FlexifoldPage() {
  const project = PROJECTS_DATA["flexifold"];
  return <ProjectDetailView project={project} />;
}

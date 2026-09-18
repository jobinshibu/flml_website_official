import ProjectDetailView from "@/components/sections/ProjectDetailView";
import { PROJECTS_DATA } from "@/lib/productsData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schosys | Enterprise School Management ERP & EdTech Platform | FLML",
  description:
    "Schosys Enterprise School Management System for students, teachers, and parents. Features attendance tracking, mark gradebooks, fee collection, and parent communication built with Flutter and Firebase by First Logic Meta Lab.",
};

export default function SchosysPage() {
  const project = PROJECTS_DATA["schosys"];
  return <ProjectDetailView project={project} />;
}

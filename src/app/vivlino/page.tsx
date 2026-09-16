import ProjectDetailView from "@/components/sections/ProjectDetailView";
import { PROJECTS_DATA } from "@/lib/productsData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vivlino Debt & Credit Management | Vivilino IT Solutions WLL | FLML",
  description:
    "Vivlino SaaS Debt Note & Credit Management mobile app for store owners developed for Vivilino IT Solutions WLL. Built with Flutter and Firebase by First Logic Meta Lab.",
};

export default function VivlinoPage() {
  const project = PROJECTS_DATA["vivlino"];
  return <ProjectDetailView project={project} />;
}

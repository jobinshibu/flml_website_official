import ProjectDetailView from "@/components/sections/ProjectDetailView";
import { PROJECTS_DATA } from "@/lib/productsData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kootukari | Regional Audio Social Calling Platform | FLML",
  description:
    "Kootukari Regional Voice Social Application built with Flutter, WebRTC, and Firebase by First Logic Meta Lab.",
};

export default function KootukariPage() {
  const project = PROJECTS_DATA["kootukari"];
  return <ProjectDetailView project={project} />;
}

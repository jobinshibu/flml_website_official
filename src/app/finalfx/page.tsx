import ProjectDetailView from "@/components/sections/ProjectDetailView";
import { PROJECTS_DATA } from "@/lib/productsData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FinalFX | Multi-Restaurant POS & KOT SaaS Platform | FLML",
  description:
    "FinalFX Multi-Tenant Restaurant Point of Sale (POS) and Kitchen Order Token (KOT) Management Platform built with Flutter, React, Node.js, and Firebase by First Logic Meta Lab.",
};

export default function FinalFXPage() {
  const project = PROJECTS_DATA["finalfx"];
  return <ProjectDetailView project={project} />;
}

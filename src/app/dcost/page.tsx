import ProjectDetailView from "@/components/sections/ProjectDetailView";
import { PROJECTS_DATA } from "@/lib/productsData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DCost Merchant Directory & Discount Platform | Local Deals | FLML",
  description:
    "Complete DCost Local Business Directory, Tourist Spot Discovery, and QR Discount Rewards Platform built with Flutter and Firebase by First Logic Meta Lab.",
};

export default function DCostPage() {
  const project = PROJECTS_DATA["dcost"];
  return <ProjectDetailView project={project} />;
}

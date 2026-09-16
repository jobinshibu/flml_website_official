import ProjectDetailView from "@/components/sections/ProjectDetailView";
import { PROJECTS_DATA } from "@/lib/productsData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyVaahan Garage System | Garage ERP & Vehicle Marketplace | FLML",
  description:
    "Complete MyVaahan Automotive Platform built with Flutter and Firebase. Features Garage ERP, Online Service Reservations, Auto Parts Marketplace, and Used Vehicle Trading by First Logic Meta Lab.",
};

export default function MyVaahanPage() {
  const project = PROJECTS_DATA["myvaahan"];
  return <ProjectDetailView project={project} />;
}

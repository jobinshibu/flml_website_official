import ProjectDetailView from "@/components/sections/ProjectDetailView";
import { PROJECTS_DATA } from "@/lib/productsData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foodzer Delivery System | On-Demand Food Delivery Ecosystem | FLML",
  description:
    "Complete Foodzer Food Delivery Platform built with Flutter and Firebase. Features Customer Ordering App, Restaurant Kitchen Portal, Driver Dispatch App, real-time GPS tracking, and Super Admin Management Console by First Logic Meta Lab.",
};

export default function FoodzerPage() {
  const project = PROJECTS_DATA["foodzer"];
  return <ProjectDetailView project={project} />;
}

import ProjectDetailView from "@/components/sections/ProjectDetailView";
import { PROJECTS_DATA } from "@/lib/productsData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cabco Taxi Booking Platform | Ride-Hailing Ecosystem | FLML",
  description:
    "Complete Cabco On-Demand Taxi Booking Platform built with Flutter and Firebase. Features Rider Booking App, Driver Dispatch App, real-time GPS tracking, and Fleet Management Admin Portal by First Logic Meta Lab.",
};

export default function CabcoPage() {
  const project = PROJECTS_DATA["cabco"];
  return <ProjectDetailView project={project} />;
}

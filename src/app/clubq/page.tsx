import ProjectDetailView from "@/components/sections/ProjectDetailView";
import { PROJECTS_DATA } from "@/lib/productsData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ClubQ Restaurant POS & KOT System | Hospitality Platform | FLML",
  description:
    "Complete ClubQ Restaurant POS, KOT Dispatch, Table Reservation, and Marketing Automation Platform built with Flutter and Firebase by First Logic Meta Lab.",
};

export default function ClubQPage() {
  const project = PROJECTS_DATA["clubq"];
  return <ProjectDetailView project={project} />;
}

import ProjectDetailView from "@/components/sections/ProjectDetailView";
import { PROJECTS_DATA } from "@/lib/productsData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live to Smile | Healthcare & Dental Care Patient Platform | FLML",
  description:
    "Live to Smile Dental Consultation and Patient Care Ecosystem built with Flutter and Firebase by First Logic Meta Lab.",
};

export default function LiveToSmilePage() {
  const project = PROJECTS_DATA["live-to-smile"];
  return <ProjectDetailView project={project} />;
}

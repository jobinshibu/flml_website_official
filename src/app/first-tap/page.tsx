import ProjectDetailView from "@/components/sections/ProjectDetailView";
import { PROJECTS_DATA } from "@/lib/productsData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "First Tap | NFC Smart Business Card & Dynamic QR Code Platform | FLML",
  description:
    "First Tap NFC Business Card Writer, Dynamic QR Code Generator, and Lead Capture Platform built with Flutter, React, and Firebase by First Logic Meta Lab.",
};

export default function FirstTapPage() {
  const project = PROJECTS_DATA["first-tap"];
  return <ProjectDetailView project={project} />;
}

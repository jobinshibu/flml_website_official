import ProjectDetailView from "@/components/sections/ProjectDetailView";
import { PROJECTS_DATA } from "@/lib/productsData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Relax Call | Real-Time Voice Calling & Audio Matchmaking | FLML",
  description:
    "Relax Call Voice Calling Platform built with Flutter, WebRTC, and Firebase by First Logic Meta Lab. Features mood-based matchmaking, real-time voice calls, and privacy moderation controls.",
};

export default function RelaxCallPage() {
  const project = PROJECTS_DATA["relax-call"];
  return <ProjectDetailView project={project} />;
}

import ProjectDetailView from "@/components/sections/ProjectDetailView";
import { PROJECTS_DATA } from "@/lib/productsData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cool Talk | Real-Time Voice Calling & Matchmaking Platform | FLML",
  description:
    "Cool Talk Voice Calling App built with Flutter, WebRTC, and Firebase by First Logic Meta Lab. Features real-time audio matchmaking, low-latency calls, and anonymous social interactions.",
};

export default function CoolTalkPage() {
  const project = PROJECTS_DATA["cool-talk"];
  return <ProjectDetailView project={project} />;
}

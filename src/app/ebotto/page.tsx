import ProjectDetailView from "@/components/sections/ProjectDetailView";
import { PROJECTS_DATA } from "@/lib/productsData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ebotto | AI Conversational & Chatbot Automation Platform | FLML",
  description:
    "Ebotto Enterprise AI Chatbot and Omnichannel Business Messaging SaaS Platform built with React, Node.js, and Firebase by First Logic Meta Lab.",
};

export default function EbottoPage() {
  const project = PROJECTS_DATA["ebotto"];
  return <ProjectDetailView project={project} />;
}

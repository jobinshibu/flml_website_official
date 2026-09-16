import ProjectDetailView from "@/components/sections/ProjectDetailView";
import { PROJECTS_DATA } from "@/lib/productsData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edhwi Pure Coconut Platform | D2C E-Commerce | FLML",
  description:
    "Edhwi D2C Pure Coconut Products E-Commerce Platform under Thara Cart Group. Built with React, Node.js, Firebase Real-Time DB, and Razorpay Gateway API by First Logic Meta Lab.",
};

export default function EdhwiPage() {
  const project = PROJECTS_DATA["edhwi"];
  return <ProjectDetailView project={project} />;
}

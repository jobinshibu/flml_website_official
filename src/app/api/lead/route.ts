import { NextRequest, NextResponse } from "next/server";
import { saveLeadToFirestore } from "@/lib/firebase";

export async function POST(req: NextRequest) {
  try {
    const { name, contact, projectBrief } = await req.json();

    if (!name || !contact) {
      return NextResponse.json(
        { error: "Name and contact info are required." },
        { status: 400 }
      );
    }

    const result = await saveLeadToFirestore({
      name,
      contact,
      projectBrief: projectBrief || "General project inquiry",
      source: "FLML AI Solution Consultant Widget",
    });

    return NextResponse.json({
      success: true,
      message: "Lead recorded successfully. Our team will contact you shortly.",
      mode: result.mode,
    });
  } catch (error) {
    console.error("Error saving lead in API:", error);
    return NextResponse.json(
      { error: "Failed to record lead." },
      { status: 500 }
    );
  }
}

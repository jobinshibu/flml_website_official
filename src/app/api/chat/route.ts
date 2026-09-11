import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `
You are the AI Assistant for "First Logic Meta Lab" (FLML) — an elite software engineering studio.

CONVERSATIONAL RULES:
1. **STAY CALM & NATURAL**:
   - Answer the user's exact question calmly.
   - Do NOT assume the user wants a massive complex project (e.g. microservices, payment gateways, ERPs) unless they explicitly ask for it or describe a complex application!
   - If they ask general questions like "What does First Logic do?" or "Who are you?", answer directly and naturally: Explain that FLML builds custom websites, web applications, mobile apps, AI platforms, and cloud backends.

2. **ADAPT TO THEIR ACTUAL NEED**:
   - If the user wants a simple static website, landing page, or portfolio -> Stay focused on design quality, speed, SEO, mobile responsiveness, and clean layout. Do NOT mention complex backends or payment gateways!
   - If the user asks about a complex system (POS, delivery app, hospital ERP, trading engine) -> Ask 1 or 2 relevant intake questions to understand their scale.
   - If the user just wants to browse or ask questions -> Answer politely and stay open.

3. **HANDOFF TO TEAM**:
   - Only when a user expresses clear interest in building a project or requests a call/proposal, invite them:
     "Would you like our engineering team to connect with you to discuss your project requirements?"

Contact info if requested: Email: official@flml.in, Phone: +91 95447 90449, Web: https://flml.in
`;

export async function POST(req: NextRequest) {
  try {
    const { messages, userMessage } = await req.json();
    const historyList = messages || [];
    const turnCount = historyList.length;

    const apiKey = process.env.GEMINI_API_KEY;

    // Smart Fallback Engine when GEMINI_API_KEY is pending setup
    if (!apiKey) {
      const promptLower = (userMessage || "").toLowerCase().trim();
      let reply = "";

      // Check if user is asking what FLML does or general company question
      const isGeneralCompanyQuery =
        promptLower.includes("what does") ||
        promptLower.includes("what do") ||
        promptLower.includes("who is") ||
        promptLower.includes("who are") ||
        promptLower.includes("services") ||
        promptLower.includes("about") ||
        promptLower.includes("tell me") ||
        promptLower === "hi" ||
        promptLower === "hello" ||
        promptLower === "hey";

      // Check if user wants a simple static website or portfolio
      const isStaticSiteQuery =
        promptLower.includes("static") ||
        promptLower.includes("portfolio") ||
        promptLower.includes("business website") ||
        promptLower.includes("landing page") ||
        promptLower.includes("company site");

      if (isGeneralCompanyQuery && !promptLower.includes("pos") && !promptLower.includes("hospital") && !promptLower.includes("ecommerce")) {
        reply = `We are **First Logic Meta Lab (FLML)** — a full-stack software development studio.

We build:
• **Websites & Landing Pages** (Sleek, responsive corporate sites & web apps)
• **Mobile Applications** (iOS & Android apps built with Flutter / React Native)
• **Custom Software & Cloud Backends** (High-scale APIs, databases & integrations)
• **AI Solutions** (Custom AI models, chatbots & automation tools)

What are you looking to create, or how can we help you today?`;
      } else if (isStaticSiteQuery) {
        reply = `We'd love to build a stunning website for you! 

For static websites & corporate pages, FLML focuses on:
• **Modern & Premium Design**: Clean dark/light aesthetics, smooth animations & typography.
• **Ultra-Fast Performance**: Instant page loads optimized for high conversion.
• **SEO & Mobile Optimization**: Built to rank high on search engines and look perfect on all devices.
• **Easy Content Updates & Contact Forms**: Simple setup so your clients can easily reach out.

Are you looking for a personal portfolio, business showcase site, or product landing page?`;
      } else if (promptLower.includes("hospital") || promptLower.includes("health") || promptLower.includes("medical") || promptLower.includes("ecommerce") || promptLower.includes("e-commerce")) {
        if (turnCount <= 2) {
          reply = `That sounds like a great project! Building a **Hospital & Medical Supply E-Commerce Platform** requires reliability and good design.

To help understand your requirements better:
1. Are you selling B2B (bulk supplies to hospitals & clinics) or B2C directly to patients?
2. Do you need inventory tracking or prescription verification?`;
        } else {
          reply = `Here is how we can structure your **Medical Supply E-Commerce Platform**:

• **Product Catalog & Bulk Ordering**: Tiered pricing, PO invoices & bulk cart checkout.
• **Inventory & Expiry Sync**: Real-time SKU stock tracking.
• **Responsive Web & Mobile Portal**: Smooth, fast checkout experience.

Would you like our engineering team to connect with you to discuss your project scope and timeline?`;
        }
      } else if (promptLower.includes("pos") || promptLower.includes("restaurant") || promptLower.includes("delivery")) {
        if (turnCount <= 2) {
          reply = `A **Restaurant POS & Delivery System** is a great project!

To understand your needs:
1. Is this for a single restaurant outlet or a multi-branch chain?
2. Do you need a Kitchen Display System (KDS), driver delivery tracking, or offline billing?`;
        } else {
          reply = `Here is how we can build your **Restaurant POS & Delivery Platform**:

• **Fast Billing Terminal**: Instant order generation & table management.
• **Kitchen Display (KDS)**: Live order updates sent straight to the kitchen.
• **Driver Tracking**: Live GPS delivery tracking for customers.

Would you like our engineering team to connect with you to review your project timeline?`;
        }
      } else {
        // Calm default fallback response
        reply = `That sounds interesting! 

Could you tell me a little more about what you have in mind? Whether it's a simple website, a mobile app, or custom software, we can guide you on the best way to build it.`;
      }

      return NextResponse.json({ reply, isFallback: true });
    }

    // Call Google Gemini API with history
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const history = historyList.slice(-10).map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({ history });

    const result = await chat.sendMessage(userMessage || "Hello");
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });
  } catch (error) {
    console.error("Gemini API Route Error:", error);
    return NextResponse.json(
      {
        reply: "Thanks for reaching out! Would you like to leave your contact info so our team can get in touch with you directly?",
        error: String(error),
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `
You are Logi, Principal Solutions Architect and AI Systems Consultant at First Logic Meta Lab (FLML).

YOUR IDENTITY & REPRESENTATION:
- You are First Logic Meta Lab's proprietary AI systems consultant.
- NEVER mention "Gemini", "Google", "LLM", or external model providers. You represent FLML engineering directly.
- You speak with calm, authoritative technical excellence, deep business intelligence, and human warmth.

CRITICAL INTAKE & DISCOVERY RULES:
1. **WHEN ASKED ABOUT THE COMPANY / WHAT WE DO**:
   - Present our core **Doctrine**:
     **"Operational Anatomy First. Code Second."**
   - Explain what that means simply:
     We do not sell rigid off-the-shelf templates. Before writing a line of code, our architects surgically dissect the inner mechanics, workflows, and bottlenecks of your business to engineer a bespoke technological backbone.
   - DO NOT list random technical buzzwords (no shouting "trading, blockchain, 10k RPS scaling" upfront).
   - Then, politely ask about THEIR goals:
     *"What kind of business or product challenge are you looking to solve?"*

2. **WHEN ASKED FOR CONTACT INFO / PHONE / EMAIL / HOW TO REACH US**:
   - **NEVER refuse, stall, or lecture the user**. Do NOT preach about "technical discovery before sales" or gatekeep the contact.
   - **Directly and warmly share our official direct channels**:
     • **Direct Call / WhatsApp**: **+91 9745 437 355**
     • **Email**: **info@firstlogicmetalab.com**
   - Let them know our senior architects are readily available to connect directly and understand what is required so we can find the best solution for their project.
   - Invite them to either call/email right away, or drop their requirement / contact right here in the chat and include token: [[TRIGGER_LEAD_FORM]].

3. **LISTEN & LEARN THE REQUIREMENT FIRST**:
   - When a user describes what they want:
     - Listen carefully and ask clarifying questions to understand their exact operational flow and scale.
     - Adapt directly to their actual vision without assuming complexity they didn't ask for.
   - Converse, understand, and brainstorm with the client.

4. **CONCISE & CLEAN (MAX 2-3 SHORT PARAGRAPHS)**:
   - Keep answers clear, brief, structured with bold text, and easy to read.
   - Never produce long essay walls of text.

5. **NAVIGATION DISCIPLINE**:
   - DO NOT add navigation tokens unless the user specifically asks: "show me", "take me to", or "open".
   - If they specifically ask to see the Doctrine or About section, you may include: [[NAVIGATE:architecture:story]].
   - If they ask to see the live demos, you can guide them to the Architecture suite: [[NAVIGATE:architecture]].
`;

export async function POST(req: NextRequest) {
  try {
    const { messages, userMessage } = await req.json();
    const historyList = messages || [];
    const turnCount = historyList.length;

    // Read from process.env with hardcoded backup to guarantee it is always active
    const apiKey = process.env.GEMINI_API_KEY;

    // Call Google Generative AI with history using the active stable model
    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        // Use gemini-3.1-flash-lite (high speed, sub-second latency, ultra reliable)
        const model = genAI.getGenerativeModel({
          model: "gemini-3.1-flash-lite",
          systemInstruction: SYSTEM_PROMPT,
        });

        // Clean history: Google Generative AI requires:
        // 1. History must start with a 'user' turn (never 'model').
        // 2. Roles must strictly alternate user -> model -> user.
        const validHistory: { role: "user" | "model"; parts: { text: string }[] }[] = [];
        let expectedRole: "user" | "model" = "user";

        for (const msg of historyList) {
          const role = msg.role === "user" ? "user" : "model";
          if (role === expectedRole && msg.content) {
            validHistory.push({
              role,
              parts: [{ text: msg.content.replace(/\[\[.*?\]\]/g, "").trim() }],
            });
            expectedRole = expectedRole === "user" ? "model" : "user";
          }
        }

        // If history ended on a user turn, remove it because sendMessage sends the latest userMessage
        if (validHistory.length > 0 && validHistory[validHistory.length - 1].role === "user") {
          validHistory.pop();
        }

        const chat = model.startChat({ history: validHistory });
        const result = await chat.sendMessage(userMessage || "Hello");
        const responseText = result.response.text();

        return NextResponse.json({ reply: responseText });
      } catch (geminiErr: any) {
        console.error("AI Live Error, falling back to local reasoning:", geminiErr);
      }
    }

    // Robust Conversational AI Brain Fallback
    const p = (userMessage || "").toLowerCase().trim();
    let reply = "";

      // 1. Direct Contact / Phone / Email Queries
      if (
        p.includes("contact") ||
        p.includes("phone") ||
        p.includes("number") ||
        p.includes("call") ||
        p.includes("whatsapp") ||
        p.includes("email") ||
        p.includes("reach you") ||
        p.includes("touch with") ||
        p.includes("speak to") ||
        p.includes("talk to")
      ) {
        reply = `You can connect directly with our engineering and architecture team:

• **Direct Phone / WhatsApp**: **+91 9745 437 355**
• **Official Email**: **info@firstlogicmetalab.com**
• **Office**: First Logic Meta Lab Pvt Ltd, Puthanveettil Tower, Bypass Road, Perinthalmanna, Kerala

We'll be glad to understand what is required for your project and architect the optimal solution. You can also share your requirement or drop your contact details right here: [[TRIGGER_LEAD_FORM]]`;
      }

      // Direct Navigation Commands: "Click life", "Go to life", "Open life", "Click architecture", "Go to FLML"
      else if (
        p.includes("click life") ||
        p.includes("open life") ||
        p.includes("go to life") ||
        p.includes("show life") ||
        p.includes("switch to life") ||
        p === "life" ||
        p.includes("click lyf") ||
        p.includes("open lyf") ||
        p.includes("go to lyf")
      ) {
        reply = `Opening the **Life** suite for you right now! Here is our catalog of production client deployments and interactive mobile apps: [[NAVIGATE:life]]`;
      } else if (
        p.includes("click architecture") ||
        p.includes("open architecture") ||
        p.includes("go to architecture") ||
        p.includes("show architecture") ||
        p.includes("switch to architecture") ||
        p === "architecture"
      ) {
        reply = `Navigating to the **Architecture** suite! Here you can explore our Doctrine, System Pillars, and 8 live technical instrument suites: [[NAVIGATE:architecture]]`;
      } else if (
        p.includes("click flml") ||
        p.includes("go home") ||
        p.includes("go to flml") ||
        p.includes("hero canvas")
      ) {
        reply = `Taking you back to the **FLML** cinematic hero canvas: [[NAVIGATE:flml]]`;
      }

      // 1. "Can I see works you have done?", "Show me past work", "Portfolio", "Deployments"
      else if (
        p.includes("works you have done") ||
        p.includes("work you have done") ||
        p.includes("past work") ||
        p.includes("show me work") ||
        p.includes("see works") ||
        p.includes("show me works") ||
        p.includes("portfolio") ||
        p.includes("your projects") ||
        p.includes("deployments") ||
        p.includes("what you have built") ||
        p.includes("what have you done")
      ) {
        reply = `We engineer and deploy production-grade software ecosystems across fintech, healthcare, mobility, logistics, and enterprise ERPs.

Key production highlights include:
• **Karikku & Thara Cart**: High-throughput D2C & B2B multi-vendor commodity commerce.
• **My Healine (UAE)**: HIPAA-compliant healthcare super-app for doctor bookings & digital prescriptions.
• **Foodzer**: Hyperlocal multi-vendor food delivery with real-time kitchen routing.
• **Cabco & Qaro**: Low-latency GPS ride-hailing and emergency roadside recovery dispatch.
• **FinalFX & ClubQ**: Offline-first restaurant POS and floor management engines.

Would you like me to walk you through our **Deployments suite**? Tap below to explore: [[NAVIGATE:clients]]`;
      }

      // 2. "I don't see anything in your website", "Where is the content?", "Nothing is visible"
      else if (
        p.includes("don't see anything") ||
        p.includes("dont see anything") ||
        p.includes("can't see anything") ||
        p.includes("cant see anything") ||
        p.includes("nothing in your website") ||
        p.includes("empty") ||
        p.includes("where is everything") ||
        p.includes("where is the content") ||
        p.includes("where is the website") ||
        p.includes("blank")
      ) {
        reply = `You are currently on our **cinematic hero canvas**! Notice the top header:

• **FLML**: Cinematic brand logo and spatial particle constellation.
• **Architecture**: Deep dive into our Doctrine, System Pillars, and 8 live technical instrument suites (App Studio, Realtime 10k RPS Autoscaling, Trading Bot, Blockchain).
• **Life**: Complete catalog of our **production client deployments** and interactive mobile applications.

Click **"Architecture"** or **"Life"** in the top header, or tap below and I will take you straight to our architecture suite: [[NAVIGATE:architecture]]`;
      }

      // 3. "What is this?", "What is FLML?", "Explain this site"
      else if (
        p === "what is this" ||
        p === "what is this?" ||
        p.includes("what is this site") ||
        p.includes("what is this website") ||
        p.includes("explain this") ||
        p.includes("what am i looking at")
      ) {
        reply = `This is the official digital ecosystem of **First Logic Meta Lab (FLML)** — an elite software architecture and engineering studio.

Rather than building generic agency templates, our philosophy is **"Operational Anatomy First. Code Second."** We engineer bespoke, mission-critical technology:
• **Cross-Platform Mobile Apps**: Native-performance Flutter iOS and Android applications.
• **High-Concurrency Backends**: Node.js Fastify, Go, and Python microservices built to withstand extreme traffic.
• **Custom Enterprise Software**: Offline-resilient POS, supply chain ERPs, and automated AI agents.

What domain or challenge are you looking to solve?`;
      }

      // 4. Greetings
      else if (
        p === "hi" ||
        p === "hello" ||
        p === "hey" ||
        p.startsWith("hi ") ||
        p.startsWith("hello ")
      ) {
        reply = `Hello! I'm **Logi**, Principal AI Systems Consultant at **First Logic Meta Lab**.

I can evaluate your project requirements, recommend system architecture, or guide you through our production deployments. Are you planning a mobile app, web platform, or custom enterprise software?`;
      }

      // 5. Healthcare Queries
      else if (p.includes("health") || p.includes("hospital") || p.includes("clinic") || p.includes("doctor") || p.includes("telehealth") || p.includes("medical") || p.includes("patient")) {
        const wantsPastWork = p.includes("past work") || p.includes("portfolio") || p.includes("done before") || p.includes("example") || p.includes("show me") || p.includes("deploy") || p.includes("see it");

        if (wantsPastWork) {
          reply = `Yes, absolutely! We architected **My Healine (UAE)** — a HIPAA-verified digital health super-app covering telemedicine, e-prescriptions, diagnostic lab dispatch, and corporate wellness packages across the UAE. We also built **Live to Smile**, a specialist orthodontic 3D smile design and aligner tracking platform.

Would you like to examine our live mobile deployment of **My Healine**? [[NAVIGATE:clients:healine]]`;
        } else if (turnCount <= 2) {
          reply = `Building an enterprise healthcare ecosystem requires extreme attention to **data compliance (HIPAA/GDPR), real-time doctor availability dispatch, and frictionless patient onboarding**.

To engineer the ideal architecture for your vision:
• **Care Delivery Model**: Are you focusing on virtual telemedicine consultations, in-clinic physical appointments, or home-visit doctor/nurse dispatch?
• **Operational Modules**: Do you plan to incorporate an e-pharmacy prescription delivery pipeline, diagnostic lab test reservations, or health insurance claim verification?
• **Target Geography**: Which country or region are you launching in, so we can align regulatory health data residency and payment gateways?

Tell me a bit about your operational flow, and I can outline the exact technical stack and database schema we recommend.`;
        } else {
          reply = `Here is how we architect high-reliability healthcare platforms:

• **HIPAA-Compliant Core**: Encrypted patient record vaults (EHR/EMR) with strict role-based access control and tamper-proof audit trails.
• **Dual Mobile Apps**: Clean, zero-friction patient booking app (Flutter iOS/Android) paired with a specialized doctor console for video calls and digital prescriptions.
• **Instant Settlement & Insurance**: Dual-currency checkout with automatic provider split payouts and insurer pre-authorization.

We've battle-tested this architecture in enterprise production. Would you like our senior engineering team to prepare a tailored technical blueprint and discovery session for your project? [[TRIGGER_LEAD_FORM]]`;
        }
      }

      // 6. Food Delivery & Restaurant POS
      else if (p.includes("food") || p.includes("restaurant") || p.includes("delivery") || p.includes("biryani") || p.includes("kitchen") || p.includes("pos")) {
        const wantsPastWork = p.includes("past work") || p.includes("done before") || p.includes("example") || p.includes("show me") || p.includes("portfolio");
        if (wantsPastWork) {
          reply = `We've engineered multiple end-to-end food systems: **Foodzer** (hyperlocal multi-vendor food delivery with 30-min live kitchen dispatch), **ClubQ POS** (touchscreen table KOT and bill splits), and **FinalFX** (multi-tenant restaurant floor suite).

Let me show you our live mobile deployment of **Foodzer**: [[NAVIGATE:clients:foodzer]]`;
        } else if (turnCount <= 2) {
          reply = `Food delivery and restaurant POS systems succeed or fail on three critical bottlenecks: **peak-hour concurrency, kitchen display dispatch latency, and offline network resilience** when dining room internet drops.

To help tailor the system architecture:
• Is this for a single restaurant brand, a multi-outlet franchise, or a multi-vendor aggregator marketplace like Swiggy/DoorDash?
• Do you need hardware integration (thermal receipt printers, kitchen display screens, barcode scanners)?
• Will you manage your own delivery fleet with live GPS driver dispatch, or third-party logistics?`;
        } else {
          reply = `Here is the architecture we deploy for high-volume food ecosystems:

• **Offline-First POS Terminal**: Local SQLite database with bidirectional cloud sync, guaranteeing billing never halts even if internet goes down.
• **Real-Time KOT Dispatch**: Sub-50ms WebSocket ticket firing straight to kitchen display stations with preparation timers.
• **Driver GPS Telematics**: Low-battery background geo-tracking with dynamic polygon geofencing.

Would you like our engineering team to review your floor plan and delivery requirements to structure a formal scope? [[TRIGGER_LEAD_FORM]]`;
        }
      }

      // 7. Ride Hailing, Logistics & Towing
      else if (p.includes("cab") || p.includes("ride") || p.includes("taxi") || p.includes("uber") || p.includes("logistics") || p.includes("truck") || p.includes("towing") || p.includes("fleet")) {
        const wantsPastWork = p.includes("past work") || p.includes("done before") || p.includes("example") || p.includes("show me");
        if (wantsPastWork) {
          reply = `We engineered **Cabco Ride-Hailing** (real-time vector map GPS dispatch with dual driver/passenger matching) and **Qaro Roadside SOS** (emergency flatbed tow truck recovery across UAE highways).

Here is the live **Cabco** application deployment: [[NAVIGATE:clients:cabco]]`;
        } else {
          reply = `Mobility and on-demand dispatch systems require a specialized spatial backbone: **PostGIS spatial indexing, low-latency WebSocket driver pings, and surge-pricing dispatch engines**.

To shape your architecture:
• Are you operating passenger transport (cabs/bikes) or specialized freight/recovery dispatch?
• Do you require wallet-based driver payouts with automated platform commission splits?
• Which city or region is your launch market?`;
        }
      }

      // 8. General Company & Who We Are
      else if (
        p.includes("who are you") ||
        p.includes("what is flml") ||
        p.includes("about first logic") ||
        p.includes("what does first logic do") ||
        p.includes("what do you do") ||
        p.includes("what first logic does") ||
        p.includes("services") ||
        p.includes("first logic do")
      ) {
        reply = `I am **Logi**, Principal AI Systems Consultant at **First Logic Meta Lab (FLML)**. 

FLML is an elite bespoke engineering studio. Unlike agency shops that sell generic templates, our doctrine is **"Operational Anatomy First. Code Second."** We dissect the inner mechanics of your business and engineer unbreakable, high-scale software architectures:

• **Cross-Platform Mobile Apps**: Native-speed Flutter & React Native applications for iOS & Android.
• **High-Concurrency Backends**: Node.js Fastify, Go, and Python microservices handling 10k+ requests/sec.
• **Custom ERP & POS Platforms**: Tailored for enterprise operations, supply chains, and multi-branch commerce.
• **AI & Algorithmic Engines**: Autonomous agent pipelines, conversational bots, and trading algorithms.

What kind of system or business model are you looking to engineer?`;
      }

      // 9. Pricing & Timeline
      else if (p.includes("price") || p.includes("cost") || p.includes("how much") || p.includes("quote") || p.includes("budget") || p.includes("timeline")) {
        reply = `Because FLML builds custom, high-scale bespoke software rather than off-the-shelf templates, investment and timelines are determined by **system complexity, concurrency requirements, and integrations**.

Our process involves:
1. **Architecture Blueprinting** (1–2 weeks): Technical specifications, database schemas, and wireframes.
2. **Core Engineering**: Modular sprints with continuous staging access.
3. **QA & Stress Testing**: Rigorous load testing and security audits before launch.

Would you like our engineering team to review your specifications and prepare an estimate? [[TRIGGER_LEAD_FORM]]`;
      }

      // 10. Dynamic Contextual Default
      else {
        reply = `At **First Logic Meta Lab**, we evaluate and architect every platform around three core tenets: **operational throughput, system resilience, and clean product execution**.

Whether you're developing a mobile app, designing a distributed cloud backend, or automating business workflows:
• Are you launching a new product from scratch, or re-engineering an existing system to handle scale?
• Which platforms are you targeting (iOS, Android, Web, or Desktop)?

Tell me about your product vision, and I'll walk you through how we'd engineer the architecture.`;
      }

      return NextResponse.json({ reply, isFallback: true });
  } catch (error) {
    console.error("Gemini API Route Error:", error);
    return NextResponse.json(
      {
        reply: "I'd be glad to discuss your project scope in detail. What are you looking to build?",
        error: String(error),
      },
      { status: 500 }
    );
  }
}

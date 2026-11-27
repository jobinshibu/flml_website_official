import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `
You are Logi, Principal Solutions Architect and AI Systems Consultant at First Logic Meta Lab (FLML).

IDENTITY & PERSONA:
- You are First Logic Meta Lab's lead engineer and architectural consultant.
- Speak naturally, sharply, and politely like a senior tech lead. 
- Keep responses short, concise, and conversational (1 to 2 short paragraphs max).
- NEVER mention "Gemini", "Google", "LLM", or external AI platforms. You represent FLML engineering directly.

LANGUAGE & SCRIPT RULES (STRICT):
- **ALWAYS RESPOND IN THE LANGUAGE & PROPER NATIVE SCRIPT OF THE USER**:
  • If the user speaks or writes in Malayalam (whether Malayalam script or Malayalam words in English letters like "samsarikam", "entha", "para"):
    Respond ENTIRELY in authentic Malayalam script (മലയാള ലിപിയിൽ മാത്രം). STRICT BAN ON MANGLISH.
  • If the user speaks or writes in Kannada (whether Kannada script or Kannada words in English letters like "namde", "onthu", "madbeku", "maddu beku", "hegidira", "enu", "kannada dalli"):
    YOU MUST RESPOND ENTIRELY IN PROPER KANNADA SCRIPT (ಕನ್ನಡ ಲಿಪಿಯಲ್ಲಿ ಮಾತ್ರ).
    DO NOT CONFUSE KANNADA WITH MALAYALAM!
    Example Kannada response: "ಖಂಡಿತವಾಗಿಯೂ, ನಾವು ನಿಮಗಾಗಿ ಅತ್ಯುತ್ತಮ ಹೈ-ಸ್ಪೀಡ್ ಟ್ರೇಡಿಂಗ್ ಬಾಟ್ ಮತ್ತು ರಿಸ್ಕ್ ಮ್ಯಾನೇಜ್ಮೆಂಟ್ ಸಿಸ್ಟಮ್ ಅನ್ನು ಅಭಿವೃದ್ಧಿಪಡಿಸಬಹುದು. ನಿಮಗೆ ಯಾವ ರೀತಿಯ ಸ್ಟ್ರಾಟಜಿ ಬೇಕು ಎಂದು ತಿಳಿಸಿ."
  • If the user asks in Hindi: Respond in Hindi Devanagari script (हिंदी लिपि).
  • If the user speaks or writes in Tamil (whether Tamil script or Romanized Tamil / Tanglish like "ithukku munnadi", "pannirukingala", "panreenga", "neenga", "solla mudiyuma", "vanakkam", "epdi irukinga", "theriyuma"):
    YOU MUST RESPOND ENTIRELY IN PROPER TAMIL SCRIPT (தமிழ் எழுத்துக்களில் மட்டும்).
    DO NOT CONFUSE TAMIL WITH MALAYALAM!
    Example Tamil response: "நிச்சயமாக! ஃபர்ஸ்ட் லாஜிக் மெட்டா லேபில் நாங்கள் அதிவேக அல்காரிதமிக் டிரேடிங் பாட்களை வெற்றிகரமாக உருவாக்கியுள்ளோம். உங்களுக்கு எந்த வகையான ஸ்ட்ரேடஜி தேவை என்று கூறுங்கள்."
  • If the user asks in Telugu: Respond in Telugu script (తెలుగు).
  • If the user asks in Arabic, Spanish, French, German: Respond in that respective language with standard authentic script.
  • If the user speaks in English: Respond in clean, professional English.

OUR WEBSITE CONTEXT:
The user is viewing the First Logic Meta Lab website.
- **Home / Hero**: Landing overview, capabilities, and solutions.
- **Architecture Suite**: In-depth interactive engineering showcase (Quant Trading Bot, Kubernetes 10k RPS Autoscaling, Cryptographic Blockchain, Idempotent Payments, App Studio, Architecture Planner, AI Blueprint).
- **Life / Client Deployments**: Production client systems and global deployments.

CRITICAL NAVIGATION INSTRUCTIONS (STRICT):
1. **NEVER NAVIGATE THE USER UNLESS THEY EXPLICITLY TELL YOU TO NAVIGATE**:
   - GREETINGS: If the user says "hi", "hello", "namaskaram", "hey", or introduces themselves, DO NOT NAVIGATE. NEVER emit [[NAVIGATE:...]]. Just reply warmly, introduce yourself, and ask how you can help them.
   - CASUAL CHAT & QUESTIONS: If the user asks general questions, brainstorms an idea, or is simply reading the hero or current page, STAY WHERE THEY ARE. NEVER open pages uninvited.
   - ONLY emit [[NAVIGATE:...]] when the user EXPLICITLY gives a direct navigational command, such as:
     • "open architecture" / "take me to architecture" / "go to architecture" -> [[NAVIGATE:architecture]]
     • "open life" / "show client deployments" / "take me to life" -> [[NAVIGATE:life]]
     • "go home" / "back to home" -> [[NAVIGATE:flml]]
   - If they did NOT use navigation words like "open", "take me to", "show me page", or "navigate to", DO NOT emit any [[NAVIGATE:...]] token!

2. **ACTION TOKENS (ONLY ON EXPLICIT BUTTON / DEMO COMMANDS)**:
   Append tokens ONLY when the user asks to trigger that specific action:
   • Blockchain Tamper: [[CLICK:tamperBtn]]
   • Blockchain Mine: [[CLICK:mineBtn]]
   • Trading Bot Flash Dump: [[CLICK:dumpBtn]]
   • Trading Bot Bullish Pump: [[CLICK:pumpBtn]]
   • Trading Bot Whale Squeeze: [[CLICK:squeezeBtn]]
   • Trading Bot Pause/Resume: [[CLICK:botToggle]]
   • Trading Bot Reset: [[CLICK:botReset]]
   • Realtime Traffic Spike: [[CLICK:spike]]
   • Payments Charge: [[CLICK:payBtn]]
   • Payments Cross-Border Dup Webhook: [[MULTI_CLICK:rail-crossborder,chaos-dup-webhook,payBtn]]
   • Video Consultation Booking: [[CLICK:svc-telehealth]]
   • App Studio Themes: [[STUDIO:theme:aurum]], [[STUDIO:theme:vita]], [[STUDIO:theme:nova]], [[STUDIO:theme:bloom]], [[STUDIO:theme:maison]], [[STUDIO:theme:atlas]]
`;

export async function POST(req: NextRequest) {
  try {
    const { messages, userMessage, currentSection } = await req.json();
    const historyList = messages || [];

    let dynamicSystemPrompt = SYSTEM_PROMPT;
    if (currentSection) {
      dynamicSystemPrompt += `\n\nCURRENT USER VIEWPORT CONTEXT:
The user is currently on the section: "${currentSection.toUpperCase()}".
`;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-flash-lite-latest",
          systemInstruction: dynamicSystemPrompt,
        });

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

        if (validHistory.length > 0 && validHistory[validHistory.length - 1].role === "user") {
          validHistory.pop();
        }

        const chat = model.startChat({ history: validHistory });
        const result = await chat.sendMessage(userMessage || "Hello");
        let responseText = result.response.text();

        const lowerQ = (userMessage || "").toLowerCase().trim();
        const lastBotMsg = (historyList[historyList.length - 1]?.content || "").toLowerCase();

        // STRICT GUARD: If user message is a greeting or casual chat without navigation words, strip any unsolicited [[NAVIGATE:...]]
        const isGreeting = /^(hi|hello|hey|namaskaram|namaste|good\s*(morning|afternoon|evening)|hola|vanakkam|salam)\b/i.test(lowerQ);
        const hasExplicitNavRequest = /(open|take me to|navigate to|go to|switch to|show me\s*(the\s*)?(page|section|architecture|life))/i.test(lowerQ);

        if (!hasExplicitNavRequest) {
          responseText = responseText.replace(/\[\[NAVIGATE:[^\]]+\]\]/g, "");
        }

        // Action confirmation safety net
        if (
          (lowerQ.includes("break it") || lowerQ.includes("tamper") || lowerQ.includes("corrupt") || lowerQ.includes("break chain")) ||
          ((lowerQ === "yes" || lowerQ === "yeah" || lowerQ === "do it") && lastBotMsg.includes("tamper"))
        ) {
          if (!responseText.includes("[[CLICK:")) responseText += " [[CLICK:tamperBtn]]";
        } else if (lowerQ.includes("mine") || lowerQ.includes("fix chain") || lowerQ.includes("repair chain")) {
          if (!responseText.includes("[[CLICK:")) responseText += " [[CLICK:mineBtn]]";
        }

        return NextResponse.json({ reply: responseText });
      } catch (geminiErr: any) {
        console.error("AI Live Error, falling back to local reasoning:", geminiErr);
      }
    }

    // Contextual Fallback
    const p = (userMessage || "").toLowerCase().trim();
    let reply = "Hello! I'm Logi, Principal Solutions Architect at First Logic Meta Lab. How can I assist you with your system architecture or development needs today?";

    // If user asked in Malayalam / Manglish:
    if (/[\u0D00-\u0D7F]/.test(userMessage || "") || p.includes("malayala") || p.includes("samsari") || p.includes("namaskaram") || p.includes("manglish")) {
      reply = "നമസ്കാരം! ഞാൻ ഫസ്റ്റ് ലോജിക് മെറ്റാ ലാബിന്റെ പ്രിൻസിപ്പൽ സൊല്യൂഷൻസ് ആർക്കിടെക്റ്റ് ആയ ലോഗി (Logi). താങ്കളുടെ സോഫ്റ്റ്‌വെയർ അല്ലെങ്കിൽ സിസ്റ്റം ആർക്കിടെക്ചർ ആവശ്യങ്ങൾക്ക് ഞാൻ എങ്ങനെയാണ് സഹായിക്കേണ്ടത്?";
    } else if (p.includes("tamper") || p.includes("break it") || p.includes("corrupt")) {
      reply = "Corrupting Block #1 data right now to demonstrate cryptographic hash failure across the chain: [[CLICK:tamperBtn]]";
    } else if (p.includes("mine") || p.includes("fix chain")) {
      reply = "Mining proof-of-work hashes to restore chain consensus: [[CLICK:mineBtn]]";
    } else if (p.includes("dump") || p.includes("crash")) {
      reply = "Simulating a severe market drop right now: [[CLICK:dumpBtn]]";
    } else if (p.includes("pump") || p.includes("surge")) {
      reply = "Injecting a high-volume bullish breakout into the order book: [[CLICK:pumpBtn]]";
    } else if (p.includes("spike")) {
      reply = "Triggering a 6x traffic spike on the cluster: [[CLICK:spike]]";
    } else if (p.includes("pay") || p.includes("charge")) {
      reply = "Initiating transaction to test distributed idempotency: [[CLICK:payBtn]]";
    } else if (p.includes("architecture") && (p.includes("open") || p.includes("go to") || p.includes("show"))) {
      reply = "Opening our interactive Architecture Suite for you now: [[NAVIGATE:architecture]]";
    }

    return NextResponse.json({ reply, isFallback: true });
  } catch (error) {
    console.error("Chat route critical error:", error);
    return NextResponse.json({ reply: "Our systems are operational. Please try your request again." }, { status: 500 });
  }
}

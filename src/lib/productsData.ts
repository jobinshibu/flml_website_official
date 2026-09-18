export interface ProjectDetail {
  id: string;
  name: string;
  category: string;
  client: string;
  clientLogo: string;
  screenshot: string;
  headline: string;
  tagline: string;
  year: string;
  overview: string;
  challenge: string;
  solution: string;
  impact: string;
  stats: { label: string; value: string }[];
  techStack: { category: string; items: string[] }[];
  features: { title: string; description: string }[];
}

export const PROJECTS_DATA: Record<string, ProjectDetail> = {
  karikku: {
    id: "karikku",
    name: "Karikku E-Commerce Platform",
    category: "DIRECT-TO-CONSUMER FMCG E-COMMERCE",
    client: "Karikku (Thara Cart Group)",
    clientLogo: "/client/Karikku.svg",
    screenshot: "/screenshots/karikku.jpg",
    headline: "Omnichannel FMCG E-Commerce Engine for Natural Coconut Products",
    tagline: "Specializing in pure tender coconut water, cold-pressed virgin coconut oil, and natural derivatives.",
    year: "2021 - Present",
    overview: "Karikku is a premier Direct-to-Consumer (D2C) e-commerce enterprise under the Thara Cart Group. First Logic Meta Lab architected a complete end-to-end e-commerce ecosystem featuring customer shopping storefronts, secure checkout pipelines, and a centralized administrative management portal.",
    challenge: "Building a unified e-commerce infrastructure capable of synchronizing fresh perishable inventory, real-time payment state reconciliation, and multi-location fulfillment dispatch with zero catalog latency.",
    solution: "FLML engineered a dual-module e-commerce platform encompassing an intuitive customer storefront and an executive administration console. The system leverages Firebase real-time database architecture, Razorpay payment gateway integration, and automated transactional order dispatch.",
    impact: "Streamlined order processing for perishable coconut goods, enabled instant payment verification, and unified customer and administrative operations under a single cloud infrastructure.",
    stats: [
      { label: "Payment Architecture", value: "Razorpay Secure" },
      { label: "Cloud Database", value: "Firebase Real-Time" },
      { label: "System Modules", value: "Customer & Admin" },
      { label: "Order Sync Speed", value: "Instant Real-Time" }
    ],
    techStack: [
      { category: "Frontend Web & Mobile App", items: ["React", "JavaScript / TypeScript"] },
      { category: "Backend Engine", items: ["Node.js", "Express.js"] },
      { category: "Cloud & Realtime DB", items: ["Firebase Realtime DB", "Firebase Auth"] },
      { category: "Payment Gateway", items: ["Razorpay Gateway API"] }
    ],
    features: [
      { title: "Dual Storefront & Admin Modules", description: "Seamless customer shopping interface paired with a centralized management portal for live inventory and fulfillment." },
      { title: "Razorpay Payment Gateway Integration", description: "Secure checkout supporting UPI, cards, net banking, and instant automated webhook reconciliation." },
      { title: "Real-Time Inventory & Dispatch Sync", description: "Live stock tracking and fulfillment dispatch tailored for organic coconut water and oil products." }
    ]
  },
  healine: {
    id: "healine",
    name: "My Healine",
    category: "HEALTHCARE PLATFORM & B2B WELLNESS",
    client: "My Healine (UAE)",
    clientLogo: "/client/healine.png",
    screenshot: "/screenshots/healine.jpg",
    headline: "HIPAA-Verified UAE Healthcare Super-App & Corporate B2B Ecosystem",
    tagline: "Enabling doctor consultations, diagnostic lab tests, e-pharmacy orders, and corporate B2B employee wellness packages.",
    year: "",
    overview: "My Healine is a leading HIPAA-verified comprehensive healthcare platform operating across the United Arab Emirates (UAE). First Logic Meta Lab architected an end-to-end digital health ecosystem supporting patient doctor bookings, lab test reservations, e-pharmacy delivery, a full hospital/clinic directory with insurance coverage details, and dedicated B2B corporate employee wellness packages.",
    challenge: "Building an integrated healthcare platform capable of handling real-time medical appointment dispatch, multi-partner pharmacy inventory, diagnostic lab booking workflows, and corporate employee benefit administration while ensuring strict HIPAA compliance and enterprise-grade cloud security.",
    solution: "FLML engineered a high-availability mobile and web architecture powered by Flutter and React, backed by Node.js microservices hosted on AWS cloud infrastructure (EC2, ALB, Auto Scaling Groups, Amazon Aurora). Integrated with Infobip for multi-channel communication and Stripe for secure global payment processing.",
    impact: "Unified UAE healthcare services under a single HIPAA-verified digital backbone, streamlined corporate B2B employee wellness management, and ensured 99.99% cloud infrastructure availability.",
    stats: [
      { label: "Security Compliance", value: "HIPAA Verified" },
      { label: "Cloud Infrastructure", value: "AWS EC2 / ALB / ASG" },
      { label: "Database Engine", value: "Amazon Aurora SQL" },
      { label: "Payment Architecture", value: "Stripe Secure" }
    ],
    techStack: [
      { category: "Mobile Application", items: ["Flutter (iOS & Android)"] },
      { category: "Web Platform", items: ["React", "JavaScript / TypeScript"] },
      { category: "Backend Architecture", items: ["Node.js Microservices", "Express.js"] },
      { category: "Cloud & Security Infrastructure", items: ["AWS EC2", "Application Load Balancer (ALB)", "Auto Scaling Groups (ASG)", "Amazon Aurora", "HIPAA Compliance Vault"] },
      { category: "Payment & Messaging", items: ["Stripe API", "Infobip Gateway"] }
    ],
    features: [
      { title: "HIPAA-Verified Doctor, Lab & E-Pharmacy Super-App", description: "Omnichannel portal allowing patients to schedule doctor visits, order medicines, and book lab diagnostic tests across the UAE with strict HIPAA data security." },
      { title: "Hospital & Insurance Provider Directory", description: "Complete directory of nearby hospitals and clinics displaying available specialist doctors, medical specialties, and accepted health insurance coverage." },
      { title: "B2B Corporate Wellness Module", description: "Dedicated enterprise module enabling companies to configure and assign tailored healthcare service packages to their employees." }
    ]
  },
  "thara-cart": {
    id: "thara-cart",
    name: "Thara Cart E-Commerce Ecosystem",
    category: "MULTI-VENDOR B2B & B2C E-COMMERCE PLATFORM",
    client: "Thara Cart Group",
    clientLogo: "/client/thara_cart.png",
    screenshot: "/screenshots/thara_cart.jpg",
    headline: "The Ultimate Omnichannel Multi-Vendor E-Commerce Engine",
    tagline: "Integrating Customer Storefront, Seller Portal, B2B Wholesale Engine, and Executive Admin Management.",
    year: "",
    overview: "Thara Cart is the ultimate multi-vendor e-commerce platform under the Thara Cart Group. First Logic Meta Lab architected an all-in-one retail and wholesale ecosystem connecting third-party sellers, corporate B2B buyers, retail consumers, and central platform administrators.",
    challenge: "Unifying four complex operational environments—Customer Retail, Third-Party Seller Onboarding, B2B Bulk Wholesale, and Platform Administration—under a scalable, low-latency cloud infrastructure.",
    solution: "FLML engineered a modular multi-tier application architecture utilizing Flutter for cross-platform mobile apps and React for web portals, powered by Node.js microservices and Firebase real-time data storage.",
    impact: "Empowered independent sellers to list and manage catalogs, streamlined B2B trade orders, and unified multi-channel retail under a single cloud infrastructure.",
    stats: [
      { label: "Platform Architecture", value: "Multi-Vendor Marketplace" },
      { label: "Core System Modules", value: "Customer, Seller, B2B, Admin" },
      { label: "Database Infra", value: "Firebase Realtime DB" },
      { label: "App Framework", value: "Flutter & React" }
    ],
    techStack: [
      { category: "Mobile Application", items: ["Flutter (iOS & Android)"] },
      { category: "Web Portals", items: ["React", "JavaScript / TypeScript"] },
      { category: "Backend Services", items: ["Node.js Microservices", "Express.js"] },
      { category: "Cloud & Realtime Storage", items: ["Firebase Realtime DB", "Firestore", "Firebase Auth"] }
    ],
    features: [
      { title: "4 Integrated Operational Modules", description: "Customer Storefront, Third-Party Seller Portal, B2B Wholesale Trading Engine, and Centralized Admin Console." },
      { title: "B2B Wholesale & Tiered Pricing Engine", description: "Dedicated B2B engine handling bulk quantity tiers, wholesale pricing structures, and corporate buyer accounts." }
    ]
  },
  "3ms": {
    id: "3ms",
    name: "3MS (Multi Money Matter Solutions)",
    category: "OMNICHANNEL FINANCIAL & SERVICE SUPER-APP",
    client: "Multi Money Matter Solutions",
    clientLogo: "/client/3ms.png",
    screenshot: "/screenshots/thara_cart.jpg",
    headline: "All-in-One Multi-Service E-Commerce, Expense Tracking & Utility Engine",
    tagline: "Combining e-commerce retail, financial expense tracking, and digital utility services into a unified application.",
    year: "",
    overview: "3MS (Multi Money Matter Solutions) is a comprehensive multi-service digital platform. First Logic Meta Lab architected an all-in-one application ecosystem combining integrated e-commerce retail shopping, real-time personal/business expense management, and digital utility service payments under a single cloud infrastructure.",
    challenge: "Building a unified cross-platform mobile ecosystem capable of seamlessly handling multi-category transactions—combining retail product orders, real-time financial expense calculations, and instant digital utility bill settlement without user friction.",
    solution: "FLML engineered a high-availability mobile platform built with Flutter and powered by Firebase cloud infrastructure. The architecture utilizes Firebase Realtime Database for instant state updates, Firestore for structured financial tracking, and Cloud Functions for automated transactional processing.",
    impact: "Unified retail, expense management, and utility bill payments into a single mobile application, eliminating multi-app overhead and delivering real-time financial tracking for users.",
    stats: [
      { label: "Platform Architecture", value: "Multi-Service Ecosystem" },
      { label: "Core Modules", value: "E-Commerce, Expenses, Utilities" },
      { label: "Database & Cloud", value: "Firebase Realtime Infra" },
      { label: "Mobile Framework", value: "Flutter Cross-Platform" }
    ],
    techStack: [
      { category: "Mobile Application", items: ["Flutter (iOS & Android)"] },
      { category: "Cloud & Realtime Storage", items: ["Firebase Realtime DB", "Cloud Firestore"] },
      { category: "Cloud Services & Functions", items: ["Firebase Auth", "Firebase Cloud Functions"] },
      { category: "Security & Analytics", items: ["Firebase Security Rules", "Firebase Crashlytics"] }
    ],
    features: [
      { title: "Integrated E-Commerce Marketplace", description: "Full retail shopping experience featuring multi-category catalog browsing, cart management, and seamless order checkout." },
      { title: "Expense & Financial Tracking Engine", description: "Real-time tracking of personal and business financial transactions with automated category breakdowns and expense logs." },
      { title: "Digital Utility Services Portal", description: "Instant digital utility bill payments, recharge processing, and automated recurring service management." }
    ]
  },
  qaro: {
    id: "qaro",
    name: "Qaro Automotive Platform",
    category: "AUTOMOTIVE GARAGE & EMERGENCY ROADSIDE APP (UAE)",
    client: "Qaro Automotive (UAE)",
    clientLogo: "/client/qaro.png",
    screenshot: "/screenshots/healine.jpg",
    headline: "UAE Automotive Garage Booking & Emergency Roadside Assistance Platform",
    tagline: "Connecting vehicle owners with certified UAE auto garages and instant emergency breakdown dispatch.",
    year: "",
    overview: "Qaro is a premier automotive service and emergency roadside assistance platform operating across the United Arab Emirates (UAE). First Logic Meta Lab architected a comprehensive digital ecosystem enabling drivers to schedule routine garage maintenance, request immediate roadside breakdown assistance, and explore detailed garage profiles across the Emirates.",
    challenge: "Building a high-precision real-time location dispatch system that connects stranded drivers in the UAE with nearby certified garages, while indexing multi-brand garage capabilities, service offerings, and insurance accreditations.",
    solution: "FLML engineered a high-performance mobile and cloud platform featuring real-time GPS breakdown tracking, an automated garage service reservation engine, and an extensive directory listing supported vehicle brands, specialization tags, and transparent pricing.",
    impact: "Streamlined automotive maintenance across the UAE, reduced emergency breakdown dispatch times, and provided vehicle owners with transparent garage verification.",
    stats: [
      { label: "Cloud Infrastructure", value: "AWS EC2 / ALB / ASG" },
      { label: "Database Engine", value: "Amazon Aurora SQL" },
      { label: "Operating Market", value: "United Arab Emirates (UAE)" },
      { label: "Core Services", value: "Garage & Emergency Dispatch" }
    ],
    techStack: [
      { category: "Mobile Application", items: ["Flutter (iOS & Android)"] },
      { category: "Web Platform", items: ["React", "JavaScript / TypeScript"] },
      { category: "Backend Architecture", items: ["Node.js Microservices", "Express.js"] },
      { category: "Cloud & Database Infrastructure", items: ["AWS EC2", "Application Load Balancer (ALB)", "Auto Scaling Groups (ASG)", "Amazon Aurora Security Vault"] }
    ],
    features: [
      { title: "General Garage Service Reservation", description: "Schedule routine maintenance, oil changes, engine diagnostics, and mechanical repairs at top-rated UAE auto centers." },
      { title: "Emergency Breakdown & Towing Dispatch", description: "Instant GPS-based dispatch for roadside emergencies, battery jumpstarts, flat tire support, and vehicle towing when stranded." },
      { title: "Verified Garage Directory & Brand Filter", description: "Detailed garage profiles highlighting supported vehicle manufacturer brands (BMW, Mercedes, Toyota, etc.), specialized services, certifications, and accepted auto insurance." }
    ]
  },
  foodzer: {
    id: "foodzer",
    name: "Foodzer Delivery System",
    category: "ON-DEMAND FOOD DELIVERY & RESTAURANT ECOSYSTEM",
    client: "Foodzer",
    clientLogo: "/client/foodzer.png",
    screenshot: "/screenshots/karikku.jpg",
    headline: "Complete On-Demand Food Delivery Platform & Restaurant Management Engine",
    tagline: "Connecting hungry customers, restaurant kitchens, and delivery partners through real-time Flutter apps and Firebase cloud infrastructure.",
    year: "",
    overview: "Foodzer is a complete, end-to-end on-demand food delivery system. First Logic Meta Lab architected a comprehensive 4-tier ecosystem encompassing Customer Ordering Apps, Restaurant Kitchen & Merchant Portals, Delivery Driver Dispatch Apps, and a Centralized Super Admin Management Console.",
    challenge: "Engineering a synchronized 4-way communication network between food lovers, restaurant kitchens, active delivery drivers, and platform dispatchers—ensuring live GPS order tracking, real-time status transitions, dynamic menu updates, and instant push notifications with zero latency.",
    solution: "FLML engineered a high-performance cross-platform mobile and cloud platform built with Flutter and powered by Firebase cloud infrastructure (Cloud Firestore, Realtime DB, Firebase Auth, Cloud Functions, and Firebase Cloud Messaging). Integrated with Google Maps API for live driver routing, geofencing, and distance estimation.",
    impact: "Streamlined food ordering and kitchen dispatch operations, enabled live door-to-door GPS tracking, and empowered restaurant merchants to manage dynamic menus, addons, and kitchen thermal receipt printing seamlessly.",
    stats: [
      { label: "Platform Architecture", value: "4-Tier Food Ecosystem" },
      { label: "Mobile Framework", value: "Flutter Cross-Platform" },
      { label: "Cloud Engine", value: "Firebase Real-Time Infrastructure" },
      { label: "Core Modules", value: "Customer, Restaurant, Driver, Admin" }
    ],
    techStack: [
      { category: "Mobile Apps (Customer & Driver)", items: ["Flutter (iOS & Android)"] },
      { category: "Merchant & Management Portals", items: ["Flutter Web", "React", "JavaScript / TypeScript"] },
      { category: "Cloud Database & Realtime", items: ["Cloud Firestore", "Firebase Realtime DB", "Firebase Storage"] },
      { category: "Serverless & Push Messaging", items: ["Firebase Cloud Functions", "Firebase Auth", "Firebase Cloud Messaging (FCM)"] },
      { category: "Location & Mapping API", items: ["Google Maps API", "Directions & Geofencing API"] }
    ],
    features: [
      { title: "4-Tier Operational Ecosystem", description: "Unified communication between Customer Food Ordering App, Restaurant Kitchen Manager Tablet Portal, Driver Delivery Dispatch App, and Super Admin Console." },
      { title: "Real-Time GPS Order Tracking & Status Engine", description: "Live map routing from kitchen pickup to doorstep delivery powered by Google Maps API, Firestore real-time data streams, and instant FCM push notifications." },
      { title: "Dynamic Restaurant Menu & Kitchen Management", description: "Empowers restaurant vendors to update real-time item availability, custom toppings/addons, dynamic pricing, opening hours, and trigger automated thermal kitchen receipt printing." }
    ]
  },
  myvaahan: {
    id: "myvaahan",
    name: "MyVaahan Garage System",
    category: "AUTOMOTIVE GARAGE ERP & VEHICLE MARKETPLACE",
    client: "MyVaahan",
    clientLogo: "/client/myvaahan.png",
    screenshot: "/screenshots/healine.jpg",
    headline: "Complete Automotive Ecosystem: Garage ERP, Service Booking & Used Vehicle Marketplace",
    tagline: "Unifying garage workshop ERP, online service reservations, spare parts marketplace, and pre-owned vehicle trading.",
    year: "",
    overview: "MyVaahan is an all-in-one automotive ecosystem connecting vehicle owners, auto workshops, and spare parts suppliers. First Logic Meta Lab architected a comprehensive platform delivering online garage bookings, auto spare parts e-commerce, verified pre-owned car & bike listings, and a full-featured Garage ERP for workshop operations.",
    challenge: "Engineered a multi-faceted platform capable of synchronizing consumer-facing services (garage service discovery, marketplace purchases, pre-owned car sales) with enterprise workshop ERP functions (digital job cards, mechanic assignments, spare parts inventory, and customer invoicing).",
    solution: "FLML engineered a high-availability mobile and web suite built with Flutter and powered by Firebase cloud services (Cloud Firestore, Realtime DB, Firebase Auth, Cloud Functions, and Firebase Storage). Delivers real-time job card state tracking and automated inventory updates.",
    impact: "Digitized garage workshop workflows, streamlined vehicle service bookings, and provided vehicle owners with a trusted marketplace for spare parts and pre-owned vehicle deals.",
    stats: [
      { label: "Platform Ecosystem", value: "Garage ERP & Marketplace" },
      { label: "Mobile Framework", value: "Flutter Cross-Platform" },
      { label: "Cloud Infrastructure", value: "Firebase Real-Time DB" },
      { label: "Core Modules", value: "ERP, Bookings, Marketplace, Used Cars" }
    ],
    techStack: [
      { category: "Mobile Apps (Customer & Garage)", items: ["Flutter (iOS & Android)"] },
      { category: "Garage ERP & Management Web", items: ["Flutter Web", "React", "JavaScript / TypeScript"] },
      { category: "Cloud Database & Realtime", items: ["Cloud Firestore", "Firebase Realtime DB", "Firebase Storage"] },
      { category: "Serverless & Messaging", items: ["Firebase Cloud Functions", "Firebase Auth", "Firebase Cloud Messaging (FCM)"] }
    ],
    features: [
      { title: "Integrated Garage ERP & Workshop Management", description: "Comprehensive workshop module enabling digital job card creation, mechanic task assignments, inventory tracking, service history logs, and automated invoicing." },
      { title: "Online Garage Service Reservation Engine", description: "Enables vehicle owners to locate certified garages, view detailed service offerings, compare transparent pricing, and schedule maintenance slots." },
      { title: "Auto Marketplace & Used Vehicle Trading", description: "Multi-vendor store for buying genuine auto parts and accessories, combined with a verified listing portal for buying and selling pre-owned cars and motorcycles." }
    ]
  },
  edhwi: {
    id: "edhwi",
    name: "Edhwi Pure Coconut Platform",
    category: "DIRECT-TO-CONSUMER FMCG E-COMMERCE",
    client: "Edhwi (Thara Cart Group)",
    clientLogo: "/client/Edhwi.svg",
    screenshot: "/screenshots/karikku_1.jpg",
    headline: "Omnichannel E-Commerce Engine for Pure Coconut Oil & Derivatives",
    tagline: "Specializing in cold-pressed virgin coconut oil, pure cooking oil, and organic coconut derivatives under Thara Cart Group.",
    year: "",
    overview: "Edhwi is a premier Direct-to-Consumer (D2C) organic coconut products e-commerce brand under the Thara Cart Group. First Logic Meta Lab architected an end-to-end e-commerce platform featuring customer shopping storefronts, secure payment checkout, real-time inventory management, and an administrative control portal.",
    challenge: "Building a streamlined D2C e-commerce engine capable of synchronizing pure coconut product inventory, real-time Razorpay payment verification, and automated dispatch across customer orders.",
    solution: "FLML engineered a high-performance web e-commerce platform built with React and Node.js microservices, powered by Firebase real-time infrastructure and Razorpay payment gateway integration for automated transaction reconciliation.",
    impact: "Streamlined order fulfillment for pure coconut oil and derivative products, enabled instant payment verification, and expanded Thara Cart Group's digital D2C footprint.",
    stats: [
      { label: "Payment Architecture", value: "Razorpay Secure" },
      { label: "Cloud Database", value: "Firebase Real-Time DB" },
      { label: "System Modules", value: "Customer & Admin Portal" },
      { label: "Order Sync Speed", value: "Instant Real-Time" }
    ],
    techStack: [
      { category: "Frontend Web Storefront", items: ["React", "JavaScript / TypeScript"] },
      { category: "Backend Engine", items: ["Node.js", "Express.js"] },
      { category: "Cloud & Realtime DB", items: ["Firebase Realtime DB", "Firebase Auth"] },
      { category: "Payment Gateway", items: ["Razorpay Gateway API"] }
    ],
    features: [
      { title: "Dual Storefront & Admin Modules", description: "Intuitive customer D2C shopping experience paired with a centralized management portal for inventory, catalog variations, and fulfillment tracking." },
      { title: "Razorpay Payment Gateway Integration", description: "Secure checkout pipeline supporting UPI, credit/debit cards, net banking, and instant webhook payment status reconciliation." },
      { title: "Real-Time Stock & Fulfillment Synchronization", description: "Instant inventory tracking and dispatch workflows tailored for organic coconut oil, virgin coconut derivatives, and packaged goods." }
    ]
  },
  vivlino: {
    id: "vivlino",
    name: "Vivlino Debt & Credit Management App",
    category: "SAAS FINANCIAL DEBT NOTE & STORE CREDIT MANAGEMENT",
    client: "Vivilino IT Solutions WLL",
    clientLogo: "/client/vivlino.svg",
    screenshot: "/screenshots/healine.jpg",
    headline: "SaaS Mobile Credit Ledger & Customer Debt Recording Engine for Retail Merchants",
    tagline: "Empowering store owners and merchants to record customer debt, track pending receivables, and send automated repayment reminders.",
    year: "",
    overview: "Vivlino (developed for Vivilino IT Solutions WLL) is a specialized SaaS mobile application engineered for retail store owners and business merchants. First Logic Meta Lab architected a digital debt ledger platform that replaces traditional paper credit notebooks, enabling merchants to record customer purchases on credit, manage receivables, and track balances in real time.",
    challenge: "Replacing manual paper-based store credit notebooks with an instant, low-latency mobile digital ledger capable of operating offline, synchronizing pending debt balances seamlessly across devices, and sending multi-channel payment collection notifications.",
    solution: "FLML engineered a high-performance cross-platform SaaS mobile application using Flutter, backed by Firebase cloud infrastructure (Cloud Firestore, Firebase Realtime DB, Firebase Cloud Messaging, and Firebase Auth) for instant transaction logging and automated debt reminders.",
    impact: "Eliminated store credit bookkeeping errors, improved merchant debt collection speeds, and provided business owners with complete transparency into outstanding customer receivables.",
    stats: [
      { label: "Platform Architecture", value: "SaaS Digital Credit Ledger" },
      { label: "Mobile Framework", value: "Flutter Cross-Platform" },
      { label: "Cloud Engine", value: "Firebase Real-Time Infrastructure" },
      { label: "Target Market", value: "Retail Store Merchants" }
    ],
    techStack: [
      { category: "Mobile Application", items: ["Flutter (iOS & Android)"] },
      { category: "Cloud Database & Realtime", items: ["Cloud Firestore", "Firebase Realtime DB", "Firebase Storage"] },
      { category: "Serverless & Reminders", items: ["Firebase Cloud Functions", "Firebase Auth", "Firebase Cloud Messaging (FCM)"] }
    ],
    features: [
      { title: "Digital Customer Credit & Debt Ledger", description: "Enables merchants to record instant store credit entries, attach digital receipt images, and maintain exact running debt balances per customer." },
      { title: "Automated Repayment Collection Alerts", description: "Automated payment collection alerts sent via SMS, FCM push notifications, and WhatsApp integration to speed up debt recovery." },
      { title: "Real-Time Receivables & Settlement Analytics", description: "Provides store owners with daily cash collection summaries, pending debt reports, and individual customer credit history logs." }
    ]
  },
  cabco: {
    id: "cabco",
    name: "Cabco Taxi Booking Platform",
    category: "ON-DEMAND RIDE-HAILING & TAXI DISPATCH ECOSYSTEM",
    client: "Cabco",
    clientLogo: "/client/cabco.jpeg",
    screenshot: "/screenshots/karikku.jpg",
    headline: "On-Demand Taxi Booking Platform & Driver Dispatch Engine",
    tagline: "Connecting riders and drivers with real-time GPS tracking, fare estimation, and automated dispatch powered by Flutter and Firebase.",
    year: "",
    overview: "Cabco is a comprehensive on-demand ride-hailing and taxi booking platform. First Logic Meta Lab architected an end-to-end taxi ecosystem encompassing Rider Booking Apps, Driver Dispatch Apps, and a Centralized Fleet Management Admin Console.",
    challenge: "Building a high-concurrency real-time ride dispatch platform capable of handling instant driver matching, live GPS vehicle tracking, dynamic fare calculation, and seamless payment collection with minimal latency.",
    solution: "FLML engineered a high-performance cross-platform mobile suite using Flutter, backed by Firebase cloud services (Cloud Firestore, Realtime DB, Firebase Auth, Cloud Functions, FCM) and integrated with Google Maps API for live route navigation and geofencing.",
    impact: "Optimized taxi ride dispatch times, provided riders with transparent fare estimation, and enabled fleet operators to monitor live driver activity seamlessly.",
    stats: [
      { label: "Platform Architecture", value: "3-Tier Taxi Ecosystem" },
      { label: "Mobile Framework", value: "Flutter Cross-Platform" },
      { label: "Cloud Engine", value: "Firebase Real-Time DB" },
      { label: "Core Modules", value: "Rider, Driver, Fleet Admin" }
    ],
    techStack: [
      { category: "Mobile Applications (Rider & Driver)", items: ["Flutter (iOS & Android)"] },
      { category: "Fleet Admin Management Portal", items: ["Flutter Web", "React", "JavaScript / TypeScript"] },
      { category: "Cloud Database & Realtime", items: ["Cloud Firestore", "Firebase Realtime DB", "Firebase Storage"] },
      { category: "Serverless & Geo Services", items: ["Firebase Cloud Functions", "Firebase Auth", "Firebase Cloud Messaging (FCM)", "Google Maps API"] }
    ],
    features: [
      { title: "Instant Ride Booking & Live GPS Tracking", description: "Riders can request instant rides or schedule future pickups, with real-time map tracking of driver arrival and trip progress." },
      { title: "Smart Driver Dispatch & Fare Estimation", description: "Automated driver proximity matching, dynamic fare calculation based on distance and time, and multiple secure payment methods." },
      { title: "Fleet Management Admin Console", description: "Centralized admin dashboard for driver document verification, trip history monitoring, commission management, and revenue analytics." }
    ]
  },
  clubq: {
    id: "clubq",
    name: "ClubQ Restaurant POS & Hospitality Platform",
    category: "RESTAURANT POS, KOT & MARKETING MANAGEMENT ENGINE",
    client: "ClubQ",
    clientLogo: "/client/clubq.jpeg",
    screenshot: "/screenshots/healine.jpg",
    headline: "Omnichannel Restaurant POS, KOT Dispatch, Table Booking & Marketing Automation Engine",
    tagline: "Everything for restaurants: POS billing, Kitchen Order Tokens (KOT), reservation bookings, customer CRM, and promotional marketing campaigns.",
    year: "",
    overview: "ClubQ is an all-in-one hospitality management platform and Point of Sale (POS) ecosystem. First Logic Meta Lab architected a comprehensive restaurant operating engine encompassing Touchscreen POS Billing, Real-Time Kitchen Order Token (KOT) Dispatch, Table Reservation Bookings, Customer CRM, and Automated Marketing Campaign Tools.",
    challenge: "Unifying high-speed restaurant cashier billing, instant kitchen KOT printing/display synchronization, online table reservations, and automated customer marketing campaigns under a single low-latency cloud infrastructure.",
    solution: "FLML engineered a high-performance cross-platform application built with Flutter and powered by Firebase cloud infrastructure (Cloud Firestore, Realtime DB, Firebase Auth, Cloud Functions, and Firebase Cloud Messaging) with offline POS caching and thermal receipt integration.",
    impact: "Accelerated dining room table turnover, eliminated kitchen ordering errors with real-time KOT routing, and boosted repeat customer visits through automated targeted promotional campaigns.",
    stats: [
      { label: "Platform Architecture", value: "Restaurant POS & KOT Ecosystem" },
      { label: "Mobile & POS Framework", value: "Flutter Cross-Platform" },
      { label: "Cloud Infrastructure", value: "Firebase Real-Time DB" },
      { label: "Core Modules", value: "POS, KOT, Bookings, Marketing" }
    ],
    techStack: [
      { category: "POS & Mobile Apps", items: ["Flutter (iOS, Android, Desktop POS)"] },
      { category: "Merchant & Admin Web Portals", items: ["Flutter Web", "React", "JavaScript / TypeScript"] },
      { category: "Cloud Database & Realtime", items: ["Cloud Firestore", "Firebase Realtime DB", "Firebase Storage"] },
      { category: "Serverless & Messaging", items: ["Firebase Cloud Functions", "Firebase Auth", "Firebase Cloud Messaging (FCM)"] }
    ],
    features: [
      { title: "Touchscreen POS Billing & Real-Time KOT Dispatch", description: "High-speed cashier billing with split payment support, paired with instant Kitchen Order Token (KOT) routing to kitchen display screens and thermal printers." },
      { title: "Table Reservation & Guest Booking Engine", description: "Enables customers to reserve dining tables online, with real-time table availability management, guest arrival status tracking, and floor plan mapping." },
      { title: "Automated Marketing & Promotional Campaign CRM", description: "Integrated customer CRM enabling restaurant managers to send automated SMS/WhatsApp promo campaigns, loyalty rewards, and targeted discount coupons." }
    ]
  },
  "cool-talk": {
    id: "cool-talk",
    name: "Cool Talk Social Calling Platform",
    category: "REAL-TIME AUDIO & SOCIAL RANDOMLY CONNECTED CALLING PLATFORM",
    client: "Cool Talk",
    clientLogo: "/client/cool talk.jpeg",
    screenshot: "/screenshots/karikku_1.jpg",
    headline: "Real-Time Voice & Social Audio Calling Platform for Connecting with Strangers",
    tagline: "Connecting global users through instant one-on-one anonymous voice calling, audio matchmaking, and social interaction.",
    year: "",
    overview: "Cool Talk is an innovative social networking and voice calling mobile application. First Logic Meta Lab architected a real-time audio matchmaking platform that connects users with random strangers worldwide for anonymous, high-quality voice conversations.",
    challenge: "Engineering an ultra-low-latency real-time voice signaling engine capable of handling instant random user matchmaking, peer-to-peer audio streaming, dynamic call queueing, and user moderation filters without call drops.",
    solution: "FLML engineered a high-performance cross-platform mobile application using Flutter, integrated with WebRTC audio streaming protocols and backed by Firebase cloud infrastructure (Cloud Firestore, Realtime DB, Firebase Auth, Cloud Functions, and Firebase Cloud Messaging).",
    impact: "Delivered crystal-clear, low-latency random voice connections across international users, creating a safe social environment with real-time user moderation and privacy controls.",
    stats: [
      { label: "Platform Architecture", value: "Real-Time Audio Matchmaking" },
      { label: "Mobile Framework", value: "Flutter Cross-Platform" },
      { label: "Streaming Engine", value: "WebRTC Audio Protocol" },
      { label: "Cloud Backend", value: "Firebase Real-Time DB" }
    ],
    techStack: [
      { category: "Mobile Application", items: ["Flutter (iOS & Android)"] },
      { category: "Real-Time Audio & Signaling", items: ["WebRTC Voice Protocol", "Agora / Twilio RTC Engine"] },
      { category: "Cloud Database & Realtime", items: ["Cloud Firestore", "Firebase Realtime DB"] },
      { category: "Serverless & Notifications", items: ["Firebase Cloud Functions", "Firebase Auth", "Firebase Cloud Messaging (FCM)"] }
    ],
    features: [
      { title: "Instant Random Voice Matchmaking", description: "One-tap matchmaking algorithm that algorithmically pairs users globally based on language preference, region, and common interests for live voice calls." },
      { title: "High-Definition Low-Latency WebRTC Audio Engine", description: "Crystal-clear real-time peer-to-peer audio streaming with adaptive jitter buffering and low-bandwidth network optimization." },
      { title: "Anonymous Profile & Safety Moderation Vault", description: "Protects user privacy with customizable avatar profiles, live user reporting, blocklists, and automated safety moderation filters." }
    ]
  },
  dcost: {
    id: "dcost",
    name: "DCost Merchant & Discount Platform",
    category: "OMNICHANNEL LOCAL DISCOVERY & DISCOUNT REWARDS PLATFORM",
    client: "DCost",
    clientLogo: "/client/dcost.jpeg",
    screenshot: "/screenshots/karikku.jpg",
    headline: "Omnichannel Merchant Directory, Tourist Discovery & Exclusive Discount Rewards Engine",
    tagline: "Connecting users with local retail shops, shopping malls, restaurants, and tourist attractions featuring exclusive instant discount redemption.",
    year: "",
    overview: "DCost is a comprehensive local business discovery and discount redemption platform. First Logic Meta Lab architected an omnichannel mobile ecosystem enabling users to explore local retail stores, shopping malls, dining venues, and tourist spots while unlocking exclusive digital discount vouchers and cashback offers.",
    challenge: "Building a geo-location aware merchant directory capable of indexing thousands of retail shops, restaurants, malls, and tourist destinations while ensuring instant offline/online QR code discount voucher redemption and real-time vendor offer management.",
    solution: "FLML engineered a high-performance cross-platform mobile application using Flutter, backed by Firebase cloud infrastructure (Cloud Firestore, Realtime DB, Firebase Auth, Cloud Functions, and Firebase Cloud Messaging) with integrated Google Maps API location services for proximity merchant discovery.",
    impact: "Boosted foot traffic for local merchants, retail malls, and tourist destinations while delivering instant savings for consumers via QR code discount redemption.",
    stats: [
      { label: "Platform Architecture", value: "Merchant Discovery & Rewards" },
      { label: "Mobile Framework", value: "Flutter Cross-Platform" },
      { label: "Cloud Engine", value: "Firebase Real-Time Infrastructure" },
      { label: "Core Services", value: "Directory, Geo-Deals, QR Discounts" }
    ],
    techStack: [
      { category: "Mobile Application", items: ["Flutter (iOS & Android)"] },
      { category: "Merchant & Admin Portals", items: ["Flutter Web", "React", "JavaScript / TypeScript"] },
      { category: "Cloud Database & Realtime", items: ["Cloud Firestore", "Firebase Realtime DB", "Firebase Storage"] },
      { category: "Serverless & Geo Services", items: ["Firebase Cloud Functions", "Firebase Auth", "Firebase Cloud Messaging (FCM)", "Google Maps API"] }
    ],
    features: [
      { title: "Geo-Location Merchant & Tourist Spot Directory", description: "Proximity-based discovery tool listing local shops, shopping centers, top restaurants, and tourist landmarks with interactive map navigation." },
      { title: "Instant QR Code Discount & Voucher Redemption Engine", description: "In-app digital coupon wallet allowing users to generate and scan QR codes at checkout to redeem exclusive merchant discounts instantly." },
      { title: "Merchant Offer Management & Analytics Portal", description: "Empowers business vendors to publish seasonal discount deals, set campaign limits, track customer redemptions, and view foot-traffic analytics." }
    ]
  },
  flexifold: {
    id: "flexifold",
    name: "Flexifold Interior Design Studio Platform",
    category: "INTERIOR DESIGN PROJECT MANAGEMENT & WORKFLOW SAAS",
    client: "Flexifold",
    clientLogo: "/client/flexifold.jpeg",
    screenshot: "/screenshots/healine.jpg",
    headline: "End-to-End Project Management & Workflow Automation Platform for Interior Design Teams",
    tagline: "Empowering interior designers, architects, and site contractors to collaborate on Moodboards, CAD Drawings, Material Estimates, and Client Approvals.",
    year: "",
    overview: "Flexifold is an enterprise SaaS workflow and project management system tailored specifically for interior design studios and architectural teams. First Logic Meta Lab architected a collaborative workspace enabling interior designers, project managers, client stakeholders, and site contractors to streamline design concepts, material procurement, site progress logs, and client milestone sign-offs.",
    challenge: "Replacing fragmented communication channels and manual spreadsheets used by interior design firms with a unified digital workspace that synchronizes CAD drawing approvals, material cost estimates, site milestone tracking, and client feedback in real time.",
    solution: "FLML engineered a multi-platform web and mobile SaaS platform using React, Node.js, and Flutter, backed by cloud storage repositories for high-resolution 3D renders, automated invoice generators, and interactive moodboard annotation tools.",
    impact: "Accelerated interior project completion timelines, eliminated material miscommunications between office designers and site contractors, and elevated client presentation transparency.",
    stats: [
      { label: "Platform Architecture", value: "Interior Design SaaS ERP" },
      { label: "System Framework", value: "React & Flutter Cross-Platform" },
      { label: "Core Modules", value: "Moodboards, CAD Approval, Expenses, Site Logs" },
      { label: "Target Audience", value: "Interior Designers & Architects" }
    ],
    techStack: [
      { category: "Web Platform & Studio Portal", items: ["React", "JavaScript / TypeScript"] },
      { category: "Mobile Apps (Site Contractor & Client)", items: ["Flutter (iOS & Android)"] },
      { category: "Backend Engine", items: ["Node.js", "Express.js"] },
      { category: "Cloud Storage & Database", items: ["AWS S3 / Firebase Storage", "Cloud Firestore", "PostgreSQL / MongoDB"] }
    ],
    features: [
      { title: "Interactive Moodboard & CAD Revision Hub", description: "Designers can upload high-res renders, material swatches, and CAD blueprints with pin-point client annotation and revision approval features." },
      { title: "Material Procurement & Expense Estimator", description: "Automated bill-of-quantities (BOQ) calculator, vendor quotation tracking, and real-time project expense budgeting." },
      { title: "Site Execution Progress & Timeline Logs", description: "Mobile photo progress logs, contractor task assignment cards, and milestone completion alerts for seamless site-to-studio synchronization." }
    ]
  },
  "relax-call": {
    id: "relax-call",
    name: "Relax Call Voice Social Platform",
    category: "REAL-TIME ANONYMOUS AUDIO & SOCIAL CALLING PLATFORM",
    client: "Relax Call",
    clientLogo: "/client/relax call.jpeg",
    screenshot: "/screenshots/karikku_1.jpg",
    headline: "Real-Time Anonymous Audio Calling & Matchmaking Platform",
    tagline: "Connecting people worldwide through high-quality 1-on-1 stranger voice calls, mood-based matchmaking, and real-time audio rooms.",
    year: "",
    overview: "Relax Call is a popular audio social networking mobile application. First Logic Meta Lab architected a real-time voice matchmaking platform allowing users to discover and chat anonymously with new friends across the globe in a stress-free environment.",
    challenge: "Handling instant low-latency audio matchmaking across high concurrent active user calls, managing connection stability over varying mobile networks, and enforcing strict user privacy and community safety guidelines.",
    solution: "FLML engineered a high-performance cross-platform application built with Flutter and WebRTC signaling protocols, backed by Firebase cloud infrastructure (Cloud Firestore, Realtime DB, Firebase Auth, Cloud Functions, and Firebase Cloud Messaging).",
    impact: "Facilitated millions of global voice conversations with zero latency buffering, delivering an intuitive anonymous calling experience with end-to-end privacy.",
    stats: [
      { label: "Platform Architecture", value: "Real-Time Audio Matchmaking" },
      { label: "Mobile Framework", value: "Flutter Cross-Platform" },
      { label: "Streaming Engine", value: "WebRTC Audio Protocol" },
      { label: "Cloud Engine", value: "Firebase Real-Time Infrastructure" }
    ],
    techStack: [
      { category: "Mobile Application", items: ["Flutter (iOS & Android)"] },
      { category: "Real-Time Audio & Signaling", items: ["WebRTC Voice Protocol", "RTC Engine"] },
      { category: "Cloud Database & Realtime", items: ["Cloud Firestore", "Firebase Realtime DB"] },
      { category: "Serverless & Notifications", items: ["Firebase Cloud Functions", "Firebase Auth", "Firebase Cloud Messaging (FCM)"] }
    ],
    features: [
      { title: "Mood-Based Stranger Voice Matchmaking", description: "Algorithmic matchmaking engine pairing users instantly based on topic tags, language filters, and mood categories for 1-on-1 voice calls." },
      { title: "Adaptive Low-Bandwidth WebRTC Audio Engine", description: "Crystal-clear real-time audio streaming optimized for 3G, 4G, 5G, and Wi-Fi networks with dynamic noise suppression." },
      { title: "User Privacy & Safety Moderation Guard", description: "Anonymous voice profiles, instant block/report features, and AI-assisted safety moderation to ensure a respectful user environment." }
    ]
  },
  "vestido-nation": {
    id: "vestido-nation",
    name: "Vestido Nation Fashion E-Commerce",
    category: "D2C FASHION & APPAREL E-COMMERCE STORE",
    client: "Vestido Nation",
    clientLogo: "/client/vestido nation.jpeg",
    screenshot: "/screenshots/karikku.jpg",
    headline: "Omnichannel D2C Fashion & Apparel E-Commerce Platform",
    tagline: "Curating premium boutique dresses, seasonal fashion collections, and personalized styling recommendations.",
    year: "",
    overview: "Vestido Nation is a premier Direct-to-Consumer (D2C) fashion and apparel e-commerce brand. First Logic Meta Lab architected a modern digital storefront featuring high-resolution fashion lookbooks, size recommendation guides, real-time inventory management, and an executive administration console.",
    challenge: "Engineering a high-performance fashion shopping web platform with low image load latency, dynamic size/color variant matrix management, real-time cart state synchronization, and secure checkout integration.",
    solution: "FLML engineered a responsive web storefront using React, backed by Node.js microservices and Firebase real-time infrastructure (Cloud Firestore, Firebase Auth, Firebase Storage) for instant inventory updates and order fulfillment management.",
    impact: "Elevated fashion brand presentation, reduced cart abandonment with fast checkout pipelines, and provided store managers with live catalog control.",
    stats: [
      { label: "Platform Architecture", value: "D2C Fashion E-Commerce" },
      { label: "Frontend Framework", value: "React & TypeScript" },
      { label: "Backend Engine", value: "Node.js & Express" },
      { label: "Cloud & Database", value: "Firebase Real-Time DB" }
    ],
    techStack: [
      { category: "Frontend Web Storefront", items: ["React", "JavaScript / TypeScript"] },
      { category: "Backend Microservices", items: ["Node.js", "Express.js"] },
      { category: "Cloud Infrastructure & Realtime", items: ["Cloud Firestore", "Firebase Realtime DB", "Firebase Storage"] },
      { category: "Security & Authentication", items: ["Firebase Auth", "SSL Cloud Vault"] }
    ],
    features: [
      { title: "Dynamic Fashion Catalog & Variant Matrix", description: "Interactive fashion catalog displaying multi-angle product photography, size/color variant matrices, and real-time stock availability." },
      { title: "Lookbook & Style Recommendation Engine", description: "Curated seasonal fashion lookbooks allowing customers to shop entire outfits with one-click cart additions." },
      { title: "Centralized Admin & Fulfillment Portal", description: "Comprehensive management console for store administrators to manage product drops, discount codes, customer orders, and dispatch logs." }
    ]
  },
  kootukari: {
    id: "kootukari",
    name: "Kootukari Regional Voice Platform",
    category: "REAL-TIME REGIONAL AUDIO & VOICE MATCHMAKING PLATFORM",
    client: "Kootukari",
    clientLogo: "/client/kootukari.jpeg",
    screenshot: "/screenshots/karikku_1.jpg",
    headline: "Regional Audio Social Networking & Voice Calling Platform for Connecting with Strangers",
    tagline: "Connecting people through 1-on-1 voice calling, regional language matchmaking, and real-time audio rooms.",
    year: "",
    overview: "Kootukari is a regional voice social networking mobile application. First Logic Meta Lab architected a real-time audio matchmaking platform enabling users to connect and converse anonymously with new friends speaking their native languages.",
    challenge: "Building a fast regional language-aware voice matchmaking engine capable of handling high concurrent live calls, low-latency audio transmission over 3G/4G networks, and real-time community safety moderation.",
    solution: "FLML engineered a high-performance cross-platform application built with Flutter and WebRTC protocols, backed by Firebase cloud infrastructure (Cloud Firestore, Realtime DB, Firebase Auth, Cloud Functions, and Firebase Cloud Messaging).",
    impact: "Fostered vibrant regional social communities with seamless low-latency voice calling, privacy protection, and automated safety moderation.",
    stats: [
      { label: "Platform Architecture", value: "Regional Voice Matchmaking" },
      { label: "Mobile Framework", value: "Flutter Cross-Platform" },
      { label: "Streaming Engine", value: "WebRTC Audio Protocol" },
      { label: "Cloud Engine", value: "Firebase Real-Time Infrastructure" }
    ],
    techStack: [
      { category: "Mobile Application", items: ["Flutter (iOS & Android)"] },
      { category: "Real-Time Audio & Signaling", items: ["WebRTC Voice Protocol", "RTC Engine"] },
      { category: "Cloud Database & Realtime", items: ["Cloud Firestore", "Firebase Realtime DB"] },
      { category: "Serverless & Notifications", items: ["Firebase Cloud Functions", "Firebase Auth", "Firebase Cloud Messaging (FCM)"] }
    ],
    features: [
      { title: "Regional Language Voice Matchmaking", description: "Algorithmic matchmaking pairing users based on native language preferences, regional dialects, and common interests for 1-on-1 audio calls." },
      { title: "High-Quality Low-Bandwidth WebRTC Engine", description: "Ultra-low latency audio streaming optimized for smooth voice clarity even on low-bandwidth mobile network connections." },
      { title: "Anonymous Profiles & Community Safety Shield", description: "Custom avatar profiles, instant user block/report mechanisms, and automated safety filters ensuring a safe social calling environment." }
    ]
  },
  "live-to-smile": {
    id: "live-to-smile",
    name: "Live to Smile Healthcare Platform",
    category: "DENTAL CARE & HEALTHCARE PATIENT MANAGEMENT PLATFORM",
    client: "Live to Smile",
    clientLogo: "/client/live_to_smile.jpeg",
    screenshot: "/screenshots/healine.jpg",
    headline: "Omnichannel Dental Consultation, Smile Design & Patient Care Ecosystem",
    tagline: "Connecting patients with certified dental clinics, specialist orthodontists, and digital treatment plan tracking.",
    year: "",
    overview: "Live to Smile is a dedicated healthcare and dental wellness platform. First Logic Meta Lab architected an end-to-end patient care ecosystem enabling users to book dental consultations, explore cosmetic smile design packages, manage appointment schedules, and access digital treatment records.",
    challenge: "Building a patient-centric healthcare platform capable of handling real-time dentist availability schedules, treatment plan tracking, pre/post-procedure guidelines, and multi-clinic appointment management with secure health record encryption.",
    solution: "FLML engineered a high-performance cross-platform mobile and web application built with Flutter and powered by Firebase cloud services (Cloud Firestore, Realtime DB, Firebase Auth, Cloud Functions, and Firebase Storage) with end-to-end data security.",
    impact: "Streamlined dental appointment bookings, reduced patient waiting times, and provided clinics with a unified patient relationship management tool.",
    stats: [
      { label: "Platform Architecture", value: "Healthcare & Dental Care" },
      { label: "Mobile Framework", value: "Flutter Cross-Platform" },
      { label: "Cloud Engine", value: "Firebase Real-Time DB" },
      { label: "Core Services", value: "Bookings, Records, Smile Design" }
    ],
    techStack: [
      { category: "Mobile Applications", items: ["Flutter (iOS & Android)"] },
      { category: "Clinic Management Portal", items: ["Flutter Web", "React", "JavaScript / TypeScript"] },
      { category: "Cloud Database & Realtime", items: ["Cloud Firestore", "Firebase Realtime DB", "Firebase Storage"] },
      { category: "Serverless & Reminders", items: ["Firebase Cloud Functions", "Firebase Auth", "Firebase Cloud Messaging (FCM)"] }
    ],
    features: [
      { title: "Online Dentist & Specialist Consultation Booking", description: "Seamless appointment scheduling for general dentistry, orthodontics, and cosmetic smile transformation procedures." },
      { title: "Digital Treatment Plan & Medical Records Vault", description: "Enables patients to access digital prescription records, treatment progress timelines, and post-procedure care instructions." },
      { title: "Clinic Management & Automated Appointment Reminders", description: "Empowers dental clinics to manage doctor rosters, track patient visit histories, and send automated FCM appointment reminder alerts." }
    ]
  },
  "first-tap": {
    id: "first-tap",
    name: "First Tap NFC & Digital Card Platform",
    category: "NFC BUSINESS CARD WRITER & DIGITAL PROFILE PLATFORM",
    client: "First Tap",
    clientLogo: "/client/first_tap.jpeg",
    screenshot: "/screenshots/karikku.jpg",
    headline: "Smart NFC Card Writing, Digital Business Card & Dynamic QR Code Engine",
    tagline: "Transforming physical networking with contact-free NFC smart cards, dynamic QR profile generators, and lead capture analytics.",
    year: "",
    overview: "First Tap is a modern contact-free networking and smart business card platform. First Logic Meta Lab architected an end-to-end hardware-to-software ecosystem allowing professionals and enterprise teams to write custom contact profiles onto NFC smart cards, generate dynamic QR codes, and capture sales leads instantly upon tap.",
    challenge: "Bridging physical NFC card writing hardware protocols (NDEF encoding) with real-time digital profile web pages, dynamic QR code generators, and contact book vCard downloads across iOS and Android devices.",
    solution: "FLML engineered a cross-platform mobile application using Flutter with native NFC reader/writer hardware bindings, paired with a web digital profile rendering engine built with React and backed by Firebase cloud services (Cloud Firestore, Firebase Auth, Cloud Functions).",
    impact: "Eliminated paper business card waste, enabled instant touchless contact exchange via NFC & QR codes, and empowered corporate sales teams to track networking lead conversion analytics.",
    stats: [
      { label: "Platform Architecture", value: "NFC Smart Card & QR Engine" },
      { label: "Mobile Framework", value: "Flutter & Native NFC (NDEF)" },
      { label: "Web Profile Portal", value: "React & TypeScript" },
      { label: "Cloud Infrastructure", value: "Firebase Real-Time DB" }
    ],
    techStack: [
      { category: "Mobile Apps (NFC Writer & App)", items: ["Flutter (iOS & Android)", "Native CoreNFC / Android NFC (NDEF)"] },
      { category: "Digital Profile Web Storefront", items: ["React", "JavaScript / TypeScript"] },
      { category: "Cloud Database & Realtime", items: ["Cloud Firestore", "Firebase Realtime DB", "Firebase Storage"] },
      { category: "Serverless & Analytics", items: ["Firebase Cloud Functions", "Firebase Auth", "Google Cloud Analytics"] }
    ],
    features: [
      { title: "Native NFC Smart Card Reader & Writer", description: "Enables users to program NDEF records, social links, contact vCards, and portfolio URLs directly onto physical NFC plastic, wood, or metal cards." },
      { title: "Dynamic QR Code Generator & Digital Profile", description: "Generates real-time customizable QR codes linked to rich digital landing pages showcasing contact info, social handles, lead forms, and media links." },
      { title: "Contact Book Auto-Save & Lead Capture Analytics", description: "Allows recipients to save contacts directly into their phonebook (.vcf) with one tap, while tracking profile view metrics and tap analytics for business teams." }
    ]
  },
  ebotto: {
    id: "ebotto",
    name: "Ebotto AI Conversational Engine",
    category: "AI CHATBOT AUTOMATION & OMNICHANNEL MESSAGING SAAS",
    client: "Ebotto",
    clientLogo: "/client/ebotto.jpeg",
    screenshot: "/screenshots/healine.jpg",
    headline: "Omnichannel AI Chatbot & Conversational Automation Engine for Business Messaging",
    tagline: "Automating customer support, lead qualification, and order updates across WhatsApp, Web Chat, and Mobile Apps.",
    year: "",
    overview: "Ebotto is an enterprise AI chatbot and conversational automation SaaS platform. First Logic Meta Lab architected an intelligent messaging engine enabling businesses to deploy automated AI chatbots across WhatsApp API, website widgets, and mobile apps to handle customer inquiries, capture sales leads, and route complex support tickets.",
    challenge: "Building a low-latency conversational AI engine capable of handling high-volume concurrent chat sessions, contextual NLP query resolution, multi-channel webhook integrations, and seamless human agent handoffs.",
    solution: "FLML engineered a multi-tenant cloud SaaS platform built with React and Node.js microservices, powered by Firebase real-time messaging, Cloud Firestore session persistence, and NLP AI conversational models.",
    impact: "Reduced customer support response times by 80%, automated 24/7 lead qualification for sales teams, and streamlined WhatsApp business notifications.",
    stats: [
      { label: "Platform Architecture", value: "AI Conversational SaaS" },
      { label: "Frontend Framework", value: "React & TypeScript" },
      { label: "Backend Microservices", value: "Node.js & Python AI" },
      { label: "Cloud Messaging", value: "Firebase & WhatsApp API" }
    ],
    techStack: [
      { category: "Web Dashboard & Bot Studio", items: ["React", "JavaScript / TypeScript"] },
      { category: "Backend & AI Engine", items: ["Node.js", "Express.js", "Python NLP Services"] },
      { category: "Cloud Database & Session Vault", items: ["Cloud Firestore", "Firebase Realtime DB", "Redis Cache"] },
      { category: "Messaging Channels", items: ["WhatsApp Business API", "Firebase Cloud Messaging", "WebSockets"] }
    ],
    features: [
      { title: "Visual AI Chatbot Flow Builder", description: "Drag-and-drop conversational bot builder allowing non-technical managers to create custom decision trees, auto-reply logic, and FAQ workflows." },
      { title: "WhatsApp & Omnichannel Integration Engine", description: "Seamless deployment across WhatsApp Business API, live website chat widgets, and mobile apps with a unified conversation inbox." },
      { title: "Live Human Agent Handoff & Analytics Studio", description: "Intelligent ticket routing that automatically escalates complex customer queries to live support agents with complete conversation history." }
    ]
  },
  schosys: {
    id: "schosys",
    name: "Schosys School Management ERP",
    category: "ENTERPRISE SCHOOL MANAGEMENT ERP & EDTECH PLATFORM",
    client: "Schosys",
    clientLogo: "/client/schosys.jpeg",
    screenshot: "/screenshots/healine.jpg",
    headline: "Omnichannel School Management ERP, Attendance, Exam Grading & Fee Collection Engine",
    tagline: "Connecting school administrators, teachers, students, and parents under a unified educational ERP platform.",
    year: "",
    overview: "Schosys is a comprehensive enterprise School Management ERP and EdTech platform. First Logic Meta Lab architected an end-to-end educational management ecosystem supporting Student Portals, Teacher Gradebooks, Parent Communication Portals, Attendance Tracking, Fee Collection Pipelines, and Academic Performance Analytics.",
    challenge: "Unifying multi-role school workflows—synchronizing daily student attendance, teacher mark entry, term report card generation, digital fee payment reconciliation, and real-time parent notifications across desktop and mobile devices.",
    solution: "FLML engineered a multi-tenant cross-platform mobile and web ERP suite built with Flutter and powered by Firebase cloud infrastructure (Cloud Firestore, Realtime DB, Firebase Auth, Cloud Functions, and Firebase Storage) with role-based access control (RBAC).",
    impact: "Digitized school administrative workflows, eliminated report card errors, accelerated fee collection cycles, and enhanced parent-teacher transparency.",
    stats: [
      { label: "Platform Architecture", value: "School Management ERP" },
      { label: "Mobile & Web Framework", value: "Flutter Cross-Platform" },
      { label: "Cloud Infrastructure", value: "Firebase Real-Time DB" },
      { label: "Core Modules", value: "Attendance, Marks, Fees, Parents" }
    ],
    techStack: [
      { category: "Mobile Apps (Parents & Students)", items: ["Flutter (iOS & Android)"] },
      { category: "School Admin & Teacher Web Portals", items: ["Flutter Web", "React", "JavaScript / TypeScript"] },
      { category: "Cloud Database & Realtime", items: ["Cloud Firestore", "Firebase Realtime DB", "Firebase Storage"] },
      { category: "Serverless & Messaging", items: ["Firebase Cloud Functions", "Firebase Auth", "Firebase Cloud Messaging (FCM)"] }
    ],
    features: [
      { title: "Daily Attendance & Leave Management", description: "Biometric and teacher mobile attendance marking with instant FCM push notification alerts sent to parents upon student check-in/absence." },
      { title: "Teacher Gradebook & Automated Report Cards", description: "Empowers teachers to enter exam marks, compute GPA grades automatically, generate downloadable PDF report cards, and track student academic progress." },
      { title: "Online Fee Collection & Financial Invoicing", description: "Digital fee payment portal supporting online payment gateways, automated fee receipts, installment schedules, and overdue balance alerts." }
    ]
  },
  finalfx: {
    id: "finalfx",
    name: "FinalFX Multi-Restaurant POS Platform",
    category: "MULTI-TENANT RESTAURANT POS & KITCHEN DISPATCH SAAS",
    client: "FinalFX",
    clientLogo: "/client/finalfx.png",
    screenshot: "/screenshots/karikku.jpg",
    headline: "Multi-Tenant Restaurant Point of Sale, KOT Routing & Table Management System",
    tagline: "Powering several restaurant chains with instant POS billing, thermal KOT dispatch, and centralized multi-outlet analytics.",
    year: "",
    overview: "FinalFX is an enterprise multi-tenant Restaurant Point of Sale (POS) and Kitchen Order Token (KOT) management SaaS platform. First Logic Meta Lab architected a scalable hospitality operating system deployed across numerous restaurant branches, fine-dining establishments, and quick-service food chains.",
    challenge: "Architecting a multi-tenant cloud POS platform capable of operating synchronously across hundreds of restaurant outlets—ensuring zero-latency cashier billing, multi-kitchen KOT printing, offline payment queueing, and centralized chain-level inventory management.",
    solution: "FLML engineered a high-concurrency cloud and desktop POS platform built with React, Node.js microservices, and Flutter, backed by Firebase real-time sync infrastructure, Cloud Firestore tenant isolation, and thermal printer hardware integrations.",
    impact: "Accelerated checkout speeds across partner restaurants, eliminated order miscommunication between dining rooms and kitchens, and provided restaurant chain owners with real-time multi-branch sales analytics.",
    stats: [
      { label: "Platform Architecture", value: "Multi-Tenant Restaurant POS" },
      { label: "System Framework", value: "React & Flutter Cross-Platform" },
      { label: "Backend Architecture", value: "Node.js Microservices & Cloud DB" },
      { label: "Deployment Scope", value: "Multi-Outlet Restaurant Chains" }
    ],
    techStack: [
      { category: "POS Terminal & Tablet Apps", items: ["Flutter (Desktop & Mobile POS)", "React"] },
      { category: "Backend Microservices", items: ["Node.js", "Express.js"] },
      { category: "Cloud Database & Realtime", items: ["Cloud Firestore", "Firebase Realtime DB", "Redis Cache"] },
      { category: "Hardware & Integration", items: ["Thermal ESC/POS Printers", "Barcode Scanners", "Payment Terminals"] }
    ],
    features: [
      { title: "High-Speed Touch POS & Multi-Kitchen KOT Routing", description: "Ultra-fast billing interface with table layout mapping, split payments, and intelligent KOT routing to specific kitchen stations (Grill, Bar, Pastry)." },
      { title: "Multi-Outlet Chain Management & Centralized Inventory", description: "Centralized admin dashboard enabling multi-branch restaurant owners to manage global menu items, recipe ingredient stock, and transfer inventory across branches." },
      { title: "Offline Transaction Caching & Automated Sync", description: "Ensures uninterrupted restaurant billing during internet outages, automatically reconciling transactions with cloud servers once connectivity is restored." }
    ]
  }
};

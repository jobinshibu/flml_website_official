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
  }
};

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Firebase Configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

// Initialize Firebase app only if config exists
const app =
  getApps().length > 0
    ? getApp()
    : firebaseConfig.projectId
    ? initializeApp(firebaseConfig)
    : null;

export const db = app ? getFirestore(app) : null;

export interface LeadData {
  name: string;
  contact: string; // Email or Phone
  projectBrief: string;
  source?: string;
}

/**
 * Saves a prospective client lead to Firebase Firestore ('leads' collection)
 * Falls back gracefully if Firebase is not yet configured.
 */
export async function saveLeadToFirestore(lead: LeadData) {
  if (!db) {
    console.warn("Firebase Firestore is not initialized. Saving lead locally...");
    // Fallback: Store lead in localStorage if available on client
    if (typeof window !== "undefined") {
      const existing = JSON.parse(localStorage.getItem("flml_leads") || "[]");
      existing.push({ ...lead, timestamp: new Date().toISOString() });
      localStorage.setItem("flml_leads", JSON.stringify(existing));
    }
    return { success: true, mode: "local" };
  }

  try {
    const leadsRef = collection(db, "leads");
    const docRef = await addDoc(leadsRef, {
      name: lead.name,
      contact: lead.contact,
      projectBrief: lead.projectBrief,
      source: lead.source || "FLML Website AI Chatbot",
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id, mode: "firestore" };
  } catch (error) {
    console.error("Error saving lead to Firestore:", error);
    return { success: false, error: String(error) };
  }
}

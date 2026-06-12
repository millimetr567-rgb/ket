import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { title, author, action } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Initialize Gemini API
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    let prompt = "";
    if (action === "annotate") {
      prompt = `Siz kutubxona tizimi uchun yordamchi AI siz. '${title}' (Muallif: ${author || 'noma\'lum'}) nomli kitob uchun o'zbek tilida qisqacha (3-4 gap) va qiziqarli annotatsiya (tavsif) yozib bering.`;
    } else if (action === "keywords") {
      prompt = `'${title}' (Muallif: ${author || 'noma\'lum'}) nomli kitobga oid 5-7 ta kalit so'zlarni (vergul bilan ajratilgan holda, o'zbek tilida) qaytaring. Qo'shimcha matnsiz faqat so'zlarni.`;
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({ result: response.text });
  } catch (error: any) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "AI xizmati ishlamayapti yoki API kalit sozlanmagan." }, { status: 500 });
  }
}

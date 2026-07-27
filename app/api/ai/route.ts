import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

function cleanJson(text:string){ return text.replace(/```json/gi,'').replace(/```/g,'').trim(); }
export async function POST(request:NextRequest){
  try {
    const {dish,question,history=[]}=await request.json();
    if(!dish||!question) return NextResponse.json({answer:'Please select a dish and ask a question.',healthScore:'N/A'},{status:400});
    const key=process.env.GEMINI_API_KEY; if(!key) throw new Error('Missing GEMINI_API_KEY');
    const genAI=new GoogleGenerativeAI(key); const model=genAI.getGenerativeModel({model:'gemini-3.5-flash'});
    const prompt=`You are FlavorHub AI, a friendly and knowledgeable nutrition expert and restaurant assistant. You are NOT a doctor but you give helpful food guidance.

Context:
Selected Dish: ${JSON.stringify(dish)}
User Question: ${question}
Chat History: ${JSON.stringify(history)}

Your task:
1. Answer the user's question specifically about this dish
2. Use the ingredients and nutrition facts provided
3. Be helpful, concise, friendly, conversational
4. If user asks for healthier alternative, suggest a lighter option and explain why
5. If user asks about allergies, be extra careful and highlight allergens
6. If user asks about weight loss, gym, vegetarian, diabetes, tailor answer
7. Return VALID JSON ONLY, no markdown, no explanation outside JSON, in this EXACT schema:

{
  "answer": "Your detailed friendly answer here in 3-5 sentences or bullet points, max 150 words",
  "healthScore": "8/10",
  "suggestedAlternative": "Grilled Veg Bowl (optional, if user asked for alternative)"
}

RULES:
- answer must be easy to understand, non-judgmental
- Never prescribe medicine
- Never mention you are AI model
- If dish contains allergen user is concerned about, warn clearly
- Keep tone warm, like a helpful waiter who knows nutrition
- If question is not related to food, politely bring back to dish: "I can help you with questions about this dish!"`;
    const result=await model.generateContent(prompt); const parsed=JSON.parse(cleanJson(result.response.text()));
    return NextResponse.json({answer:parsed.answer??'Please try asking that another way.',healthScore:parsed.healthScore??`${dish.healthScore}/10`,suggestedAlternative:parsed.suggestedAlternative});
  } catch(error){ console.error('Gemini request failed',error); return NextResponse.json({answer:"I'm having trouble analyzing this dish right now. Please try again.",healthScore:'N/A'}); }
}

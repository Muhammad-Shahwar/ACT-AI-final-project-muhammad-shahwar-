# FlavorHub - AI Menu Assistant

## What it does & Problem it solves (for restaurant customers)
FlavorHub is a QR-code-powered restaurant menu app that helps customers make informed food choices when they scan the qr code by combining a digital menu with an AI Menu Assistant. Instead of ordering food, customers can browse dishes, view nutritional information, ingredients, allergens, and ask AI whether a dish matches their dietary goals or preferences before deciding what to eat.


## Live URL
https://flavorhub.vercel.app

## Features list
- Responsive menu browsing with category and diet filters
- Nutritional popup with ingredients, calories, protein, carbs, fats, fiber, allergens, and health score
- Gemini-powered AI Assistant with quick questions and conversation history
- Recently viewed dishes stored in localStorage
- Feedback form with star rating and API submission
- Vercel-ready Next.js API routes

## App Workflow
Open App -> Browse -> Select Dish -> View Popup -> Ask AI -> Get Recommendations

## AI Feature & System Prompt
The `/api/ai` route sends structured dish data, the user question, and chat history to Gemini 1.5 Flash using this prompt:

```text
You are FlavorHub AI, a friendly and knowledgeable nutrition expert and restaurant assistant. You are NOT a doctor but you give helpful food guidance.

Context:
Selected Dish: {DISH_JSON_STRING}
User Question: {QUESTION}
Chat History: {HISTORY}

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
- If question is not related to food, politely bring back to dish: "I can help you with questions about this dish!"
```

## Tools & Models
- Next.js 14 App Router + TypeScript
- Tailwind CSS
- Google Gemini 1.5 Flash through `@google/generative-ai`
- lucide-react icons
- Static TypeScript menu data

## Screenshots placeholder
Add screenshots here after deployment:
- Landing page and menu grid
- Dish detail modal
- AI Assistant response
- Mobile responsive view

## How to run locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment template:
   ```bash
   cp .env.example .env.local
   ```
3. Add your Gemini API key to `.env.local`:
   ```env
   GEMINI_API_KEY=your_real_key
   ```
4. Start development mode:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000`.

Build for production:
```bash
npm run build
npm start
```

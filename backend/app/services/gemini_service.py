import json
from google import genai
from app.core.config import settings

class GeminiService:
    def __init__(self):
        """Initialize the Google GenAI client."""
        self.client = genai.Client(api_key=settings.GEMINI_API_KEY)
        self.model_name = "gemini-2.5-flash"

    async def generate_career_recommendation(self, user_profile: dict, completed_skills: list) -> str:
        """Generate AI career recommendation."""
        system_instruction = "You are a professional, encouraging, data-driven Career Advisor. Provide recommendations in JSON format matching CareerRecommendation schema."
        prompt = f"User Profile: {json.dumps(user_profile)}\nCompleted Skills: {completed_skills}\nRecommend career tracks."
        
        response = self.client.models.generate_content(
            model=self.model_name,
            contents=prompt,
            config=genai.types.GenerateContentConfig(
                system_instruction=system_instruction,
                response_mime_type="application/json"
            )
        )
        return response.text

    async def conduct_interview(self, conversation_history: list, interview_type: str, role: str) -> str:
        """Conduct an AI mock interview."""
        system_instruction = f"You are a professional Interviewer for a {role} position ({interview_type} interview). Follow interview structure, ask one question at a time, and ask follow-ups."
        
        formatted_history = ""
        for msg in conversation_history:
            formatted_history += f"{msg['role']}: {msg['content']}\n"
            
        prompt = f"Continue the interview.\nHistory:\n{formatted_history}"
        
        response = self.client.models.generate_content(
            model=self.model_name,
            contents=prompt,
            config=genai.types.GenerateContentConfig(
                system_instruction=system_instruction
            )
        )
        return response.text

    async def generate_interview_feedback(self, conversation_history: list) -> dict:
        """Generate feedback based on interview history."""
        system_instruction = "You are an expert interviewer evaluator. Output JSON matching InterviewFeedback schema."
        
        formatted_history = ""
        for msg in conversation_history:
            formatted_history += f"{msg['role']}: {msg['content']}\n"
            
        prompt = f"Evaluate the candidate based on this interview transcript:\n{formatted_history}"
        
        response = self.client.models.generate_content(
            model=self.model_name,
            contents=prompt,
            config=genai.types.GenerateContentConfig(
                system_instruction=system_instruction,
                response_mime_type="application/json"
            )
        )
        return json.loads(response.text)

    async def chat_with_mentor(self, conversation_history: list, user_context: dict) -> str:
        """Chat with the AI mentor."""
        system_instruction = "You are a friendly, supportive mentor knowledgeable about tech careers."
        
        formatted_history = ""
        for msg in conversation_history:
            formatted_history += f"{msg['role']}: {msg['content']}\n"
            
        prompt = f"User Context: {json.dumps(user_context)}\nContinue chat:\n{formatted_history}"
        
        response = self.client.models.generate_content(
            model=self.model_name,
            contents=prompt,
            config=genai.types.GenerateContentConfig(
                system_instruction=system_instruction
            )
        )
        return response.text

    async def generate_daily_quote(self) -> str:
        """Generate a daily motivational quote."""
        response = self.client.models.generate_content(
            model=self.model_name,
            contents="Generate a short, inspiring quote for a software engineering student. Just the quote."
        )
        return response.text

gemini_service = GeminiService()

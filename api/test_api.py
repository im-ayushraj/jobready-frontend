import sys
import os
from dotenv import load_dotenv

# Add the parent directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from api.ai_services import AIServices

load_dotenv()

def test_api_connection():
    # Initialize the AI service
    ai_service = AIServices()
    
    # Test parameters
    role = "Software Engineer"
    company = "Google"
    experience_level = "Mid-level"
    
    print("Testing API connection...")
    
    # Test market analysis
    print("\nTesting market analysis...")
    market_analysis = ai_service.analyze_job_market(role, company)
    if market_analysis:
        print("Market analysis successful!")
        print(f"Market overview: {market_analysis.get('market_overview', {})}")
    else:
        print("Market analysis failed!")
    
    # Test career plan generation
    print("\nTesting career plan generation...")
    career_plan = ai_service.generate_career_plan(role, experience_level)
    if career_plan:
        print("Career plan generation successful!")
        print(f"Core analysis: {career_plan.get('core_analysis', {})}")
    else:
        print("Career plan generation failed!")
    
    # Test company culture analysis
    print("\nTesting company culture analysis...")
    company_culture = ai_service.analyze_company_culture(company)
    if company_culture:
        print("Company culture analysis successful!")
        print(f"Work-life balance: {company_culture.get('work_life_balance', {})}")
    else:
        print("Company culture analysis failed!")
    
    # Test industry trends analysis
    print("\nTesting industry trends analysis...")
    industry_trends = ai_service.analyze_industry_trends(role)
    if industry_trends:
        print("Industry trends analysis successful!")
        print(f"Market overview: {industry_trends.get('market_overview', {})}")
    else:
        print("Industry trends analysis failed!")
    
    # Test job postings research
    print("\nTesting job postings research...")
    job_postings = ai_service.research_job_postings(role, "San Francisco")
    if job_postings:
        print("Job postings research successful!")
        print(f"Market overview: {job_postings.get('market_overview', {})}")
    else:
        print("Job postings research failed!")

if __name__ == "__main__":
    test_api_connection() 
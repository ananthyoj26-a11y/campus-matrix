import os
import psycopg2
from dotenv import load_dotenv

# Load env variables
load_dotenv(dotenv_path="backend/.env")

# Connect to DB
db_url = os.environ.get("DIRECT_URL")
if not db_url:
    print("DIRECT_URL not found in .env")
    exit(1)

print(f"Connecting to database...")

try:
    conn = psycopg2.connect(db_url)
    conn.autocommit = True
    cursor = conn.cursor()

    # Read SQL file
    sql_file = r"C:\Users\Ananth\.gemini\antigravity\brain\b2cda100-254f-44d2-b101-cfeaba61305a\Supabase_Schema.md"
    
    print(f"Reading SQL from {sql_file}")
    with open(sql_file, "r") as f:
        sql = f.read()
        
    print("Executing SQL...")
    cursor.execute(sql)
    print("Successfully executed SQL!")
    
    cursor.close()
    conn.close()
    
except Exception as e:
    print(f"Error: {e}")

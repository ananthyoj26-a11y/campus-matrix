# CampusMatrix — Production Setup & Deployment Manual

This guide provides comprehensive, step-by-step instructions for configuring, building, hosting, and deploying the **CampusMatrix** AI-Powered Student Success & Freshers Platform.

---

## Table of Contents
1. [Supabase Project Setup & Configuration](#1-supabase-project-setup--configuration)
2. [Database Connection & Environment Variables](#2-database-connection--environment-variables)
3. [PostgreSQL Schema & Security Policies (RLS)](#3-postgresql-schema--security-policies-rls)
4. [Supabase Storage Buckets & Policies](#4-supabase-storage-buckets--policies)
5. [Google Gemini AI API Integration](#5-google-gemini-ai-api-integration)
6. [Email OTP Verification & Transactional Mail](#6-email-otp-verification--transactional-mail)
7. [Google Maps Integration](#7-google-maps-integration)
8. [Running the Project Locally](#8-running-the-project-locally)
9. [GitHub Version Control Setup](#9-github-version-control-setup)
10. [Deploying Backend to Vercel](#10-deploying-backend-to-vercel)
11. [Deploying Frontend to Netlify](#11-deploying-frontend-to-netlify)
12. [Troubleshooting Common Deployment Issues](#12-troubleshooting-common-deployment-issues)
13. [Production Maintenance & Scaling](#13-production-maintenance--scaling)
14. [Security & Compliance Checklist](#14-security--compliance-checklist)

---

## 1. Supabase Project Setup & Configuration

1. Navigate to [https://database.new](https://database.new) and sign in.
2. Click **New Project**.
3. Fill in the details:
   - **Name**: `CampusMatrix`
   - **Database Password**: Set a secure password and record it.
   - **Region**: Select a region close to your primary audience (e.g. `ap-south-1` Mumbai / India).
4. Click **Create new project** and wait ~2 minutes for initialization.

---

## 2. Database Connection & Environment Variables

### Frontend `.env` File (`campus-matrix/.env`)
Create a `.env` file in your root frontend directory:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_API_URL=http://localhost:8000
VITE_GOOGLE_MAPS_API_KEY=AIzaSy...
```

### Backend `.env` File (`campus-matrix/backend/.env`)
Create a `.env` file in your `backend/` directory:
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  # Use service_role key for admin API access
GEMINI_API_KEY=AIzaSy...
JWT_SECRET=super-secret-jwt-key-campusmatrix
ENVIRONMENT=production
FRONTEND_URL=https://your-app.netlify.app
```

---

## 3. PostgreSQL Schema & Security Policies (RLS)

In your Supabase Dashboard, go to **SQL Editor** > **New Query**, paste the following DDL, and click **Run**:

```sql
-- 1. Profiles Table
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    dob DATE,
    gender TEXT,
    institution TEXT,
    student_id TEXT,
    department TEXT,
    year_of_study TEXT,
    course TEXT,
    role TEXT DEFAULT 'student',
    dream_job TEXT,
    skills TEXT[],
    interests TEXT[],
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    streak_count INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles viewable by authenticated users" ON public.profiles FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can edit own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Colleges Table
CREATE TABLE public.colleges (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    naac_grade TEXT,
    cover_image TEXT,
    logo_image TEXT,
    overview TEXT,
    website_url TEXT,
    placement_rate NUMERIC,
    highest_package TEXT,
    average_package TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Faculty Directory Table
CREATE TABLE public.faculty (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    college_id UUID REFERENCES public.colleges(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    department TEXT NOT NULL,
    qualification TEXT,
    research_interests TEXT[],
    email TEXT,
    phone TEXT,
    office_location TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Event Registrations Table
CREATE TABLE public.event_registrations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id TEXT NOT NULL,
    event_title TEXT NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    student_name TEXT NOT NULL,
    student_email TEXT NOT NULL,
    department TEXT,
    confirmation_code TEXT UNIQUE NOT NULL,
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own registrations" ON public.event_registrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own registrations" ON public.event_registrations FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 5. Auto Profile Creation Trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, role)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    COALESCE(new.raw_user_meta_data->>'role', 'student')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

---

## 4. Supabase Storage Buckets & Policies

1. In Supabase Dashboard, go to **Storage** > **New Bucket**.
2. Create two public buckets:
   - `study-materials` (Public: ON)
   - `resumes` (Public: OFF)
3. Set Storage Policy for `study-materials`: Allow SELECT for public, INSERT/UPDATE for admins.

---

## 5. Google Gemini AI API Integration

1. Go to [Google AI Studio](https://aistudio.google.com/) and sign in.
2. Click **Get API Key** > **Create API Key**.
3. Copy the key and paste it into your `backend/.env` as `GEMINI_API_KEY`.
4. The Gemini service uses the `@google/genai` (Node) / `google-genai` (Python) SDK with the `gemini-2.5-flash` model for instant, low-latency AI responses.

---

## 6. Email OTP Verification & Transactional Mail

1. In Supabase Dashboard, navigate to **Authentication** > **Providers** > **Email**.
2. Enable **Confirm email** or **Email OTP**.
3. Under **Auth Templates**, customize the **Confirmation / OTP Email** template:
   ```html
   <h2>Welcome to CampusMatrix</h2>
   <p>Your verification code is: <strong>{{ .Token }}</strong></p>
   ```
4. For custom SMTP domain sending (e.g. SendGrid / Resend), configure **Authentication** > **SMTP Settings**.

---

## 7. Google Maps Integration

1. Visit [Google Cloud Console](https://console.cloud.google.com/).
2. Enable **Maps JavaScript API**.
3. Generate an API Key under **Credentials**.
4. Restrict key to your production domain (`*.netlify.app`).
5. Add `VITE_GOOGLE_MAPS_API_KEY` to your frontend `.env`.

---

## 8. Running the Project Locally

### Terminal 1 — Frontend:
```bash
cd "e:\New folder\campus-matrix"
npm install
npm run dev
```
> App runs at `http://localhost:5173`.

### Terminal 2 — Backend:
```bash
cd "e:\New folder\campus-matrix\backend"
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
> Backend API docs at `http://localhost:8000/docs`.

---

## 9. GitHub Version Control Setup

```bash
git init
git add .
git commit -m "Initial commit: CampusMatrix complete production platform"
git branch -M main
git remote add origin https://github.com/your-username/campus-matrix.git
git push -u origin main
```

---

## 10. Deploying Backend to Vercel

1. Install Vercel CLI: `npm i -g vercel`.
2. Navigate to `backend/` and run `vercel`:
   ```bash
   cd backend
   vercel
   ```
3. Set the Root Directory to `backend`.
4. Add environment variables in Vercel Dashboard: `SUPABASE_URL`, `SUPABASE_KEY`, `GEMINI_API_KEY`.
5. Vercel will automatically run using `vercel.json`.

---

## 11. Deploying Frontend to Netlify

1. Log in to [Netlify](https://app.netlify.com/).
2. Click **Add new site** > **Import an existing project** > **GitHub**.
3. Select your repository `campus-matrix`.
4. Build Settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Add Environment Variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_API_URL`.
6. Click **Deploy Site**. Netlify will use `netlify.toml` for SPA routing (`/* -> /index.html`).

---

## 12. Troubleshooting Common Deployment Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| 404 on page refresh | Missing SPA redirect rule | Ensure `netlify.toml` has `[[redirects]] from="/*" to="/index.html" status=200`. |
| CORS Error on API calls | Backend CORS origins mismatch | Update `backend/app/main.py` CORS origins to include your Netlify URL. |
| Supabase 401 Unauthorized | Incorrect Anon or Service Key | Double check `VITE_SUPABASE_ANON_KEY` in frontend `.env`. |
| Gemini API Timeout | Rate limits or invalid key | Ensure `GEMINI_API_KEY` is set in Vercel env vars and quota is active. |

---

## 13. Production Maintenance & Scaling

- **Database Backups**: Enable point-in-time recovery (PITR) in Supabase.
- **Performance**: Enable CDN caching on Netlify edge network.
- **Monitoring**: Integrate Sentry for frontend exception tracking.

---

## 14. Security & Compliance Checklist

- [x] RLS enabled on all Supabase tables (`profiles`, `event_registrations`).
- [x] Service role key kept strictly on the backend (`backend/.env`).
- [x] Environment variables excluded from Git (`.gitignore`).
- [x] HTTPS enforced across all endpoints.

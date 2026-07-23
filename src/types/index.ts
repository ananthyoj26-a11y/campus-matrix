export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin' | 'mentor';
  avatarUrl?: string;
  createdAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  bio?: string;
  university?: string;
  major?: string;
  graduationYear?: number;
  skills: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  resumeUrl?: string;
  streakCount: number;
  totalPoints: number;
}

export interface CodingProblem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  tags: string[];
  initialCode: Record<string, string>; // Language -> Code
  testCases: TestCase[];
  solution?: string;
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface Submission {
  id: string;
  userId: string;
  problemId: string;
  code: string;
  language: string;
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error' | 'Compilation Error';
  executionTimeMs: number;
  memoryKb: number;
  createdAt: string;
}

export interface InterviewSession {
  id: string;
  userId: string;
  role: string; // e.g., 'Frontend Developer', 'Data Scientist'
  company?: string;
  status: 'Scheduled' | 'In Progress' | 'Completed';
  scheduledAt: string;
  feedback?: string;
  score?: number;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  description: string;
  requirements: string[];
  postedAt: string;
  deadline?: string;
  applyUrl: string;
}

export interface Hackathon {
  id: string;
  name: string;
  organizer: string;
  description: string;
  startDate: string;
  endDate: string;
  teamSizeMax: number;
  prizePool: string;
  tags: string[];
  registrationUrl: string;
}

export interface Guild {
  id: string;
  name: string;
  description: string;
  avatarUrl?: string;
  memberCount: number;
  tags: string[];
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  criteria: string;
}

export interface UserBadge {
  id: string;
  userId: string;
  badgeId: string;
  earnedAt: string;
}

export interface DailyActivity {
  id: string;
  userId: string;
  date: string;
  activityType: 'coding' | 'interview' | 'learning';
  pointsEarned: number;
}

export interface CareerTrack {
  id: string;
  title: string;
  description: string;
  iconUrl?: string;
  nodes: SkillNode[];
}

export interface SkillNode {
  id: string;
  title: string;
  description: string;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  resources: { title: string; url: string; type: 'video' | 'article' | 'course' }[];
  dependencies: string[]; // IDs of node prerequisites
}

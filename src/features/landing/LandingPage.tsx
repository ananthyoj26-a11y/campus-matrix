import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom'; /* Assuming react-router v7 is being used */
import { 
  Sun, Moon, ArrowRight, Play, Star, Mail, 
  Menu, X, Map, Code, Users, Briefcase, Trophy, BarChart, ChevronRight 
} from 'lucide-react';
import './LandingPage.css';

const CountUp = ({ end, duration = 2, suffix = '' }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const ScrollAnimation = ({ children, className = '', delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`animate-on-scroll ${isVisible ? 'is-visible' : ''} delay-${delay} ${className}`}>
      {children}
    </div>
  );
};


const LandingPage = () => {
  const [theme, setTheme] = useState('dark');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const features = [
    { icon: <Map />, title: "Smart Career Roadmap", desc: "AI-generated personalized learning paths tailored to your dream role." },
    { icon: <Code />, title: "Coding Practice Hub", desc: "500+ problems with built-in editor, auto-grading, and difficulty progression." },
    { icon: <Users />, title: "AI Mock Interviews", desc: "Practice with Gemini AI interviewer and get instant feedback on your answers." },
    { icon: <Briefcase />, title: "Campus Careers", desc: "Exclusive job listings, internships, and placement opportunities from top companies." },
    { icon: <Trophy />, title: "Hackathons & Guilds", desc: "Join coding competitions, form teams, and grow with student communities." },
    { icon: <BarChart />, title: "Analytics Dashboard", desc: "Track your progress, identify gaps, and celebrate your growth journey." }
  ];

  const steps = [
    { num: 1, icon: <Users />, title: "Sign Up", desc: "Create your profile and set career goals" },
    { num: 2, icon: <Map />, title: "Get Your Roadmap", desc: "AI generates your personalized learning path" },
    { num: 3, icon: <Code />, title: "Practice & Grow", desc: "Solve problems, ace interviews, earn badges" },
    { num: 4, icon: <Briefcase />, title: "Land Your Dream Job", desc: "Get placed through campus partnerships" }
  ];

  const testimonials = [
    { initial: "A", bg: "bg-1", name: "Ananya S.", college: "Tech Institute", year: "Class of 2024", quote: "CampusMatrix completely transformed how I prepared for placements. The AI mock interviews were incredibly realistic." },
    { initial: "R", bg: "bg-2", name: "Rahul K.", college: "State University", year: "Class of 2025", quote: "The personalized roadmap kept me focused. I wasn't just solving random problems, I was building towards my dream role." },
    { initial: "M", bg: "bg-3", name: "Maya P.", college: "Engineering College", year: "Class of 2023", quote: "Got my first internship through the Campus Careers portal. The community here is just amazing." }
  ];

  return (
    <div className="landing-page">
      {/* 1. Navigation Bar */}
      <nav className={`landing-nav ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="nav-logo">
          <span className="gradient-text">CampusMatrix</span> <span>◆</span>
        </Link>
        
        <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#features" className="nav-link">Features</a>
          <a href="#how-it-works" className="nav-link">How It Works</a>
          <a href="#testimonials" className="nav-link">Testimonials</a>
        </div>

        <div className="nav-actions">
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/login" className="btn btn-ghost">Login</Link>
          <Link to="/register" className="btn btn-primary">Get Started</Link>
        </div>

        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* 2. Hero Section */}
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        
        <div className="hero-content">
          <ScrollAnimation>
            <h1 className="hero-title">
              Your AI-Powered <br/>
              <span className="gradient-text">Campus Success Engine</span>
            </h1>
          </ScrollAnimation>
          
          <ScrollAnimation delay={100}>
            <p className="hero-subtitle">
              From first code to first job — CampusMatrix guides your entire campus journey with AI mentoring, skill tracking, and career placement.
            </p>
          </ScrollAnimation>
          
          <ScrollAnimation delay={200}>
            <div className="hero-ctas">
              <Link to="/register" className="btn btn-primary">
                Start Your Journey <ArrowRight size={18} />
              </Link>
              <button className="btn btn-ghost">
                Watch Demo <Play size={18} />
              </button>
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation delay={300}>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-value"><CountUp end={10} suffix=",000+" /></span>
                <span className="stat-label">Students</span>
              </div>
              <div className="stat-item">
                <span className="stat-value"><CountUp end={500} suffix="+" /></span>
                <span className="stat-label">Companies</span>
              </div>
              <div className="stat-item">
                <span className="stat-value"><CountUp end={95} suffix="%" /></span>
                <span className="stat-label">Placement Rate</span>
              </div>
              <div className="stat-item">
                <span className="stat-value"><CountUp end={50} suffix="+" /></span>
                <span className="stat-label">Career Tracks</span>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* 3. Features Section */}
      <section id="features" className="features-section">
        <div className="section-header">
          <ScrollAnimation>
            <h2 className="section-title">Everything You Need to Succeed</h2>
          </ScrollAnimation>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <ScrollAnimation key={index} delay={(index % 3) * 100}>
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="section-header">
          <ScrollAnimation>
            <h2 className="section-title">Your Journey to Success</h2>
          </ScrollAnimation>
        </div>

        <div className="timeline">
          {steps.map((step, index) => (
            <ScrollAnimation key={index} delay={index * 100} className="timeline-step">
              <div className="step-number">{step.num}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </ScrollAnimation>
          ))}
        </div>
      </section>

      {/* 5. Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <ScrollAnimation delay={0}>
            <div className="large-stat gradient-text"><CountUp end={250} suffix="K+" /></div>
            <div className="large-stat-label">Problems Solved</div>
          </ScrollAnimation>
          <ScrollAnimation delay={100}>
            <div className="large-stat gradient-text"><CountUp end={50} suffix="K+" /></div>
            <div className="large-stat-label">Mock Interviews</div>
          </ScrollAnimation>
          <ScrollAnimation delay={200}>
            <div className="large-stat gradient-text"><CountUp end={100} suffix="K+" /></div>
            <div className="large-stat-label">Badges Earned</div>
          </ScrollAnimation>
          <ScrollAnimation delay={300}>
            <div className="large-stat gradient-text"><CountUp end={5} suffix="K+" /></div>
            <div className="large-stat-label">Job Offers</div>
          </ScrollAnimation>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="section-header">
          <ScrollAnimation>
            <h2 className="section-title">Loved by Students</h2>
          </ScrollAnimation>
        </div>

        <div className="testimonials-carousel">
          {testimonials.map((testimonial, index) => (
            <ScrollAnimation key={index} delay={index * 100}>
              <div className="testimonial-card">
                <div className="rating">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="quote">"{testimonial.quote}"</p>
                <div className="user-info">
                  <div className={`avatar ${testimonial.bg}`}>{testimonial.initial}</div>
                  <div className="user-details">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.college}, {testimonial.year}</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
        <div className="carousel-dots">
          <div className="dot active"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="cta-section">
        <ScrollAnimation>
          <div className="cta-container">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Transform Your Campus Journey?</h2>
              <form className="waitlist-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Enter your college email" className="email-input" />
                <button className="btn btn-primary">Join Waitlist</button>
              </form>
              <p className="tagline">Free forever for students</p>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* 8. Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="nav-logo">
              <span className="gradient-text">CampusMatrix</span> <span>◆</span>
            </Link>
            <p>Empowering students to achieve their career goals through AI-driven learning and placement opportunities.</p>
          </div>
          
          <div className="footer-col">
            <h5>Product</h5>
            <ul>
              <li><a href="#">Features</a></li>
              <li><a href="#">Roadmaps</a></li>
              <li><a href="#">Mock Interviews</a></li>
              <li><a href="#">Pricing</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h5>Resources</h5>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">API</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Guides</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h5>Legal</h5>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2026 CampusMatrix. Built for students, by students.</p>
          <div className="social-icons">
            <a href="#" className="social-icon">Twitter</a>
            <a href="#" className="social-icon">GitHub</a>
            <a href="#" className="social-icon">LinkedIn</a>
            <a href="#" className="social-icon"><Mail size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

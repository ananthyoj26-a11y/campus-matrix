import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Calendar, Phone, Target,
  ChevronRight, ChevronLeft, Plus, Trash2, Save, CheckCircle
} from 'lucide-react';
import './OnboardingWizard.css';

const STEPS = [
  { id: 1, name: 'Personal Info' },
  { id: 2, name: 'Academic' },
  { id: 3, name: 'Skills' },
  { id: 4, name: 'Projects' },
  { id: 5, name: 'Internships' },
  { id: 6, name: 'Certifications' },
  { id: 7, name: 'Career Goals' },
  { id: 8, name: 'Profiles' },
  { id: 9, name: 'Review' }
];

const STORAGE_KEY = 'campus_matrix_onboarding_draft';

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '', displayName: '', dob: '', gender: '', bloodGroup: '', nationality: '', primaryMobile: '', alternateMobile: '',
    currentAddress: { street: '', city: '', district: '', state: '', pin: '', country: '' },
    sameAsPermanent: false,
    permanentAddress: { street: '', city: '', district: '', state: '', pin: '', country: '' },
    
    class10: { board: '', school: '', year: '', score: '' },
    class12: { board: '', school: '', stream: '', year: '', score: '' },
    current: { institution: '', degree: '', department: '', branch: '', semester: '', year: '', cgpa: '', backlogs: '' },
    
    technicalSkills: [] as string[], technicalProficiency: 50, softSkills: [] as string[], languagesKnown: '',
    
    projects: [{ id: 1, title: '', tech: '', description: '', githubUrl: '', liveDemoUrl: '' }],
    internships: [{ id: 1, company: '', position: '', duration: '', description: '', certificateUrl: '' }],
    certifications: [{ id: 1, name: '', org: '', date: '', credentialUrl: '' }],
    
    dreamJob: '', dreamCompany: '', preferredIndustry: '', preferredLocations: [] as string[], expectedSalary: '', higherStudies: false, startupInterest: false, interests: '',
    
    linkedin: '', github: '', portfolio: '', leetcode: '', hackerrank: '', codechef: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
        showToast('Draft restored successfully!');
      } catch (e) {
        console.error('Failed to parse draft', e);
      }
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const saveDraft = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    showToast('Draft saved successfully!');
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) setCurrentStep(curr => curr + 1);
  };
  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(curr => curr - 1);
  };
  const handleSubmit = () => {
    console.log('Final Form Data:', formData);
    localStorage.removeItem(STORAGE_KEY);
    setIsCompleted(true);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => {
      const keys = field.split('.');
      if (keys.length === 1) return { ...prev, [field]: value };
      const [parent, child] = keys;
      return { ...prev, [parent]: { ...(prev[parent as keyof typeof prev] as Record<string, any>), [child]: value } };
    });
  };

  const handleArrayChange = (category: string, index: number, field: string, value: string) => {
    const newList = [...(formData as any)[category]];
    newList[index][field] = value;
    setFormData({ ...formData, [category]: newList });
  };
  const addArrayItem = (category: string, defaultItem: any) => {
    setFormData({ ...formData, [category]: [...(formData as any)[category], { ...defaultItem, id: Date.now() }] });
  };
  const removeArrayItem = (category: string, id: number) => {
    setFormData({ ...formData, [category]: (formData as any)[category].filter((item: any) => item.id !== id) });
  };
  const toggleChip = (field: string, value: string) => {
    const currentList = (formData as any)[field];
    if (currentList.includes(value)) setFormData({ ...formData, [field]: currentList.filter((item: string) => item !== value) });
    else setFormData({ ...formData, [field]: [...currentList, value] });
  };

  if (isCompleted) {
    return (
      <div className="onboarding-wizard">
        <div className="wizard-container success-container">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="success-content">
            <div className="success-icon-wrap"><CheckCircle size={64} className="success-icon" /></div>
            <h2>Onboarding Complete!</h2>
            <p>Your profile has been successfully set up.</p>
            <button className="btn-submit mt-4" onClick={() => window.location.href = '/'}>Go to Dashboard</button>
          </motion.div>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="step-title">Personal & Contact Info</h2>
            <p className="step-subtitle">Tell us about yourself and where we can reach you.</p>
            
            <div className="form-grid">
              <div className="form-group"><label className="form-label">Full Name *</label><div className="input-wrapper"><User size={18} className="input-icon" /><input type="text" className="form-input" required value={formData.fullName} onChange={(e) => handleChange('fullName', e.target.value)} placeholder="John Doe" /></div></div>
              <div className="form-group"><label className="form-label">Display Name</label><div className="input-wrapper"><User size={18} className="input-icon" /><input type="text" className="form-input" value={formData.displayName} onChange={(e) => handleChange('displayName', e.target.value)} placeholder="John" /></div></div>
              <div className="form-group"><label className="form-label">Date of Birth</label><div className="input-wrapper"><Calendar size={18} className="input-icon" /><input type="date" className="form-input" value={formData.dob} onChange={(e) => handleChange('dob', e.target.value)} /></div></div>
              <div className="form-group"><label className="form-label">Gender</label><select className="form-select no-icon" value={formData.gender} onChange={(e) => handleChange('gender', e.target.value)}><option value="">Select Gender</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></div>
              <div className="form-group"><label className="form-label">Blood Group</label><input type="text" className="form-input no-icon" value={formData.bloodGroup} onChange={(e) => handleChange('bloodGroup', e.target.value)} placeholder="O+" /></div>
              <div className="form-group"><label className="form-label">Primary Mobile *</label><div className="input-wrapper"><Phone size={18} className="input-icon" /><input type="tel" className="form-input" required value={formData.primaryMobile} onChange={(e) => handleChange('primaryMobile', e.target.value)} placeholder="+91 9876543210" /></div></div>
            </div>

            <h3 className="section-title">Current Address</h3>
            <div className="form-grid">
              <div className="form-group"><label className="form-label">Street / Building</label><input type="text" className="form-input no-icon" value={formData.currentAddress.street} onChange={(e) => handleChange('currentAddress.street', e.target.value)} placeholder="123 Main St" /></div>
              <div className="form-group"><label className="form-label">City</label><input type="text" className="form-input no-icon" value={formData.currentAddress.city} onChange={(e) => handleChange('currentAddress.city', e.target.value)} placeholder="City" /></div>
              <div className="form-group"><label className="form-label">State</label><input type="text" className="form-input no-icon" value={formData.currentAddress.state} onChange={(e) => handleChange('currentAddress.state', e.target.value)} placeholder="State" /></div>
              <div className="form-group"><label className="form-label">PIN</label><input type="text" className="form-input no-icon" value={formData.currentAddress.pin} onChange={(e) => handleChange('currentAddress.pin', e.target.value)} placeholder="PIN" /></div>
            </div>
            
            <div className="form-group" style={{ margin: '1rem 0' }}>
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" checked={formData.sameAsPermanent} onChange={(e) => { handleChange('sameAsPermanent', e.target.checked); if(e.target.checked) handleChange('permanentAddress', formData.currentAddress); }} />
                Same as Permanent Address
              </label>
            </div>
            
            {!formData.sameAsPermanent && (
              <>
                <h3 className="section-title">Permanent Address</h3>
                <div className="form-grid">
                  <div className="form-group"><label className="form-label">Street</label><input type="text" className="form-input no-icon" value={formData.permanentAddress.street} onChange={(e) => handleChange('permanentAddress.street', e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">City</label><input type="text" className="form-input no-icon" value={formData.permanentAddress.city} onChange={(e) => handleChange('permanentAddress.city', e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">State</label><input type="text" className="form-input no-icon" value={formData.permanentAddress.state} onChange={(e) => handleChange('permanentAddress.state', e.target.value)} /></div>
                </div>
              </>
            )}
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="step-title">Academic Background</h2>
            <h3 className="section-title">Class 10</h3>
            <div className="form-grid">
              <div className="form-group"><label className="form-label">Board</label><input type="text" className="form-input no-icon" value={formData.class10.board} onChange={(e) => handleChange('class10.board', e.target.value)} placeholder="CBSE, ICSE, State" /></div>
              <div className="form-group"><label className="form-label">School Name</label><input type="text" className="form-input no-icon" value={formData.class10.school} onChange={(e) => handleChange('class10.school', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Passing Year</label><input type="text" className="form-input no-icon" value={formData.class10.year} onChange={(e) => handleChange('class10.year', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Percentage / CGPA</label><input type="text" className="form-input no-icon" value={formData.class10.score} onChange={(e) => handleChange('class10.score', e.target.value)} /></div>
            </div>
            <h3 className="section-title">Class 12</h3>
            <div className="form-grid">
              <div className="form-group"><label className="form-label">Board</label><input type="text" className="form-input no-icon" value={formData.class12.board} onChange={(e) => handleChange('class12.board', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">School Name</label><input type="text" className="form-input no-icon" value={formData.class12.school} onChange={(e) => handleChange('class12.school', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Stream</label><input type="text" className="form-input no-icon" value={formData.class12.stream} onChange={(e) => handleChange('class12.stream', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Score</label><input type="text" className="form-input no-icon" value={formData.class12.score} onChange={(e) => handleChange('class12.score', e.target.value)} /></div>
            </div>
            <h3 className="section-title">Current Degree</h3>
            <div className="form-grid">
              <div className="form-group"><label className="form-label">Institution</label><input type="text" className="form-input no-icon" value={formData.current.institution} onChange={(e) => handleChange('current.institution', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Degree</label><input type="text" className="form-input no-icon" value={formData.current.degree} onChange={(e) => handleChange('current.degree', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Branch/Dept</label><input type="text" className="form-input no-icon" value={formData.current.branch} onChange={(e) => handleChange('current.branch', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Semester</label><input type="text" className="form-input no-icon" value={formData.current.semester} onChange={(e) => handleChange('current.semester', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">CGPA</label><input type="text" className="form-input no-icon" value={formData.current.cgpa} onChange={(e) => handleChange('current.cgpa', e.target.value)} /></div>
            </div>
          </motion.div>
        );
      case 3:
        const techSkillsOptions = ['React', 'Node.js', 'Python', 'Java', 'C++', 'AWS', 'Docker', 'MongoDB', 'SQL', 'TypeScript'];
        const softSkillsOptions = ['Communication', 'Leadership', 'Problem Solving', 'Teamwork', 'Public Speaking'];
        return (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="step-title">Skills & Languages</h2>
            <h3 className="section-title">Technical Skills</h3>
            <div className="chip-container">
              {techSkillsOptions.map(skill => (
                <div key={skill} className={`chip ${formData.technicalSkills.includes(skill) ? 'selected' : ''}`} onClick={() => toggleChip('technicalSkills', skill)}>{skill}</div>
              ))}
            </div>
            {formData.technicalSkills.length > 0 && (
              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label className="form-label">Overall Technical Proficiency</label>
                <div className="slider-container">
                  <input type="range" min="1" max="100" value={formData.technicalProficiency} onChange={(e) => handleChange('technicalProficiency', parseInt(e.target.value))} className="range-slider" />
                </div>
              </div>
            )}
            <h3 className="section-title">Soft Skills</h3>
            <div className="chip-container">
              {softSkillsOptions.map(skill => (
                <div key={skill} className={`chip ${formData.softSkills.includes(skill) ? 'selected' : ''}`} onClick={() => toggleChip('softSkills', skill)}>{skill}</div>
              ))}
            </div>
            <h3 className="section-title">Programming Languages</h3>
            <div className="form-group"><input type="text" className="form-input no-icon" value={formData.languagesKnown} onChange={(e) => handleChange('languagesKnown', e.target.value)} placeholder="C++, Java, Python..." /></div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="step-title">Projects</h2>
            <div className="dynamic-list">
              {formData.projects.map((project, index) => (
                <div key={project.id} className="dynamic-item form-grid">
                  {formData.projects.length > 1 && <button className="remove-btn" onClick={() => removeArrayItem('projects', project.id)}><Trash2 size={18} /></button>}
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}><label className="form-label">Project Title</label><input type="text" className="form-input no-icon" value={project.title} onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)} /></div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}><label className="form-label">Tech Stack</label><input type="text" className="form-input no-icon" value={project.tech} onChange={(e) => handleArrayChange('projects', index, 'tech', e.target.value)} /></div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}><label className="form-label">Description</label><textarea className="form-textarea no-icon" value={project.description} onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">GitHub Link</label><input type="url" className="form-input no-icon" value={project.githubUrl} onChange={(e) => handleArrayChange('projects', index, 'githubUrl', e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">Live Demo</label><input type="url" className="form-input no-icon" value={project.liveDemoUrl} onChange={(e) => handleArrayChange('projects', index, 'liveDemoUrl', e.target.value)} /></div>
                </div>
              ))}
              <button className="add-btn" onClick={() => addArrayItem('projects', { title: '', tech: '', description: '', githubUrl: '', liveDemoUrl: '' })}><Plus size={18} /> Add Project</button>
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="step-title">Internships</h2>
            <div className="dynamic-list">
              {formData.internships.map((intern, index) => (
                <div key={intern.id} className="dynamic-item form-grid">
                  {formData.internships.length > 1 && <button className="remove-btn" onClick={() => removeArrayItem('internships', intern.id)}><Trash2 size={18} /></button>}
                  <div className="form-group"><label className="form-label">Company</label><input type="text" className="form-input no-icon" value={intern.company} onChange={(e) => handleArrayChange('internships', index, 'company', e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">Role</label><input type="text" className="form-input no-icon" value={intern.position} onChange={(e) => handleArrayChange('internships', index, 'position', e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">Duration</label><input type="text" className="form-input no-icon" value={intern.duration} onChange={(e) => handleArrayChange('internships', index, 'duration', e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">Certificate URL (Placeholder)</label><input type="text" className="form-input no-icon" value={intern.certificateUrl} onChange={(e) => handleArrayChange('internships', index, 'certificateUrl', e.target.value)} /></div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}><label className="form-label">Description</label><textarea className="form-textarea no-icon" value={intern.description} onChange={(e) => handleArrayChange('internships', index, 'description', e.target.value)} /></div>
                </div>
              ))}
              <button className="add-btn" onClick={() => addArrayItem('internships', { company: '', position: '', duration: '', description: '', certificateUrl: '' })}><Plus size={18} /> Add Internship</button>
            </div>
          </motion.div>
        );
      case 6:
        return (
          <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="step-title">Certifications</h2>
            <div className="dynamic-list">
              {formData.certifications.map((cert, index) => (
                <div key={cert.id} className="dynamic-item form-grid">
                  {formData.certifications.length > 1 && <button className="remove-btn" onClick={() => removeArrayItem('certifications', cert.id)}><Trash2 size={18} /></button>}
                  <div className="form-group"><label className="form-label">Name</label><input type="text" className="form-input no-icon" value={cert.name} onChange={(e) => handleArrayChange('certifications', index, 'name', e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">Issuing Org</label><input type="text" className="form-input no-icon" value={cert.org} onChange={(e) => handleArrayChange('certifications', index, 'org', e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">Date</label><input type="date" className="form-input no-icon" value={cert.date} onChange={(e) => handleArrayChange('certifications', index, 'date', e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">Credential/Verification URL</label><input type="url" className="form-input no-icon" value={cert.credentialUrl} onChange={(e) => handleArrayChange('certifications', index, 'credentialUrl', e.target.value)} /></div>
                </div>
              ))}
              <button className="add-btn" onClick={() => addArrayItem('certifications', { name: '', org: '', date: '', credentialUrl: '' })}><Plus size={18} /> Add Certification</button>
            </div>
          </motion.div>
        );
      case 7:
        const industries = ['IT/Software', 'FinTech', 'EdTech', 'HealthTech', 'E-commerce'];
        return (
          <motion.div key="step7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="step-title">Career Goals</h2>
            <div className="form-grid">
              <div className="form-group"><label className="form-label">Dream Job Title</label><input type="text" className="form-input no-icon" value={formData.dreamJob} onChange={(e) => handleChange('dreamJob', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Dream Company</label><input type="text" className="form-input no-icon" value={formData.dreamCompany} onChange={(e) => handleChange('dreamCompany', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Preferred Industry</label><select className="form-select no-icon" value={formData.preferredIndustry} onChange={(e) => handleChange('preferredIndustry', e.target.value)}><option value="">Select</option>{industries.map(i => <option key={i} value={i}>{i}</option>)}</select></div>
              <div className="form-group"><label className="form-label">Salary Expectation (LPA)</label><input type="text" className="form-input no-icon" value={formData.expectedSalary} onChange={(e) => handleChange('expectedSalary', e.target.value)} /></div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}><label className="form-label">Other Interests</label><input type="text" className="form-input no-icon" value={formData.interests} onChange={(e) => handleChange('interests', e.target.value)} /></div>
            </div>
          </motion.div>
        );
      case 8:
        return (
          <motion.div key="step8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="step-title">Digital Profiles</h2>
            <div className="form-grid">
              <div className="form-group"><label className="form-label">LinkedIn</label><input type="url" className="form-input no-icon" value={formData.linkedin} onChange={(e) => handleChange('linkedin', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">GitHub</label><input type="url" className="form-input no-icon" value={formData.github} onChange={(e) => handleChange('github', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Portfolio URL</label><input type="url" className="form-input no-icon" value={formData.portfolio} onChange={(e) => handleChange('portfolio', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">LeetCode</label><input type="url" className="form-input no-icon" value={formData.leetcode} onChange={(e) => handleChange('leetcode', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">HackerRank</label><input type="url" className="form-input no-icon" value={formData.hackerrank} onChange={(e) => handleChange('hackerrank', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">CodeChef</label><input type="url" className="form-input no-icon" value={formData.codechef} onChange={(e) => handleChange('codechef', e.target.value)} /></div>
            </div>
          </motion.div>
        );
      case 9:
        return (
          <motion.div key="step9" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="step-title">Review & Submit</h2>
            <div className="review-section">
              <div className="review-block">
                <h4>Personal Info <button onClick={() => setCurrentStep(1)}>Edit</button></h4>
                <p>Name: {formData.fullName}</p>
                <p>Phone: {formData.primaryMobile}</p>
              </div>
              <div className="review-block">
                <h4>Academic <button onClick={() => setCurrentStep(2)}>Edit</button></h4>
                <p>Current: {formData.current.degree} at {formData.current.institution}</p>
              </div>
              <div className="review-block">
                <h4>Skills <button onClick={() => setCurrentStep(3)}>Edit</button></h4>
                <p>Tech: {formData.technicalSkills.join(', ')}</p>
              </div>
            </div>
          </motion.div>
        );
      default: return null;
    }
  };

  return (
    <div className="onboarding-wizard">
      {toastMessage && <div className="toast-message">{toastMessage}</div>}
      <div className="wizard-container">
        <div className="wizard-header">
          <div className="progress-container">
            <div className="progress-bar-bg" />
            <div className="progress-bar-fill" style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }} />
            {STEPS.map((step) => (
              <div key={step.id} className={`step-indicator ${step.id === currentStep ? 'active' : ''} ${step.id < currentStep ? 'completed' : ''}`}>
                {step.id}
              </div>
            ))}
          </div>
          <div className="step-labels">
            {STEPS.map((step) => (
              <div key={`label-${step.id}`} className={`step-label ${step.id === currentStep ? 'active' : ''}`}>
                {step.name}
              </div>
            ))}
          </div>
        </div>

        <div className="wizard-content">
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
        </div>

        <div className="wizard-footer">
          {currentStep > 1 ? (
            <button className="btn-prev" onClick={handlePrev}><ChevronLeft size={18} /> Back</button>
          ) : <div></div>}
          
          <button className="btn-draft" onClick={saveDraft}><Save size={18} /> Save Draft</button>

          {currentStep < STEPS.length ? (
            <button className="btn-next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
          ) : (
            <button className="btn-submit" onClick={handleSubmit}>Complete Setup <Target size={18} style={{ marginLeft: '0.25rem' }} /></button>
          )}
        </div>
      </div>
    </div>
  );
}

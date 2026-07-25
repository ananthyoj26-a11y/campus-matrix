// CampusMatrix i18n — Lightweight translation system
// Supports: English (en), Tamil (ta), Hindi (hi)

export type Locale = 'en' | 'ta' | 'hi';

type TranslationDict = Record<string, Record<Locale, string>>;

const translations: TranslationDict = {
  // Navigation
  'nav.dashboard': { en: 'Dashboard', ta: 'டாஷ்போர்டு', hi: 'डैशबोर्ड' },
  'nav.career_roadmap': { en: 'Career Roadmap', ta: 'தொழில் வரைபடம்', hi: 'करियर रोडमैप' },
  'nav.coding_hub': { en: 'Coding Hub', ta: 'கோடிங் மையம்', hi: 'कोडिंग हब' },
  'nav.mock_interview': { en: 'Mock Interview', ta: 'போலி நேர்காணல்', hi: 'मॉक इंटरव्यू' },
  'nav.careers': { en: 'Careers', ta: 'வேலை வாய்ப்புகள்', hi: 'करियर' },
  'nav.events': { en: 'Events', ta: 'நிகழ்வுகள்', hi: 'कार्यक्रम' },
  'nav.hackathons': { en: 'Hackathons', ta: 'ஹேக்கத்தான்கள்', hi: 'हैकाथॉन' },
  'nav.guilds': { en: 'Guilds', ta: 'குழுக்கள்', hi: 'गिल्ड' },
  'nav.profile': { en: 'Profile', ta: 'சுயவிவரம்', hi: 'प्रोफाइल' },
  'nav.analytics': { en: 'Analytics', ta: 'பகுப்பாய்வு', hi: 'एनालिटिक्स' },
  'nav.leaderboard': { en: 'Leaderboard', ta: 'தரவரிசை', hi: 'लीडरबोर्ड' },
  'nav.admin': { en: 'Admin', ta: 'நிர்வாகம்', hi: 'एडमिन' },
  'nav.forum': { en: 'Forum', ta: 'கலந்துரையாடல்', hi: 'फोरम' },
  'nav.ai_mentor': { en: 'AI Mentor', ta: 'AI வழிகாட்டி', hi: 'AI मेंटर' },
  'nav.emergency': { en: 'Emergency', ta: 'அவசரநிலை', hi: 'आपातकाल' },
  'nav.campus_map': { en: 'Campus Map', ta: 'வளாக வரைபடம்', hi: 'कैंपस मैप' },
  'nav.weekly_digest': { en: 'New This Week', ta: 'இந்த வார புதியவை', hi: 'इस सप्ताह नया' },
  'nav.settings': { en: 'Settings', ta: 'அமைப்புகள்', hi: 'सेटिंग्स' },
  'nav.logout': { en: 'Logout', ta: 'வெளியேறு', hi: 'लॉग आउट' },
  'nav.login': { en: 'Login', ta: 'உள்நுழைவு', hi: 'लॉग इन' },
  'nav.register': { en: 'Get Started', ta: 'தொடங்கு', hi: 'शुरू करें' },
  'nav.ats_checker': { en: 'ATS Checker', ta: 'ATS சோதனை', hi: 'ATS चेकर' },

  // Dashboard
  'dashboard.welcome': { en: 'Welcome back', ta: 'மீண்டும் வரவேற்கிறோம்', hi: 'वापस स्वागत है' },
  'dashboard.streak': { en: 'Current Streak', ta: 'தற்போதைய தொடர்', hi: 'वर्तमान स्ट्रीक' },
  'dashboard.xp': { en: 'XP Points', ta: 'XP புள்ளிகள்', hi: 'XP पॉइंट्स' },
  'dashboard.problems_solved': { en: 'Problems Solved', ta: 'தீர்க்கப்பட்ட சிக்கல்கள்', hi: 'हल की गई समस्याएं' },
  'dashboard.career_progress': { en: 'Career Progress', ta: 'தொழில் முன்னேற்றம்', hi: 'करियर प्रगति' },
  'dashboard.quick_actions': { en: 'Quick Actions', ta: 'விரைவு செயல்கள்', hi: 'त्वरित कार्य' },
  'dashboard.recent_activity': { en: 'Recent Activity', ta: 'சமீபத்திய செயல்பாடு', hi: 'हालिया गतिविधि' },
  'dashboard.upcoming_events': { en: 'Upcoming Events', ta: 'வரவிருக்கும் நிகழ்வுகள்', hi: 'आगामी कार्यक्रम' },
  'dashboard.leaderboard': { en: 'Leaderboard', ta: 'தரவரிசை', hi: 'लीडरबोर्ड' },
  'dashboard.daily_challenge': { en: 'Daily Challenge', ta: 'தினசரி சவால்', hi: 'दैनिक चुनौती' },

  // Common Actions
  'action.save': { en: 'Save', ta: 'சேமி', hi: 'सहेजें' },
  'action.cancel': { en: 'Cancel', ta: 'ரத்துசெய்', hi: 'रद्द करें' },
  'action.delete': { en: 'Delete', ta: 'நீக்கு', hi: 'हटाएं' },
  'action.edit': { en: 'Edit', ta: 'திருத்து', hi: 'संपादित करें' },
  'action.search': { en: 'Search...', ta: 'தேடு...', hi: 'खोजें...' },
  'action.submit': { en: 'Submit', ta: 'சமர்ப்பி', hi: 'जमा करें' },
  'action.next': { en: 'Next', ta: 'அடுத்து', hi: 'अगला' },
  'action.back': { en: 'Back', ta: 'பின்', hi: 'पीछे' },
  'action.continue': { en: 'Continue', ta: 'தொடர்', hi: 'जारी रखें' },
  'action.view_all': { en: 'View All', ta: 'அனைத்தையும் காண்', hi: 'सभी देखें' },
  'action.apply': { en: 'Apply Now', ta: 'இப்போது விண்ணப்பி', hi: 'अभी आवेदन करें' },
  'action.join': { en: 'Join', ta: 'சேர்', hi: 'शामिल हों' },
  'action.call_now': { en: 'Call Now', ta: 'இப்போது அழை', hi: 'अभी कॉल करें' },

  // Auth
  'auth.login_title': { en: 'Welcome back', ta: 'மீண்டும் வரவேற்கிறோம்', hi: 'वापस स्वागत है' },
  'auth.register_title': { en: 'Create your account', ta: 'உங்கள் கணக்கை உருவாக்கு', hi: 'अपना खाता बनाएं' },
  'auth.email': { en: 'Email', ta: 'மின்னஞ்சல்', hi: 'ईमेल' },
  'auth.password': { en: 'Password', ta: 'கடவுச்சொல்', hi: 'पासवर्ड' },
  'auth.forgot_password': { en: 'Forgot password?', ta: 'கடவுச்சொல் மறந்துவிட்டதா?', hi: 'पासवर्ड भूल गए?' },
  'auth.or_continue_with': { en: 'Or continue with', ta: 'அல்லது தொடரவும்', hi: 'या जारी रखें' },
  'auth.google_login': { en: 'Continue with Google', ta: 'Google உடன் தொடரவும்', hi: 'Google से जारी रखें' },

  // Onboarding
  'onboarding.title': { en: 'Complete Your Profile', ta: 'உங்கள் சுயவிவரத்தை நிறைவு செய்', hi: 'अपनी प्रोफाइल पूरी करें' },
  'onboarding.personal': { en: 'Personal Info', ta: 'தனிப்பட்ட தகவல்', hi: 'व्यक्तिगत जानकारी' },
  'onboarding.address': { en: 'Address', ta: 'முகவரி', hi: 'पता' },
  'onboarding.academic': { en: 'Academic', ta: 'கல்வி', hi: 'अकादमिक' },
  'onboarding.skills': { en: 'Skills', ta: 'திறன்கள்', hi: 'कौशल' },
  'onboarding.experience': { en: 'Experience', ta: 'அனுபவம்', hi: 'अनुभव' },
  'onboarding.profiles': { en: 'Profiles', ta: 'சுயவிவரங்கள்', hi: 'प्रोफाइल' },
  'onboarding.goals': { en: 'Goals', ta: 'இலக்குகள்', hi: 'लक्ष्य' },

  // Misc
  'misc.loading': { en: 'Loading...', ta: 'ஏற்றுகிறது...', hi: 'लोड हो रहा है...' },
  'misc.no_results': { en: 'No results found', ta: 'முடிவுகள் இல்லை', hi: 'कोई परिणाम नहीं' },
  'misc.error': { en: 'Something went wrong', ta: 'ஏதோ தவறு நடந்தது', hi: 'कुछ गलत हो गया' },
};

export function t(key: string, locale: Locale = 'en'): string {
  return translations[key]?.[locale] || translations[key]?.en || key;
}

export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  ta: 'தமிழ்',
  hi: 'हिन्दी',
};

export default translations;

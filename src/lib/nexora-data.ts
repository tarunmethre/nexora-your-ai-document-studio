import {
  Award,
  Banknote,
  BookOpenText,
  Briefcase,
  Building2,
  ClipboardList,
  FileSignature,
  FileSpreadsheet,
  FileText,
  Gavel,
  GraduationCap,
  HeartPulse,
  Landmark,
  Mail,
  Megaphone,
  MessageSquare,
  Newspaper,
  NotebookPen,
  PieChart,
  Presentation,
  Rocket,
  ScrollText,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  textOn: string;
};

export const SERVICES: Service[] = [
  { slug: "ai-writer", title: "AI Writer", description: "Draft high-stakes proposals and technical reports with human-like precision.", icon: NotebookPen, gradient: "from-[oklch(0.66_0.19_240)] to-[oklch(0.78_0.15_200)]", textOn: "text-[oklch(0.35_0.15_240)]" },
  { slug: "resume", title: "AI Resume Builder", description: "ATS-optimized identities that land interviews at world-class firms.", icon: FileText, gradient: "from-blue-600 to-indigo-600", textOn: "text-blue-700" },
  { slug: "invoice", title: "Invoice Generator", description: "Turn work logs into polished, tax-aware invoices automatically.", icon: FileSpreadsheet, gradient: "from-emerald-500 to-cyan-500", textOn: "text-emerald-700" },
  { slug: "proposal", title: "Proposal Generator", description: "Convert raw meeting notes into structured business proposals.", icon: ClipboardList, gradient: "from-[oklch(0.65_0.22_300)] to-pink-500", textOn: "text-purple-700" },
  { slug: "question-paper", title: "Question Paper", description: "Generate exam-ready papers with answer keys in seconds.", icon: BookOpenText, gradient: "from-amber-500 to-orange-500", textOn: "text-orange-700" },
  { slug: "lesson-planner", title: "Lesson Planner", description: "Comprehensive curricula and handouts for any subject.", icon: GraduationCap, gradient: "from-orange-500 to-red-500", textOn: "text-orange-700" },
  { slug: "medical", title: "Medical Report", description: "Structured, HIPAA-mindful medical reports with clinical clarity.", icon: Stethoscope, gradient: "from-rose-500 to-fuchsia-500", textOn: "text-rose-700" },
  { slug: "email", title: "Email Generator", description: "Cold outreach, replies, and campaigns that convert.", icon: Mail, gradient: "from-sky-500 to-blue-600", textOn: "text-sky-700" },
  { slug: "meeting", title: "Meeting Notes", description: "Turn transcripts into decisions, action items, and owners.", icon: Users, gradient: "from-teal-500 to-emerald-500", textOn: "text-teal-700" },
  { slug: "business-plan", title: "Business Plan", description: "Investor-grade plans with market data and financial models.", icon: Briefcase, gradient: "from-slate-700 to-slate-900", textOn: "text-slate-800" },
  { slug: "presentation", title: "Presentation Maker", description: "Beautiful decks composed from a single prompt.", icon: Presentation, gradient: "from-violet-500 to-purple-600", textOn: "text-violet-700" },
  { slug: "contract", title: "Contract Generator", description: "Secure, legally-aware drafts for agencies and freelancers.", icon: FileSignature, gradient: "from-stone-800 to-black", textOn: "text-stone-900" },
  { slug: "hr", title: "HR Documents", description: "Offer letters, policies, and reviews across your org.", icon: Building2, gradient: "from-indigo-500 to-blue-600", textOn: "text-indigo-700" },
  { slug: "certificate", title: "Certificates", description: "Elegant certificates with brand-perfect typography.", icon: Award, gradient: "from-yellow-500 to-amber-600", textOn: "text-amber-700" },
  { slug: "support", title: "Support Replies", description: "On-brand, empathetic responses for every customer channel.", icon: MessageSquare, gradient: "from-cyan-500 to-blue-500", textOn: "text-cyan-700" },
  { slug: "legal", title: "Legal Drafts", description: "Clauses, NDAs, and letters with jurisdiction awareness.", icon: Gavel, gradient: "from-neutral-800 to-neutral-950", textOn: "text-neutral-900" },
];

export type Industry = {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  accent: string;
};

export const INDUSTRIES: Industry[] = [
  { slug: "hr", name: "HR", description: "Offer letters, onboarding, reviews.", icon: Users, accent: "bg-blue-500/10 text-blue-600" },
  { slug: "education", name: "Education", description: "Lesson plans, papers, curricula.", icon: GraduationCap, accent: "bg-orange-500/10 text-orange-600" },
  { slug: "healthcare", name: "Healthcare", description: "Reports, referrals, patient notes.", icon: HeartPulse, accent: "bg-rose-500/10 text-rose-600" },
  { slug: "support", name: "Customer Support", description: "Replies, FAQs, macros.", icon: MessageSquare, accent: "bg-cyan-500/10 text-cyan-600" },
  { slug: "finance", name: "Finance", description: "Invoices, statements, memos.", icon: Banknote, accent: "bg-emerald-500/10 text-emerald-600" },
  { slug: "retail", name: "Retail", description: "Product copy, catalogs, PDPs.", icon: ShoppingBag, accent: "bg-amber-500/10 text-amber-600" },
  { slug: "startups", name: "Startups", description: "Pitches, memos, hiring.", icon: Rocket, accent: "bg-fuchsia-500/10 text-fuchsia-600" },
  { slug: "law", name: "Law", description: "Contracts, briefs, filings.", icon: Gavel, accent: "bg-neutral-500/10 text-neutral-800" },
  { slug: "government", name: "Government", description: "Policies, RFPs, communications.", icon: Landmark, accent: "bg-indigo-500/10 text-indigo-600" },
];

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  tint: string;
};

export const FEATURES: Feature[] = [
  { title: "AI Document Generator", description: "Prompt to polished document, in seconds.", icon: Sparkles, tint: "text-accent-blue" },
  { title: "Smart Templates", description: "200+ curated layouts for every industry.", icon: LayoutIcon("grid"), tint: "text-accent-purple" },
  { title: "Rich Text Editor", description: "Notion-grade editing with slash commands.", icon: NotebookPen, tint: "text-accent-cyan" },
  { title: "Auto Save & Cloud Sync", description: "Never lose a word across your devices.", icon: FileText, tint: "text-emerald-600" },
  { title: "AI Quality Analysis", description: "Real-time scoring of clarity and tone.", icon: PieChart, tint: "text-accent-purple" },
  { title: "Grammar & Tone", description: "Editorial-grade suggestions inline.", icon: ScrollText, tint: "text-accent-blue" },
  { title: "Summarizer", description: "Distill long documents into key insights.", icon: BookOpenText, tint: "text-orange-600" },
  { title: "PDF & DOCX Export", description: "Pixel-perfect export in every format.", icon: FileSignature, tint: "text-accent-blue" },
  { title: "Version History", description: "Every draft, snapshot, and revert.", icon: ClipboardList, tint: "text-accent-purple" },
  { title: "AI Chat", description: "A studio-aware assistant always beside you.", icon: MessageSquare, tint: "text-accent-cyan" },
  { title: "Collaboration", description: "Comment, mention, and co-author live.", icon: Users, tint: "text-blue-600" },
  { title: "Voice Commands", description: "Speak to draft, edit, or navigate.", icon: Megaphone, tint: "text-rose-600" },
  { title: "Secure Storage", description: "Bank-grade encryption for every doc.", icon: Newspaper, tint: "text-neutral-700" },
  { title: "Prompt Library", description: "Save & share your best AI prompts.", icon: Sparkles, tint: "text-accent-purple" },
];

// Small helper to avoid unused import warnings for the grid icon
function LayoutIcon(_: "grid"): LucideIcon {
  // Reuse Award as a decorative fallback — icon is only visual
  return Award;
}

export type Template = {
  id: string;
  name: string;
  category: string;
  popularity: number;
  gradient: string;
};

export const TEMPLATE_CATEGORIES = [
  "All", "HR", "Education", "Healthcare", "Support", "Business",
  "Finance", "Legal", "Marketing", "Sales", "Personal", "Certificates",
  "Invoices", "Reports", "Letters", "Presentations",
];

export const TEMPLATES: Template[] = [
  { id: "t1", name: "Executive Business Proposal", category: "Business", popularity: 98, gradient: "from-blue-600 to-indigo-600" },
  { id: "t2", name: "Modern Software Engineer Resume", category: "Personal", popularity: 96, gradient: "from-slate-800 to-black" },
  { id: "t3", name: "Freelancer Invoice", category: "Invoices", popularity: 94, gradient: "from-emerald-500 to-cyan-500" },
  { id: "t4", name: "SaaS Pitch Deck", category: "Presentations", popularity: 93, gradient: "from-purple-500 to-pink-500" },
  { id: "t5", name: "Patient Discharge Summary", category: "Healthcare", popularity: 90, gradient: "from-rose-500 to-fuchsia-500" },
  { id: "t6", name: "Employment Offer Letter", category: "HR", popularity: 89, gradient: "from-indigo-500 to-blue-600" },
  { id: "t7", name: "Marketing Campaign Brief", category: "Marketing", popularity: 88, gradient: "from-amber-500 to-orange-500" },
  { id: "t8", name: "Lesson Plan · Grade 8 Science", category: "Education", popularity: 87, gradient: "from-orange-500 to-red-500" },
  { id: "t9", name: "Non-Disclosure Agreement", category: "Legal", popularity: 86, gradient: "from-neutral-800 to-neutral-950" },
  { id: "t10", name: "Quarterly Financial Report", category: "Finance", popularity: 85, gradient: "from-teal-500 to-emerald-500" },
  { id: "t11", name: "Customer Support Reply Kit", category: "Support", popularity: 83, gradient: "from-cyan-500 to-blue-500" },
  { id: "t12", name: "Course Completion Certificate", category: "Certificates", popularity: 81, gradient: "from-yellow-500 to-amber-600" },
  { id: "t13", name: "Case Study Report", category: "Reports", popularity: 79, gradient: "from-slate-700 to-slate-900" },
  { id: "t14", name: "Cover Letter — Product Role", category: "Letters", popularity: 78, gradient: "from-violet-500 to-purple-600" },
  { id: "t15", name: "Founder Investor Update", category: "Business", popularity: 77, gradient: "from-sky-500 to-blue-600" },
  { id: "t16", name: "Sales Outreach Sequence", category: "Sales", popularity: 76, gradient: "from-fuchsia-500 to-pink-500" },
];
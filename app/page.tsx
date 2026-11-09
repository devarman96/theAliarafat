'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { LogoMark } from '@/components/logo';
import {
  Sun,
  Moon,
  Menu,
  X,
  Code2,
  Sparkles,
  BookOpen,
  Award,
  Clock,
  Send,
  CheckCircle2,
  GraduationCap,
  Heart,
  Mail,
  Facebook,
  MessageCircle,
  ArrowUpRight,
  ChevronRight,
  BookMarked,
  Flame,
  Lightbulb,
  Users2,
  FileText,
  Radio,
  Check,
  Copy,
  Globe,
  Camera,
  ImagePlus,
  Plus,
  Trash2,
  Calendar,
  UploadCloud,
  AlertCircle,
  Inbox,
  RotateCcw,
} from 'lucide-react';
import { TRANSLATIONS, Language, BlogPost } from '@/lib/translations';

// Subscriptions for theme & language avoiding setState in effect
function subscribeTheme(callback: () => void) {
  window.addEventListener('storage', callback);
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  mql.addEventListener('change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    mql.removeEventListener('change', callback);
  };
}

function getThemeSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  if (localStorage.getItem('theme')) {
    return localStorage.getItem('theme') === 'dark';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function getThemeServerSnapshot(): boolean {
  return false;
}

function subscribeLanguage(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getLanguageSnapshot(): Language {
  if (typeof window === 'undefined') return 'en';
  const saved = localStorage.getItem('portfolio_lang');
  return saved === 'bn' ? 'bn' : 'en';
}

function getLanguageServerSnapshot(): Language {
  return 'en';
}

function subscribeCustomPosts(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('custom-posts-updated', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('custom-posts-updated', callback);
  };
}

const EMPTY_CUSTOM_POSTS: BlogPost[] = [];
let cachedCustomPosts: BlogPost[] = EMPTY_CUSTOM_POSTS;
let cachedCustomPostsRaw: string | null = null;

function getCustomPostsSnapshot(): BlogPost[] {
  if (typeof window === 'undefined') return EMPTY_CUSTOM_POSTS;
  const raw = localStorage.getItem('ali_arafat_custom_blogs');
  if (raw !== cachedCustomPostsRaw) {
    cachedCustomPostsRaw = raw;
    try {
      cachedCustomPosts = raw ? JSON.parse(raw) : EMPTY_CUSTOM_POSTS;
    } catch {
      cachedCustomPosts = EMPTY_CUSTOM_POSTS;
    }
  }
  return cachedCustomPosts;
}

function getCustomPostsServerSnapshot(): BlogPost[] {
  return EMPTY_CUSTOM_POSTS;
}

export default function PortfolioPage() {
  const isDarkTheme = React.useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  const language = React.useSyncExternalStore(
    subscribeLanguage,
    getLanguageSnapshot,
    getLanguageServerSnapshot
  );

  const customPosts = React.useSyncExternalStore(
    subscribeCustomPosts,
    getCustomPostsSnapshot,
    getCustomPostsServerSnapshot
  );

  const t = TRANSLATIONS[language];

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'routine' | 'hobbies' | 'books' | 'journal'>('routine');

  // Blog state & picture management
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [blogCategory, setBlogCategory] = useState<'all' | 'campus' | 'tech' | 'study' | 'reflections'>('all');

  // Add blog form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'campus' | 'tech' | 'study' | 'reflections'>('campus');
  const [newDate, setNewDate] = useState('');
  const [newReadTime, setNewReadTime] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert(language === 'bn' ? 'ছবির সাইজ ৫ মেগাবাইটের কম হতে হবে।' : 'Image size must be less than 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setNewImageUrl(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      alert(language === 'bn' ? 'অনুগ্রহ করে শিরোনাম ও মূল বিবরণ লিখুন।' : 'Please enter title and content.');
      return;
    }
    const img = newImageUrl.trim() || '/images/blog_campus.jpg';
    const categoryLabels = {
      campus: t.blog.catCampus,
      tech: t.blog.catTech,
      study: t.blog.catStudy,
      reflections: t.blog.catReflections,
    };
    const newPost: BlogPost = {
      id: 'custom-' + Date.now(),
      title: newTitle.trim(),
      excerpt: newContent.trim().length > 130 ? newContent.trim().slice(0, 130) + '...' : newContent.trim(),
      content: newContent.trim(),
      date: newDate.trim() || (language === 'bn' ? 'আজকের ডায়েরি' : 'Today'),
      readTime: newReadTime.trim() || (language === 'bn' ? '৩ মিনিট পাঠ' : '3 min read'),
      category: newCategory,
      categoryLabel: categoryLabels[newCategory],
      imageUrl: img,
      isCustom: true,
    };
    const updated = [newPost, ...customPosts];
    try {
      localStorage.setItem('ali_arafat_custom_blogs', JSON.stringify(updated));
      window.dispatchEvent(new Event('custom-posts-updated'));
    } catch (err) {
      console.error('Storage error', err);
    }
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewContent('');
    setNewImageUrl('');
    setNewDate('');
    setNewReadTime('');
    alert(t.blog.successAdded);
  };

  const handleDeletePost = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (confirm(t.blog.deleteConfirm)) {
      const updated = customPosts.filter(p => p.id !== id);
      try {
        localStorage.setItem('ali_arafat_custom_blogs', JSON.stringify(updated));
        window.dispatchEvent(new Event('custom-posts-updated'));
      } catch (err) {
        console.error('Storage error', err);
      }
      if (selectedPost?.id === id) {
        setSelectedPost(null);
      }
    }
  };

  const allPosts: BlogPost[] = [...customPosts, ...t.blog.initialPosts];
  const filteredPosts = blogCategory === 'all'
    ? allPosts
    : allPosts.filter(p => p.category === blogCategory);

  // Form state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Update DOM class when theme changes
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const toggleDarkMode = () => {
    const nextMode = !isDarkTheme;
    localStorage.setItem('theme', nextMode ? 'dark' : 'light');
    if (nextMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    window.dispatchEvent(new Event('storage'));
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === 'en' ? 'bn' : 'en';
    localStorage.setItem('portfolio_lang', nextLang);
    window.dispatchEvent(new Event('storage'));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert(language === 'bn' ? 'দয়া করে সব আবশ্যক ঘর পূরণ করুন।' : 'Please fill out all required fields.');
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error('Server returned error status ' + res.status);
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('aliarafat57000@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
      {/* 1. Header with Top Bar Contract */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
          {/* Zone 1: Wordmark with bespoke Logo & Version */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 group transition-colors"
          >
            <LogoMark />
            <span className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {t.hero.name}
            </span>
            <span className="ml-1 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
              v 1.0
            </span>
          </a>

          {/* Zone 2: Navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#about" className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
              {t.nav.about}
            </a>
            <a href="#blog" className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
              {t.nav.blog}
            </a>
            <a href="#academics" className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
              {t.nav.academics}
            </a>
            <a href="#lifestyle" className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
              {t.nav.lifestyle}
            </a>
            <a href="#aspirations" className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
              {t.nav.aspirations}
            </a>
            <a href="#contact" className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
              {t.nav.contact}
            </a>
          </nav>

          {/* Zone 3: Language Toggle + Dark Toggle + Primary CTA */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Language Switch Button */}
            <button
              onClick={toggleLanguage}
              aria-label={t.nav.switchLangTooltip}
              title={t.nav.switchLangTooltip}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all cursor-pointer shadow-xs whitespace-nowrap"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>{language === 'en' ? 'বাংলা' : 'English'}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle color theme"
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {isDarkTheme ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href="#contact"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              {t.nav.getInTouch}
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 pt-3 pb-5 space-y-1">
            <div className="pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Language / ভাষা
              </span>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60"
              >
                <Globe className="w-3.5 h-3.5" />
                {language === 'en' ? 'বাংলা সংস্করণ চালু করুন' : 'Switch to English'}
              </button>
            </div>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {t.nav.about}
            </a>
            <a
              href="#blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {t.nav.blog}
            </a>
            <a
              href="#academics"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {t.nav.academics}
            </a>
            <a
              href="#lifestyle"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {t.nav.lifestyle}
            </a>
            <a
              href="#aspirations"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {t.nav.aspirations}
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {t.nav.contact}
            </a>
          </div>
        )}
      </header>

      {/* Main Content Sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-24">
        {/* SECTION 1: HERO */}
        <section id="hero" className="pt-4 md:pt-10 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Typographic Hierarchy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400">
                  {t.hero.kicker}
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] text-balance">
                  {t.hero.greeting} <span className="text-indigo-600 dark:text-indigo-400">{t.hero.name}</span>
                </h1>
                <p className="text-lg sm:text-xl font-medium text-slate-600 dark:text-slate-300">
                  {t.hero.subtitle}
                </p>
              </div>

              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
                {t.hero.bio}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#academics"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm cursor-pointer"
                >
                  {t.hero.ctaWork}
                  <ChevronRight className="w-4 h-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-slate-800 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-800 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  {t.hero.ctaContact}
                </a>
              </div>

              {/* Quick Trust / Cohort detail */}
              <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2">
                <span>{t.hero.schoolTag}</span>
              </div>
            </div>

            {/* Right Column: Visual Anchor */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[300px] sm:max-w-[340px] aspect-[4/4.6] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-900 group">
                <Image
                  src="/assets/aistudio/IMG_20261024_153144_b681d027.png"
                  alt={`${t.hero.name} - Class 10 Student`}
                  fill
                  sizes="(max-width: 768px) 100vw, 340px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  priority
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-4">
                  <div className="text-white">
                    <p className="text-sm font-semibold">{t.hero.avatarName}</p>
                    <p className="text-xs text-slate-300">{t.hero.avatarTag}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full-width KPI strip below the hero split */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="space-y-1 text-center md:text-left">
              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
                {t.hero.kpi.rankLabel}
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                {t.hero.kpi.rankVal}
              </p>
              <p className="text-xs text-slate-500">{t.hero.kpi.rankSub}</p>
            </div>
            <div className="space-y-1 text-center md:text-left">
              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
                {t.hero.kpi.buildsLabel}
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">
                {t.hero.kpi.buildsVal}
              </p>
              <p className="text-xs text-slate-500">{t.hero.kpi.buildsSub}</p>
            </div>
            <div className="space-y-1 text-center md:text-left">
              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
                {t.hero.kpi.awardsLabel}
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                {t.hero.kpi.awardsVal}
              </p>
              <p className="text-xs text-slate-500">{t.hero.kpi.awardsSub}</p>
            </div>
            <div className="space-y-1 text-center md:text-left">
              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
                {t.hero.kpi.booksLabel}
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                {t.hero.kpi.booksVal}
              </p>
              <p className="text-xs text-slate-500">{t.hero.kpi.booksSub}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: ABOUT ME */}
        <section id="about" className="scroll-mt-24 space-y-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400 mb-2">
              {t.about.kicker}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.about.title}
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
              {t.about.p1}
            </p>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              {t.about.p2}
            </p>
          </div>

          {/* Key Strengths Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t.about.strengths[0].title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.about.strengths[0].desc}
              </p>
              <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                {t.about.strengths[0].tags.map((tag, idx) => (
                  <React.Fragment key={tag}>
                    <span>{tag}</span>
                    {idx < t.about.strengths[0].tags.length - 1 && <span aria-hidden="true">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t.about.strengths[1].title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.about.strengths[1].desc}
              </p>
              <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                {t.about.strengths[1].tags.map((tag, idx) => (
                  <React.Fragment key={tag}>
                    <span>{tag}</span>
                    {idx < t.about.strengths[1].tags.length - 1 && <span aria-hidden="true">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Users2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t.about.strengths[2].title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.about.strengths[2].desc}
              </p>
              <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                {t.about.strengths[2].tags.map((tag, idx) => (
                  <React.Fragment key={tag}>
                    <span>{tag}</span>
                    {idx < t.about.strengths[2].tags.length - 1 && <span aria-hidden="true">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: BLOG & PHOTO JOURNAL (Right after About section) */}
        <section id="blog" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400 mb-2">
                {t.blog.kicker}
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                {t.blog.title}
              </h2>
              <p className="mt-3 text-slate-600 dark:text-slate-400 text-base max-w-2xl">
                {t.blog.subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm shrink-0 cursor-pointer self-start md:self-auto"
            >
              <ImagePlus className="w-4 h-4" />
              <span>{t.blog.addPostBtn}</span>
            </button>
          </div>

          {/* Category Filter Controls */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-200/80 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 w-fit">
            <button
              type="button"
              onClick={() => setBlogCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                blogCategory === 'all'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.blog.filterAll}
            </button>
            <button
              type="button"
              onClick={() => setBlogCategory('campus')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                blogCategory === 'campus'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.blog.filterCampus}
            </button>
            <button
              type="button"
              onClick={() => setBlogCategory('tech')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                blogCategory === 'tech'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.blog.filterTech}
            </button>
            <button
              type="button"
              onClick={() => setBlogCategory('study')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                blogCategory === 'study'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.blog.filterStudy}
            </button>
            <button
              type="button"
              onClick={() => setBlogCategory('reflections')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                blogCategory === 'reflections'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.blog.filterReflections}
            </button>
          </div>

          {/* Blog Cards Grid */}
          {filteredPosts.length === 0 ? (
            <div className="p-10 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <Camera className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">{t.blog.noPosts}</p>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.blog.addPostBtn}</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="group flex flex-col justify-between rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-all overflow-hidden cursor-pointer"
                >
                  <div className="space-y-3">
                    {/* Picture Container (Proportionate 16:10 ratio) */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      {post.isCustom && (
                        <div className="absolute top-2.5 right-2.5">
                          <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-600/90 backdrop-blur-xs text-white rounded-md shadow-xs">
                            {language === 'bn' ? 'আমার নিজস্ব ছবি' : 'My Upload'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Metadata & Headline */}
                    <div className="px-5 pt-1 space-y-2">
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                          {post.categoryLabel}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{post.date}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-4 pt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 mt-3">
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:gap-1.5 transition-all">
                      {t.blog.readStory} <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                    {post.isCustom && (
                      <button
                        type="button"
                        onClick={(e) => handleDeletePost(post.id, e)}
                        className="p-1 rounded-md text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                        title={t.blog.deletePost}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{t.blog.deletePost}</span>
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* SECTION 3: ACADEMICS & ACHIEVEMENTS */}
        <section id="academics" className="scroll-mt-24 space-y-12">
          <div>
            <p className="text-xs font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400 mb-2">
              {t.academics.kicker}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.academics.title}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-base max-w-2xl">
              {t.academics.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Timeline Column */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                {t.academics.timelineTitle}
              </h3>

              <div className="relative pl-6 space-y-8 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                {t.academics.timeline.map((item, idx) => (
                  <div key={item.title} className="relative group">
                    <div
                      className={`absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-950 shadow-sm ${
                        idx === 0 ? 'bg-indigo-600' : 'bg-slate-400 dark:bg-slate-600'
                      }`}
                    />
                    <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          {item.title}
                        </h4>
                        <span className="text-xs text-slate-500 font-medium tabular-nums">{item.period}</span>
                      </div>
                      <p className="mt-1 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                        {item.tag}
                      </p>
                      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Favorite Subjects Column */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                {t.academics.subjectsTitle}
              </h3>

              <div className="space-y-4">
                {t.academics.subjects.map((subj) => (
                  <div key={subj.name} className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{subj.name}</span>
                      <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 tabular-nums">
                        {subj.score}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                      {subj.desc}
                    </p>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: subj.pct }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Awards Grid */}
              <div className="pt-4 space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {t.academics.awardsTitle}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {t.academics.awards.map((award) => (
                    <div key={award.title} className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                        <Award className="w-4 h-4 text-amber-500 shrink-0" />
                        {award.medal}
                      </div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{award.title}</p>
                      <p className="text-slate-500 dark:text-slate-400">{award.event}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: LIFESTYLE & PERSONAL INTERESTS */}
        <section id="lifestyle" className="scroll-mt-24 space-y-8">
          <div>
            <p className="text-xs font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400 mb-2">
              {t.lifestyle.kicker}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.lifestyle.title}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-base max-w-2xl">
              {t.lifestyle.subtitle}
            </p>
          </div>

          {/* Interactive Tabbed Interface */}
          <div className="space-y-6">
            {/* Tab Buttons */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-200/70 dark:bg-slate-900 rounded-xl overflow-x-auto max-w-2xl border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setActiveTab('routine')}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'routine'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                {t.lifestyle.tabRoutine}
              </button>

              <button
                onClick={() => setActiveTab('hobbies')}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'hobbies'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Heart className="w-3.5 h-3.5" />
                {t.lifestyle.tabHobbies}
              </button>

              <button
                onClick={() => setActiveTab('books')}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'books'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <BookMarked className="w-3.5 h-3.5" />
                {t.lifestyle.tabBooks}
              </button>

              <button
                onClick={() => setActiveTab('journal')}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'journal'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                {t.lifestyle.tabJournal}
              </button>
            </div>

            {/* Tab 1: Daily Routine */}
            {activeTab === 'routine' && (
              <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {t.lifestyle.routineHeader}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t.lifestyle.routineSub}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full w-fit">
                    {t.lifestyle.cadenceTag}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {t.lifestyle.routineList.map((block) => (
                    <div key={block.time} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                        {block.time}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{block.title}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {block.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Hobbies & Sports */}
            {activeTab === 'hobbies' && (
              <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {t.lifestyle.hobbiesHeader}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t.lifestyle.hobbiesSub}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{t.lifestyle.hobbiesList[0].title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {t.lifestyle.hobbiesList[0].desc}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <Flame className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{t.lifestyle.hobbiesList[1].title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {t.lifestyle.hobbiesList[1].desc}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{t.lifestyle.hobbiesList[2].title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {t.lifestyle.hobbiesList[2].desc}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Book & Media Shelf */}
            {activeTab === 'books' && (
              <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {t.lifestyle.booksHeader}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t.lifestyle.booksSub}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Books */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {t.lifestyle.booksCategoryLabel}
                    </h4>
                    <div className="space-y-3">
                      {t.lifestyle.booksList.map((book) => (
                        <div key={book.title} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{book.title}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{book.author}</p>
                            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                              {book.desc}
                            </p>
                          </div>
                          <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 tabular-nums shrink-0">
                            {book.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Podcasts & Media */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {t.lifestyle.podcastsCategoryLabel}
                    </h4>
                    <div className="space-y-3">
                      {t.lifestyle.podcastsList.map((podcast) => (
                        <div key={podcast.title} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <Radio className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                              <p className="text-sm font-bold text-slate-900 dark:text-white">{podcast.title}</p>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{podcast.host}</p>
                            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                              {podcast.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Student Journal */}
            {activeTab === 'journal' && (
              <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {t.lifestyle.journalHeader}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t.lifestyle.journalSub}
                  </p>
                </div>

                <div className="space-y-4">
                  {t.lifestyle.journalList.map((entry) => (
                    <article key={entry.title} className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">{entry.tag}</span>
                        <span className="tabular-nums">{entry.date}</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {entry.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {entry.text}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 5: FUTURE ASPIRATIONS */}
        <section id="aspirations" className="scroll-mt-24 space-y-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400 mb-2">
              {t.aspirations.kicker}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.aspirations.title}
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
              {t.aspirations.bio}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.aspirations.cards.map((card) => (
              <div key={card.step} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {card.step}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{card.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          <blockquote className="p-6 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 text-indigo-900 dark:text-indigo-200 text-sm sm:text-base italic leading-relaxed">
            {t.aspirations.mottoText}
            <span className="block not-italic text-xs font-semibold text-indigo-700 dark:text-indigo-300 mt-2">
              {t.aspirations.mottoAuthor}
            </span>
          </blockquote>
        </section>

        {/* SECTION 6: CONTACT ME */}
        <section id="contact" className="scroll-mt-24 space-y-8">
          <div>
            <p className="text-xs font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400 mb-2">
              {t.contact.kicker}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.contact.title}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-base max-w-2xl">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="flex items-center gap-2.5 text-xs text-indigo-700 dark:text-indigo-300 bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 px-3.5 py-2.5 rounded-xl">
                  <Inbox className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>{t.contact.inboxNotice}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {t.contact.labelName}
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder={language === 'bn' ? 'যেমন: সাকিব আহমেদ' : 'e.g. Sarah Jenkins'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {t.contact.labelEmail}
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="e.g. user@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {t.contact.labelSubject}
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder={language === 'bn' ? 'যেমন: বিজ্ঞান আলোচনা বা বার্তা' : 'e.g. Science discussion or note'}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {t.contact.labelMessage}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder={language === 'bn' ? 'আপনার বার্তা এখানে লিখুন...' : 'Write your note or question here...'}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors resize-none"
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-bold">{t.contact.successTitle}</p>
                        <p className="text-xs mt-0.5 text-emerald-700 dark:text-emerald-300 leading-relaxed">
                          {t.contact.successDesc}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSubmitStatus('idle')}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-200 hover:underline cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        {t.contact.btnReset}
                      </button>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
                    <div className="space-y-2.5">
                      <div>
                        <p className="text-sm font-bold">{t.contact.errorTitle}</p>
                        <p className="text-xs mt-0.5 text-rose-700 dark:text-rose-300 leading-relaxed">
                          {t.contact.errorDesc}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href={`mailto:aliarafat57000@gmail.com?subject=${encodeURIComponent(formData.subject || 'Portfolio Note')}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.name + ' (' + formData.email + ')')}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          {t.contact.btnOpenMail}
                        </a>
                        <button
                          type="button"
                          onClick={() => setSubmitStatus('idle')}
                          className="px-3 py-1.5 rounded-lg border border-rose-300 dark:border-rose-700 text-xs font-semibold hover:bg-rose-100/50 dark:hover:bg-rose-900/40 transition-colors cursor-pointer"
                        >
                          {t.contact.btnReset}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 rounded-lg transition-colors shadow-sm disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t.contact.btnSending}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {t.contact.btnSubmit}
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Sidebar Column: Contact Info & Safe Social Links */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{t.contact.directTitle}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {t.contact.directSub}
                </p>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                  <a
                    href="mailto:aliarafat57000@gmail.com"
                    className="flex items-center gap-2 overflow-hidden hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
                  >
                    <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                      aliarafat57000@gmail.com
                    </span>
                  </a>
                  <button
                    onClick={copyEmailToClipboard}
                    className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors shrink-0 cursor-pointer text-xs font-medium"
                    title={t.contact.btnCopy}
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{t.contact.socialTitle}</h3>
                <div className="space-y-3">
                  <a
                    href="https://www.facebook.com/aliarafat.5203"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-blue-50/60 dark:hover:bg-blue-950/20 hover:border-blue-300 dark:hover:border-blue-800/60 transition-all text-xs font-semibold text-slate-700 dark:text-slate-200 group"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Facebook className="w-3.5 h-3.5" />
                      </span>
                      {t.contact.linkFacebook}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  </a>

                  <a
                    href="https://wa.me/8801804734908"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/20 hover:border-emerald-300 dark:hover:border-emerald-800/60 transition-all text-xs font-semibold text-slate-700 dark:text-slate-200 group"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <MessageCircle className="w-3.5 h-3.5" />
                      </span>
                      {t.contact.linkWhatsapp}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                  </a>

                  <a
                    href="#lifestyle"
                    onClick={() => setActiveTab('journal')}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {t.contact.linkJournal}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-2.5">
            <LogoMark size={26} className="w-6 h-6 rounded-lg !shadow-none" />
            <p>© {new Date().getFullYear()} {t.footer.copyright}</p>
            <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
              v 1.0
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">v 1.0</span>
            <a href="#hero" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              {t.footer.backToTop}
            </a>
          </div>
        </div>
      </footer>

      {/* BLOG READER MODAL */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                    {selectedPost.categoryLabel}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedPost.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedPost.readTime}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedPost.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label={t.blog.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Picture in Modal */}
            <div className="space-y-2">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                <Image
                  src={selectedPost.imageUrl}
                  alt={selectedPost.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {selectedPost.imageCaption && (
                <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                  {selectedPost.imageCaption}
                </p>
              )}
            </div>

            {/* Story Content */}
            <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {selectedPost.content.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              {selectedPost.isCustom ? (
                <button
                  type="button"
                  onClick={() => handleDeletePost(selectedPost.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{t.blog.deletePost}</span>
                </button>
              ) : (
                <span className="text-xs text-slate-400">
                  {language === 'bn' ? 'আলী আরাফাতের শিক্ষার্থী ডায়েরি' : 'Student Journal of Ali Arafat'}
                </span>
              )}

              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                {t.blog.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD BLOG POST WITH PICTURE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Camera className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  {t.blog.modalAddTitle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {t.blog.modalAddDesc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              {/* Picture Input Zone */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {t.blog.labelImage}
                </label>

                {newImageUrl ? (
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 group">
                    <Image
                      src={newImageUrl}
                      alt="Uploaded preview"
                      fill
                      unoptimized
                      referrerPolicy="no-referrer"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setNewImageUrl('')}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 text-white hover:bg-rose-500 shadow-sm cursor-pointer"
                      >
                        {language === 'bn' ? 'ছবি পরিবর্তন / মুছুন' : 'Remove Photo'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-xl cursor-pointer bg-slate-50 dark:bg-slate-800/40 transition-colors p-4">
                      <UploadCloud className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-2" />
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                        {t.blog.uploadPhoto}
                      </span>
                      <span className="text-[11px] text-slate-500 mt-1">
                        {t.blog.uploadHint}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>

                    {/* Presets */}
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-medium text-slate-500">
                        {t.blog.presetPhotos}
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { url: '/images/blog_campus.jpg', name: language === 'bn' ? 'ক্যাম্পাস' : 'Campus' },
                          { url: '/images/blog_robotics.jpg', name: language === 'bn' ? 'রোবোটিক্স' : 'Robotics' },
                          { url: '/images/lifestyle_books_study_1793686325956.jpg', name: language === 'bn' ? 'পড়ার টেবিল' : 'Study' },
                          { url: '/images/project_science_stem_1793686326788.jpg', name: language === 'bn' ? 'বিজ্ঞান প্রজেক্ট' : 'Science' },
                        ].map((preset) => (
                          <button
                            key={preset.url}
                            type="button"
                            onClick={() => setNewImageUrl(preset.url)}
                            className="text-left p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors cursor-pointer text-[11px] text-slate-700 dark:text-slate-300"
                          >
                            <span className="block truncate">{preset.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="url"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        placeholder={t.blog.orImageUrl}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Title input */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {t.blog.labelTitle}
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={t.blog.placeholderTitle}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Category, Date & Read Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {t.blog.labelCategory}
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="campus">{t.blog.catCampus}</option>
                    <option value="tech">{t.blog.catTech}</option>
                    <option value="study">{t.blog.catStudy}</option>
                    <option value="reflections">{t.blog.catReflections}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {t.blog.labelDate}
                  </label>
                  <input
                    type="text"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    placeholder={language === 'bn' ? 'যেমন: ৫ নভেম্বর, ২০২৬' : 'e.g., Nov 5, 2026'}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {t.blog.labelReadTime}
                  </label>
                  <input
                    type="text"
                    value={newReadTime}
                    onChange={(e) => setNewReadTime(e.target.value)}
                    placeholder={language === 'bn' ? '৩ মিনিট পাঠ' : '3 min read'}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Story Content */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {t.blog.labelContent}
                </label>
                <textarea
                  required
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder={t.blog.placeholderContent}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none leading-relaxed"
                />
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  {t.blog.btnCancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm cursor-pointer"
                >
                  {t.blog.btnPublish}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

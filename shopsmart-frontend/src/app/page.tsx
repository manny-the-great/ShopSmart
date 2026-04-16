'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  BarChart3,
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
  CheckCircle2,
  Zap,
  Star,
  ChevronRight,
  Menu,
  X,
  Banknote,
  Smartphone,
  CreditCard,
} from 'lucide-react';

const FEATURES = [
  { icon: BarChart3, label: 'Sales Tracking', color: 'bg-green-100 text-green-700' },
  { icon: Package, label: 'Inventory Management', color: 'bg-orange-100 text-orange-700' },
  { icon: Users, label: 'Staff Accounts', color: 'bg-blue-100 text-blue-700' },
  { icon: ShoppingCart, label: 'POS System', color: 'bg-purple-100 text-purple-700' },
  { icon: TrendingUp, label: 'Income Reports', color: 'bg-pink-100 text-pink-700' },
  { icon: Zap, label: 'Fast Checkout', color: 'bg-yellow-100 text-yellow-700' },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Create your account',
    desc: 'Sign up as a vendor and set up your business profile in under 2 minutes.',
    icon: CheckCircle2,
  },
  {
    step: '02',
    title: 'Add your products',
    desc: 'Build your catalogue with product names, prices, and stock quantities.',
    icon: Package,
  },
  {
    step: '03',
    title: 'Start selling',
    desc: 'Use the POS screen to take walk-in orders, generate invoices, and track every sale.',
    icon: ShoppingCart,
  },
];

const TESTIMONIALS = [
  {
    name: 'Chidinma O.',
    business: 'Chidi\'s Provisions',
    text: 'ShopSmart completely changed how I run my store. I know exactly what I earn daily now.',
    rating: 5,
  },
  {
    name: 'Tunde Babs',
    business: 'TB Mini Mart',
    text: 'My attendants love how easy the POS is. No training needed at all!',
    rating: 5,
  },
  {
    name: 'Amaka Eze',
    business: 'Amaka Stores',
    text: 'The inventory alerts saved me from running out of stock during a busy week.',
    rating: 5,
  },
];

const NAV_LINKS = ['Features', 'How it works', 'Pricing'];

export default function LandingPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F8F5] text-[#111827] font-sans overflow-x-hidden">
      {/* ────────── NAVBAR ────────── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#e8e8e4]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#22C55E] flex items-center justify-center shadow-sm">
              <span className="text-white font-black text-sm">S</span>
            </div>
            <span className="text-lg font-bold tracking-tight">ShopSmart</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-sm font-medium text-gray-600 hover:text-[#111827] transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => router.push('/pin')}
              className="px-4 py-2 text-sm font-semibold text-[#111827] hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => router.push('/pin')}
              className="px-5 py-2 text-sm font-semibold bg-[#22C55E] text-white rounded-xl hover:bg-[#16a34a] transition-colors shadow-sm cursor-pointer"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-[#e8e8e4] overflow-hidden"
            >
              <div className="px-5 py-4 space-y-3">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="block py-2 text-sm font-medium text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link}
                  </a>
                ))}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => router.push('/pin')}
                    className="flex-1 py-3 text-sm font-semibold border border-[#e8e8e4] rounded-xl cursor-pointer"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => router.push('/pin')}
                    className="flex-1 py-3 text-sm font-semibold bg-[#22C55E] text-white rounded-xl cursor-pointer"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ────────── HERO ────────── */}
      <section className="pt-28 pb-20 px-5 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left – Text */}
          <div className="flex-1 text-center lg:text-left space-y-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-green-50 border border-green-100 px-4 py-2 rounded-full"
            >
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-sm font-semibold text-green-700">Built for Nigerian businesses</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-5xl md:text-6xl font-black leading-[1.1] tracking-tight"
            >
              Manage your business.{' '}
              <span className="text-[#22C55E]">Track every sale.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-lg text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              ShopSmart gives your business a modern POS, inventory tracker, and sales dashboard — all in one easy-to-use app. No complicated setup needed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
            >
              <button
                onClick={() => router.push('/pin')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 bg-[#22C55E] text-white font-bold rounded-2xl hover:bg-[#16a34a] hover:scale-[1.02] transition-all shadow-lg shadow-green-200 cursor-pointer"
              >
                Get Started Free
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => router.push('/pin')}
                className="w-full sm:w-auto px-7 py-4 border border-[#e8e8e4] bg-white font-semibold rounded-2xl hover:bg-gray-50 transition-all cursor-pointer"
              >
                View Demo
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500"
            >
              <div className="flex -space-x-2">
                {['🙂', '😊', '🤩', '😃'].map((emoji, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-white border-2 border-[#F8F8F5] flex items-center justify-center text-sm shadow-sm"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <span>
                Trusted by <strong className="text-[#111827]">500+</strong> vendors
              </span>
            </motion.div>
          </div>

          {/* Right – Dashboard Mock */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex-1 w-full max-w-md relative"
          >
            {/* Background glow */}
            <div className="absolute -inset-4 bg-green-100 rounded-3xl blur-2xl opacity-50" />

            <div className="relative bg-white rounded-3xl shadow-2xl border border-[#e8e8e4] overflow-hidden">
              {/* Mock top bar */}
              <div className="bg-[#22C55E] px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-xs font-medium">Good morning! 👋</p>
                  <p className="text-white font-bold">Hi Manny</p>
                </div>
                <div className="bg-white/20 px-3 py-1.5 rounded-lg">
                  <p className="text-white text-xs font-semibold">Today</p>
                </div>
              </div>

              <div className="p-5 space-y-4">
                {/* Revenue card */}
                <div className="bg-[#F8F8F5] rounded-2xl p-4">
                  <p className="text-xs text-gray-500 font-medium mb-1">Today's Revenue</p>
                  <p className="text-3xl font-black text-[#111827]">₦48,200</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp size={14} className="text-green-500" />
                    <span className="text-xs font-semibold text-green-600">+18% from yesterday</span>
                  </div>
                </div>

                {/* Payment breakdown */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Cash', amount: '₦18,200', color: 'bg-green-500', bg: 'bg-green-50', text: 'text-green-700', icon: Banknote },
                    { label: 'Transfer', amount: '₦22,000', color: 'bg-blue-500', bg: 'bg-blue-50', text: 'text-blue-700', icon: Smartphone },
                    { label: 'Card', amount: '₦8,000', color: 'bg-orange-500', bg: 'bg-orange-50', text: 'text-orange-700', icon: CreditCard },
                  ].map((item) => (
                    <div key={item.label} className={`${item.bg} rounded-xl p-3 text-center`}>
                      <p className={`text-xs font-bold ${item.text} mb-1`}>{item.label}</p>
                      <p className={`text-sm font-black ${item.text}`}>{item.amount}</p>
                    </div>
                  ))}
                </div>

                {/* Recent transactions */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Recent Sales</p>
                  <div className="space-y-2">
                    {[
                      { items: 'Milk × 2, Bread × 1', amount: '₦3,200', method: 'cash', time: '10 min ago' },
                      { items: 'Coffee × 1, Oil × 1', amount: '₦8,000', method: 'transfer', time: '42 min ago' },
                      { items: 'Water × 6, Eggs × 1', amount: '₦3,800', method: 'card', time: '1h ago' },
                    ].map((txn, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-[#F8F8F5] rounded-xl">
                        <div>
                          <p className="text-xs font-semibold text-[#111827] truncate max-w-[130px]">{txn.items}</p>
                          <p className="text-[10px] text-gray-400">{txn.time}</p>
                        </div>
                        <p className="text-sm font-bold text-[#111827]">{txn.amount}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* New Sale button */}
                <button className="w-full py-3 bg-[#22C55E] text-white font-bold rounded-xl text-sm">
                  + New Sale
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ────────── FEATURES STRIP ────────── */}
      <section id="features" className="py-8 border-y border-[#e8e8e4] bg-white overflow-hidden">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide px-5 max-w-6xl mx-auto">
          {[...FEATURES, ...FEATURES].map((f, i) => (
            <div
              key={i}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full whitespace-nowrap flex-shrink-0 ${f.color}`}
            >
              <f.icon size={15} />
              <span className="text-sm font-semibold">{f.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ────────── PRODUCT PREVIEW ────────── */}
      <section id="pricing" className="py-20 px-5 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Everything built for <span className="text-[#22C55E]">your business</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From taking orders to analysing your revenue — ShopSmart covers everything a vendor needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              emoji: '🛒',
              title: 'Smart POS',
              desc: 'Tap products, see the total update instantly, choose payment method and confirm. Takes under 20 seconds.',
              color: 'bg-green-50 border-green-100',
              accent: 'text-green-600',
            },
            {
              emoji: '📊',
              title: 'Vendor Dashboard',
              desc: 'See daily revenue, payment breakdown by cash/transfer/card, and a 7-day chart — all at a glance.',
              color: 'bg-blue-50 border-blue-100',
              accent: 'text-blue-600',
            },
            {
              emoji: '📦',
              title: 'Inventory Control',
              desc: 'Track stock quantities, get low-stock alerts, and update inventory with a single tap.',
              color: 'bg-orange-50 border-orange-100',
              accent: 'text-orange-600',
            },
            {
              emoji: '👥',
              title: 'Staff Management',
              desc: 'Create PIN-protected sub-accounts for your attendants. Each attendant can only see what they need.',
              color: 'bg-purple-50 border-purple-100',
              accent: 'text-purple-600',
            },
            {
              emoji: '🧾',
              title: 'Auto Receipts',
              desc: 'Generate a professional receipt after every sale. Print or share via WhatsApp instantly.',
              color: 'bg-pink-50 border-pink-100',
              accent: 'text-pink-600',
            },
            {
              emoji: '📜',
              title: 'Transaction History',
              desc: 'Filter all past sales by date, cashier, or payment method. Never lose a record.',
              color: 'bg-yellow-50 border-yellow-100',
              accent: 'text-yellow-700',
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`${card.color} border rounded-3xl p-6 hover:scale-[1.02] transition-transform`}
            >
              <div className="text-4xl mb-4">{card.emoji}</div>
              <h3 className={`text-xl font-bold mb-2 ${card.accent}`}>{card.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ────────── HOW IT WORKS ────────── */}
      <section id="how-it-works" className="py-20 bg-white border-y border-[#e8e8e4]">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Up and running in{' '}
              <span className="text-[#22C55E]">3 steps</span>
            </h2>
            <p className="text-gray-500 text-lg">
              No training, no manual. ShopSmart is built to be used immediately.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative text-center"
              >
                {/* Connector */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] right-0 h-0.5 bg-gradient-to-r from-[#e8e8e4] to-transparent" />
                )}

                <div className="w-16 h-16 rounded-2xl bg-[#22C55E] text-white flex items-center justify-center mx-auto mb-5 shadow-lg shadow-green-100">
                  <step.icon size={28} />
                </div>
                <div className="text-xs font-bold text-[#22C55E] uppercase tracking-widest mb-2">Step {step.step}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── TESTIMONIALS ────────── */}
      <section className="py-20 px-5 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black mb-3">
            Loved by <span className="text-[#22C55E]">vendors</span>
          </h2>
          <p className="text-gray-500">Real businesses seeing real results.</p>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl border border-[#e8e8e4] p-8 shadow-sm text-center"
            >
              <div className="flex justify-center gap-1 mb-4">
                {Array(TESTIMONIALS[activeTestimonial].rating).fill(0).map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-lg font-medium text-gray-700 mb-6 italic">
                &ldquo;{TESTIMONIALS[activeTestimonial].text}&rdquo;
              </p>
              <p className="font-bold text-[#111827]">{TESTIMONIALS[activeTestimonial].name}</p>
              <p className="text-sm text-gray-500">{TESTIMONIALS[activeTestimonial].business}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-5">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === activeTestimonial ? 'bg-[#22C55E] w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ────────── CTA ────────── */}
      <section className="py-20 px-5">
        <div className="max-w-4xl mx-auto bg-[#22C55E] rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/5 rounded-full" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
              Start using ShopSmart today
            </h2>
            <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">
              Join hundreds of vendors already managing their businesses smarter with ShopSmart.
            </p>
            <button
              onClick={() => router.push('/pin')}
              className="px-8 py-4 bg-white text-[#16a34a] font-bold rounded-2xl hover:bg-gray-50 hover:scale-[1.02] transition-all shadow-xl cursor-pointer inline-flex items-center gap-2"
            >
              Get Started — It's Free
              <ArrowRight size={18} />
            </button>

            <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
              {['No credit card', 'Instant setup', 'Works offline'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-white/80 text-sm font-medium">
                  <CheckCircle2 size={16} className="text-white" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────── FOOTER ────────── */}
      <footer className="border-t border-[#e8e8e4] bg-white py-12 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#22C55E] flex items-center justify-center">
                <span className="text-white font-black text-sm">S</span>
              </div>
              <span className="text-lg font-bold">ShopSmart</span>
            </div>
            <div className="flex gap-8 text-sm text-gray-500">
              <a href="#" className="hover:text-[#22C55E] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#22C55E] transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-[#22C55E] transition-colors">Contact Us</a>
            </div>
          </div>
          <div className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} ShopSmart Technologies. Designed for small businesses in Nigeria.
          </div>
        </div>
      </footer>
    </div>
  );
}

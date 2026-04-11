'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  Smartphone, 
  CreditCard, 
  BarChart3, 
  ShieldCheck, 
  CheckCircle2,
  TrendingUp,
  Wallet
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="bg-[#0B0F0C] text-white min-h-screen font-sans selection:bg-[#A3FF12] selection:text-black">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#A3FF12] flex items-center justify-center">
            <span className="text-[#0B0F0C] font-bold text-xl leading-none italic">S</span>
          </div>
          <span className="text-xl font-bold tracking-tight italic">ShopSmart</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <button onClick={() => router.push('/pin')} className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer">
            Login
          </button>
          <button onClick={() => router.push('/pin')} className="px-5 py-2.5 rounded-full bg-[#A3FF12] text-black hover:bg-[#8ee60e] font-semibold transition-all cursor-pointer">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Glowing background effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#A3FF12]/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300"
            >
              <span className="w-2 h-2 rounded-full bg-[#A3FF12] animate-pulse" />
              The smart POS for modern businesses
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold leading-tight"
            >
              Think smart. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3FF12] to-[#4ade80]">Track your money.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Record sales instantly, track cash, transfers, and cards. Stop losing money and understand your daily performance with an app as easy as a calculator.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button 
                onClick={() => router.push('/pin')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#A3FF12] text-black text-lg font-semibold hover:bg-[#8ee60e] hover:scale-105 transition-all shadow-[0_0_30px_rgba(163,255,18,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                Start using ShopSmart
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => router.push('/pin')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 text-white border border-white/10 text-lg font-medium hover:bg-white/10 transition-all cursor-pointer"
              >
                Try the Demo
              </button>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 relative w-full max-w-lg"
          >
            {/* Mock UI Card */}
            <div className="relative z-10 w-full bg-[#111827] rounded-[2rem] border border-white/10 p-6 shadow-2xl backdrop-blur-sm shadow-[#A3FF12]/5">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <p className="text-gray-400 text-sm">Total Revenue</p>
                  <p className="text-4xl font-bold mt-1">₦145,200.</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#A3FF12]/20 flex items-center justify-center text-[#A3FF12]">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Transfer', amount: '₦85,000', color: 'bg-blue-500' },
                  { name: 'POS Card', amount: '₦40,000', color: 'bg-orange-500' },
                  { name: 'Cash', amount: '₦20,200', color: 'bg-green-500' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="font-medium text-gray-200">{item.name}</span>
                    </div>
                    <span className="font-bold text-lg">{item.amount}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <button className="w-full py-4 rounded-xl bg-[#A3FF12] text-black font-semibold text-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(163,255,18,0.2)]">
                  <span className="text-2xl leading-none mb-1">+</span> New Sale
                </button>
              </div>
            </div>

            {/* Floating element behind */}
            <div className="absolute -bottom-10 -right-10 z-0 bg-gradient-to-tr from-[#1e293b] to-[#111827] p-5 rounded-[1.5rem] border border-white/5 shadow-2xl skew-y-6 rotate-3 opacity-60 w-64 h-64 mix-blend-screen" />
          </motion.div>
        </div>
      </section>

      {/* Trust section */}
      <section className="py-10 border-y border-white/5 bg-[#111827]/30">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs font-semibold text-gray-500 mb-6 uppercase tracking-[0.2em]">Trusted by small businesses across Nigeria</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Fake logos */}
             <div className="flex items-center gap-2 font-bold text-xl"><div className="w-6 h-6 rounded bg-[#A3FF12]" /> MarketHub</div>
             <div className="flex items-center gap-2 font-bold text-xl"><div className="w-6 h-6 rounded-full bg-[#4ade80]" /> PrimeRetail</div>
             <div className="flex items-center gap-2 font-bold text-xl"><div className="w-6 h-6 rounded-sm rotate-45 bg-[#A3FF12]" /> QuickStore</div>
             <div className="flex items-center gap-2 font-bold text-xl"><div className="w-6 h-6 rounded-tl-xl rounded-br-xl bg-[#4ade80]" /> EasyShop</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 relative">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[300px] w-full bg-[#111827]/50 -skew-y-3 z-0" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3FF12] to-[#4ade80]">grow</span></h2>
            <p className="text-gray-400 text-lg">We stripped away the complexity. ShopSmart gives you powerful business tools that feel naturally intuitive.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Record Sales Fast',
                desc: 'Tap, tap, done. Our calculator-like interface makes recording sales faster than writing them down.',
                icon: Smartphone
              },
              {
                title: 'Track Every Kobo',
                desc: 'Know exactly how much came in via Cash, Transfer, or Card. Never mix up your payments again.',
                icon: Wallet
              },
              {
                title: 'Detect Missing Money',
                desc: 'Instantly spot discrepancies between expected cash and actual cash drawer amounts.',
                icon: ShieldCheck
              },
              {
                title: 'Daily Insights',
                desc: 'Beautiful dashboards that summarize your daily performance, best-selling products, and revenue.',
                icon: BarChart3
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 rounded-[2rem] bg-[#111827]/80 backdrop-blur-md border border-white/5 hover:border-[#A3FF12]/30 transition-all hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(163,255,18,0.1)] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-[#A3FF12]/10 transition-colors" />
                <div className="w-14 h-14 rounded-2xl bg-[#A3FF12]/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform relative z-10">
                  <feature.icon className="w-7 h-7 text-[#A3FF12]" />
                </div>
                <h3 className="text-xl font-bold mb-3 relative z-10">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm relative z-10">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-32 bg-[#111827]/30 border-y border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6">
           <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="flex-1 space-y-12">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">Simple, clear tracking</h2>
                  <p className="text-gray-400 text-lg">Start managing your business smartly with three simple steps.</p>
                </div>

                <div className="space-y-8">
                  {[
                    { num: '01', title: 'Add your products', desc: 'Create a simple list of what you sell along with their prices.' },
                    { num: '02', title: 'Record everyday sales', desc: 'Use the web POS interface to log sales and choose payment methods.' },
                    { num: '03', title: 'See your money', desc: 'Get daily summaries and real-time insights on your dashboard.' }
                  ].map((step, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex gap-6 group cursor-default"
                    >
                      <div className="text-3xl font-black text-white/5 group-hover:text-[#A3FF12]/50 transition-colors duration-500">{step.num}</div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                        <p className="text-gray-400">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex-1 relative w-full max-w-md mx-auto">
                 {/* Fake Dashboard Layout Graphic */}
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.7 }}
                   className="relative z-10 w-full aspect-[4/5] bg-gradient-to-b from-[#111827] to-[#0B0F0C] rounded-[2.5rem] border border-white/10 p-5 shadow-2xl flex flex-col gap-5 overflow-hidden"
                 >
                   <div className="h-44 rounded-[1.5rem] bg-gradient-to-br from-[#A3FF12]/20 to-[#A3FF12]/5 border border-white/5 p-5 flex flex-col justify-end relative overflow-hidden group">
                     <div className="absolute top-4 right-4"><CheckCircle2 className="text-[#A3FF12]" /></div>
                     <p className="text-sm font-medium text-gray-300">Total Profit</p>
                     <p className="text-5xl font-black mt-1">₦42,000</p>
                     
                     {/* subtle decorative line */}
                     <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#A3FF12]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   </div>
                   
                   <div className="flex gap-4">
                     <div className="flex-1 h-28 rounded-2xl bg-[#1e293b]/50 border border-white/5 p-4 flex flex-col justify-between hover:bg-[#1e293b] transition-colors">
                       <CreditCard className="w-6 h-6 text-orange-400" />
                       <p className="font-bold text-lg">24 Sales</p>
                     </div>
                     <div className="flex-1 h-28 rounded-2xl bg-[#1e293b]/50 border border-white/5 p-4 flex flex-col justify-between hover:bg-[#1e293b] transition-colors">
                       <BarChart3 className="w-6 h-6 text-[#A3FF12]" />
                       <p className="font-bold text-lg text-[#A3FF12]">+12%</p>
                     </div>
                   </div>

                   <div className="flex-1 rounded-2xl bg-[#1e293b]/50 border border-white/5 p-5 relative overflow-hidden">
                      <p className="text-sm font-medium mb-4 text-gray-300">Recent Activity</p>
                      <div className="space-y-4">
                        <div className="h-12 rounded-xl bg-white/5 w-full flex items-center px-4 gap-3">
                           <div className="w-6 h-6 rounded-full bg-blue-500/20 flex-shrink-0" />
                           <div className="h-2 rounded bg-white/20 w-1/3" />
                           <div className="ml-auto h-2 rounded bg-white/40 w-1/5" />
                        </div>
                        <div className="h-12 rounded-xl bg-white/5 w-full flex items-center px-4 gap-3">
                           <div className="w-6 h-6 rounded-full bg-green-500/20 flex-shrink-0" />
                           <div className="h-2 rounded bg-white/20 w-1/4" />
                           <div className="ml-auto h-2 rounded bg-white/40 w-1/4" />
                        </div>
                        <div className="h-12 rounded-xl bg-white/5 w-full flex items-center px-4 gap-3">
                           <div className="w-6 h-6 rounded-full bg-orange-500/20 flex-shrink-0" />
                           <div className="h-2 rounded bg-white/20 w-2/5" />
                           <div className="ml-auto h-2 rounded bg-white/40 w-1/6" />
                        </div>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B0F0C] to-transparent pointer-events-none" />
                   </div>
                 </motion.div>
                 
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#A3FF12]/10 blur-[100px] rounded-full pointer-events-none" />
              </div>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden flex justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#A3FF12]/5 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-8 max-w-3xl mx-auto tracking-tight">
              Ready to take control of your <br className="hidden md:block"/> business <span className="text-[#A3FF12]">finances?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-xl mx-auto leading-relaxed">
              Join thousands of small businesses stepping into the future of tracking with ShopSmart.
            </p>
            <button 
               onClick={() => router.push('/pin')}
               className="px-10 py-5 rounded-full bg-[#A3FF12] text-black text-xl font-bold hover:bg-[#8ee60e] hover:scale-105 transition-all shadow-[0_0_40px_rgba(163,255,18,0.3)] cursor-pointer"
            >
              Get Started Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black pt-16 pb-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#A3FF12] flex items-center justify-center">
                <span className="text-black font-bold text-xl leading-none italic">S</span>
              </div>
              <span className="text-2xl font-bold tracking-tight italic text-white">ShopSmart</span>
            </div>
            
            <div className="flex gap-8 text-gray-400 font-medium">
              <a href="#" className="hover:text-[#A3FF12] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#A3FF12] transition-colors">Terms</a>
              <a href="#" className="hover:text-[#A3FF12] transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="text-center text-gray-600 text-sm border-t border-white/5 pt-8">
            &copy; {new Date().getFullYear()} ShopSmart Technologies. Designed for small businesses.
          </div>
        </div>
      </footer>
    </div>
  );
}

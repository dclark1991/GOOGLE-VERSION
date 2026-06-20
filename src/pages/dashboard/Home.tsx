import { motion } from 'motion/react';
import { ArrowUpRight, Megaphone, Target, BookOpen, PieChart, Info, PlayCircle, CheckCircle2, TrendingUp, Activity, BarChart3, Users, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { ActionPlanRecord } from '../../types/actionPlan';
import { STANDARDS } from '../../data/standards';

const UPDATES = [
  {
    id: 1,
    title: 'New Social Media Posters Available',
    date: 'Today, 09:00 AM',
    content: 'We have just uploaded a new batch of beautiful social media posters designed to drive awareness for World Mental Health Day.',
    category: 'Resources'
  },
  {
    id: 2,
    title: 'Leadership Module 2 Released',
    date: 'Yesterday, 14:30 PM',
    content: 'MH Leads now have access to "Active Listening Protocol" in the Learning section. Please complete by end of month.',
    category: 'Learning'
  }
];

export default function Home() {
  const role = localStorage.getItem('userRole') || 'Guest';
  const roleName = role === 'GM' ? 'General Manager' : role === 'MH_LEAD' ? 'MH Lead' : 'First Aider';

  const [clubDetails, setClubDetails] = useState<{clubName: string}>({ clubName: 'Your Club' });
  const [latestPlan, setLatestPlan] = useState<ActionPlanRecord | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('latestActionPlan');
    if (saved) {
      setLatestPlan(JSON.parse(saved));
    }
    const details = localStorage.getItem('clubDetails');
    if (details) {
      setClubDetails(JSON.parse(details));
    }
  }, []);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6 md:items-end justify-between border-b border-brand-primary/10 pb-6">
        <div>
          <span className="text-brand-secondary font-bold tracking-widest uppercase mb-2 block text-xs">Overview</span>
          <h1 className="text-4xl font-heading font-medium tracking-tight text-brand-primary mb-2">Welcome back.</h1>
          <p className="text-brand-dark/60 text-lg">
            Here's what's happening today at <strong className="text-brand-primary font-semibold">{clubDetails.clubName || 'your club'}</strong>.
          </p>
        </div>
        <div className="flex gap-4">
           {/* Mini Stat */}
           <div className="bg-white px-5 py-4 rounded-2xl shadow-sm border border-brand-primary/5 flex items-center gap-4">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="24" cy="24" r="20" className="stroke-brand-primary/10 stroke-[4] fill-none" />
                <circle cx="24" cy="24" r="20" className="stroke-brand-secondary stroke-[4] fill-none" strokeDasharray="125.6" strokeDashoffset="40" strokeLinecap="round" />
              </svg>
              <span className="absolute text-brand-primary font-bold text-xs">68%</span>
            </div>
            <div>
              <p className="text-sm font-bold text-brand-primary">Onboarding</p>
              <p className="text-xs text-brand-dark/50 font-medium">2 modules left</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">
        
        {/* Core Metric 1 */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="md:col-span-4 bg-white rounded-[2rem] p-8 shadow-sm border border-brand-primary/5 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-brand-secondary transition-colors">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest bg-brand-primary/5 px-3 py-1.5 rounded-full">
              Action Plan
            </span>
          </div>
          <div className="relative z-10">
            <p className="text-5xl font-heading text-brand-primary mb-2">{latestPlan?.focusIds?.length || 0}</p>
            <h3 className="text-brand-dark/70 font-medium text-sm">Active Focus Targets</h3>
          </div>
          <div className="absolute right-0 bottom-0 w-32 h-32 bg-brand-secondary/10 rounded-tl-[100px] -z-0 group-hover:bg-brand-secondary/20 transition-colors" />
        </motion.div>

        {/* Core Metric 2 */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="md:col-span-4 bg-white rounded-[2rem] p-8 shadow-sm border border-brand-primary/5 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors">
              <Activity className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full flex items-center gap-1">
              +12% <TrendingUp className="w-3 h-3" />
            </span>
          </div>
          <div className="relative z-10">
             <p className="text-5xl font-heading text-brand-primary mb-2">47</p>
             <h3 className="text-brand-dark/70 font-medium text-sm">Interventions Logged</h3>
          </div>
          {/* Faux mini chart */}
          <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end gap-1 px-8 opacity-20 group-hover:opacity-40 transition-opacity">
            {[30, 40, 25, 50, 45, 70, 60].map((h, i) => (
              <div key={i} className="flex-1 bg-brand-primary rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </motion.div>

        {/* Highlight Card */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="md:col-span-4 bg-brand-primary rounded-[2rem] p-8 shadow-lg text-white flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:bg-brand-secondary/30 transition-colors" />
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-brand-secondary backdrop-blur-md">
              <PlayCircle className="w-6 h-6" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-primary bg-brand-secondary px-3 py-1.5 rounded-full">
              Up Next
            </span>
          </div>
          <div className="relative z-10">
            <h3 className="text-white/60 font-medium text-xs tracking-widest uppercase mb-2">Learning Track</h3>
            <p className="text-xl font-heading tracking-wide mb-6">Crisis Signposting Protocol</p>
            <Link to="/dashboard/learning" className="inline-flex items-center text-sm font-bold text-brand-secondary hover:text-white transition-colors gap-2">
              Start Module <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Action Plan Focus */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="md:col-span-8 md:row-span-2 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-brand-primary/5 flex flex-col h-full">
           <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-primary/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-secondary/20 flex items-center justify-center text-brand-primary">
                   <Target className="w-6 h-6" />
                </div>
                <div>
                   <h2 className="text-2xl font-heading text-brand-primary">Current Quarter Focus</h2>
                   <p className="text-sm font-medium text-brand-dark/50">Your active Action Plan goals</p>
                </div>
              </div>
              <Link to="/dashboard/action-plan" className="hidden sm:flex bg-brand-bg hover:bg-brand-secondary/20 text-brand-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors">
                 Manage
              </Link>
           </div>
           
           <div className="flex-1 space-y-4">
              {latestPlan ? (
                 latestPlan.focusIds.map((id, idx) => {
                    const std = STANDARDS.find(s => s.id === id);
                    if (!std) return null;
                    return (
                      <div key={id} className="relative group pl-6 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-brand-primary/10 last:before:bottom-auto last:before:h-4">
                         <div className="absolute left-[-5px] top-2 w-3 h-3 rounded-full border-2 border-white bg-brand-secondary group-hover:scale-125 transition-transform" />
                         <div className="bg-white border border-brand-primary/5 p-5 rounded-2xl shadow-sm group-hover:shadow-md transition-shadow flex sm:items-center flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                               <span className="text-[10px] uppercase font-bold tracking-widest text-brand-primary/60 mb-1 block">{std.pillar}</span>
                               <p className="text-brand-dark font-medium">{std.statement}</p>
                            </div>
                            <Link to={`/dashboard/action-plan/${std.id}`} className="block bg-brand-bg text-brand-primary hover:bg-brand-secondary hover:text-white px-4 py-2 rounded-full text-xs font-bold transition-colors w-full sm:w-auto text-center shrink-0">
                               Update
                            </Link>
                         </div>
                      </div>
                    )
                 })
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center pb-8 border-2 border-dashed border-brand-primary/10 rounded-3xl bg-brand-bg/50">
                   <Star className="w-12 h-12 text-brand-primary/20 mb-4" />
                   <h3 className="text-lg font-bold text-brand-primary mb-2">No active focus areas</h3>
                   <p className="text-sm text-brand-dark/50 max-w-sm mb-6">Complete the Florio Framework assessment to generate your personalized action plan.</p>
                   <Link to="/dashboard/action-plan" className="bg-brand-primary text-white px-6 py-3 rounded-full text-sm font-bold shadow-md hover:bg-brand-secondary hover:text-brand-primary transition-all">
                     Start Assessment
                   </Link>
                </div>
              )}
           </div>
        </motion.div>

        {/* Quick Actions Base */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="md:col-span-4 bg-brand-bg rounded-[2.5rem] p-8 shadow-inner border border-brand-primary/5 flex flex-col justify-center">
           <h3 className="font-bold text-lg text-brand-primary mb-6 flex items-center gap-2">
             <BarChart3 className="w-5 h-5 text-brand-secondary" /> Quick Actions
           </h3>
           <div className="grid grid-cols-2 gap-4">
             <button className="bg-white hover:bg-brand-primary/5 border border-brand-primary/10 rounded-2xl p-4 flex flex-col items-center text-center gap-3 transition-colors group">
               <div className="w-10 h-10 rounded-full bg-brand-secondary/20 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                 <CheckCircle2 className="w-5 h-5" />
               </div>
               <span className="text-xs font-bold text-brand-primary">Log Event</span>
             </button>
             <button className="bg-white hover:bg-brand-primary/5 border border-brand-primary/10 rounded-2xl p-4 flex flex-col items-center text-center gap-3 transition-colors group">
               <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                 <Users className="w-5 h-5" />
               </div>
               <span className="text-xs font-bold text-brand-primary">Team View</span>
             </button>
             <Link to="/dashboard/ideas" className="bg-white hover:bg-brand-primary/5 border border-brand-primary/10 rounded-2xl p-4 flex flex-col items-center text-center gap-3 transition-colors group">
               <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                 <Sparkles className="w-5 h-5" />
               </div>
               <span className="text-xs font-bold text-brand-primary">Ideas Board</span>
             </Link>
             <button className="bg-white hover:bg-brand-primary/5 border border-brand-primary/10 rounded-2xl p-4 flex flex-col items-center text-center gap-3 transition-colors group">
               <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                 <BookOpen className="w-5 h-5" />
               </div>
               <span className="text-xs font-bold text-brand-primary">Resources</span>
             </button>
             <button className="bg-white hover:bg-brand-primary/5 border border-brand-primary/10 rounded-2xl p-4 flex flex-col items-center text-center gap-3 transition-colors group">
               <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                 <Info className="w-5 h-5" />
               </div>
               <span className="text-xs font-bold text-brand-primary">Help</span>
             </button>
           </div>
        </motion.div>

        {/* Announcements Stream */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="md:col-span-12 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-brand-primary/5 border-t-brand-secondary overflow-hidden relative">
          <div className="absolute top-0 right-10 w-32 h-2 bg-brand-secondary rounded-b-xl" />
          
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-brand-primary/5">
            <div className="w-10 h-10 rounded-full bg-brand-primary/5 flex items-center justify-center">
              <Megaphone className="w-5 h-5 text-brand-secondary" />
            </div>
            <h2 className="text-2xl font-heading text-brand-primary">Announcements</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {UPDATES.map((update, i) => (
              <div key={update.id} className="group p-6 rounded-3xl bg-brand-bg/50 hover:bg-white border border-transparent hover:border-brand-primary/10 transition-all hover:shadow-lg flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary bg-brand-secondary/30 px-3 py-1.5 rounded-full">
                    {update.category}
                  </span>
                  <span className="text-xs text-brand-dark/40 font-medium">{update.date}</span>
                </div>
                <h3 className="text-lg font-bold text-brand-primary mb-3 group-hover:text-brand-secondary transition-colors line-clamp-1">{update.title}</h3>
                <p className="text-brand-dark/60 text-sm leading-relaxed mb-6 flex-1">
                  {update.content}
                </p>
                <button className="text-xs font-bold text-brand-primary flex items-center gap-2 group-hover:text-brand-secondary transition-colors mt-auto">
                   Read more <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}


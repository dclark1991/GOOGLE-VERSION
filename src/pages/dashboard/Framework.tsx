import { motion } from 'motion/react';
import { Target, MessageCircle, HeartHandshake, ArrowRight, ShieldCheck, TrendingUp, Users, Link2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const PILLARS = [
  {
    id: 'lead',
    title: 'Lead',
    icon: Target,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    description: 'Establish leadership commitment and integrate mental health strategy into the core operations of the club.',
    bullets: [
      'Appoint a dedicated Mental Health Lead',
      'Allocate budget and resources',
      'Integrate wellbeing into club policies'
    ]
  },
  {
    id: 'communicate',
    title: 'Communicate',
    icon: MessageCircle,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    description: 'Foster an open culture by raising awareness and making mental health a regular topic of conversation.',
    bullets: [
      'Regular campaigns & awareness days',
      'Clear signposting to resources',
      'Destigmatizing mental health'
    ]
  },
  {
    id: 'support',
    title: 'Support',
    icon: ShieldCheck,
    color: 'text-rose-500',
    bg: 'bg-rose-50',
    description: 'Provide actionable pathways for support, training staff, and establishing safe environments for those in need.',
    bullets: [
      'Implement crisis protocols',
      'Mental Health First Aid training',
      'Safe spaces and peer support networks'
    ]
  },
  {
    id: 'care',
    title: 'Care',
    icon: Heart,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    description: 'Prioritize the ongoing wellbeing of staff and members through dedicated wellbeing activities and inclusive management.',
    bullets: [
      'Wellbeing activities & events',
      'Staff support capabilities',
      'Psychological safety in management'
    ]
  },
  {
    id: 'connect',
    title: 'Connect',
    icon: Users,
    color: 'text-indigo-500',
    bg: 'bg-indigo-50',
    description: 'Build a cohesive community by focusing on inclusion, peer support, and integrating new members thoughtfully.',
    bullets: [
      'Member integration strategies',
      'Identify and remove barriers',
      'Notice absence and outreach'
    ]
  }
];

export default function Framework() {
  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-brand-primary/10">
        <div className="max-w-3xl">
          <span className="text-brand-secondary font-semibold tracking-widest uppercase mb-2 block text-sm">Strategic Foundation</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-primary mb-4">The Florio Framework.</h1>
          <p className="text-brand-dark/70 text-lg md:text-xl leading-relaxed">
             A structured five-pillar approach designed specifically for the golf industry, helping clubs transition from ad-hoc responses to a proactive culture of care.
          </p>
        </div>
      </div>

      {/* Intro Grid */}
      <div className="grid md:grid-cols-3 gap-6">
         <div className="md:col-span-2 bg-brand-primary text-white rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <h2 className="font-heading text-3xl mb-4 relative z-10">Why the framework?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl relative z-10 leading-relaxed">
              We developed the Florio Framework based on extensive research within the golf sector. It provides a progressive roadmap—from Essential Standards through to Gold level—making it achievable for clubs of any size to improve their mental health culture.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 relative z-10">
              <div className="bg-white/10 rounded-2xl p-5 border border-white/5 backdrop-blur-sm">
                 <ShieldCheck className="w-8 h-8 text-brand-secondary mb-3" />
                 <h3 className="font-bold mb-1">Standardized</h3>
                 <p className="text-sm text-white/60">Consistent benchmarks across the industry.</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-5 border border-white/5 backdrop-blur-sm">
                 <TrendingUp className="w-8 h-8 text-brand-secondary mb-3" />
                 <h3 className="font-bold mb-1">Scalable</h3>
                 <p className="text-sm text-white/60">Progressive levels from Essential to Gold.</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-5 border border-white/5 backdrop-blur-sm">
                 <Users className="w-8 h-8 text-brand-secondary mb-3" />
                 <h3 className="font-bold mb-1">Preventative</h3>
                 <p className="text-sm text-white/60">Shifting focus from crisis to prevention.</p>
              </div>
            </div>
         </div>
         <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-brand-primary/10 shadow-sm flex flex-col justify-center items-center text-center">
            <div className="w-20 h-20 bg-brand-bg rounded-full flex items-center justify-center mb-6">
              <Target className="w-10 h-10 text-brand-primary" />
            </div>
            <h3 className="text-2xl font-bold text-brand-primary mb-3">Ready to measure your progress?</h3>
            <p className="text-brand-dark/60 mb-8">Use the internal action plan tool to benchmark your club across the five framework pillars.</p>
            <Link to="/dashboard/action-plan" className="w-full bg-brand-primary text-white font-bold py-4 px-6 rounded-full hover:bg-brand-secondary transition-colors inline-flex items-center justify-center gap-2">
               Start Assessment <ArrowRight className="w-4 h-4" />
            </Link>
         </div>
      </div>

      {/* The Pillars */}
      <div>
         <h2 className="text-3xl font-bold text-brand-primary mb-8 text-center md:text-left">The Five Pillars</h2>
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
            {PILLARS.map((pillar, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={pillar.id} 
              >
                <Link to={`/dashboard/framework/${pillar.id}`}
                  className="bg-white rounded-[2rem] p-8 border border-brand-primary/10 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group block h-full"
                >
                   <div className="absolute -right-8 -top-8 w-32 h-32 bg-brand-bg rounded-full pointer-events-none group-hover:bg-brand-secondary/10 transition-colors duration-500" />
                   
                   <div className="relative z-10 pb-6 border-b border-brand-primary/10 mb-6">
                     <div className="flex items-center justify-between gap-4 mb-4">
                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${pillar.bg} ${pillar.color}`}>
                         <pillar.icon className="w-7 h-7" />
                       </div>
                       <div className="w-10 h-10 rounded-full bg-brand-bg text-brand-primary opacity-0 group-hover:opacity-100 flex items-center justify-center transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                         <ArrowRight className="w-5 h-5" />
                       </div>
                     </div>
                     <h3 className="text-2xl font-bold text-brand-primary mb-3">{pillar.title}</h3>
                     <p className="text-brand-dark/60 leading-relaxed text-sm">
                       {pillar.description}
                     </p>
                   </div>
  
                   <ul className="space-y-3 relative z-10">
                     {pillar.bullets.map((bullet, idx) => (
                       <li key={idx} className="flex items-start gap-3">
                         <CheckIcon />
                         <span className="text-sm font-medium text-brand-primary/80">{bullet}</span>
                       </li>
                     ))}
                   </ul>
                </Link>
              </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-brand-secondary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

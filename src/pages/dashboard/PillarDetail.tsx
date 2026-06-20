import { motion } from 'motion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, MessageCircle, HeartHandshake, ShieldCheck, Heart, Users, CheckCircle } from 'lucide-react';
import { STANDARDS, Pillar } from '../../data/standards';

const PILLAR_CONFIG: Record<string, { title: string, description: string, icon: any, color: string, bg: string }> = {
  'lead': {
    title: 'Lead',
    description: 'Establish leadership commitment and integrate mental health strategy into the core operations of the club.',
    icon: Target,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  'communicate': {
    title: 'Communicate',
    description: 'Foster an open culture by raising awareness and making mental health a regular topic of conversation.',
    icon: MessageCircle,
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  'support': {
    title: 'Support',
    description: 'Provide actionable pathways for support, training staff, and establishing safe environments for those in need.',
    icon: ShieldCheck,
    color: 'text-rose-500',
    bg: 'bg-rose-50'
  },
  'care': {
    title: 'Care',
    description: 'Prioritize the ongoing wellbeing of staff and members through dedicated wellbeing activities and inclusive management.',
    icon: Heart,
    color: 'text-amber-500',
    bg: 'bg-amber-50'
  },
  'connect': {
    title: 'Connect',
    description: 'Build a cohesive community by focusing on inclusion, peer support, and integrating new members thoughtfully.',
    icon: Users,
    color: 'text-indigo-500',
    bg: 'bg-indigo-50'
  }
};

export default function PillarDetail() {
  const { pillarId } = useParams<{ pillarId: string }>();
  const navigate = useNavigate();

  const config = pillarId ? PILLAR_CONFIG[pillarId.toLowerCase()] : null;

  if (!config) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-brand-primary">Pillar not found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-brand-secondary font-semibold">Go Back</button>
      </div>
    );
  }

  const standards = STANDARDS.filter(s => s.pillar === pillarId?.toUpperCase() as Pillar);
  
  const essentialStandards = standards.filter(s => s.level === 'Essential');
  const bronzeStandards = standards.filter(s => s.level === 'Bronze');
  const silverStandards = standards.filter(s => s.level === 'Silver');
  const goldStandards = standards.filter(s => s.level === 'Gold');

  const Section = ({ title, items, badgeColor }: { title: string, items: typeof standards, badgeColor: string }) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-10 last:mb-0">
        <div className="flex items-center gap-3 mb-6 border-b border-brand-primary/10 pb-4">
          <h3 className="text-xl font-bold text-brand-primary">{title}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${badgeColor}`}>
            {items.length} Standards
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((s, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={s.id} 
              className="bg-white p-6 rounded-2xl border border-brand-primary/5 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <CheckCircle className={`w-6 h-6 shrink-0 mt-0.5 ${config.color}`} />
                <p className="text-brand-dark/80 text-sm leading-relaxed">{s.statement}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-16">
      <button 
        onClick={() => navigate('/dashboard/framework')}
        className="flex items-center gap-2 text-brand-dark/50 hover:text-brand-primary transition-colors font-medium text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Framework
      </button>

      <div className={`rounded-[2rem] p-8 md:p-12 ${config.bg} border-2 border-white/50 shadow-sm relative overflow-hidden`}>
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
         
         <div className="relative z-10 flex gap-6 items-center mb-6">
           <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-white shadow-sm ${config.color}`}>
             <config.icon className="w-8 h-8" />
           </div>
           <div>
             <span className={`text-sm font-bold uppercase tracking-widest ${config.color} block mb-1`}>Pillar Details</span>
             <h1 className="text-4xl font-bold text-brand-primary">{config.title}</h1>
           </div>
         </div>
         
         <p className="text-brand-dark/70 text-lg max-w-2xl relative z-10 leading-relaxed">
           {config.description}
         </p>
      </div>

      <div className="space-y-12 mt-12 bg-white/50 rounded-3xl p-6 md:p-10 border border-brand-primary/5">
         <Section title="Essential Standards" items={essentialStandards} badgeColor="bg-slate-200 text-slate-700" />
         <Section title="Bronze Level" items={bronzeStandards} badgeColor="bg-orange-100 text-orange-800" />
         <Section title="Silver Level" items={silverStandards} badgeColor="bg-gray-200 text-gray-800" />
         <Section title="Gold Level" items={goldStandards} badgeColor="bg-yellow-100 text-yellow-800" />
      </div>
    </div>
  );
}

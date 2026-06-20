import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Target, PlayCircle, ShieldCheck, CheckCircle2, ChevronRight, FileEdit, BookOpen } from 'lucide-react';
import { STANDARDS, PRINCIPLES, Standard, Score } from '../../data/standards';
import { ActionPlanRecord } from '../../types/actionPlan';
import { cn } from '../../lib/utils';

export default function StandardDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentPlan, setCurrentPlan] = useState<ActionPlanRecord | null>(null);

  useEffect(() => {
    const savedPlan = localStorage.getItem('latestActionPlan');
    if (savedPlan) {
      setCurrentPlan(JSON.parse(savedPlan));
    }
  }, []);

  const standard = STANDARDS.find(s => s.id === Number(id));
  const principle = standard ? PRINCIPLES.find(p => p.id === standard.principleId) : null;

  if (!standard || !principle) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-brand-primary">Standard not found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-brand-secondary font-semibold">Go Back</button>
      </div>
    );
  }

  const handleResponseChange = (score: Score) => {
    if (!currentPlan) return;
    const newPlan = { ...currentPlan };
    newPlan.responses[standard.id] = { ...newPlan.responses[standard.id], score };
    setCurrentPlan(newPlan);
    
    // Also update localized storage
    const allPlansString = localStorage.getItem('actionPlans');
    if (allPlansString) {
      const allPlans: ActionPlanRecord[] = JSON.parse(allPlansString);
      const planIndex = allPlans.findIndex(p => p.id === currentPlan.id);
      if (planIndex !== -1) {
        allPlans[planIndex] = newPlan;
        localStorage.setItem('actionPlans', JSON.stringify(allPlans));
        localStorage.setItem('latestActionPlan', JSON.stringify(newPlan));
      }
    }
  };

  const handleNotesChange = (notes: string) => {
     if (!currentPlan) return;
     const newPlan = { ...currentPlan };
     newPlan.responses[standard.id] = { ...newPlan.responses[standard.id], notes };
     setCurrentPlan(newPlan);
     
     // Also update localized storage
     const allPlansString = localStorage.getItem('actionPlans');
     if (allPlansString) {
       const allPlans: ActionPlanRecord[] = JSON.parse(allPlansString);
       const planIndex = allPlans.findIndex(p => p.id === currentPlan.id);
       if (planIndex !== -1) {
         allPlans[planIndex] = newPlan;
         localStorage.setItem('actionPlans', JSON.stringify(allPlans));
         localStorage.setItem('latestActionPlan', JSON.stringify(newPlan));
       }
     }
  };

  const currentScore = currentPlan?.responses[standard.id]?.score || null;

  return (
    <div className="space-y-8 pb-16">
      <div className="flex items-center justify-between gap-4">
        <button 
          onClick={() => navigate('/dashboard/action-plan')}
          className="flex items-center gap-2 text-brand-dark/50 hover:text-brand-primary transition-colors font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Action Plan
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           
           <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-brand-primary/5 relative overflow-hidden">
             
             <div className="flex gap-2 mb-6 relative z-10">
                 <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-brand-bg rounded-full text-brand-primary">
                   {standard.pillar}
                 </span>
                 <span className={cn(
                   "text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full",
                   standard.level === 'Essential' ? "bg-green-100 text-green-800" : "bg-brand-bg text-brand-primary"
                 )}>
                   {standard.level}
                 </span>
                 <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-brand-bg rounded-full text-brand-primary">
                   {standard.subcategory}
                 </span>
             </div>

             <div className="mb-6 relative z-10">
               <p className="text-sm font-bold text-brand-secondary tracking-widest uppercase mb-1">{principle.title}</p>
               <p className="text-brand-dark/50 text-sm mb-4">{principle.description}</p>
               <h1 className="text-3xl md:text-4xl font-bold font-heading text-brand-primary leading-tight">
                 <span className="opacity-30 mr-3">{standard.number}</span>
                 {standard.statement}
               </h1>
             </div>

           </div>

           <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-brand-primary/5">
             <h3 className="text-lg font-bold text-brand-primary flex items-center gap-2 mb-6">
               <Target className="w-5 h-5 text-brand-secondary" /> Indicators & Action Ideas
             </h3>
             <div className="grid md:grid-cols-2 gap-8">
                <div>
                   <p className="text-xs font-bold uppercase tracking-widest text-brand-dark/40 mb-4">What good looks like</p>
                   <ul className="space-y-3">
                     {standard.indicators.map((ind, i) => (
                        <li key={i} className="flex items-start gap-3">
                           <CheckCircle2 className="w-5 h-5 text-brand-secondary shrink-0 mt-0.5 opacity-50" />
                           <span className="text-brand-dark font-medium leading-relaxed">{ind}</span>
                        </li>
                     ))}
                   </ul>
                </div>
                <div>
                   <p className="text-xs font-bold uppercase tracking-widest text-brand-dark/40 mb-4">Ways to get there</p>
                   <ul className="space-y-3">
                     {standard.actionIdeas.map((idea, i) => (
                        <li key={i} className="flex items-start gap-3">
                           <PlayCircle className="w-5 h-5 text-brand-secondary shrink-0 mt-0.5" />
                           <span className="text-brand-dark font-medium leading-relaxed">{idea}</span>
                        </li>
                     ))}
                   </ul>
                </div>
             </div>
           </div>

        </div>

        <div className="space-y-6">
           <div className="bg-[#0A2530] text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
             
             <h3 className="text-lg font-bold mb-6 flex items-center gap-2 relative z-10">
               <FileEdit className="w-5 h-5 text-brand-secondary" /> Standard Scoring
             </h3>

             <div className="grid grid-cols-4 bg-white/5 p-1 rounded-xl gap-1 mb-6 relative z-10">
                {['FM', 'PM', 'NM', 'NA'].map(score => {
                  const isSelected = currentScore === score;
                  return (
                    <button 
                      key={score}
                      onClick={() => handleResponseChange(score as Score)}
                      className={cn(
                        "py-3 text-sm font-bold rounded-lg transition-all",
                        isSelected 
                          ? (score === 'FM' ? "bg-green-500 text-white shadow-md" 
                            : score === 'PM' ? "bg-yellow-500 text-white shadow-md" 
                            : score === 'NM' ? "bg-red-500 text-white shadow-md"
                            : "bg-gray-500 text-white shadow-md")
                          : "text-white/40 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      {score}
                    </button>
                  )
                })}
             </div>

             <div className="relative z-10">
               <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2 block">Private Notes</label>
               <textarea 
                  value={currentPlan?.responses[standard.id]?.notes || ''}
                  onChange={e => handleNotesChange(e.target.value)}
                  placeholder="Record evidence, challenges, or next steps here..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary min-h-[120px] resize-none"
               />
             </div>
           </div>

           <div className="bg-white p-6 rounded-[2rem] border border-brand-primary/5 shadow-sm">
              <h3 className="text-lg font-bold text-brand-primary mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-secondary" /> Related Resources
              </h3>
              <div className="space-y-3">
                 <Link to="/dashboard/resources" className="flex items-center justify-between p-4 bg-brand-bg rounded-xl border border-transparent hover:border-brand-primary/10 transition-colors group">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-brand-primary shadow-sm group-hover:scale-105 transition-transform">
                          <BookOpen className="w-5 h-5" />
                       </div>
                       <div>
                         <p className="font-bold text-brand-primary text-sm">Implementation Guide</p>
                         <p className="text-xs text-brand-dark/50">PDF Document</p>
                       </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-brand-dark/30 group-hover:text-brand-primary" />
                 </Link>
                 <Link to="/dashboard/resources" className="flex items-center justify-between p-4 bg-brand-bg rounded-xl border border-transparent hover:border-brand-primary/10 transition-colors group">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-brand-primary shadow-sm group-hover:scale-105 transition-transform">
                          <BookOpen className="w-5 h-5" />
                       </div>
                       <div>
                         <p className="font-bold text-brand-primary text-sm">Action Checklist</p>
                         <p className="text-xs text-brand-dark/50">Template</p>
                       </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-brand-dark/30 group-hover:text-brand-primary" />
                 </Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

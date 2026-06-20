import { motion } from 'motion/react';
import { ShieldCheck, PhoneCall, FileText, Lock, Heart, ArrowRight, Download, Coffee, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const TOOLKIT_ITEMS = [
  {
    id: 'crisis',
    title: 'Crisis Protocol',
    icon: AlertTriangle,
    desc: 'Step-by-step guide on what to do if someone is in immediate danger.',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
    action: 'View Protocol'
  },
  {
    id: 'templates',
    title: 'Check-in Templates',
    icon: FileText,
    desc: 'Pre-formatted agendas for conducting 1-to-1 wellbeing check-ins.',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    action: 'Download Pack'
  },
  {
    id: 'confidentiality',
    title: 'Privacy Guidelines',
    icon: Lock,
    desc: 'Legal and ethical boundaries for handling sensitive health data.',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    action: 'Read Guidelines'
  },
  {
    id: 'selfcare',
    title: 'Lead Self-Care',
    icon: Coffee,
    desc: 'Decompression techniques and support resources for yourself.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    action: 'Explore Resources'
  }
];

export default function MHLeadHub() {
  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-brand-primary/10">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-secondary/20 text-brand-secondary text-xs font-bold uppercase tracking-widest rounded-full mb-4">
             <ShieldCheck className="w-4 h-4" /> Priority Access
           </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-primary mb-2">MH Lead Toolkit.</h1>
          <p className="text-brand-dark/60 max-w-2xl text-lg">
             Exclusive resources, protocols, and templates designed to support you in your role as a Mental Health Lead.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         {/* Main Toolkit Grid */}
         <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-brand-primary flex items-center gap-2">
               Essential Documents
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
               {TOOLKIT_ITEMS.map((item, i) => (
                 <motion.div 
                   initial={{ opacity: 0, y: 15 }} 
                   animate={{ opacity: 1, y: 0 }} 
                   transition={{ delay: i * 0.1 }}
                   key={item.id} 
                   className="bg-white p-6 rounded-3xl border border-brand-primary/5 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between min-h-[220px]"
                 >
                    <div>
                      <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${item.bg} ${item.color}`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-brand-primary mb-2">{item.title}</h3>
                      <p className="text-brand-dark/60 text-sm mb-6 leading-relaxed">{item.desc}</p>
                    </div>
                    <button className="flex items-center justify-between w-full p-3 rounded-xl bg-brand-bg text-brand-primary font-semibold text-sm group-hover:bg-brand-secondary/20 transition-colors">
                       {item.action}
                       {item.action.includes('Download') ? <Download className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </button>
                 </motion.div>
               ))}
            </div>

            <div className="bg-brand-primary text-white rounded-3xl p-8 relative overflow-hidden mt-8">
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
               <div className="relative z-10 sm:flex items-center justify-between gap-6">
                 <div>
                   <h3 className="text-2xl font-bold mb-2">Lead Training Modules</h3>
                   <p className="text-white/70 max-w-md mb-6 sm:mb-0">
                     Make sure you have completed the required specialized learning path designed for MH Leads.
                   </p>
                 </div>
                 <Link to="/dashboard/learning" className="shrink-0 bg-white text-brand-primary font-bold px-6 py-3 rounded-full hover:bg-brand-bg transition-colors block text-center">
                   Go to Learning
                 </Link>
               </div>
            </div>
         </div>

         {/* Emergency Sidebar */}
         <div className="space-y-6">
            <div className="bg-rose-50 border border-rose-100 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
               <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mb-4">
                 <PhoneCall className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold text-rose-700 mb-2">Emergency Contacts</h3>
               <p className="text-rose-600/80 text-sm mb-6">If you believe someone is in immediate danger, use the emergency directory.</p>
               
               <div className="w-full space-y-3">
                 <div className="bg-white p-4 rounded-2xl shadow-sm border border-rose-100 flex justify-between items-center">
                   <div className="text-left">
                     <p className="font-bold text-brand-primary">Emergency Services</p>
                     <p className="text-xs text-brand-dark/50">Immediate risk to life</p>
                   </div>
                   <span className="font-heading text-xl text-rose-600 tracking-wider">999</span>
                 </div>
                 <div className="bg-white p-4 rounded-2xl shadow-sm border border-rose-100 flex justify-between items-center">
                   <div className="text-left">
                     <p className="font-bold text-brand-primary">NHS Direct</p>
                     <p className="text-xs text-brand-dark/50">Non-emergency medical</p>
                   </div>
                   <span className="font-heading text-xl text-rose-600 tracking-wider">111</span>
                 </div>
               </div>
               <Link to="/dashboard/database" className="mt-6 text-sm font-bold text-rose-600 hover:text-rose-800 transition-colors flex items-center gap-1">
                 View Full Database <ArrowRight className="w-4 h-4" />
               </Link>
            </div>

            <div className="bg-white border border-brand-primary/10 rounded-3xl p-6 shadow-sm">
               <h3 className="font-bold text-brand-primary mb-4 flex items-center gap-2 border-b border-brand-primary/5 pb-4">
                 <Heart className="w-5 h-5 text-brand-secondary" /> Peer Support
               </h3>
               <p className="text-sm text-brand-dark/60 mb-4">Connect with other MH Leads in the industry to share experiences and advice.</p>
               <Link to="/dashboard/network" className="w-full flex items-center justify-center gap-2 p-3 font-semibold text-brand-primary bg-brand-bg rounded-xl hover:bg-brand-secondary/20 transition-colors">
                  Go to Network Space
               </Link>
            </div>
         </div>
      </div>
    </div>
  );
}

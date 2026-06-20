import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Database as DatabaseIcon, Layers, HeartHandshake, X, LogOut, Target, Users, Map, ShieldAlert, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { useEffect, useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation();
  const role = localStorage.getItem('userRole') || 'Not Set';
  const isMHLead = role === 'MH_LEAD';

  const NAV_ITEMS = [
    { name: 'Dashboard', path: '/dashboard', icon: Home, exact: true },
    { name: 'Florio Framework', path: '/dashboard/framework', icon: Map },
    { name: 'Action Plan', path: '/dashboard/action-plan', icon: Target },
    { name: 'Learning', path: '/dashboard/learning', icon: BookOpen },
    { name: 'Ideas', path: '/dashboard/ideas', icon: Sparkles },
    { name: 'Signposting Db', path: '/dashboard/database', icon: DatabaseIcon },
    { name: 'Resources', path: '/dashboard/resources', icon: Layers },
    ...(isMHLead ? [{ name: 'MH Lead Hub', path: '/dashboard/mh-lead-toolkit', icon: ShieldAlert }] : []),
    { name: 'Network', path: '/dashboard/network', icon: Users },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-brand-primary/20 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-[280px] bg-[#0A2530] text-white flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:relative lg:translate-x-0 lg:flex shadow-2xl lg:shadow-none",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-8 flex items-center justify-between lg:hidden border-b border-white/5">
          <div className="flex items-center gap-3">
             <span className="font-heading text-xl uppercase tracking-widest text-brand-secondary">Menu</span>
          </div>
          <button className="text-brand-secondary/80 hover:text-white" onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto mt-6 custom-scrollbar">
          <div className="px-4 pb-4">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Platform Nav</p>
          </div>
          {NAV_ITEMS.map((item) => {
            const isActive = item.exact 
              ? location.pathname === item.path 
              : location.pathname.startsWith(item.path);
              
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 relative group overflow-hidden",
                  isActive 
                    ? "bg-brand-secondary/10 text-brand-secondary font-bold" 
                    : "text-white/60 hover:text-white hover:bg-white/5 font-medium"
                )}
              >
                {isActive && (
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-secondary rounded-r-full shadow-[0_0_10px_rgba(205,255,100,0.5)]" />
                )}
                <item.icon className={cn("w-5 h-5 shrink-0 transition-transform group-hover:scale-110 duration-500", isActive ? "text-brand-secondary" : "text-white/40 group-hover:text-white/80")} />
                <span className="relative z-10">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-6 mt-auto">
           {isMHLead && (
             <div className="bg-gradient-to-br from-brand-secondary/20 to-brand-primary/20 border border-brand-secondary/20 rounded-2xl p-5 mb-4 relative overflow-hidden group cursor-pointer">
               <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                 <Sparkles className="w-8 h-8 text-brand-secondary" />
               </div>
               <h4 className="text-sm font-bold text-brand-secondary mb-1">Priority Support</h4>
               <p className="text-xs text-white/60 leading-relaxed">Access 24/7 specialist guidance for leads.</p>
             </div>
           )}
           
          <Link
            to="/onboarding"
            className="flex items-center justify-between w-full p-4 hover:bg-white/5 rounded-2xl transition-colors group border border-white/5"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 group-hover:bg-brand-secondary/20 group-hover:text-brand-secondary transition-colors">
                <LogOut className="w-4 h-4 shrink-0" />
              </div>
              <span className="text-sm font-medium text-white/80 group-hover:text-white">Sign Out / Reset</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

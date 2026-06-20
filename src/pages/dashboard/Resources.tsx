import { Download, Share2, FileImage, LayoutTemplate, FileType2, Search, Zap, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

const CATEGORIES = ['Explore', 'Posters', 'Flyers', 'Social Media', 'Emails', 'Other'];

const RESOURCES = [
  {
    id: 1,
    title: 'World Mental Health Day A3 Poster',
    category: 'Posters',
    icon: FileImage,
    image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=800&q=80',
    size: '4.2 MB',
    date: 'Oct 2, 2026',
    featured: true,
  },
  {
    id: 2,
    title: 'Break Room Signposting Flyer',
    category: 'Flyers',
    icon: FileType2,
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    size: '3.1 MB',
    date: 'Sep 15, 2026'
  },
  {
    id: 3,
    title: 'Instagram Carousel - It is okay not to be okay',
    category: 'Social Media',
    icon: LayoutTemplate,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    size: '12.5 MB',
    date: 'Sep 10, 2026'
  },
  {
    id: 4,
    title: 'Email Signature Banners (Set of 4)',
    category: 'Emails',
    icon: FileType2,
    size: '1.2 MB',
    date: 'Aug 20, 2026'
  },
  {
    id: 5,
    title: 'Manager Checklist 1-on-1',
    category: 'Other',
    icon: FileType2,
    size: '800 KB',
    date: 'Jul 05, 2026'
  }
];

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState("Explore");
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = RESOURCES.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Explore" ? true : res.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredResource = RESOURCES.find(r => r.featured);
  const regularResources = filteredResources.filter(r => !r.featured || activeCategory !== "Explore");

  return (
    <div className="space-y-10 pb-12">
      {/* Header & Search */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-brand-primary/10">
        <div className="flex-1">
          <span className="text-brand-secondary font-semibold tracking-widest uppercase mb-2 block text-sm">Download Center</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-primary mb-2">Resources.</h1>
          <p className="text-brand-dark/60 max-w-2xl text-lg">
            Access our latest campaign materials, posters, and digital toolkit assets.
          </p>
        </div>
        <div className="w-full lg:w-96 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary/40 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search resources..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-brand-primary/10 focus:outline-none focus:ring-2 focus:ring-brand-secondary shadow-sm transition-shadow"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm",
              activeCategory === cat 
                ? "bg-brand-primary text-white" 
                : "bg-white text-brand-dark/60 hover:text-brand-primary border border-brand-primary/5"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Editorial View for 'Explore' */}
      {activeCategory === 'Explore' && !searchQuery ? (
        <div className="grid md:grid-cols-3 gap-6 auto-rows-[300px]">
          {/* Featured Large spanning 2 cols, 2 rows if large enough, but let's keep it responsive */}
          {featuredResource && (
             <motion.div initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} className="md:col-span-2 md:row-span-2 rounded-[2.5rem] overflow-hidden bg-brand-primary relative group">
                {featuredResource.image && (
                   <img src={featuredResource.image} alt={featuredResource.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2s]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/40 to-transparent" />
                <div className="absolute top-6 left-6 z-20">
                  <span className="bg-brand-secondary text-brand-primary text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                    <Zap className="w-3 h-3 fill-current" /> Featured Asset
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 z-20 text-white">
                  <span className="text-brand-secondary text-sm font-semibold uppercase tracking-widest mb-3 block">{featuredResource.category} • {featuredResource.size}</span>
                  <h2 className="text-3xl md:text-5xl font-heading tracking-wide mb-6">{featuredResource.title}</h2>
                  <div className="flex items-center gap-4">
                    <button className="bg-white text-brand-primary hover:bg-brand-secondary px-8 py-4 rounded-full font-bold transition-colors flex items-center gap-2 shadow-lg">
                      <Download className="w-5 h-5" /> Download Asset
                    </button>
                    <button className="bg-white/20 text-white p-4 rounded-full hover:bg-white hover:text-brand-primary transition-colors backdrop-blur-sm">
                       <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
             </motion.div>
          )}

          {/* Render remaining pieces into the grid seamlessly */}
          {regularResources.map((res, i) => (
             <motion.div initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} transition={{delay: i*0.1}} key={res.id} className={cn(
               "bg-white rounded-3xl overflow-hidden border border-brand-primary/10 shadow-sm hover:shadow-xl transition-all group flex flex-col relative",
               // Text only items might just take up 1 cell natively
             )}>
                {res.image ? (
                  <div className="h-48 w-full shrink-0 relative overflow-hidden">
                    <img src={res.image} alt={res.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-brand-primary/20 group-hover:bg-transparent transition-colors" />
                  </div>
                ) : (
                  <div className="h-40 bg-brand-bg/50 shrink-0 flex items-center justify-center">
                    <res.icon className="w-12 h-12 text-brand-primary/20 group-hover:text-brand-secondary group-hover:scale-110 transition-all duration-300" />
                  </div>
                )}
                
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary mb-2 block">{res.category}</span>
                    <h3 className="font-bold text-brand-primary text-xl leading-snug line-clamp-2 group-hover:text-brand-secondary transition-colors">{res.title}</h3>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-brand-dark/40 font-medium px-3 py-1 bg-brand-bg rounded-full">{res.size}</span>
                    <button className="text-brand-primary bg-brand-bg hover:bg-brand-secondary/20 p-2 rounded-full transition-colors">
                       <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
             </motion.div>
          ))}
        </div>
      ) : (
        /* Regular Resource Grid for categories/search */
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredResources.map((res, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              key={res.id}
              className="group bg-white rounded-2xl shadow-sm border border-brand-primary/5 hover:shadow-xl hover:border-brand-primary/10 transition-all duration-300 flex flex-col overflow-hidden"
            >
              <div className="h-48 w-full bg-brand-bg/50 border-b border-brand-primary/5 flex items-center justify-center relative overflow-hidden">
                {res.image ? (
                   <img src={res.image} alt={res.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                   <res.icon className="w-16 h-16 text-brand-primary/20 group-hover:scale-110 group-hover:text-brand-secondary transition-all duration-500" />
                )}
                <div className="absolute inset-0 bg-brand-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                  <button className="bg-white text-brand-primary p-3 rounded-full hover:scale-105 transition-transform shadow-lg" title="Download">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="bg-white/20 text-white p-3 rounded-full hover:bg-white hover:text-brand-primary hover:scale-105 transition-transform shadow-lg" title="Share">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary mb-3 block">
                    {res.category}
                  </span>
                  <h3 className="font-bold text-brand-primary text-lg mb-2 leading-snug line-clamp-2 group-hover:text-brand-secondary transition-colors">{res.title}</h3>
                </div>
                <div className="flex items-center justify-between mt-6 text-sm">
                   <span className="text-brand-dark/40 font-medium">{res.date}</span>
                   <span className="text-brand-dark/40 font-medium px-3 py-1 bg-brand-bg rounded-full">{res.size}</span>
                </div>
              </div>
            </motion.div>
          ))}
          {filteredResources.length === 0 && (
            <div className="col-span-full py-20 text-center text-brand-dark/50">
              <FileImage className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="text-lg">No resources found matching your criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

'use client';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import type { Dish } from '@/data/menu';
import { Header } from '@/components/Header';
import { DishCard } from '@/components/DishCard';
import { DishModal } from '@/components/DishModal';
import { Feedback } from '@/components/Feedback';
import { useSelectedDish } from '@/context/SelectedDishContext';

const categories=['All','Appetizer','Main Course','Dessert','Healthy','Fast Food'];
const diets=[['Veg','veg'],['Vegan','vegan'],['High Protein','high-protein'],['Gluten Free','gluten-free']];
export default function Home(){
  const [dishes,setDishes]=useState<Dish[]>([]); const [activeCategory,setActiveCategory]=useState('All'); const [activeDiets,setActiveDiets]=useState<string[]>([]); const [modalDish,setModalDish]=useState<Dish|null>(null); const [loading,setLoading]=useState(true);
  const { setSelectedDish, recentlyViewed, addRecentlyViewed }=useSelectedDish(); const router=useRouter();
  useEffect(()=>{ fetch('/api/menu').then(r=>r.json()).then(setDishes).finally(()=>setLoading(false)); },[]);
  const filtered=useMemo(()=>dishes.filter(d=>(activeCategory==='All'||d.category===activeCategory)&&activeDiets.every(x=>d.diet.includes(x))),[dishes,activeCategory,activeDiets]);
  function openDish(dish:Dish){ setModalDish(dish); addRecentlyViewed(dish); }
  function askDish(){ if(!modalDish)return; setSelectedDish(modalDish); router.push('/assistant'); }
  return <main><Header/>
    <section className="relative overflow-hidden"><div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(234,88,12,.18),_transparent_36%)]"/><div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_.8fr] lg:py-28"><div><span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-700"><Sparkles size={16}/>Smarter choices, one dish at a time</span><h1 className="mt-6 max-w-3xl text-5xl font-black tracking-tight text-gray-900 sm:text-6xl">AI-Powered Restaurant Menu</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">Know calories, protein, allergens and dietary fit before ordering. FlavorHub turns ordinary menu names into clear, useful nutrition guidance.</p><a href="#menu" className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-600 px-7 py-4 font-bold text-white shadow-soft hover:bg-orange-700">Explore Menu <ArrowRight size={18}/></a></div><div className="rounded-3xl border border-amber-100 bg-white p-6 shadow-soft"><p className="text-sm font-bold uppercase tracking-wider text-orange-600">Why FlavorHub?</p><div className="mt-5 space-y-4">{['Full nutrition facts at a glance','Clear allergen warnings','AI answers in simple language','Diet-aware filters for faster decisions'].map(x=><div key={x} className="flex items-center gap-3 rounded-2xl bg-amber-50 p-4 font-semibold text-gray-800"><CheckCircle2 className="text-green-600"/>{x}</div>)}</div></div></div></section>
    <section id="menu" className="mx-auto max-w-7xl px-4 py-16 sm:px-6"><div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="font-bold text-orange-600">Explore the menu</p><h2 className="text-4xl font-black text-gray-900">Find your best plate</h2></div><p className="text-sm text-gray-500">{filtered.length} dishes available</p></div>
      <div className="mt-8 rounded-3xl border border-amber-100 bg-white p-5 shadow-sm"><div><p className="mb-3 text-sm font-extrabold text-gray-700">Categories</p><div className="flex flex-wrap gap-2">{categories.map(c=><button key={c} onClick={()=>setActiveCategory(c)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${activeCategory===c?'bg-orange-600 text-white':'bg-amber-100 text-amber-900 hover:bg-amber-200'}`}>{c}</button>)}</div></div><div className="mt-5"><p className="mb-3 text-sm font-extrabold text-gray-700">Diet filters</p><div className="flex flex-wrap gap-2">{diets.map(([label,value])=><button key={value} onClick={()=>setActiveDiets(p=>p.includes(value)?p.filter(x=>x!==value):[...p,value])} className={`rounded-full px-4 py-2 text-sm font-bold transition ${activeDiets.includes(value)?'bg-green-600 text-white':'border border-green-200 bg-green-50 text-green-800 hover:bg-green-100'}`}>{label}</button>)}</div></div></div>
      {loading?<div className="py-20 text-center font-bold text-gray-500">Loading menu...</div>:filtered.length?<div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{filtered.map(d=><DishCard key={d.id} dish={d} onClick={()=>openDish(d)}/>)}</div>:<div className="mt-8 rounded-3xl bg-white p-12 text-center shadow-sm"><h3 className="text-xl font-black">No dishes match these filters</h3><p className="mt-2 text-gray-500">Try removing one diet filter or choosing another category.</p></div>}
    </section>
    {recentlyViewed.length>0&&<section className="mx-auto max-w-7xl px-4 py-8 sm:px-6"><h2 className="text-3xl font-black text-gray-900">Recently viewed</h2><p className="mt-2 text-gray-500">Your last three menu picks, saved on this device.</p><div className="mt-6 grid gap-6 md:grid-cols-3">{recentlyViewed.map(d=><DishCard key={d.id} dish={d} onClick={()=>openDish(d)}/>)}</div></section>}
    <Feedback/>
    <footer className="border-t border-amber-100 bg-amber-100/60 px-4 py-8 text-center text-sm font-medium text-gray-600">Built for healthier choices | Disclaimer: Nutrition values are estimates</footer>
    {modalDish&&<DishModal dish={modalDish} onClose={()=>setModalDish(null)} onAsk={askDish}/>} </main>;
}

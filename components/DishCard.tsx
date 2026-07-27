import Image from 'next/image';
import { Flame } from 'lucide-react';
import type { Dish } from '@/data/menu';
export function DishCard({ dish, onClick }: { dish: Dish; onClick: () => void }) {
  return <button onClick={onClick} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
    <div className="relative h-52 overflow-hidden"><Image src={dish.image} alt={dish.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw"/><span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-orange-700 backdrop-blur">${dish.price.toFixed(2)}</span></div>
    <div className="p-5"><div className="mb-3 flex items-start justify-between gap-3"><h3 className="text-lg font-extrabold text-gray-900">{dish.name}</h3><span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">{dish.category}</span></div><div className="mb-4 flex items-center gap-1 text-sm font-semibold text-gray-600"><Flame size={16} className="text-orange-600"/>{dish.nutrition.calories} calories</div><div className="flex flex-wrap gap-2">{dish.tags.slice(0,3).map(tag => <span key={tag} className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">{tag}</span>)}</div></div>
  </button>;
}

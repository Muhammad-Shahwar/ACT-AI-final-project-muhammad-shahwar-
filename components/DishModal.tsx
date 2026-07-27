'use client';
import Image from 'next/image';
import { AlertTriangle, Beef, Flame, Leaf, Scale, Wheat, X } from 'lucide-react';
import type { Dish } from '@/data/menu';

export function DishModal({ dish, onClose, onAsk }: { dish: Dish; onClose: () => void; onAsk: () => void }) {
  const noAllergens = dish.allergens.length === 1 && dish.allergens[0] === 'None';
  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/55 p-4" onMouseDown={onClose}>
    <div role="dialog" aria-modal="true" aria-label={dish.name} className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl" onMouseDown={e=>e.stopPropagation()}>
      <div className="relative h-64 sm:h-80"><Image src={dish.image} alt={dish.name} fill className="object-cover" sizes="768px"/><button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-gray-800 shadow"><X/></button></div>
      <div className="space-y-6 p-6 sm:p-8"><div><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-3xl font-black text-gray-900">{dish.name}</h2><span className="text-2xl font-black text-orange-600">${dish.price.toFixed(2)}</span></div><p className="mt-3 leading-7 text-gray-600">{dish.description}</p></div>
      <section><h3 className="mb-3 font-extrabold text-gray-900">Ingredients</h3><div className="flex flex-wrap gap-2">{dish.ingredients.map(i=><span key={i} className="rounded-full bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-900">{i}</span>)}</div></section>
      <section className="rounded-2xl border border-amber-100 bg-amber-50 p-5"><h3 className="mb-4 font-extrabold text-gray-900">Nutritional Facts</h3><div className="grid grid-cols-2 gap-4 sm:grid-cols-5">{[
        [Flame,'Calories',String(dish.nutrition.calories)],[Beef,'Protein',dish.nutrition.protein],[Wheat,'Carbs',dish.nutrition.carbs],[Scale,'Fats',dish.nutrition.fats],[Leaf,'Fiber',dish.nutrition.fiber||'—']
      ].map(([Icon,label,value]: any)=><div key={label} className="rounded-xl bg-white p-3 text-center"><Icon className="mx-auto mb-2 text-orange-600" size={20}/><div className="text-xs font-semibold text-gray-500">{label}</div><div className="font-black text-gray-900">{value}</div></div>)}</div></section>
      <section className={`rounded-2xl p-5 ${noAllergens?'bg-green-50 text-green-800':'bg-red-50 text-red-800'}`}><div className="flex items-center gap-2 font-extrabold"><AlertTriangle size={20}/>{noAllergens?'No listed allergens':'Allergen alert'}</div><p className="mt-2 text-sm">{noAllergens?'No common allergens are listed. Always confirm with restaurant staff for severe allergies.':dish.allergens.join(', ')}</p></section>
      <div className="flex items-center justify-between rounded-2xl bg-gray-900 p-5 text-white"><span><span className="block text-sm text-gray-300">Health Score</span><span className="text-3xl font-black">{dish.healthScore}/10</span></span><span className="max-w-xs text-right text-sm text-gray-300">Based on calories, macro balance, fiber and ingredient quality.</span></div>
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button onClick={onClose} className="rounded-full border border-gray-300 px-6 py-3 font-bold text-gray-700 hover:bg-gray-50">Close</button><button onClick={onAsk} className="rounded-full bg-orange-600 px-6 py-3 font-bold text-white hover:bg-orange-700">Ask About This Dish ✨</button></div></div>
    </div>
  </div>;
}

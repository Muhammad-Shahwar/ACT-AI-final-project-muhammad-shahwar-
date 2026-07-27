'use client';
import Link from 'next/link';
import { Menu, Sparkles, UtensilsCrossed } from 'lucide-react';
export function Header() {
  return <header className="sticky top-0 z-40 border-b border-amber-100 bg-amber-50/90 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
      <Link href="/" className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-orange-600 text-white shadow-soft"><UtensilsCrossed size={22}/></span><span><span className="block text-xl font-extrabold text-gray-900">FlavorHub</span><span className="hidden text-xs text-gray-500 sm:block">Eat Smart, Know What You Eat</span></span></Link>
      <nav className="flex items-center gap-2 text-sm font-semibold text-gray-700 sm:gap-5"><Link className="hover:text-orange-600" href="/#menu">Menu</Link><Link className="flex items-center gap-1 hover:text-orange-600" href="/assistant"><Sparkles size={16}/>AI Assistant</Link><Link className="hover:text-orange-600" href="/#feedback">Feedback</Link></nav>
    </div>
  </header>;
}

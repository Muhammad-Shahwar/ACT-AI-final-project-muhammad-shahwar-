import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SelectedDishProvider } from '@/context/SelectedDishContext';
const inter = Inter({ subsets:['latin'], variable:'--font-inter' });
export const metadata: Metadata = { title:'FlavorHub - AI Menu Assistant', description:'Browse dishes, nutrition facts, allergens and ask a friendly AI menu assistant.' };
export default function RootLayout({children}:{children:React.ReactNode}){ return <html lang="en"><body className={inter.variable}><SelectedDishProvider>{children}</SelectedDishProvider></body></html>; }

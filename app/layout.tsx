import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Hind_Siliguri } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-bangla',
});

export const metadata: Metadata = {
  title: 'Ali Arafat - Class 10 Student & Tech Enthusiast Portfolio | আলী আরাফাত',
  description: 'Personal portfolio of Ali Arafat, a Bangladeshi Class 10 student, tech enthusiast, and lifelong learner exploring coding, science, and robotics. আলী আরাফাতের ব্যক্তিগত পোর্টফোলিও।',
  openGraph: {
    title: 'Ali Arafat - Class 10 Student & Tech Enthusiast Portfolio | আলী আরাফাত',
    description: 'Personal portfolio of Ali Arafat, a Class 10 student, tech enthusiast, and lifelong learner.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ali Arafat - Class 10 Student & Tech Enthusiast Portfolio | আলী আরাফাত',
    description: 'Personal portfolio of Ali Arafat, a Class 10 student, tech enthusiast, and lifelong learner.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${hindSiliguri.variable}`}>
      <body className="font-sans antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 min-h-screen selection:bg-indigo-500/20 selection:text-indigo-600 dark:selection:text-indigo-300" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

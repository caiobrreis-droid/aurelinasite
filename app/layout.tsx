import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aurelina Medeiros 44222 — A amiga de sempre',
  description: 'Experiência, trabalho e compromisso com o povo de Roraima.',
  openGraph: {
    title: 'Aurelina Medeiros 44222',
    description: 'A amiga de sempre. Experiência, trabalho e compromisso com o povo de Roraima.',
    images: ['/aurelina-hero-2026.jpg'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}


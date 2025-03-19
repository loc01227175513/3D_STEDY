import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navigation from '@/components/Navigation';
import '@/assets/css/style.css';
import '@/assets/css/responsive.css';
import Loading from './loading';
import { Suspense } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '3D STEDY',
  description: '3D STEDY Application',
  icons: {
    icon: '/assets/icon/Favicon.png',
    shortcut: '/assets/icon/Favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script src="/assets/js/jquery.min.js" strategy="beforeInteractive" async />
        <Script src="/assets/js/popper.min.js" strategy="beforeInteractive" async />
        <Script src="/assets/js/bootstrap.bundle.min.js" strategy="beforeInteractive" async />
        <Script src="/assets/js/bootstrap.min.js" strategy="beforeInteractive" async />
        <Script src="/assets/js/count-down.js" strategy="beforeInteractive" async />
        <Script src="/assets/js/simpleParallax.min.js" strategy="beforeInteractive" async />
        <Script src="/assets/js/gsap.js" strategy="beforeInteractive" async />
        <Script src="/assets/js/SplitText.js" strategy="beforeInteractive" async />
        <Script src="/assets/js/wow.min.js" strategy="beforeInteractive" async />
        <Script src="/assets/js/ScrollTrigger.js" strategy="beforeInteractive" async />
        <Script src="/assets/js/gsap-animation.js" strategy="beforeInteractive" async />
        <Script src="/assets/js/tsparticles.min.js" strategy="beforeInteractive" async />
        <Script src="/assets/js/tsparticles.js" strategy="beforeInteractive" async />
        <Script src="/assets/js/main.js" strategy="afterInteractive" async />
      </head>
      <body className={inter.className}>
        <Navigation />
        <Suspense fallback={<Loading />}>
          <main>{children}</main>
        </Suspense>
      </body>
    </html>
  );
} 
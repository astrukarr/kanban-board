import { getHomePageDataSync } from '@/lib/data/homePage';
import Header from '@/components/header/Header';
import HomeHero from '@/components/homeHero/HomeHero';
import Features from '@/components/features/Features';
import Footer from '@/components/footer/Footer';

export default function LandingPage() {
  const data = getHomePageDataSync();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <Header data={data.header} currentPage="home" />

      <HomeHero hero={data.hero} />
      <Features features={data.features} />
      <Footer footer={data.footer} />
    </div>
  );
}

import { useEffect, useState } from 'react';
import DemoBanner from './components/layout/DemoBanner';
import SiteHeader from './components/layout/SiteHeader';
import StickyBar from './components/layout/StickyBar';
import SiteFooter from './components/layout/SiteFooter';
import BackToTop from './components/layout/BackToTop';
import DevTools from './components/common/DevTools';
import LevelUpModal from './components/LevelUpModal/LevelUpModal';
import LevelDashboard from './pages/LevelDashboard/LevelDashboard';
import useScrollSpy from './hooks/useScrollSpy';
import { navItems } from './data/navItems';

const NAV_IDS = navItems.map((n) => n.id);

export default function App() {
  const active = useScrollSpy(NAV_IDS);
  const [scrolled, setScrolled] = useState({ bar: false, top: false });

  useEffect(() => {
    // only update state when a flag actually flips, so scrolling does not re-render the page
    const onScroll = () => {
      const bar = window.scrollY > 240;
      const top = window.scrollY > 500;
      setScrolled((prev) => (prev.bar === bar && prev.top === top ? prev : { bar, top }));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <DemoBanner />
      <SiteHeader active={active} />
      <StickyBar visible={scrolled.bar} active={active} />
      <LevelDashboard />
      <SiteFooter />
      <BackToTop visible={scrolled.top} />
      <LevelUpModal />
      <DevTools />
    </>
  );
}

import DesktopSection from './DesktopSection';
import MobileSection from './MobileSection';

export default function SectionWrapper() {
  return (
    <section
      aria-label="Project Section"
      className="box-border w-full border-b border-slate-200"
    >
      <DesktopSection />
      <MobileSection />
    </section>
  );
}

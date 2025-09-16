import { MAIN_ACTIONS } from '@/constants';
import MainActions from './MainActions';
import MobileStatusTabs from './MobileStatusTabs';
import Logo from './Logo';

export default function MobileSection() {
  return (
    <div className="lg:hidden flex flex-col px-4 pt-6 gap-4 bg-slate-50">
      <div className="flex justify-start">
        <Logo size="mobile" />
      </div>

      <div className="flex flex-col items-start gap-4">
        <h1 className="text-2xl font-extrabold leading-8 tracking-tight text-slate-800 text-center">
          Project PlanetX
        </h1>
        <div className="flex items-center gap-5">
          <MainActions items={MAIN_ACTIONS} />
        </div>
      </div>

      <MobileStatusTabs />
    </div>
  );
}

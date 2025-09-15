import { MAIN_ACTIONS, VIEW_TABS } from '@/constants';
import MainActions from './MainActions';
import ViewTabs from './ViewTabs';
import ExportButton from '../buttons/ExportButton';
import Logo from './Logo';

export default function DesktopSection() {
  const activeTab = 'list';
  return (
    <div className="hidden lg:block px-8 py-8">
      <div className="flex items-center gap-4">
        <Logo size="desktop" />

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <h1 className="flex-1 truncate text-[30px] leading-[38px] font-semibold tracking-tight text-slate-800">
              Project PlanetX
            </h1>

            <MainActions items={MAIN_ACTIONS} />
          </div>

          <div className="flex items-center justify-between gap-16">
            <ViewTabs items={VIEW_TABS} activeId={activeTab} />
            <ExportButton />
          </div>
        </div>
      </div>
    </div>
  );
}

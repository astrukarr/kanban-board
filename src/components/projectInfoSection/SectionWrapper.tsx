import { ViewTab } from '@/types';
import { MAIN_ACTIONS, VIEW_TABS, MOBILE_STATUS_TABS } from '@/constants';
import ExportButton from '../buttons/ExportButton';
import MainActions from './MainActions';
import ViewTabs from './ViewTabs';
import Image from 'next/image';

export default function SectionWrapper() {
  const activeTab: ViewTab['id'] = 'list';

  return (
    <section
      aria-label="Project Section"
      className="box-border w-full border-b border-slate-200"
    >
      {/* Desktop Layout */}
      <div className="hidden lg:block px-8 py-8">
        <div className="flex items-center gap-4">
          <div className="relative grid h-24 w-24 place-items-center rounded-full bg-indigo-100">
            <Image
              src="/static/icons/ProjectLogo.svg"
              alt="Project logo"
              width={64}
              height={64}
              className="h-24 w-24"
              draggable={false}
              priority={true}
              loading="eager"
            />
          </div>

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

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col px-4 pt-6 gap-4 bg-slate-50">
        {/* Project Logo */}
        <div className="flex justify-start">
          <div className="relative grid h-16 w-16 place-items-center rounded-full bg-indigo-100">
            <Image
              src="/static/icons/ProjectLogo.svg"
              alt="Project logo"
              width={42.67}
              height={42.67}
              className="h-[42.67px] w-[42.67px]"
              draggable={false}
              priority={true}
              loading="eager"
            />
          </div>
        </div>

        {/* Project Title */}
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-2xl font-extrabold leading-8 tracking-tight text-slate-800 text-center">
            Project PlanetX
          </h1>

          {/* Action Buttons */}
          <div className="flex items-center gap-5">
            <MainActions items={MAIN_ACTIONS} />
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex items-start overflow-x-auto pb-2">
          <div className="flex items-center gap-0 min-w-max">
            {MOBILE_STATUS_TABS.map(tab => (
              <div
                key={tab.id}
                className={`flex items-center justify-center px-4 py-3 gap-2.5 min-h-[48px] border-b-2 ${
                  tab.active ? 'border-indigo-600' : 'border-slate-300'
                }`}
              >
                <span
                  className={`text-base font-bold ${
                    tab.active ? 'text-slate-800' : 'text-slate-600'
                  }`}
                >
                  {tab.label}
                </span>
                {tab.badge && (
                  <div className="flex items-center justify-center px-2 py-1 bg-indigo-50 border border-indigo-300 rounded-full min-w-[28px] h-6">
                    <span className="text-xs font-semibold text-indigo-600">
                      {tab.badge}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

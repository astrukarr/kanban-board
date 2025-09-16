import { MOBILE_STATUS_TABS } from '@/constants';

export default function MobileStatusTabs() {
  return (
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
  );
}

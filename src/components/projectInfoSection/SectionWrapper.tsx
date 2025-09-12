import { MainAction, ViewTab } from '@/types';
import ExportButton from '../buttons/ExportButton';
import MainActions from './MainActions';
import ViewTabs from './ViewTabs';
import Image from 'next/image';

const MINI_ACTIONS: MainAction[] = [
  { id: 'grid-mini', icon: '/static/icons/GridView.svg', label: 'Grid View' },
  { id: 'filters-mini', icon: '/static/icons/Filters.svg', label: 'Filter' },
  { id: 'sort-mini', icon: '/static/icons/Sorting.svg', label: 'Sort' },
];

const VIEW_TABS: ViewTab[] = [
  { id: 'grid', icon: '/static/icons/GridView.svg', label: 'Grid View' },
  { id: 'list', icon: '/static/icons/ListView.svg', label: 'List View' },
  { id: 'column', icon: '/static/icons/ColumnView.svg', label: 'Column View' },
  { id: 'row', icon: '/static/icons/RowView.svg', label: 'Row View' },
];

export default function SectionWrapper() {
  const activeTab: ViewTab['id'] = 'list';

  return (
    <section
      aria-label="Project Section"
      className="box-border w-full border-b border-slate-200 px-8 py-8"
    >
      <div className="flex items-center gap-4">
        <div className="relative grid h-24 w-24 place-items-center rounded-full bg-indigo-100">
          <Image
            src="/static/icons/ProjectLogo.svg"
            alt="Project logo"
            width={64}
            height={64}
            className="h-24 w-24"
            draggable={false}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <h1 className="flex-1 truncate text-[30px] leading-[38px] font-semibold tracking-tight text-slate-800">
              Project PlanetX
            </h1>

            <MainActions items={MINI_ACTIONS} />
          </div>

          <div className="flex items-center justify-between gap-16">
            <ViewTabs items={VIEW_TABS} activeId={activeTab} />

            <ExportButton />
          </div>
        </div>
      </div>
    </section>
  );
}

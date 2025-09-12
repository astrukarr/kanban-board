import { SidebarItemProps } from '@/types';
import Item from '../sidebar/Item';
import Image from 'next/image';

const TOP_ITEMS: SidebarItemProps[] = [
  { id: 'home', src: '/static/icons/Home.svg', alt: 'Home' },
  { id: 'analytics', src: '/static/icons/Graph.svg', alt: 'Analytics' },
  { id: 'users', src: '/static/icons/User.svg', alt: 'Users' },
  { id: 'calendar', src: '/static/icons/Calendar.svg', alt: 'Calendar' },
  { id: 'vector', src: '/static/icons/Vector.svg', alt: 'Vector' },
  { id: 'notifications', src: '/static/icons/Ring.svg', alt: 'Notifications' },
];

const BOTTOM_ITEMS: SidebarItemProps[] = [
  { id: 'settings', src: '/static/icons/Settings.svg', alt: 'Settings' },
];

export default function Sidebar() {
  return (
    <div
      aria-label="App Sidebar"
      className="hidden md:flex fixed left-0 top-0 h-screen w-20 box-border flex-col items-start bg-white border-r border-slate-200 py-6 px-4"
    >
      <div className="flex h-full w-full flex-col justify-between">
        <div className="mx-auto flex w-12 flex-col items-center gap-4">
          <div aria-label="Logo">
            <Image
              src="/static/icons/Logo.svg"
              alt="Logo"
              width={40}
              height={40}
              className="cursor-pointer"
            />
          </div>

          <nav
            className="flex w-12 flex-col items-center gap-4"
            aria-label="Primary"
          >
            {TOP_ITEMS.map(item => (
              <Item key={item.id} {...item} />
            ))}
          </nav>
        </div>

        <div className="mx-auto flex w-12 flex-col items-center gap-4">
          <nav
            className="flex w-12 flex-col items-center gap-4"
            aria-label="Secondary"
          >
            {BOTTOM_ITEMS.map(item => (
              <Item key={item.id} {...item} />
            ))}
          </nav>

          <Image
            src="/static/images/Avatar2.png"
            alt="User avatar"
            width={48}
            height={48}
            className="rounded-full object-cover cursor-pointer"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}

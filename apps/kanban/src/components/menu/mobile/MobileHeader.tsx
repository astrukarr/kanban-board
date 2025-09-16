import Image from 'next/image';
import Link from 'next/link';
import MenuButton from '../../buttons/MenuButton';

export default function MobileHeader() {
  return (
    <div
      aria-label="Mobile App Header"
      className="md:hidden flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4"
    >
      <Link href="/" aria-label="Home" className="flex items-center gap-2">
        <Image
          src="/static/icons/Logo.svg"
          alt="Logo"
          width={36}
          height={36}
          className="rounded-xl w-14 h-14 pt-2"
        />
        <Image
          src="/static/icons/HeaderLogoName.svg"
          alt="name"
          width={87}
          height={35}
          className=""
        />
      </Link>

      <MenuButton />
    </div>
  );
}

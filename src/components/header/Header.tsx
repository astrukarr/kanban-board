import { CMSHeader } from '@/types/cms';
import Image from 'next/image';
import Link from 'next/link';

type HeaderProps = {
  data: CMSHeader;
  currentPage?: 'home' | 'dashboard' | 'projects';
};

export default function Header({ data, currentPage = 'home' }: HeaderProps) {
  return (
    <div className="px-4 py-4 lg:px-8">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Image
            src={data.logo.src}
            alt={data.logo.alt}
            width={data.logo.width}
            height={data.logo.height}
            className="md:w-12 md:h-12 mt-2"
          />
          <Image
            src={data.name.src}
            alt={data.name.alt}
            width={data.name.width}
            height={data.name.height}
            className="md:w-24 md:h-10"
          />
        </Link>

        {currentPage === 'home' && (
          <Link
            href={data.ctaButton.href}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            {data.ctaButton.text}
          </Link>
        )}
      </div>
    </div>
  );
}

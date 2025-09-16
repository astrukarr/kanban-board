import { Header as HeaderType } from '@/types/data';
import Image from 'next/image';
import Link from 'next/link';

type HeaderProps = {
  data: HeaderType;
};

export default function Header({ data }: HeaderProps) {
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
            priority
            loading="eager"
          />
          <Image
            src={data.name.src}
            alt={data.name.alt}
            width={data.name.width}
            height={data.name.height}
            className="w-auto h-auto md:w-24 md:h-auto"
            priority
            loading="eager"
          />
        </Link>
      </div>
    </div>
  );
}

import { CMSHero } from '@/types/cms';
import Link from 'next/link';

type Props = {
  hero: CMSHero;
};
export default function HomeHero({ hero }: Props) {
  return (
    <div className="px-4 py-16 lg:px-8 lg:py-24">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-800 mb-6">
          {hero.title.replace(hero.titleHighlight, '')}
          <span className="text-indigo-600">{hero.titleHighlight}</span>
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          {hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {hero.ctaButtons.map((button, index) => (
            <Link
              key={index}
              href={button.href}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-colors ${
                button.variant === 'primary'
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              {button.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

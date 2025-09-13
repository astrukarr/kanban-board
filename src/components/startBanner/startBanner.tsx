import { Cta } from '@/types/cms';
import Link from 'next/link';

type Props = {
  cta: Cta;
};

export default function StartBanner({ cta }: Props) {
  return (
    <section className={`px-4 py-16 lg:px-8 bg-${cta.backgroundColor}-600`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">{cta.title}</h2>
        <p className="text-xl text-indigo-100 mb-8">{cta.subtitle}</p>
        <Link
          href={cta.button.href}
          className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold text-lg hover:bg-slate-50 transition-colors"
        >
          {cta.button.text}
        </Link>
      </div>
    </section>
  );
}

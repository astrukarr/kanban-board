import Link from 'next/link';
import Image from 'next/image';

type EmptyStateProps = {
  title: string;
  description: string;
  button: {
    text: string;
    href: string;
  };
};

export default function EmptyState({
  title,
  description,
  button,
}: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Image
          src="/static/icons/ProjectLogo.svg"
          alt="No projects"
          width={48}
          height={48}
          className="h-12 w-12 text-slate-400"
        />
      </div>
      <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 mb-6">{description}</p>
      <Link
        href={button.href}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
      >
        {button.text}
      </Link>
    </div>
  );
}

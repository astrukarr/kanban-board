import { Footer as FooterType } from '@/types/data';

type Props = {
  footer: FooterType;
};
export default function Footer({ footer }: Props) {
  return (
    <div className="px-4 py-6 lg:px-8 border-t border-slate-200">
      <div className="max-w-6xl mx-auto text-center text-slate-600">
        <p>{footer.copyright}</p>
      </div>
    </div>
  );
}

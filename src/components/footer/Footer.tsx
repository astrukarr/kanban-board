import { CMSFooter } from '@/types/cms';

type Props = {
  footer: CMSFooter;
};
export default function Footer({ footer }: Props) {
  return (
    <div className="px-4 py-8 lg:px-8 border-t border-slate-200">
      <div className="max-w-6xl mx-auto text-center text-slate-600">
        <p>{footer.copyright}</p>
      </div>
    </div>
  );
}

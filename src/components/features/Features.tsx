import { CMSFeatures } from '@/types/cms';
import Image from 'next/image';

type Props = {
  features: CMSFeatures;
};

export default function Features({ features }: Props) {
  return (
    <div className="px-4 py-16 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
          {features.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.items.map(feature => (
            <div
              key={feature.id}
              className="text-center p-6 bg-white rounded-2xl shadow-sm"
            >
              <div
                className={`w-16 h-16 bg-${feature.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <Image
                  src={feature.icon.src}
                  alt={feature.icon.alt}
                  width={feature.icon.width}
                  height={feature.icon.height}
                  className="h-8 w-8"
                />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import Image from 'next/image';

type LogoProps = {
  size?: 'desktop' | 'mobile';
};

export default function Logo({ size = 'desktop' }: LogoProps) {
  if (size === 'mobile') {
    return (
      <div className="relative grid h-16 w-16 place-items-center rounded-full bg-indigo-100">
        <Image
          src="/static/icons/ProjectLogo.svg"
          alt="Project logo"
          width={42.67}
          height={42.67}
          className="h-[42.67px] w-[42.67px]"
          draggable={false}
          priority
          loading="eager"
        />
      </div>
    );
  }

  return (
    <div className="relative grid h-24 w-24 place-items-center rounded-full bg-indigo-100">
      <Image
        src="/static/icons/ProjectLogo.svg"
        alt="Project logo"
        width={64}
        height={64}
        className="h-24 w-24"
        draggable={false}
        priority
        loading="eager"
      />
    </div>
  );
}

import Image from 'next/image';
export default function MenuButton() {
  return (
    <button
      type="button"
      aria-label="Open menu"
      className="grid h-10 w-10 place-items-center rounded-full hover:bg-slate-100 active:bg-slate-200 cursor-pointer"
    >
      <Image
        src="/static/icons/Menu.svg"
        alt=""
        width={28}
        height={28}
        aria-hidden="true"
      />
    </button>
  );
}

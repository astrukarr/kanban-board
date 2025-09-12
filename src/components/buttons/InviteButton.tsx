import Image from 'next/image';
export default function InviteButton() {
  return (
    <button
      type="button"
      className="ml-2 inline-flex h-10 items-center gap-2 rounded-[999px] border border-slate-300 px-4 font-bold text-sm text-slate-600 hover:bg-white"
    >
      <span>Invite</span>
      <Image
        src="/static/icons/Plus.svg"
        alt=""
        width={20}
        height={20}
        className="h-5 w-5"
        aria-hidden="true"
      />
    </button>
  );
}

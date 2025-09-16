import Image from 'next/image';
export default function SearchButton() {
  return (
    <button
      type="button"
      aria-label="Search"
      className="grid h-10 w-10 place-items-center rounded-full hover:bg-slate-100 cursor-pointer"
    >
      <Image
        src="/static/icons/Search.svg"
        alt="Search"
        width={24}
        height={24}
        className="h-6 w-6"
      />
    </button>
  );
}

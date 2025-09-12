export default function ExportButton() {
  return (
    <button
      type="button"
      className="inline-flex h-12 min-h-12 items-center gap-2 rounded-full bg-indigo-600 px-5 text-white font-semibold cursor-pointer"
    >
      <span>Export Data</span>
      <img
        src="/static/icons/ExportData.svg"
        alt="Export Data"
        className="h-5 w-5"
        aria-hidden
      />
    </button>
  );
}

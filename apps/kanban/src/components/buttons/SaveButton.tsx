'use client';

type SaveButtonProps = {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
};

export default function SaveButton({
  onClick,
  className = 'px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer',
  children = 'Save Changes',
}: SaveButtonProps) {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}

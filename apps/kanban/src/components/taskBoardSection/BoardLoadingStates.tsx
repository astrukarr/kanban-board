import Loading from '@/components/ui/Loading';

type BoardLoadingStatesProps = {
  isHydrated: boolean;
  loading: boolean;
  error: string | null;
};

export function BoardLoadingStates({
  isHydrated,
  loading,
  error,
}: BoardLoadingStatesProps) {
  if (!isHydrated) {
    return (
      <div className="w-full p-4 sm:p-6 md:p-8 min-h-[600px]">
        <Loading message="Loading tasks..." />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full p-4 sm:p-6 md:p-8 min-h-[600px]">
        <Loading message="Loading tasks..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 sm:p-6 md:p-8 min-h-[600px]">
        <Loading variant="error" message={`Error: ${error}`} />
      </div>
    );
  }

  return null;
}

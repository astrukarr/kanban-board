import BoardWrapper from '@/components/taskBoardSection/BoardWrapper';
import SectionWrapper from '../components/projectInfoSection/SectionWrapper';

export default function Home() {
  return (
    <div className="flex flex-col">
      <SectionWrapper />
      <BoardWrapper />
    </div>
  );
}

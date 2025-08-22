import config from '../data/config.json';

function GoalsPage({ onNext, onPrevious }: { onNext: () => void; onPrevious: () => void }) {
  const goalContent = config.content.goal[0];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 w-full">
      <div className="bg-white p-10 rounded-lg shadow-md max-w-2xl text-left">
        <h1 className="text-2xl font-bold mb-4">{goalContent.goalHeading}</h1>
        <p className="mb-8">{goalContent.goalDesc}</p>

        <ul className="list-disc ml-5 mb-8">
          {goalContent.goalList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <div className="flex justify-between">
          <button className="bg-gray-400 text-white py-3 px-6 rounded-md border-none cursor-pointer" onClick={onPrevious}>Previous</button>
          <button className="bg-gray-700 text-white py-3 px-6 rounded-md border-none cursor-pointer" onClick={onNext}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default GoalsPage;

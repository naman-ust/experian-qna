import smartToy from '../assets/smart_toy.svg';
import config from '../data/config.json';

function StaticPage({ onNext }: { onNext: () => void }) {
  const introContent = config.content.intro[0];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 w-full">
      <div className="bg-white p-10 rounded-lg shadow-md max-w-2xl text-left">
        <div className="text-5xl mb-5">
          <img src={smartToy} alt="Smart Toy Robot" className="w-12 h-12" />
        </div>
        <h1 className="intro-heading text-2xl font-bold mb-4">{introContent.introHeading}</h1>
        {introContent.introDesc.map((desc, index) => (
          <p key={index} className="intro-description mb-3">{desc}</p>
        ))}
        <div className="text-right">
          <button className="bg-gray-700 text-white py-3 px-6 rounded-md border-none cursor-pointer" onClick={onNext}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default StaticPage;

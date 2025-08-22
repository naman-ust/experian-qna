import { useState } from 'react';
import correctSvg from '../assets/correct_svg.svg';
import config from '../data/config.json';

function TeamPage({ onNext, onPrevious }: { onNext: () => void; onPrevious: () => void }) {
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState<string | null>(null);
  const teamContent = config.content.team[0];

  const handleTeamMemberClick = (memberName: string) => {
    setIsNextEnabled(true);
    setSelectedTeamMember(memberName);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 w-full">
      <div className="bg-white p-10 rounded-lg shadow-md max-w-2xl text-left">
        <h1 className="team-heading text-2xl font-bold mb-4">{teamContent.teamHeading}</h1>
        <p className="team-description mb-8">{teamContent.teamDesc}</p>

        <div className="flex justify-around mb-8">
          {Object.keys(config.screens).map((memberName) => {
            const memberData = (config.screens as any)[memberName][0]; // Assuming each member has at least one screen entry
            return (
              <div 
                key={memberName}
                className={`text-center cursor-pointer p-4 rounded-md ${selectedTeamMember === memberName ? 'border-2 border-blue-500' : ''}`}
                onClick={() => handleTeamMemberClick(memberName)}
              >
                <div className="w-24 h-24 bg-gray-300 rounded-md mx-auto mb-2 flex items-center justify-center relative">
                  {selectedTeamMember === memberName && (
                    <img src={correctSvg} alt="Correct icon" className="w-24 h-24 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  )} 
                </div>
                <p className="font-bold">{memberName}</p>
                <p className="text-sm text-gray-600">{memberData.role}</p>
              </div>
            );
          })}
        </div>

        <p className="team-subdesc mb-8">{teamContent.teamSubDesc}</p>

        <div className="flex justify-between">
          <button className="bg-gray-400 text-white py-3 px-6 rounded-md border-none cursor-pointer" onClick={onPrevious}>Previous</button>
          <button 
            className={`text-white py-3 px-6 rounded-md border-none cursor-pointer ${isNextEnabled ? 'bg-gray-700' : 'bg-gray-500 cursor-not-allowed'}`}
            onClick={isNextEnabled ? onNext : undefined}
            disabled={!isNextEnabled}
          >Next</button>
        </div>
      </div>
    </div>
  );
}

export default TeamPage;

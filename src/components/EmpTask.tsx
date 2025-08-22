import ExperianAssistantIcon from '../assets/smart_toy.svg'; // Assuming you have this icon

function EmpTask({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 w-full">
      <div className="bg-white p-10 rounded-lg shadow-md max-w-2xl text-left">
        {/* Experian Assistant Section */}
        <div className="mb-8 p-4 border border-gray-300 rounded-md">
          <div className="flex items-center mb-2">
            <img src={ExperianAssistantIcon} alt="Experian Assistant" className="w-6 h-6 mr-2" />
            <p className="font-bold text-gray-800">Experian Assistant</p>
          </div>
          <p className="text-sm text-gray-700 mb-2">Vision connect financial's credit model is underperforming. Approvals are flat while referrals and rejections rise, leading to missed opportunities and competitive pressure.</p>
          <p className="text-sm text-gray-700">Your goal is to review the insights, recommend actions, and choose the best model rebuild option</p>
        </div>

        <h2 className="text-xl font-bold mb-4">Talia's tasks:</h2>

        <div className="relative mb-6">
          {/* Task 1 */}
          <div className="flex items-center mb-16">
            <div className="w-16 h-16 bg-gray-300 rounded-md mr-4 flex-shrink-0"></div>
            <div>
              <p className="font-bold">1. Analyse insights from Sandbox</p>
              <p className="text-sm text-gray-600">Description</p>
            </div>
          </div>

          {/* Task 2 */}
          <div className="flex items-center mb-16 ml-[25%]">
            <div className="w-16 h-16 bg-gray-300 rounded-md mr-4 flex-shrink-0"></div>
            <div>
              <p className="font-bold">2. Share recommendations to share with the team</p>
              <p className="text-sm text-gray-600">Description</p>
            </div>
          </div>

          {/* Task 3 */}
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-300 rounded-md mr-4 flex-shrink-0"></div>
            <div>
              <p className="font-bold">3. Rebuild model</p>
              <p className="text-sm text-gray-600">Description</p>
            </div>
          </div>

          {/* Dashed lines */}
          <div className="absolute top-[4.5rem] left-[4.5rem] w-16 h-px border-t border-dashed border-gray-400"></div>
          <div className="absolute top-[4.5rem] left-[10.5rem] w-px h-28 border-l border-dashed border-gray-400"></div>
          <div className="absolute top-[17.5rem] left-[10.5rem] w-16 h-px border-t border-dashed border-gray-400"></div>
          <div className="absolute top-[17.5rem] right-[2.5rem] w-px h-28 border-r border-dashed border-gray-400"></div>
        </div>

        <div className="flex justify-end mt-8">
          <button className="bg-gray-700 text-white py-3 px-6 rounded-md border-none cursor-pointer" onClick={onNext}>Get started</button>
        </div>
      </div>
    </div>
  );
}

export default EmpTask;

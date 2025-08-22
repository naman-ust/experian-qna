import { useState, useEffect } from 'react';
import ExperianLogo from '../assets/experian_logo.svg';
import BellIcon from '../assets/bell_icon.svg'; // Assuming you have this icon
import ViewInsightsIcon from '../assets/view_insights_icon.svg'; // Assuming you have this icon
import DownloadIcon from '../assets/smart_toy.svg'; // Assuming you have this icon
import ScoreCutoffSlider from './ScoreCutoffSlider';
import PolicyUpdate from './PolicyUpdate';
import InsightPopup from './InsightPopup';

function SandboxInsight({ onNext }: { onNext: () => void }) {
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const [checkedRecommendations, setCheckedRecommendations] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('Logistic regression'); // Default selected model
  const [showInsightPopup, setShowInsightPopup] = useState(false);

  const services = [
    { id: 's1', name: 'PII verification' },
    { id: 's2', name: 'Behavioural analytics' },
    { id: 's3', name: 'Document verification' },
    { id: 's4', name: 'Email risk scoring' },
    { id: 's5', name: 'Income verification' },
    { id: 's6', name: 'Social security number (SSN) verification' },
    { id: 's7', name: 'PEPs and Sanctions screening' },
    { id: 's8', name: 'One time passcode (OTP)' },
    { id: 's9', name: 'Knowledge-based authentication' },
  ];

  const declineReasons = [
    { id: 'd1', name: 'BOT detected' },
    { id: 'd2', name: 'Disposable email detected' },
    { id: 'd3', name: 'Document tampering detected' },
    { id: 'd4', name: 'Mismatch income information' },
    { id: 'd5', name: 'SSN belongs to deceased individual' },
    { id: 'd6', name: 'Mismatch to country sanction list' },
    { id: 'd7', name: 'KBA incorrectly answered multiple times)' },
    { id: 'd8', name: 'Incorrect passcode entries' },
  ];

  const [orchestrationSlots, setOrchestrationSlots] = useState<Array<{ id: string; service: { id: string, name: string } | null; reason: { id: string, name: string } | null }>>([
    { id: 'o1', service: null, reason: null },
    { id: 'o2', service: null, reason: null },
    { id: 'o3', service: null, reason: null },
    { id: 'o4', service: null, reason: null },
  ]);

  const [draggedItem, setDraggedItem] = useState<{ item: { id: string, name: string }, type: 'service' | 'reason' } | null>(null);

  // State to track which items are currently in orchestration slots
  const [usedServiceIds, setUsedServiceIds] = useState<string[]>([]);
  const [usedReasonIds, setUsedReasonIds] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onNext(); // Navigate to EmpTask page
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onNext]);

  useEffect(() => {
    // Update usedServiceIds and usedReasonIds whenever orchestrationSlots changes
    const newUsedServices: string[] = [];
    const newUsedReasons: string[] = [];
    orchestrationSlots.forEach(slot => {
      if (slot.service) newUsedServices.push(slot.service.id);
      if (slot.reason) newUsedReasons.push(slot.reason.id);
    });
    setUsedServiceIds(newUsedServices);
    setUsedReasonIds(newUsedReasons);
  }, [orchestrationSlots]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setCheckedRecommendations((prev) => {
      if (checked) {
        if (prev.length < 2) {
          return [...prev, value];
        } else {
          e.target.checked = false; 
          return prev;
        }
      } else {
        return prev.filter((item) => item !== value);
      }
    });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedModel(e.target.value);
  };

  const handleDragStart = (e: React.DragEvent, item: { id: string, name: string }, type: 'service' | 'reason') => {
    setDraggedItem({ item, type });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, slotId: string, slotType: 'service' | 'reason') => {
    e.preventDefault();
    if (!draggedItem) return;

    if (draggedItem.type !== slotType) {
      return;
    }

    setOrchestrationSlots((prevSlots) =>
      prevSlots.map((slot) => {
        if (slot.id === slotId) {
          // If there was an item already in this slot, re-enable it
          if (slotType === 'service' && slot.service) {
            // No need to explicitly re-enable as state will be updated dynamically
          } else if (slotType === 'reason' && slot.reason) {
            // No need to explicitly re-enable as state will be updated dynamically
          }
          return { ...slot, [slotType]: draggedItem.item };
        }
        return slot;
      })
    );
    setDraggedItem(null);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 w-full p-8">
      <div className="bg-white p-10 rounded-lg shadow-md max-w-4xl w-full text-left">
        {/* Top Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <img src={ExperianLogo} alt="Experian Logo" className="h-8 mr-2" />
            <span className="text-lg font-bold">Ascend Platform</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-gray-600">{formatTime(timeLeft)} min</span>
            <img src={BellIcon} alt="Notification Bell" className="h-6 w-6 cursor-pointer" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-6">Sandbox insights</h1>

        {/* View Insights Box */}
        <div className="border border-gray-300 rounded-md p-4 w-64 flex items-center justify-center cursor-pointer mb-8" onClick={() => setShowInsightPopup(true)}>
          <img src={ViewInsightsIcon} alt="View Insights" className="w-8 h-8 mr-2" />
          <p className="font-semibold">View insights</p>
        </div>

        {showInsightPopup && <InsightPopup onClose={() => setShowInsightPopup(false)} />}

        <h2 className="text-2xl font-bold mb-4">Tasks</h2>

        <div className="task flex justify-between space-x-8">
          {/* Share two recommendations with the team */}
          <div className="w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Share two recommendations with the team</h3>
              <img src={DownloadIcon} alt="Download" className="w-5 h-5 cursor-pointer" />
            </div>
            <div className="space-y-2">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="form-checkbox"
                  value="tightenThresholds"
                  checked={checkedRecommendations.includes('tightenThresholds')}
                  onChange={handleCheckboxChange}
                  disabled={checkedRecommendations.length >= 2 && !checkedRecommendations.includes('tightenThresholds')}
                />
                <span className="ml-2 text-gray-700">Tighten approval/decline thresholds to reduce misclassification risk</span>
              </label>
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="form-checkbox"
                  value="manualReview"
                  checked={checkedRecommendations.includes('manualReview')}
                  onChange={handleCheckboxChange}
                  disabled={checkedRecommendations.length >= 2 && !checkedRecommendations.includes('manualReview')}
                />
                <span className="ml-2 text-gray-700">Introduce temporary manual review for a wider score band to mitigate risk until the model is refreshed</span>
              </label>
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="form-checkbox"
                  value="increaseMonitoring"
                  checked={checkedRecommendations.includes('increaseMonitoring')}
                  onChange={handleCheckboxChange}
                  disabled={checkedRecommendations.length >= 2 && !checkedRecommendations.includes('increaseMonitoring')}
                />
                <span className="ml-2 text-gray-700">Increase monitoring frequency to daily to detect further deterioration early</span>
              </label>
            </div>
          </div>

          {/* Choose a model build */}
          <div className="w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Choose a model build</h3>
              <img src={DownloadIcon} alt="Download" className="w-5 h-5 cursor-pointer" />
            </div>
            <table className="w-full text-left table-auto">
              <thead>
                <tr>
                  <th className="pb-2">Modelling algorithm</th>
                  <th className="pb-2">Model accuracy (1-5)</th>
                  <th className="pb-2">Time to build (1-5)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2"><input type="radio" name="modelBuild" className="form-radio mr-2" value="Logistic regression" checked={selectedModel === 'Logistic regression'} onChange={handleRadioChange} />Logistic regression</td>
                  <td className="py-2">2</td>
                  <td className="py-2">1</td>
                </tr>
                <tr>
                  <td className="py-2"><input type="radio" name="modelBuild" className="form-radio mr-2" value="Random forest" checked={selectedModel === 'Random forest'} onChange={handleRadioChange} />Random forest</td>
                  <td className="py-2">4</td>
                  <td className="py-2">3</td>
                </tr>
                <tr>
                  <td className="py-2"><input type="radio" name="modelBuild" className="form-radio mr-2" value="XGBoost" checked={selectedModel === 'XGBoost'} onChange={handleRadioChange} />XGBoost</td>
                  <td className="py-2">5</td>
                  <td className="py-2">4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Drag and Drop Section */}
        <div className="task-2 flex mt-8">
          <div className="w-1/2 pr-4">
            <p className="text-sm text-gray-700 mb-4">Drag and drop services and decline reasons from the list below to the orchestration diagram on the right.</p>
            <div className="flex">
              <div className="w-1/2 pr-2">
                <h3 className="font-bold mb-2">Services:</h3>
                <div className="space-y-2">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      draggable={!usedServiceIds.includes(service.id)}
                      onDragStart={(e) => handleDragStart(e, service, 'service')}
                      className={`p-2 rounded-md flex justify-between items-center text-sm ${usedServiceIds.includes(service.id) ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-200 cursor-grab'}`}
                    >
                      {service.name}
                      <span className="text-gray-500">&#x2022;</span> {/* Bullet point */}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-1/2 pl-2">
                <h3 className="font-bold mb-2">Decline reasons:</h3>
                <div className="space-y-2">
                  {declineReasons.map((reason) => (
                    <div
                      key={reason.id}
                      draggable={!usedReasonIds.includes(reason.id)}
                      onDragStart={(e) => handleDragStart(e, reason, 'reason')}
                      className={`p-2 rounded-md flex justify-between items-center text-sm ${usedReasonIds.includes(reason.id) ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 cursor-grab'}`}
                    >
                      {reason.name}
                      <span className="text-gray-500">&#x2022;</span> {/* Bullet point */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/2 pl-4">
            <h3 className="font-bold mb-2">Orchestration:</h3>
            <div className="space-y-4">
              {orchestrationSlots.map((slot) => (
                <div key={slot.id} className="flex items-center">
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, slot.id, 'service')}
                    className="border border-purple-300 rounded-md p-2 h-10 w-40 flex items-center justify-center bg-purple-100 text-sm mr-4"
                  >
                    {slot.service ? slot.service.name : 'Drag service here'}
                  </div>
                  <span className="mr-4">&rarr;</span>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, slot.id, 'reason')}
                    className="border border-gray-300 rounded-md p-2 h-10 w-40 flex items-center justify-center bg-gray-100 text-sm"
                  >
                    {slot.reason ? slot.reason.name : 'Drag decline reason here'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="task-3">
          <ScoreCutoffSlider 
            title="Adjust score cutoffs" 
            description="Drag the indicators to set the scores that trigger declines and approvals"
            minRange={100}
            maxRange={900}
            defaultDecline={360}
            defaultApprove={640}
          />
        </div>
        <div className="task-4">
          <PolicyUpdate />
        </div>


        <div className="flex justify-end mt-8">
          <button className="bg-gray-700 text-white py-3 px-6 rounded-md border-none cursor-pointer" onClick={onNext}>Send work to Markus</button>
        </div>
      </div>
    </div>
  );
}

export default SandboxInsight;

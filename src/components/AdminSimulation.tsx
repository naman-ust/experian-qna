import { useState } from 'react';
import teamImage from '../assets/team_image.png';

function AdminSimulation({ onNextEmpTask, onPrevious }: { onNextEmpTask: () => void; onPrevious: () => void }) {
  const [showNotification, setShowNotification] = useState(false);

  const handleRedAreaClick = () => {
    setShowNotification(true);
  };

  const handleNotificationClick = () => {
    onNextEmpTask(); // Navigate to EmpTask
    setShowNotification(false); // Close notification after click
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-[925px] h-[925px] mx-auto bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: `url(${teamImage})` }}>
      {/* Clickable area */}
      <div
        className="tilia-sec absolute w-[25%] h-[25%] left-[6%] top-[27%] border-2 border-red-500 border-dashed cursor-pointer"
        onClick={handleRedAreaClick}
      ></div>

      {/* Notification pop-up */}
      {showNotification && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-white p-4 rounded-md shadow-lg">
          <p>Notification from Experian assistant:</p>
          <p>You have some Sandbox insights ready to view!</p>
          <p className="text-blue-500 cursor-pointer" onClick={handleNotificationClick}>Click to view</p>
        </div>
      )}
    </div>
  );
}

export default AdminSimulation;

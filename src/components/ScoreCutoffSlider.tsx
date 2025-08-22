import React, { useState, useRef, useEffect } from 'react';
import smartToy from '../assets/smart_toy.svg'; // Assuming this is the robot icon

interface ScoreCutoffSliderProps {
  title: string;
  description: string;
  minRange: number;
  maxRange: number;
  defaultDecline: number;
  defaultApprove: number;
}

const ScoreCutoffSlider: React.FC<ScoreCutoffSliderProps> = ({
  title,
  description,
  minRange,
  maxRange,
  defaultDecline,
  defaultApprove
}) => {
  const [declineValue, setDeclineValue] = useState(defaultDecline);
  const [approveValue, setApproveValue] = useState(defaultApprove);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDraggingDecline, setIsDraggingDecline] = useState(false);
  const [isDraggingApprove, setIsDraggingApprove] = useState(false);

  const calculateValueFromPosition = (clientX: number) => {
    if (!sliderRef.current) return 0;
    const sliderRect = sliderRef.current.getBoundingClientRect();
    const relativePosition = clientX - sliderRect.left;
    const percentage = Math.max(0, Math.min(1, relativePosition / sliderRect.width));
    return Math.round(percentage * (maxRange - minRange) + minRange);
  };

  const handleMouseDown = (type: 'decline' | 'approve') => {
    if (type === 'decline') {
      setIsDraggingDecline(true);
    } else {
      setIsDraggingApprove(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingDecline && !isDraggingApprove) return;

    let newValue = calculateValueFromPosition(e.clientX);

    if (isDraggingDecline) {
      newValue = Math.min(newValue, approveValue - 1);
      newValue = Math.max(newValue, minRange);
      setDeclineValue(newValue);
    } else if (isDraggingApprove) {
      newValue = Math.max(newValue, declineValue + 1);
      newValue = Math.min(newValue, maxRange);
      setApproveValue(newValue);
    }
  };

  const handleMouseUp = () => {
    setIsDraggingDecline(false);
    setIsDraggingApprove(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove]); // eslint-disable-line react-hooks/exhaustive-deps

  const getBackground = () => {
    const totalRange = maxRange - minRange;
    const declinePercentage = ((declineValue - minRange) / totalRange) * 100;
    const referPercentage = ((approveValue - declineValue) / totalRange) * 100;

    // Ensure percentages are clamped between 0 and 100
    const redEnd = Math.min(100, Math.max(0, declinePercentage));
    const orangeStart = redEnd;
    const orangeEnd = Math.min(100, Math.max(0, orangeStart + referPercentage));
    const greenStart = orangeEnd;
    const greenEnd = 100;

    return `linear-gradient(to right, 
      red ${redEnd}%,
      orange ${orangeStart}% ${orangeEnd}%,
      green ${greenStart}% ${greenEnd}%
    )`;
  };

  const getPosition = (value: number) => {
    const totalRange = maxRange - minRange;
    return ((value - minRange) / totalRange) * 100;
  };

  return (
    <div className="border border-gray-300 rounded-md p-4 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <img src={smartToy} alt="Robot Icon" className="w-5 h-5" />
      </div>
      <p className="text-sm text-gray-700 mb-6">{description}</p>

      <div 
        ref={sliderRef}
        className="relative w-full h-4 rounded-full mb-8"
        style={{ background: getBackground() }}
      >
        {/* Decline Indicator */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-blue-500 cursor-grab"
          style={{ left: `${getPosition(declineValue)}%` }}
          onMouseDown={() => handleMouseDown('decline')}
        ></div>
        <span className="decline-pointer absolute top-[calc(100%+8px)] left-[20%] text-sm -translate-x-1/2">Decline</span>
        <span className="absolute top-[calc(100%+8px)] text-sm" style={{ left: `${getPosition(declineValue)}%`, transform: 'translateX(-50%)' }}>{declineValue}</span>

        {/* Approve Indicator */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-blue-500 cursor-grab"
          style={{ left: `${getPosition(approveValue)}%` }}
          onMouseDown={() => handleMouseDown('approve')}
        ></div>
        <span className="approve-pointer absolute top-[calc(100%+8px)] left-[80%] text-sm -translate-x-1/2">Approve</span>
        <span className="absolute top-[calc(100%+8px)] text-sm" style={{ left: `${getPosition(approveValue)}%`, transform: 'translateX(-50%)' }}>{approveValue}</span>
        <span className="absolute top-[calc(100%+8px)] left-1/2 text-sm -translate-x-1/2 text-center w-full">Refer</span>
      </div>
    </div>
  );
};

export default ScoreCutoffSlider;

import React from 'react';
import ReactEcharts from 'echarts-for-react';

interface InsightPopupProps {
  onClose: () => void;
}

function InsightPopup({ onClose }: InsightPopupProps) {
  // Chart 1: KS Score Degradation
  const ksScoreDegradationOption = {
    xAxis: {
      type: 'category',
      data: ['Baseline Model', 'Current Model'],
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 0.8,
    },
    series: [
      {
        data: [
          { value: 0.65, itemStyle: { color: '#9CA3AF' } }, // Gray
          { value: 0.39, itemStyle: { color: '#EF4444' } }, // Red
        ],
        type: 'bar',
      },
    ],
  };

  // Chart 2: Applications, Approvals, Referrals & Fraud
  const applicationsApprovalsOption = {
    xAxis: {
      type: 'category',
      data: ['Q2 (LY)', 'Q3 (LY)', 'Q4 (LY)', 'Q1 (CY)'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Applications (TTD)',
        type: 'line',
        data: [1400, 1600, 1900, 2200],
        itemStyle: { color: 'orange' },
      },
      {
        name: 'Approvals',
        type: 'line',
        data: [1000, 1000, 1000, 1000],
        itemStyle: { color: 'blue' },
      },
      {
        name: 'Referrals',
        type: 'line',
        data: [100, 250, 400, 600],
        itemStyle: { color: 'red' },
      },
      {
        name: 'Fraud Attacks (Up)',
        type: 'line',
        data: [20, 40, 60, 80],
        itemStyle: { color: 'purple' },
      },
    ],
    legend: {
      data: ['Applications (TTD)', 'Approvals', 'Referrals', 'Fraud Attacks (Up)'],
      bottom: 0,
    },
  };

  // Chart 3: Reject Inferencing - Missed Good Customers
  const rejectInferencingOption = {
    xAxis: [
      {
        type: 'category',
        data: ['Q2 (LY)', 'Q3 (LY)', 'Q4 (LY)', 'Q1 (CY)'],
        axisPointer: {
          type: 'shadow',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Rejections (Count)',
        min: 0,
        max: 700,
        interval: 100,
      },
      {
        type: 'value',
        name: 'Good Customers Rejected',
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
          formatter: '{value}',
        },
      },
    ],
    series: [
      {
        name: 'Rejections (Count)',
        type: 'bar',
        data: [240, 360, 520, 720],
        itemStyle: { color: '#9CA3AF' }, // Gray
      },
      {
        name: 'Good Customers Rejected',
        type: 'line',
        yAxisIndex: 1,
        data: [50, 70, 150, 250],
        itemStyle: { color: 'green' },
      },
    ],
    legend: {
      data: ['Rejections (Count)', 'Good Customers Rejected'],
      bottom: 0,
    },
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Sandbox insights</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-center text-lg font-semibold mb-6">Insights - KS Drop, Applications vs Approvals, Referrals & Fraud, and Rejections</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Chart 1: KS Score Degradation */}
          <div className="border p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold mb-2">KS Score Degradation</h3>
            <ReactEcharts option={ksScoreDegradationOption} style={{ height: '200px' }} />
          </div>

          {/* Chart 2: Applications, Approvals, Referrals & Fraud */}
          <div className="border p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Applications, Approvals, Referrals & Fraud</h3>
            <ReactEcharts option={applicationsApprovalsOption} style={{ height: '200px' }} />
          </div>

          {/* Chart 3: Reject Inferencing - Missed Good Customers */}
          <div className="border p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Reject Inferencing - Missed Good Customers</h3>
            <ReactEcharts option={rejectInferencingOption} style={{ height: '200px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsightPopup;

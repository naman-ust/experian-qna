import { useState } from 'react'
import StaticPage from './components/StaticPage'
import TeamPage from './components/TeamPage'
import GoalsPage from './components/GoalsPage'
import YourselfForm from './components/YourselfForm'
import AdminSimulation from './components/AdminSimulation'
import EmpTask from './components/EmpTask'
import SandboxInsight from './components/SandboxInsight'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('staticPage');

  const handleNext = () => {
    if (currentPage === 'staticPage') {
      setCurrentPage('teamPage');
    } else if (currentPage === 'teamPage') {
      setCurrentPage('goalsPage');
    } else if (currentPage === 'goalsPage') {
      setCurrentPage('yourselfForm');
    } else if (currentPage === 'yourselfForm') {
      setCurrentPage('adminSimulation');
    } else if (currentPage === 'empTask') {
      setCurrentPage('sandboxInsight');
    } else if (currentPage === 'sandboxInsight') {
      // Handle navigation after SandboxInsight if needed
    }
  };

  const handlePrevious = () => {
    if (currentPage === 'teamPage') {
      setCurrentPage('staticPage');
    } else if (currentPage === 'goalsPage') {
      setCurrentPage('teamPage');
    } else if (currentPage === 'yourselfForm') {
      setCurrentPage('goalsPage');
    } else if (currentPage === 'adminSimulation') {
      setCurrentPage('yourselfForm');
    } else if (currentPage === 'empTask') {
      setCurrentPage('adminSimulation');
    } else if (currentPage === 'sandboxInsight') {
      setCurrentPage('empTask');
    }
  };

  const handleEmpTaskOpen = () => {
    setCurrentPage('empTask');
  }

  return (
    <>
      {currentPage === 'staticPage' && <StaticPage onNext={handleNext} />}
      {currentPage === 'teamPage' && <TeamPage onNext={handleNext} onPrevious={handlePrevious} />}
      {currentPage === 'goalsPage' && <GoalsPage onNext={handleNext} onPrevious={handlePrevious} />}
      {currentPage === 'yourselfForm' && <YourselfForm onNext={handleNext} onPrevious={handlePrevious} />}
      {currentPage === 'adminSimulation' && <AdminSimulation onNextEmpTask={handleEmpTaskOpen} onPrevious={handlePrevious} />}
      {currentPage === 'empTask' && <EmpTask onNext={handleNext} onPrevious={handlePrevious} />}
      {currentPage === 'sandboxInsight' && <SandboxInsight onNext={handleNext} onPrevious={handlePrevious} />}
    </>
  );
}

export default App;

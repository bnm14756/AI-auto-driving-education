import React, { useState } from 'react';
import { View } from './types';
import Dashboard from './components/Dashboard';
import Training from './components/Training';
import DigitalTwin from './components/DigitalTwin';
import Curriculum from './components/Curriculum';
import { DashboardIcon, TrainingIcon, DigitalTwinIcon, CurriculumIcon, AILogoIcon } from './components/icons';

const Sidebar: React.FC<{ currentView: View; setView: (view: View) => void }> = ({ currentView, setView }) => {
    const navItems = [
        { view: View.Dashboard, label: '대시보드', icon: DashboardIcon },
        { view: View.Training, label: 'AI 초개인화 교육', icon: TrainingIcon },
        { view: View.DigitalTwin, label: '디지털 트윈', icon: DigitalTwinIcon },
        { view: View.Curriculum, label: '로드맵', icon: CurriculumIcon },
    ];

    const baseClasses = "flex items-center w-full p-3 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors duration-200";
    const activeClasses = "bg-sky-600 text-white font-semibold shadow-lg";

    return (
        <aside className="w-64 bg-slate-800 p-4 flex flex-col border-r border-slate-700">
            <div className="flex items-center space-x-3 p-3 mb-6">
                <AILogoIcon className="w-8 h-8 text-sky-400" />
                <span className="text-xl font-bold text-white">KO-DRIVE AI</span>
            </div>
            <nav className="flex-grow">
                <ul className="space-y-2">
                    {navItems.map(item => (
                        <li key={item.view}>
                            <button
                                onClick={() => setView(item.view)}
                                className={`${baseClasses} ${currentView === item.view ? activeClasses : ''}`}
                            >
                                <item.icon className="w-6 h-6 mr-3" />
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="text-xs text-center text-slate-500 mt-4">
                <p>&copy; 2024 KO-DRIVE. All rights reserved.</p>
                <p>Future Mobility Safety Institute</p>
            </div>
        </aside>
    );
};

const App = () => {
    const [currentView, setCurrentView] = useState<View>(View.Dashboard);

    const renderView = () => {
        switch (currentView) {
            case View.Dashboard:
                return <Dashboard />;
            case View.Training:
                return <Training />;
            case View.DigitalTwin:
                return <DigitalTwin />;
            case View.Curriculum:
                return <Curriculum />;
            default:
                return <Dashboard />;
        }
    };
    
    return (
        <div className="flex h-screen bg-slate-900 font-sans">
            <Sidebar currentView={currentView} setView={setCurrentView} />
            <main className="flex-1 overflow-y-auto">
                {renderView()}
            </main>
        </div>
    );
};

export default App;
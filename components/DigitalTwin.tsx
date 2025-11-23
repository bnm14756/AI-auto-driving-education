import React, { useState, useCallback, useEffect, useRef } from 'react';
import type { DigitalTwinScenario } from '../types';
import { generateEdgeCaseScenario, generateRecommendedAction } from '../services/geminiService';

const ScenarioInfo: React.FC<{
    scenario: DigitalTwinScenario | null;
    isLoading: boolean;
    recommendedAction: string | null;
    isLoadingAction: boolean;
}> = ({ scenario, isLoading, recommendedAction, isLoadingAction }) => (
    <div className="bg-slate-800 rounded-lg p-6 lg:col-span-1 h-full flex flex-col">
        <h2 className="text-xl font-bold text-white mb-4">AI 생성 시나리오</h2>
        <div className="flex-grow overflow-y-auto pr-2">
            {isLoading ? (
                <div className="flex-grow flex flex-col items-center justify-center space-y-4 h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400"></div>
                    <p className="text-slate-400">새로운 Edge Case 생성 중...</p>
                </div>
            ) : scenario ? (
                <div className="space-y-4 text-sm">
                    <div>
                        <h3 className="font-semibold text-sky-400">제목</h3>
                        <p className="text-slate-300">{scenario.title}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-sky-400">개요</h3>
                        <p className="text-slate-300">{scenario.description}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-sky-400">환경</h3>
                        <p className="text-slate-300">{scenario.environment}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-sky-400">핵심 과제</h3>
                        <p className="text-slate-300">{scenario.challenge}</p>
                    </div>

                    {isLoadingAction && (
                         <div className="flex flex-col items-center justify-center space-y-3 pt-6">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-400"></div>
                            <p className="text-slate-400 text-xs">AI 대응 방안 분석 중...</p>
                        </div>
                    )}
                    {recommendedAction && !isLoadingAction && (
                        <div className="pt-4 mt-4 border-t border-slate-700">
                            <h3 className="font-semibold text-sky-400">AI 추천 대응 방안</h3>
                            <p className="text-slate-300 whitespace-pre-wrap mt-2">{recommendedAction}</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex-grow flex items-center justify-center h-full">
                    <p className="text-slate-500">시나리오를 생성해주세요.</p>
                </div>
            )}
        </div>
    </div>
);

const SimulationView: React.FC<{ positions: any }> = ({ positions }) => (
    <div className="relative bg-black rounded-lg lg:col-span-2 h-[400px] lg:h-full overflow-hidden border-2 border-slate-700 flex items-center justify-center">
        {/* Simplified road representation */}
        <div className="absolute w-full h-2 bg-slate-600 top-1/2 -translate-y-1/2"></div>
        <div className="absolute w-2 h-full bg-slate-600 left-1/2 -translate-x-1/2"></div>
        <div className="absolute w-full h-1 bg-yellow-400 top-1/2 -translate-y-1/2 border-dashed border-2 border-transparent"></div>
        <div className="absolute w-1 h-full bg-yellow-400 left-1/2 -translate-x-1/2 border-dashed border-2 border-transparent"></div>
        
        {/* Autonomous Vehicle */}
        <div className="absolute w-8 h-12 bg-sky-500 rounded-md shadow-lg z-10 transition-all duration-100 ease-linear" style={{top: `${positions.av.y}%`, left: `${positions.av.x}%`}}>
            <div className="absolute w-full h-4 bg-sky-300/50 rounded-t-md top-0"></div>
        </div>

        {/* Other vehicles/objects */}
        <div className="absolute w-7 h-10 bg-red-500 rounded-md shadow-md transition-all duration-100 ease-linear" style={{top: `${positions.other.y}%`, left: `${positions.other.x}%`}}></div>
        <div className="absolute w-3 h-3 bg-green-500 rounded-full shadow-md animate-pulse transition-all duration-100 ease-linear" style={{top: `${positions.pedestrian.y}%`, left: `${positions.pedestrian.x}%`}}></div>
        
        <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 text-xs rounded">SIMULATION VIEW</div>
        <div className="absolute bottom-2 right-2 text-white/50 text-xs">Digital Twin of KO-DRIVE Safety Center</div>
    </div>
);

const DigitalTwin: React.FC = () => {
    const [scenario, setScenario] = useState<DigitalTwinScenario | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSimulating, setIsSimulating] = useState<boolean>(false);
    const [recommendedAction, setRecommendedAction] = useState<string | null>(null);
    const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false);

    const initialPositions = {
        av: { x: 45, y: 80 },
        other: { x: 55, y: 30 },
        pedestrian: { x: 25, y: 48 },
    };
    const [positions, setPositions] = useState(initialPositions);
    const simulationIntervalRef = useRef<number | null>(null);

    const handleGenerateScenario = useCallback(async () => {
        setIsLoading(true);
        if (isSimulating) {
            handleStopSimulation();
        }
        setRecommendedAction(null);
        setPositions(initialPositions);
        const newScenario = await generateEdgeCaseScenario();
        setScenario(newScenario);
        setIsLoading(false);
    }, [isSimulating]);
    
    useEffect(() => {
        const fetchInitialScenario = async () => {
            setIsLoading(true);
            setRecommendedAction(null);
            setPositions(initialPositions);
            const newScenario = await generateEdgeCaseScenario();
            setScenario(newScenario);
            setIsLoading(false);
        };
        fetchInitialScenario();
    }, []);


    const handleStartSimulation = useCallback(async () => {
        if (!scenario) return;
        setIsSimulating(true);
        setIsLoadingAction(true);
        const action = await generateRecommendedAction(scenario);
        setRecommendedAction(action);
        setIsLoadingAction(false);
    }, [scenario]);

    const handleStopSimulation = () => {
        setIsSimulating(false);
    };

    useEffect(() => {
        if (isSimulating) {
            simulationIntervalRef.current = window.setInterval(() => {
                setPositions(prev => {
                    const avFinished = prev.av.y <= 20;
                    const pedFinished = prev.pedestrian.x >= 48;
                    
                    if (avFinished && pedFinished) {
                        handleStopSimulation();
                        return prev;
                    }

                    return {
                        av: { ...prev.av, y: avFinished ? prev.av.y : prev.av.y - 0.5 },
                        other: { ...prev.other },
                        pedestrian: { ...prev.pedestrian, x: pedFinished ? prev.pedestrian.x : prev.pedestrian.x + 0.5 },
                    };
                });
            }, 50);
        } else {
            if (simulationIntervalRef.current) {
                clearInterval(simulationIntervalRef.current);
                simulationIntervalRef.current = null;
            }
        }

        return () => {
            if (simulationIntervalRef.current) {
                clearInterval(simulationIntervalRef.current);
            }
        };
    }, [isSimulating]);

    return (
        <div className="p-4 sm:p-6 md:p-8 space-y-8 h-full flex flex-col">
            <div className="flex flex-wrap justify-between items-center gap-4">
                <h1 className="text-3xl font-bold text-white">디지털 트윈 기반 가상 검증 플랫폼</h1>
                <div className="flex space-x-2">
                    <button 
                        onClick={handleGenerateScenario}
                        disabled={isLoading || isSimulating}
                        className="bg-sky-600 hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center space-x-2">
                        <span>새 시나리오</span>
                    </button>
                    <button 
                        onClick={isSimulating ? handleStopSimulation : handleStartSimulation}
                        disabled={!scenario || isLoading || isLoadingAction}
                        className={`${
                            isSimulating ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'
                        } disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors min-w-[150px] text-center`}
                        >
                        {isSimulating ? '시뮬레이션 중지' : (isLoadingAction ? '분석중...' : '시뮬레이션 시작')}
                    </button>
                </div>
            </div>
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
                <SimulationView positions={positions}/>
                <ScenarioInfo scenario={scenario} isLoading={isLoading} recommendedAction={recommendedAction} isLoadingAction={isLoadingAction}/>
            </div>
        </div>
    );
};

export default DigitalTwin;
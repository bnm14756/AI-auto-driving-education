
import React, from 'react';
import type { TrainingModule } from '../types';

const mockTrainingModules: TrainingModule[] = [
  { id: '1', title: '도심 교차로 보행자 보호', category: '도심 주행', description: '신호 없는 교차로에서 갑자기 나타나는 보행자에 대한 대응 훈련입니다.', status: 'completed', score: 95 },
  { id: '2', title: '야간 고속도로 합류 구간', category: '고속 주행', description: '시야가 제한된 야간 상황에서 고속도로에 안전하게 합류하는 훈련입니다.', status: 'in-progress' },
  { id: '3', title: '악천후(폭우) 운전', category: '특수 환경', description: '수막현상 및 시야 방해 상황에서의 차량 제어 및 안전 거리 확보 훈련입니다.', status: 'not-started' },
  { id: '4', title: '공사 구간 차선 변경', category: '도로 환경 변화', description: '갑작스러운 공사 구간 등장 시, 주변 차량 흐름에 맞춰 안전하게 차선을 변경하는 훈련입니다.', status: 'not-started' },
  { id: '5', title: '터널 내 돌발 상황', category: '특수 환경', description: '터널 내부에서 발생할 수 있는 정차 차량, 낙하물 등 돌발 상황에 대한 대응 훈련입니다.', status: 'completed', score: 88 },
  { id: '6', title: '자전거 우선도로 주행', category: '도심 주행', description: '자전거 및 개인형 이동장치(PM)가 많은 도로에서의 상호작용 및 안전 운전 훈련입니다.', status: 'not-started' },
];

const getStatusBadge = (status: TrainingModule['status']) => {
  switch (status) {
    case 'completed':
      return <span className="absolute top-4 right-4 text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-900 text-green-300">완료</span>;
    case 'in-progress':
      return <span className="absolute top-4 right-4 text-xs font-medium px-2.5 py-0.5 rounded-full bg-yellow-900 text-yellow-300">진행중</span>;
    default:
      return <span className="absolute top-4 right-4 text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-700 text-slate-300">미시작</span>;
  }
};

const TrainingCard: React.FC<{ module: TrainingModule }> = ({ module }) => (
  <div className="relative bg-slate-800 rounded-lg p-6 shadow-lg hover:bg-slate-700/50 border border-slate-700 hover:border-sky-500 transition-all duration-300 flex flex-col justify-between">
    <div>
      {getStatusBadge(module.status)}
      <p className="text-sm font-semibold text-sky-400">{module.category}</p>
      <h3 className="text-lg font-bold text-white mt-1">{module.title}</h3>
      <p className="text-slate-400 mt-2 text-sm">{module.description}</p>
    </div>
    <div className="mt-6">
      {module.status === 'completed' && module.score && (
        <div className="text-sm text-green-400 font-semibold">최고 점수: {module.score}점</div>
      )}
      {module.status !== 'completed' && (
        <button className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
          {module.status === 'in-progress' ? '이어서 하기' : '훈련 시작'}
        </button>
      )}
    </div>
  </div>
);

const Training = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">AI 초개인화 교육</h1>
        <div className="flex space-x-2">
            <select className="bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-sky-500 focus:border-sky-500">
                <option>모든 카테고리</option>
                <option>도심 주행</option>
                <option>고속 주행</option>
                <option>특수 환경</option>
            </select>
            <select className="bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-sky-500 focus:border-sky-500">
                <option>모든 상태</option>
                <option>완료</option>
                <option>진행중</option>
                <option>미시작</option>
            </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTrainingModules.map(module => (
          <TrainingCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
};

export default Training;

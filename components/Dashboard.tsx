
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, PieChart, Pie, Cell, RadialBarChart, RadialBar } from 'recharts';
import type { User } from '../types';

const mockUser: User = {
  name: '김민준 (운수종사자)',
  avatarUrl: 'https://picsum.photos/seed/user1/100/100',
  level: 7,
  progress: 72,
};

const performanceData = [
  { name: '상황 인식', score: 85, fullMark: 100 },
  { name: '위험 예측', score: 78, fullMark: 100 },
  { name: '판단 및 제어', score: 92, fullMark: 100 },
  { name: '법규 준수', score: 95, fullMark: 100 },
  { name: '돌발 대응', score: 68, fullMark: 100 },
];

const scenarioCompletionData = [
  { name: '완료', value: 25 },
  { name: '진행중', value: 10 },
  { name: '미시작', value: 15 },
];

const COLORS = ['#0ea5e9', '#f97316', '#475569']; // Sky, Orange, Slate

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`bg-slate-800 rounded-lg p-6 shadow-lg ${className}`}>
    {children}
  </div>
);

const UserProfile: React.FC<{ user: User }> = ({ user }) => (
  <Card className="flex items-center space-x-6">
    <img src={user.avatarUrl} alt="User Avatar" className="w-24 h-24 rounded-full border-4 border-sky-500" />
    <div>
      <h2 className="text-2xl font-bold text-white">{user.name}</h2>
      <p className="text-slate-400">레벨 {user.level} | 종합 진행률</p>
      <div className="w-full bg-slate-700 rounded-full h-4 mt-2">
        <div className="bg-sky-500 h-4 rounded-full" style={{ width: `${user.progress}%` }}></div>
      </div>
      <p className="text-right text-sm font-medium text-sky-400 mt-1">{user.progress}%</p>
    </div>
  </Card>
);

const Dashboard = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-8">
      <h1 className="text-3xl font-bold text-white">대시보드</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <UserProfile user={mockUser} />

        <Card className="lg:col-span-2">
          <h3 className="text-xl font-semibold mb-4 text-white">역량별 성취도</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={performanceData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                labelStyle={{ color: '#cbd5e1' }}
              />
              <Legend />
              <Bar dataKey="score" fill="#0ea5e9" name="점수"/>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <h3 className="text-xl font-semibold mb-4 text-white">시나리오 완료 현황</h3>
           <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={scenarioCompletionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {scenarioCompletionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card>
           <h3 className="text-xl font-semibold mb-4 text-white">위험 상황 대응 능력</h3>
           <ResponsiveContainer width="100%" height={200}>
                <RadialBarChart 
                    cx="50%" 
                    cy="50%" 
                    innerRadius="50%" 
                    outerRadius="90%" 
                    barSize={20} 
                    data={[{ name: '대응 능력', value: 76, fill: '#38bdf8' }]}
                    startAngle={90}
                    endAngle={-270}
                >
                    <RadialBar
                        minAngle={15}
                        background
                        clockWise
                        dataKey='value'
                    />
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-white text-3xl font-bold">
                        76%
                    </text>
                     <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                </RadialBarChart>
            </ResponsiveContainer>
        </Card>
        
        <Card className="flex flex-col justify-center items-center">
          <h3 className="text-xl font-semibold mb-2 text-white">다음 추천 훈련</h3>
          <p className="text-lg text-sky-400 font-medium">야간 고속도로 합류 구간</p>
          <p className="text-slate-400 text-center mt-2">다른 차량의 예측 불가능한 차선 변경 상황에 대한 대응 훈련이 필요합니다.</p>
          <button className="mt-4 bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            훈련 시작
          </button>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

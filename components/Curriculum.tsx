
import React from 'react';
import type { CurriculumItem } from '../types';

const curriculumData: CurriculumItem[] = [
    { year: 2024, title: '운영 방안 마련 및 자료 수집', description: '자율주행 시대 교통안전 체험교육센터의 고도화 방안을 도출하고, 국내외 자료를 수집하여 기반을 마련합니다.', status: 'completed' },
    { year: 2025, title: 'AI 기반 교육 커리큘럼 개발 (3건)', description: 'AI 윤리, 자율차 사고 대응, 데이터 기반 운전 습관 분석 등 3가지 핵심 AI 교육 커리큘럼을 개발합니다.', status: 'in-progress' },
    { year: 2025, title: '디지털 트윈 플랫폼 개념 설계', description: '실제 교통안전센터를 가상화하는 디지털 트윈의 개념 설계를 완료하고 기술적 요구사항을 정의합니다.', status: 'in-progress' },
    { year: 2025, title: '파일럿 시스템 구축', description: '핵심 기능을 포함한 디지털 트윈 파일럿 시스템을 구축하여 기술적 타당성을 검증합니다.', status: 'planned' },
    { year: 2026, title: '초개인화 교육 시스템 고도화', description: '학습자 데이터를 심층 분석하여 교육 콘텐츠 추천 정확도를 높이고, 맞춤형 피드백 시스템을 강화합니다.', status: 'planned' },
    { year: 2026, title: '가상 안전 검증 플랫폼 정식 오픈', description: '다양한 자율주행 시스템(HW/SW) 연동을 지원하고, AI 기반 엣지 케이스 평가 기능을 포함한 정식 플랫폼을 오픈합니다.', status: 'planned' },
];

const getStatusPill = (status: CurriculumItem['status']) => {
    const baseClasses = "text-xs font-semibold px-3 py-1 rounded-full";
    switch (status) {
        case 'completed': return <span className={`${baseClasses} bg-green-500/20 text-green-300`}>완료</span>;
        case 'in-progress': return <span className={`${baseClasses} bg-yellow-500/20 text-yellow-300`}>진행중</span>;
        case 'planned': return <span className={`${baseClasses} bg-slate-500/20 text-slate-300`}>계획</span>;
    }
};

const Curriculum = () => {
    return (
        <div className="p-4 sm:p-6 md:p-8">
            <h1 className="text-3xl font-bold text-white mb-8">교육 및 개발 로드맵</h1>
            
            <div className="relative border-l-2 border-slate-700 ml-4">
                {curriculumData.map((item, index) => (
                    <div key={index} className="mb-10 ml-8">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-sky-800 rounded-full -left-4 ring-4 ring-slate-900 text-sky-300 font-bold">
                           {item.year.toString().slice(-2)}
                        </span>
                        <div className="bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-700">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                                {getStatusPill(item.status)}
                            </div>
                            <p className="text-slate-400">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Curriculum;

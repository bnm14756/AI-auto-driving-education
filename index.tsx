
import React, { Component, ErrorInfo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 에러 바운더리 컴포넌트: 렌더링 중 발생하는 에러를 포착하여 대체 UI를 표시
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col h-screen w-full items-center justify-center bg-slate-900 text-white p-6">
          <div className="max-w-md text-center bg-slate-800 p-8 rounded-lg shadow-xl border border-slate-700">
            <h1 className="text-2xl font-bold text-red-500 mb-4">일시적인 오류가 발생했습니다</h1>
            <p className="mb-6 text-slate-300">
              시스템을 불러오는 도중 문제가 생겼습니다.<br/>
              잠시 후 다시 시도해주세요.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-lg"
            >
              페이지 새로고침
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

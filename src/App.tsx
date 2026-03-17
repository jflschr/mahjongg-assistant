import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { HandTrackerPage } from './components/tracker/HandTrackerPage';

const CardViewerPage = lazy(() => import('./components/card/CardViewerPage').then(m => ({ default: m.CardViewerPage })));
const RulesPage = lazy(() => import('./components/rules/RulesPage').then(m => ({ default: m.RulesPage })));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<HandTrackerPage />} />
          <Route path="/card" element={
            <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading...</div>}>
              <CardViewerPage />
            </Suspense>
          } />
          <Route path="/rules" element={
            <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading...</div>}>
              <RulesPage />
            </Suspense>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

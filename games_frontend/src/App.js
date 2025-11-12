import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './hooks/useTheme';
import Layout from './components/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// Code-split GameDetails
const GameDetails = lazy(() => import('./pages/GameDetails'));

// PUBLIC_INTERFACE
function App() {
  /** App entry rendering the routing structure and theme provider. */
  return (
    <ThemeProvider>
      <Suspense fallback={<div role="status" aria-live="polite" className="loading">Loading…</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="games/:id" element={<GameDetails />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;

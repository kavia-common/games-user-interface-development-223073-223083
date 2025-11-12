import React from 'react';
const Home = React.lazy(() => import('./pages/Home'));
const GameDetails = React.lazy(() => import('./pages/GameDetails'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

/**
 * Route configuration for the app. Useful for centralizing route metadata.
 */
export const routes = [
  {
    path: '/',
    element: <Home />,
    meta: { title: 'Home' },
  },
  {
    path: '/games/:id',
    element: <GameDetails />,
    meta: { title: 'Game Details' },
  },
  {
    path: '*',
    element: <NotFound />,
    meta: { title: 'Not Found' },
  },
];

export default routes;

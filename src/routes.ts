import { createBrowserRouter } from 'react-router';
import { lazy } from 'react';

const Home             = lazy(() => import('./pages/Home'));
const AgentLogin       = lazy(() => import('./pages/AgentLogin'));
const AgentQueue       = lazy(() => import('./pages/AgentQueue'));
const AgentDetail      = lazy(() => import('./pages/AgentDetail'));
const AgentConfirm     = lazy(() => import('./pages/AgentConfirmation'));
const CitizenSearch    = lazy(() => import('./pages/CitizenSearch'));
const CitizenResult    = lazy(() => import('./pages/CitizenResult'));

export const router = createBrowserRouter([
  { index: true,                    Component: Home          },
  { path: 'agente',                 Component: AgentLogin    },
  { path: 'agente/bandeja',         Component: AgentQueue    },
  { path: 'agente/evento/:id',      Component: AgentDetail   },
  { path: 'agente/confirmacion',    Component: AgentConfirm  },
  { path: 'ciudadano',              Component: CitizenSearch  },
  { path: 'ciudadano/resultado',    Component: CitizenResult  },
]);

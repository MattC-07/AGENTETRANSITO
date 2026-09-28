import { createBrowserRouter } from 'react-router';
import { lazy } from 'react';

const Landing            = lazy(() => import('./pages/Landing'));
const AgentLogin         = lazy(() => import('./pages/AgentLogin'));
const AgentQueue         = lazy(() => import('./pages/AgentQueue'));
const AgentDetail        = lazy(() => import('./pages/AgentDetail'));
const AgentConfirm       = lazy(() => import('./pages/AgentConfirmation'));
const CiudadanoConsulta  = lazy(() => import('./pages/ciudadano/Consulta'));
const CiudadanoResultado = lazy(() => import('./pages/ciudadano/Resultado'));
const AdminLogin         = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard     = lazy(() => import('./pages/AdminDashboard'));

export const router = createBrowserRouter([
  { index: true,                    Component: Landing            },
  { path: 'agente',                 Component: AgentLogin         },
  { path: 'agente/bandeja',         Component: AgentQueue         },
  { path: 'agente/evento/:id',      Component: AgentDetail        },
  { path: 'agente/confirmacion',    Component: AgentConfirm       },
  { path: 'ciudadano',              Component: CiudadanoConsulta  },
  { path: 'ciudadano/resultado',    Component: CiudadanoResultado },
  { path: 'admin',                  Component: AdminLogin         },
  { path: 'admin/panel',            Component: AdminDashboard     },
]);

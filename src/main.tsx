import { CssBaseline, ThemeProvider } from '@mui/material';
import {
  ArcElement,
  CategoryScale,
  Chart,
  Legend,
  LineElement,
  LinearScale,
  PieController,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './assets/css/global.css';
import theme from './theme/theme';

Chart.register(
  PieController,
  ArcElement,
  CategoryScale,
  Title,
  Legend,
  Tooltip,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <App />
    </Router>
  </ThemeProvider>
);

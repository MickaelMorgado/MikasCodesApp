import { MemoryRouter, Routes, Route } from 'react-router-dom';
import MainAppStruct from '../components/mainAppStruct';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from 'pages/login';
import HourLogging from 'pages/hourLogging';
import { NotesApp } from 'pages/notesApp';
import Scripts from 'pages/scripts';
import Settings from 'pages/settings';
import VisualScripting from 'pages/visualscripting';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: 'black',
      paper: '#050505',
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainAppStruct title={'Notes App'} content={<NotesApp />} />
            }
          />
          <Route
            path="/notesApp"
            element={
              <MainAppStruct title={'Notes App'} content={<NotesApp />} />
            }
          />
          <Route
            path="/scripts"
            element={<MainAppStruct title={'Scripts'} content={<Scripts />} />}
          />
          <Route
            path="/hourLogging"
            element={
              <MainAppStruct
                title={'hourLogging'}
                content={<HourLogging id={''} />}
              />
            }
          />
          <Route
            path="/visualScripting"
            element={
              <MainAppStruct
                title={'visualScripting'}
                content={<VisualScripting id={''} />}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <MainAppStruct title={'Settings'} content={<Settings />} />
            }
          />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );
}

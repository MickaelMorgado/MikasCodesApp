import { MemoryRouter, Routes, Route } from 'react-router-dom';
import MainAppStruct from '../components/mainAppStruct'
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from 'pages/login';
import HourLogging from 'pages/hourLogging';
import { NotesApp } from 'pages/notesApp';
import Scripts from 'pages/scripts';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
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
              <MainAppStruct
                title={'Notes App'}
                content={<NotesApp />}
              />
            }
          />
          <Route
            path="/notesApp"
            element={
              <MainAppStruct
                title={'Notes App'}
                content={<NotesApp />}
              />
            }
          />
          <Route
            path="/scripts"
            element={
              <MainAppStruct
                title={'Scripts'}
                content={<Scripts />}
              />
            }
          />
          <Route
            path="/hourLogging"
            element={
              <MainAppStruct
                title={'hourLogging'}
                content={<HourLogging />}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );
}

import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Sidebar from '../components/sidebar'
import MainAppStruct from '../components/mainAppStruct'
import icon from '../../assets/icon.svg';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from 'pages/login';
import Home from 'pages/home';
import Scripts from 'pages/scripts';
import GeneratedScriptBase from 'pages/scripts/generatedScripts/generatedScriptBase';
import GeneratedScriptBase2 from 'pages/scripts/generatedScripts/generatedScriptBase2';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const renderedElement = () => {
  return (formFields: any) => (<>lorem {formFields[0].name == false ? 'yey': 'nop'} fsodf</>)
}

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
                title={'Home'}
                content={<Home />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <MainAppStruct
                title={'Login'}
                content={<Login />}
              />
            }
          />
          <Route
            path="/home"
            element={
              <MainAppStruct
                title={'Home'}
                content={<Home />}
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
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );
}

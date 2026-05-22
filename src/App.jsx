import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/common/nav-bar';
import HomePage from './pages/home-page';
import AboutMePage from './pages/about-me-page';
import ProjectsPage from './pages/projects-page';

function App() {
  return (
    <BrowserRouter basename='/my-portfolio'>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutMePage />} />
        <Route path='/projects' element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

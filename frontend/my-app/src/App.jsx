import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import TestPage from './Pages/TestPage';
import HomePage from './Pages/HomePage';
import TestIns from './Pages/Testins';
import Feedback from './Pages/Feedback';
import TestReport from './Pages/TestReport';
import Form from './Pages/Auth/Form';

function AppWrapper() {
  const location = useLocation();

  return (
    <div className="all">
      {/* Hide Navbar on /test route */}
      {location.pathname !== '/test' && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/testins" element={<TestIns />} />
        <Route path="/feedback" element={<Feedback />} />

        <Route path="/testreport" element={<TestReport />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;

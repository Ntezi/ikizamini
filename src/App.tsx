import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Results from './components/Results';

function App() {
    return (
        <Router>
            <div className="bg-gray-900 text-white py-4 shadow-lg">
                <nav className="container mx-auto flex justify-between">
                    <Link to="/" className="text-lg font-semibold hover:text-blue-300 transition duration-300">Home</Link>
                    <Link to="/quiz" className="text-lg font-semibold hover:text-blue-300 transition duration-300">Quiz</Link>
                    <Link to="/results" className="text-lg font-semibold hover:text-blue-300 transition duration-300">Results</Link>
                </nav>
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/results" element={<Results />} />
            </Routes>
        </Router>
    );
}


export default App;

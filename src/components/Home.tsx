import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Quiz!</h1>
                <p className="mb-6 text-lg text-gray-600">Test your knowledge across a variety of topics in our fun and challenging quiz.</p>
                <Link to="/quiz" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                    Start Quiz
                </Link>
            </div>
        </div>
    );
};



export default Home;

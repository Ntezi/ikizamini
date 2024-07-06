import {Link} from 'react-router-dom';
import Footer from "./Footer";

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow flex flex-col justify-center items-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Ikizamini!</h1>
                    <p className="mb-6 text-lg text-gray-600">This Ikizamini is here to help you practice and get ready for the theory exam for your driving test a.k.a Provisoir.</p>
                    <Link to="/quiz"
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                        Tangira Ikizamini
                    </Link>
                </div>
            </div>
            <Footer/>
        </div>
    );
};


export default Home;

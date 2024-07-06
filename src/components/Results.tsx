import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {resetQuiz} from '../features/quiz/quizSlice';
import {RootState} from "../app/store";
import Footer from "./Footer";

const Results = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {questions, score} = useSelector((state: RootState) => state.quiz);

    const handleRestart = () => {
        dispatch(resetQuiz());
        navigate('/quiz');
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-center">Ikizamini cyarangiye!</h1>
                <p className="text-xl text-center mt-2">Amanota yawe: {score} / {questions.length}</p>

                {/* Section for correct answers */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-green-600">Ibibazo wasubije neza</h2>
                    {questions.filter(q => q.userAnswer === q.answer).map((question, index) => (
                        <div key={index} className="mt-2">
                            <h3 className="text-lg font-bold">{question.question}</h3>
                            {question.image && (
                                <img src={`/images/${question.image}`} alt={`Question ${index + 1}`}
                                     className="my-4 max-w-full h-auto"/>
                            )}
                            <ul className="list-none">
                                {Object.entries(question.options).map(([key, value]) => (
                                    <li key={key}
                                        className={`pl-4 py-1 ${key === question.answer ? 'bg-green-200 font-bold' : ''}`}>
                                        {key.toUpperCase()}: {value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Section for incorrect answers */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-red-600">Ibibazo wasubije nabi</h2>
                    {questions.filter(q => q.userAnswer !== q.answer).map((question, index) => (
                        <div key={index} className="mt-2">
                            <h3 className="text-lg font-bold">{question.question}</h3>
                            {question.image && (
                                <img src={`/images/${question.image}`} alt={`Question ${index + 1}`}
                                     className="my-4 max-w-full h-auto"/>
                            )}
                            <ul className="list-none">
                                {Object.entries(question.options).map(([key, value]) => (
                                    <li key={key}
                                        className={`pl-4 py-1 ${key === question.answer ? 'bg-green-200 font-bold' : ''} ${key === question.userAnswer ? 'bg-red-200' : ''}`}>
                                        {key.toUpperCase()}: {value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleRestart}
                    className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Ongera utangire Ikizamini
                </button>
            </div>
            <Footer/>
        </div>
    );
};

export default Results;

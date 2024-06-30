import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {Question, resetQuiz} from '../features/quiz/quizSlice';

const Results = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { questions, score } = useSelector((state: any) => state.quiz);

    const handleRestart = () => {
        dispatch(resetQuiz());
        navigate('/quiz');
    };

    return (
        <div className="container mx-auto px-4 py-4">
            <h1 className="text-3xl font-bold text-center">Quiz Completed!</h1>
            <p className="text-xl text-center mt-2">Your Score: {score} / {questions.length}</p>

            {/* Section for correct answers */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold text-green-600">Correct Answers</h2>
                {questions.map((question: Question, index: number) => (
                    question.userAnswer === question.answer && (
                        <div key={index} className="mt-2">
                            <h3 className="text-lg font-bold">{question.question}</h3>
                            <ul className="list-none">
                                {Object.entries(question.options).map(([key, value]) => (
                                    <li key={key} className={`pl-4 py-1 ${key === question.answer ? 'bg-green-200 font-bold' : ''}`}>
                                        {key.toUpperCase()}: {value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                ))}
            </div>

            {/* Section for incorrect answers */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold text-red-600">Incorrect Answers</h2>
                {questions.map((question: Question, index: number) => (
                    question.userAnswer !== question.answer && (
                        <div key={index} className="mt-2">
                            <h3 className="text-lg font-bold">{question.question}</h3>
                            <ul className="list-none">
                                {Object.entries(question.options).map(([key, value]) => (
                                    <li key={key} className={`pl-4 py-1 ${key === question.answer ? 'bg-green-200 font-bold' : ''} ${key === question.userAnswer ? 'bg-red-200' : ''}`}>
                                        {key.toUpperCase()}: {value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                ))}
            </div>

            <button
                onClick={handleRestart}
                className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Restart Quiz
            </button>
        </div>
    );
};

export default Results;

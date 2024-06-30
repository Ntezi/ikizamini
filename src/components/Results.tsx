import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetQuiz } from '../features/quiz/quizSlice';

const Results = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { questions, score } = useSelector((state: any) => state.quiz);

    const handleRestart = () => {
        dispatch(resetQuiz());
        navigate('/quiz'); // Adjust as per your routing setup
    };

    return (
        <div className="container mx-auto px-4 py-4">
            <h1 className="text-3xl font-bold text-center">Quiz Completed!</h1>
            <p className="text-xl text-center mt-2">Your Score: {score} / {questions.length}</p>
            <div className="mt-4">
                <h2 className="text-2xl font-semibold">Review Incorrect Answers:</h2>
                <ul className="list-disc pl-5">
                    {questions.map((question: any, index: number) => (
                        question.userAnswer !== question.answer && (
                            <li key={index} className="text-red-600 mt-2">
                                {question.question} <br />
                                <strong>Your answer:</strong> {question.options[question.userAnswer]} <br />
                                <strong>Correct answer:</strong> {question.options[question.answer]}
                            </li>
                        )
                    ))}
                </ul>
            </div>
            <button
                onClick={handleRestart}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Restart Quiz
            </button>
        </div>
    );
};

export default Results;

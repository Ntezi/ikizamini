import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setQuestions, resetQuiz } from '../features/quiz/quizSlice';
import QuestionCard from './QuestionCard.tsx';
import questionsData from '../data/parsed_questions.json'; // Adjust path as needed

const Quiz = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { questions, currentQuestionIndex, score, completed } = useSelector((state: any) => state.quiz);

    useEffect(() => {
        // Randomize and set the first 20 questions
        const shuffledQuestions = questionsData.sort(() => 0.5 - Math.random()).slice(0, 20);
        dispatch(setQuestions(shuffledQuestions));
        dispatch(resetQuiz());
    }, [dispatch]);

    useEffect(() => {
        if (completed) {
            navigate('/results'); // Adjust as per your routing setup
        }
    }, [completed, navigate]);

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="container mx-auto px-4">
            <div className="mt-5 mb-3">
                <h1 className="text-2xl font-bold">Quiz Time!</h1>
                <p className="text-lg">Score: {score}</p>
            </div>
            {currentQuestion && (
                <QuestionCard
                    question={currentQuestion.question}
                    options={currentQuestion.options}
                />
            )}
        </div>
    );
};

export default Quiz;
import {useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {setQuestions, resetQuiz, decrementTimer} from '../features/quiz/quizSlice';
import QuestionCard from './QuestionCard';
import questionsData from '../data/parsed_questions.json';
import shuffleArray from "../utils/shuffle"; // Adjust path as needed

const Quiz = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { questions, currentQuestionIndex, score, completed, timeLeft } = useSelector((state: any) => state.quiz);
    const timerId = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Randomize and set the first 20 questions
        const shuffledQuestions = shuffleArray([...questionsData]).slice(0, 20);
        dispatch(setQuestions(shuffledQuestions));
        dispatch(resetQuiz());

        // Start the timer
        timerId.current = setInterval(() => {
            dispatch(decrementTimer());
        }, 1000);

        // Cleanup function to clear the interval
        return () => {
            if (timerId.current) clearInterval(timerId.current);
        };
    }, [dispatch]);

    useEffect(() => {
        if (completed) {
            if (timerId.current) clearInterval(timerId.current); // Ensure the timer is cleared when the quiz is completed
            navigate('/results');
        }
    }, [completed, navigate]);

    // Define currentQuestion based on the currentQuestionIndex
    const currentQuestion = questions[currentQuestionIndex];

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="container mx-auto px-4">
            <div className="mt-5 mb-3">
                <h1 className="text-2xl font-bold">Quiz Time!</h1>
                <p className="text-lg">Score: {score} | Time Left: {minutes}:{seconds.toString().padStart(2, '0')}</p>
            </div>
            {currentQuestion && (
                <QuestionCard
                    question={currentQuestion.question}
                    options={currentQuestion.options}
                    questionNumber={currentQuestionIndex + 1}
                    image={currentQuestion.image}
                />
            )}
        </div>
    );
};
export default Quiz;
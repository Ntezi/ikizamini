import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Question {
    question: string;
    options: Record<string, string>;
    answer: string;
    userAnswer?: string;
}

export interface QuizState {
    questions: Question[];
    currentQuestionIndex: number;
    score: number;
    completed: boolean;
    timeLeft: number;  // Timer state in seconds
}

const initialState: QuizState = {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    completed: false,
    timeLeft: 1200,  // 20 minutes in seconds
};

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setQuestions: (state, action: PayloadAction<any[]>) => {
            state.questions = action.payload;
        },
        answerQuestion: (state, action: PayloadAction<string>) => {
            const isCorrect = state.questions[state.currentQuestionIndex].answer === action.payload;
            if (isCorrect) state.score += 1;
            state.currentQuestionIndex += 1;
            if (state.currentQuestionIndex >= state.questions.length) {
                state.completed = true;
            }
        },
        resetQuiz: (state) => {
            state.currentQuestionIndex = 0;
            state.score = 0;
            state.completed = false;
            state.timeLeft = 1200;
        },
        decrementTimer: (state) => {
            if (state.timeLeft > 0) {
                state.timeLeft -= 1;
            } else {
                state.completed = true;  // End quiz when timer reaches 0
            }
        }
    },
});

export const { setQuestions, answerQuestion, resetQuiz, decrementTimer } = quizSlice.actions;
export default quizSlice.reducer;

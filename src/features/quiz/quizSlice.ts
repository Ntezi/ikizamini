import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface QuizState {
    questions: any[];
    currentQuestionIndex: number;
    score: number;
    completed: boolean;
}

const initialState: QuizState = {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    completed: false,
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
        },
    },
});

export const {setQuestions, answerQuestion, resetQuiz} = quizSlice.actions;
export default quizSlice.reducer;

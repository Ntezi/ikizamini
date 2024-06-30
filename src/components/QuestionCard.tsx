import React from 'react';
import { useDispatch } from 'react-redux';
import { answerQuestion } from '../features/quiz/quizSlice.ts';

interface OptionProps {
    option: string;
    label: string;
    onSelect: (selected: boolean) => void;
}

const Option: React.FC<OptionProps> = ({ option, label, onSelect }) => {
    return (
        <button
            className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => onSelect(true)}
        >
            {label}: {option}
        </button>
    );
};

interface QuestionCardProps {
    question: string;
    options: { [key: string]: string };
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, options }) => {
    const dispatch = useDispatch();

    const handleOptionSelect = (selectedOption: string) => {
        // Check if the selected option is correct
        dispatch(answerQuestion(selectedOption));
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow space-y-4">
            <h2 className="text-xl font-bold">{question}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(options).map(([key, value]) => (
                    <Option key={key} label={key.toUpperCase()} option={value} onSelect={() => handleOptionSelect(key)} />
                ))}
            </div>
        </div>
    );
};

export default QuestionCard;

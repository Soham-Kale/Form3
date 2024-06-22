import React from 'react';
import { useLocation } from 'react-router-dom';
import './Summary.css';

const SummaryPage = () => {
    const location = useLocation();
    const { state } = location;

    return (
        <div className="summary-container">
            <h2>Submitted Data</h2>
            <p>Full Name: {state.fullName}</p>
            <p>Email: {state.email}</p>
            <p>Survey Topic: {state.surveyTopic}</p>
            {state.surveyTopic === 'Technology' && (
                <>
                    <p>Favorite Programming Language: {state.favoriteProgrammingLanguage}</p>
                    <p>Years of Experience: {state.yearsOfExperience}</p>
                </>
            )}
            {state.surveyTopic === 'Health' && (
                <>
                    <p>Exercise Frequency: {state.exerciseFrequency}</p>
                    <p>Diet Preference: {state.dietPreference}</p>
                </>
            )}
            {state.surveyTopic === 'Education' && (
                <>
                    <p>Highest Qualification: {state.highestQualification}</p>
                    <p>Field of Study: {state.fieldOfStudy}</p>
                </>
            )}
            <p>Feedback: {state.feedback}</p>
            {state.additionalQuestions && (
                <div>
                    <h3>Additional Questions</h3>
                    {state.additionalQuestions.map((question, index) => (
                        <div key={index}>
                            <p>{question}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SummaryPage;

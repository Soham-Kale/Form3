import { useState } from 'react';

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const validate = (values) => {
        const errors = {};
        if (!values.fullName) errors.fullName = 'Full Name is required';
        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email address is invalid';
        }
        if (!values.surveyTopic) errors.surveyTopic = 'Survey Topic is required';
        if (values.surveyTopic === 'Technology') {
            if (!values.favoriteProgrammingLanguage) errors.favoriteProgrammingLanguage = 'Favorite Programming Language is required';
            if (!values.yearsOfExperience) {
                errors.yearsOfExperience = 'Years of Experience is required';
            } else if (isNaN(values.yearsOfExperience) || values.yearsOfExperience <= 0) {
                errors.yearsOfExperience = 'Years of Experience must be a number greater than 0';
            }
        }
        if (values.surveyTopic === 'Health') {
            if (!values.exerciseFrequency) errors.exerciseFrequency = 'Exercise Frequency is required';
            if (!values.dietPreference) errors.dietPreference = 'Diet Preference is required';
        }
        if (values.surveyTopic === 'Education') {
            if (!values.highestQualification) errors.highestQualification = 'Highest Qualification is required';
            if (!values.fieldOfStudy) errors.fieldOfStudy = 'Field of Study is required';
        }
        if (!values.feedback || values.feedback.length < 50) {
            errors.feedback = 'Feedback is required and must be at least 50 characters';
        }
        return errors;
    };

    const handleSubmit = (callback) => (e) => {
        e.preventDefault();
        const validationErrors = validate(values);
        if (Object.keys(validationErrors).length === 0) {
            callback();
        } else {
            setErrors(validationErrors);
        }
    };

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
    };
};

export default useForm;

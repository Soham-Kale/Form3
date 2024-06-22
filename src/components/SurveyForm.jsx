import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useForm from '../hook/useForm';
import './Form.css';

const SurveyForm = () => {
    const { values, errors, handleChange, handleSubmit } = useForm({
        fullName: '',
        email: '',
        surveyTopic: '',
        favoriteProgrammingLanguage: '',
        yearsOfExperience: '',
        exerciseFrequency: '',
        dietPreference: '',
        highestQualification: '',
        fieldOfStudy: '',
        feedback: '',
    });

    const [additionalQuestions, setAdditionalQuestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (values.surveyTopic) {
            axios.get(`https://api.example.com/questions?topic=${values.surveyTopic}`)
                .then(response => {
                    setAdditionalQuestions(response.data);
                })
                .catch(error => {
                    console.error("Error fetching additional questions", error);
                });
        }
    }, [values.surveyTopic]);

    const onSubmit = () => {
        navigate('/summary', { state: { ...values, additionalQuestions } });
    };

    return (
        <div className='firstDiv'>
            <h1 className='api'>Dynamic Form with API integration</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>
                        Full Name:
                        <input type="text" name="fullName" value={values.fullName} onChange={handleChange} />
                        {errors.fullName && <p>{errors.fullName}</p>}
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input type="email" name="email" value={values.email} onChange={handleChange} />
                        {errors.email && <p>{errors.email}</p>}
                    </label>
                </div>
                <div>
                    <label>
                        Survey Topic:
                        <select name="surveyTopic" value={values.surveyTopic} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Technology">Technology</option>
                            <option value="Health">Health</option>
                            <option value="Education">Education</option>
                        </select>
                        {errors.surveyTopic && <p>{errors.surveyTopic}</p>}
                    </label>
                </div>
                {values.surveyTopic === 'Technology' && (
                    <>
                        <div>
                            <label>
                                Favorite Programming Language:
                                <select name="favoriteProgrammingLanguage" value={values.favoriteProgrammingLanguage} onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option value="JavaScript">JavaScript</option>
                                    <option value="Python">Python</option>
                                    <option value="Java">Java</option>
                                    <option value="C#">C#</option>
                                </select>
                                {errors.favoriteProgrammingLanguage && <p>{errors.favoriteProgrammingLanguage}</p>}
                            </label>
                        </div>
                        <div>
                            <label>
                                Years of Experience:
                                <input type="number" name="yearsOfExperience" value={values.yearsOfExperience} onChange={handleChange} />
                                {errors.yearsOfExperience && <p>{errors.yearsOfExperience}</p>}
                            </label>
                        </div>
                    </>
                )}
                {values.surveyTopic === 'Health' && (
                    <>
                        <div>
                            <label>
                                Exercise Frequency:
                                <select name="exerciseFrequency" value={values.exerciseFrequency} onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Rarely">Rarely</option>
                                </select>
                                {errors.exerciseFrequency && <p>{errors.exerciseFrequency}</p>}
                            </label>
                        </div>
                        <div>
                            <label>
                                Diet Preference:
                                <select name="dietPreference" value={values.dietPreference} onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option value="Vegetarian">Vegetarian</option>
                                    <option value="Vegan">Vegan</option>
                                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                                </select>
                                {errors.dietPreference && <p>{errors.dietPreference}</p>}
                            </label>
                        </div>
                    </>
                )}
                {values.surveyTopic === 'Education' && (
                    <>
                        <div>
                            <label>
                                Highest Qualification:
                                <select name="highestQualification" value={values.highestQualification} onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option value="High School">High School</option>
                                    <option value="Bachelor's">Bachelor's</option>
                                    <option value="Master's">Master's</option>
                                    <option value="PhD">PhD</option>
                                </select>
                                {errors.highestQualification && <p>{errors.highestQualification}</p>}
                            </label>
                        </div>
                        <div>
                            <label>
                                Field of Study:
                                <input type="text" name="fieldOfStudy" value={values.fieldOfStudy} onChange={handleChange} />
                                {errors.fieldOfStudy && <p>{errors.fieldOfStudy}</p>}
                            </label>
                        </div>
                    </>
                )}
                <div>
                    <label>
                        Feedback:
                        <textarea name="feedback" className='feedback' value={values.feedback} onChange={handleChange} />
                        {errors.feedback && <p>{errors.feedback}</p>}
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SurveyForm;

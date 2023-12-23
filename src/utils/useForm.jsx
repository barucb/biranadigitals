"use client"
import { useState } from 'react';

const useForm = (initialState, validate) => {
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        // Reset the error message when the user starts typing
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate(formData);

        if (Object.keys(validationErrors).length > 0) {
            // If there are validation errors, update the state with the error messages
            setErrors(validationErrors);
            alert('Please fill in all required fields and ensure phone is a valid number.');
            return;
        }

        try {
            const response = await fetch('/api/formSubmission', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ formData }),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Form submitted successfully:', responseData);
                // Handle success, such as displaying a success message or redirecting
            } else {
                console.error('Error submitting form:', response.statusText);
                // Handle error, such as displaying an error message to the user
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle unexpected errors
        }
    };

    return {
        formData,
        errors,
        handleChange,
        handleSubmit,
    };
};

export default useForm;

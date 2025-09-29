import React, { useState } from 'react';
import Title from './Title';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Submit to Getform
            const response = await fetch('https://getform.io/f/bmdyrnga', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Clear the form
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });
                
                // Show success message
                setIsSubmitted(true);
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    setIsSubmitted(false);
                }, 5000);
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex flex-col mb-10 mx-auto'>
            <div className="flex justify-center items-center">
                <form 
                    onSubmit={handleSubmit}
                    className="flex flex-col w-full md:w-10/12"
                >
                    

                    <Title>Contact</Title>

                    {/* Success Message */}
                    {isSubmitted && (
                        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md animate-fade-in">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Message sent successfully! I'll get back to you soon.
                            </div>
                        </div>
                    )}

                    <input 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                        required
                        className="p-2 bg-transparent border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
                    />
                    <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="JohnDoe@mail.com"
                        required
                        className="my-2 p-2 bg-transparent border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Your message"
                        rows="10"
                        required
                        className='p-2 mb-4 bg-transparent border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-400'
                    />
                    
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`text-center inline-block px-8 py-3 w-max text-base font-medium rounded-md 
                        text-white bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-md transition-all duration-200 
                        ${isLoading 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:scale-105 hover:shadow-lg'
                        }`}
                    >
                        {isLoading ? (
                            <div className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                            </div>
                        ) : (
                            'Send Message!'
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Contact;
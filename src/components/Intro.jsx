import React from 'react';


function Intro() {
    return (
        <div className="flex items-center
            justify-center flex-col text-center pt-20 pb-6">
                
                <h1 className="text-3xl md:text-5xl mb-1 md:mb-3 font-bold">
                     Pushya Jain
                </h1>
                <p className="text-base md:text-xl mb-3 font-medium">
                    Data scientist & ML researcher
                </p>
            
                <div className="flex flex-center items-center">
                    <p className="text-base max-w-xl mb-6 mt-6 mr-10 ml-10 font-medium">
                        I am a 4th-year BSc student majoring in computer science and statistics
                        with a minor in data science (at UBC). <br /> <br />
                        I have lot of passion for developing my analytical and quantitative skills.
                        I have provided links to my social media below if you want to contact me. <br /> <br/>
                        Here is a cool visualisations for you to keep you entertained, that 
                        I found during my learning journey (especially in the realm of data science) 😊
                    </p>
                    <img
                        src="/assets/prof_pic.jpg"
                        alt="Profile picture"
                        className="rounded-lg shadow-md mr-10 ml-10"
                        style={{ maxHeight: '300px', height: '200px', width: 'auto' }}
                    />
                </div>
                
        </div>
    )
}

export default Intro;
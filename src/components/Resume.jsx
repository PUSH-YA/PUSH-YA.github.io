import React from 'react';

const Resume = () => {

    const fileId = "1bnL-oTPta38X2KC_G3W96tqFA6B6Yvg3";
    const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
    const viewUrl = `https://drive.google.com/file/d/${fileId}/view`;

    return (
        <div className="resume-container p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">My Resume</h2>
            <div className="max-w-4xl mx-auto">
                <iframe
                    src={embedUrl}
                    width="100%"
                    height="700px"
                    style={{ border: 'none' }}
                    title="Resume PDF"
                    allow="autoplay"
                />
                <div className="text-center mt-4">
                    <a 
                        href={viewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-violet-400 dark:bg-blue-400 text-white px-6 py-2 rounded-md hover:bg-violet-500 dark:hover:bg-blue-500 transition-colors duration-200"
                    >
                        Open in new tab
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Resume;

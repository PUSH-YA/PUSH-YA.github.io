import React from 'react';
import portfolio from '../data/Portfolio'
import PortfolioItem from './PortfolioItem';
import Title from './Title'

function Portfolio() {
    return (
        <div className='flex flex-col md:flex-row justify-center pl-10 md:pl-0 my-5'>
            <div className='w-full md:w-10/12 md:pl-5'>
                <Title>Projects</Title>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-5">
                {portfolio.map(project => 
                    <PortfolioItem 
                        imgUrl={project.imgUrl}
                        title={project.title}
                        stack={project.stack}
                        link={project.link}
                    />
                )}
                </div>
            </div>
        </div>
    )
}

export default Portfolio;
import React, { useState, useEffect } from 'react';
import getTimelineData, { staticTimelineData } from '../data/Timeline';
import TimelineItem from './TimelineItem';
import Title from './Title';

function Timeline() {
  // use setloading and settimelinedata to switch between static and dynamic data
  // start with static timeline data
  const [timelineData, setTimelineData] = useState(staticTimelineData); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getTimelineData();
        
        // make sure there is some array 
        if (Array.isArray(data) && data.length > 0) {
          setTimelineData(data);
        }
      } catch (error) {
        console.error('Error loading timeline:', error);
        // use static data for fallback
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex flex-col md:flex-row justify-center px-10 my-5'>
      <div className='w-full md:w-10/12'>
        <Title>Timeline {loading && <span className="text-sm opacity-60">(Loading...)</span>}</Title>
        {timelineData.map((item, index) => (
          <TimelineItem
            key={index} // "key prop" for each
            year={item.year}
            title={item.title}
            duration={item.duration}
            details={item.details}
          />
        ))}
      </div>
    </div>
  );
}

export default Timeline;
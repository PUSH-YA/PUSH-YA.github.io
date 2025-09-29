// Function to fetch timeline data from GitHub profile README
async function fetchTimelineFromGitHub(username = 'PUSH-YA') {
  try {
    // Fix: Use correct GitHub API endpoint
    const response = await fetch(`https://api.github.com/repos/${username}/${username}/contents/README.md`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    const readmeContent = atob(data.content);
    
    // look for "Timeline:" (with colon) -- debugged an issue
    const timelineMatch = readmeContent.match(/##\s*Timeline:(.*?)(?=##|$)/s);
    if (!timelineMatch) {
      console.log('No Timeline section found');
      return [];
    }
    
    const timelineSection = timelineMatch[1];
    
    // get bulletpoints
    const bulletPoints = timelineSection.match(/^-\s+(.+)$/gm) || [];
    
    return bulletPoints.map(point => {
      const cleanPoint = point.replace(/^-\s+/, '');
      
      // parsing format: "title, duration (year): details"
      const match = cleanPoint.match(/^(.+?),\s+(.+?)\s+\((\d{4})\):\s+(.+)$/);
      
      if (match) {
        const [, title, duration, year, details] = match;
        return {
          year,
          title: title.trim(),
          duration: duration.trim(),
          details: details.trim()
        };
      }
      console.log('Could not parse:', cleanPoint);
      return null;
    }).filter(Boolean);
    
  } catch (error) {
    console.error('Error fetching timeline:', error);
    return [];
  }
}

// fallback on static data 
const staticTimelineData = [
  {
    year: '2025',
    title: 'ML research @ Huawei',
    duration: 'present',
    details: 'Audio Separation using ResUNet and CLAP encoders'
  },
  {
    year: '2024',
    title: 'ML Research Assistant @ UBC Sauder',
    duration: '8 months',
    details: 'Used ML techniques for similarity search and created an ownership timeline of pharmaceutical drugs'
  },
  {
    year: '2024',
    title: 'Data engineer / assistant @ FNHA',
    duration: '4 months',
    details: 'ETL w/ SQL, PowerBI dashboards'
  }
];

// Main function to get timeline data
const getTimelineData = async () => {
  try {
    const dynamicData = await fetchTimelineFromGitHub();
    
    if (Array.isArray(dynamicData) && dynamicData.length > 0) {
      return dynamicData;
    }
    
    // for debugging 
    console.log('Using fallback static data for timeline');
    return staticTimelineData;
    
  } catch (error) {
    console.error('Error in getTimelineData:', error);
    return staticTimelineData;
  }
};

export default getTimelineData;
export { staticTimelineData };
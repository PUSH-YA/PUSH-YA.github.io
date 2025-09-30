
// Cache configuration
const CACHE_KEY = 'github_projects_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Check if cached data is still valid
function isCacheValid(timestamp) {
    return Date.now() - timestamp < CACHE_DURATION;
}

// Get cached data from localStorage
function getCachedData() {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (isCacheValid(timestamp)) {
                console.log('Using cached GitHub projects data');
                return data;
            }
        }
    } catch (error) {
        console.error('Error reading cache:', error);
    }
    return null;
}

// save data to client's localStorage so refreshing does not 
function setCachedData(data) {
    try {
        const cacheObject = {
            data: data,
            timestamp: Date.now()
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObject));
        console.log('GitHub projects data cached successfully');
    } catch (error) {
        console.error('Error saving to cache:', error);
    }
}

async function fetchStarredProjects() {
    // Check cache first
    const cachedData = getCachedData();
    if (cachedData) {
        return cachedData;
    }

    console.log('Fetching fresh GitHub projects data...');
    
    try {
        const response = await fetch('https://api.github.com/users/PUSH-YA/repos?sort=updated&per_page=100');
        const repos = await response.json();
        
        // if repos is an array and response was successful
        if (!Array.isArray(repos)) {
            console.error('GitHub API response is not an array:', repos);
            return [];
        }
        
        // can't filter for pinned so currently getting all starred projects
        const pinnedRepos = await Promise.all(
            repos
            .filter(repo => repo.stargazers_count > 0)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6)
            .map(async (repo) => {
                let imgUrl = repo.owner.avatar_url; // fallback
                
                try {
                // readme w/ `![](....)` for `...` as the img path 
                const readmeResponse = await fetch(`https://api.github.com/repos/${repo.full_name}/readme`);
                if (readmeResponse.ok) {
                    const readmeData = await readmeResponse.json();
                    const readmeContent = atob(readmeData.content);
                    
                    // Extract first image from README
                    const imgRegex = /!\[.*?\]\((.*?)\)/;
                    const match = readmeContent.match(imgRegex);
                    if (match && match[1]) {
                    imgUrl = match[1];
                    }
                }
                } catch (error) {
                console.error(`Error fetching README for ${repo.name}:`, error);
                }
                
                return {
                title: repo.name.replace(/-/g, ' '),
                imgUrl: imgUrl,
                stack: repo.language ? [repo.language] : ['Python'],
                link: repo.html_url
                };
            })
        );
        
        // Cache the successful result
        setCachedData(pinnedRepos);
        
        return pinnedRepos;
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        
        // Try to return cached data even if it's expired as fallback
        const fallbackCache = getCachedData();
        if (fallbackCache) {
            console.log('Using expired cache as fallback due to API error');
            return fallbackCache;
        }
        
        return [];
    }
}

// Export the function, not the awaited result
export default fetchStarredProjects;
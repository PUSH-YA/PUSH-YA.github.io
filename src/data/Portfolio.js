
async function fetchStarredProjects() {
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
        
        return pinnedRepos;
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        return [];
    }
}

export default await fetchStarredProjects();
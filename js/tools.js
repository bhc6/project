// Function to fetch and parse Excel data
async function fetchToolsData() {
    try {
        const response = await fetch('/js/tools_data.json');
        if (!response.ok) {
            throw new Error('Failed to fetch tools data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading tools data:', error);
        return [];
    }
}

// Function to create a tool card
function createToolCard(tool) {
    return `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-custom hover:shadow-xl animate-fade-in">
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">${tool.name}</h3>
                <span class="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">${tool.category}</span>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">${tool.description}</p>
            <a href="${tool.url}" target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center text-primary hover:text-primary/80 transition-custom">
                Try it out
                <i class="fas fa-external-link-alt ml-2"></i>
            </a>
        </div>
    `;
}

// Function to filter tools based on search query
function filterTools(tools, query) {
    query = query.toLowerCase();
    return tools.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query)
    );
}

// Function to render all tool cards
async function renderToolCards(searchQuery = '') {
    const toolsContainer = document.getElementById('tools-container');
    const tools = await fetchToolsData();
    const filteredTools = searchQuery ? filterTools(tools, searchQuery) : tools;
    
    toolsContainer.innerHTML = filteredTools.map(tool => createToolCard(tool)).join('');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderToolCards();

    // Add search functionality
    const searchInput = document.getElementById('search-input');
    let debounceTimeout;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            renderToolCards(e.target.value);
        }, 300);
    });
});
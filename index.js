
let selectedArticleUrl = '';

document.getElementById('fetch-news').addEventListener('click', async () => {
    try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=97eb492c3c854062af467f40a2d97e7f');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const articles = data.articles;

        const content = document.getElementById('content');
        content.innerHTML = '<h1 class="text-xl font-bold">Latest News</h1><div id="news-list"></div>';
        
        const newsList = document.getElementById('news-list');
        newsList.innerHTML = articles.map((article) =>
            `<div class="news-item" data-url="${article.url}" data-title="${article.title}" data-description="${article.description}">
                <h2 class="text-lg font-semibold">${article.title}</h2>
                <p>${article.description}</p>
            </div>`
        ).join('');

        // Enable other buttons
        document.getElementById('view-blog').disabled = false;
        document.getElementById('tweet').disabled = false;

        // Add event listeners for the news items
        const newsItems = document.querySelectorAll('.news-item');
        newsItems.forEach(item => {
            item.addEventListener('click', () => {
                selectedArticleUrl = item.getAttribute('data-url');
                // Optionally, highlight the selected item
                newsItems.forEach(i => i.classList.remove('bg-gray-200'));
                item.classList.add('bg-gray-200');
            });
        });

    } catch (error) {
        console.error('Error fetching news:', error);
        const content = document.getElementById('content');
        content.innerHTML = '<p class="text-red-500">Failed to load news. Check the console for more details.</p>';
    }
});

document.getElementById('view-blog').addEventListener('click', () => {
    if (selectedArticleUrl) {
        window.open(selectedArticleUrl, '_blank');
    } else {
        alert('Please select a news article first.');
    }
}); 

document.getElementById('tweet').addEventListener('click', () => {
    if (selectedArticleUrl) {
        const title = encodeURIComponent(document.querySelector('.news-item.bg-gray-200')?.getAttribute('data-title') || '');
        const tweetUrl = `https://twitter.com/intent/tweet?text=${title}&url=${encodeURIComponent(selectedArticleUrl)}`;
        window.open(tweetUrl, '_blank');
    } else {
        alert('Please select a news article first.');
    }
});

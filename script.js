async function getRecommendations() {
    const book = document.getElementById("bookInput").value;
    const apiKey = "sdpgiuhjs;nfgbhvgtcr6v7hubvcft7d5x646vgb7tsdpgiuhjs;nfgbhvgtcr6v7hubvcft7d5x646vgb7tsdpgiuhjs;nfgbhvgtcr6v7hubvcft7d5x646vgb7tsdpgiuhjs;nfgbhvgtcr6v7hubvcft7d5x646vgb7tfupihgpsjfnghosfhguidfjs"; // Make sure this matches your backend key
    const url = `https://book-api-kknn.onrender.com/recommend?books=${encodeURIComponent(book)}&access_key=${apiKey}`;
    
    const recommendationsList = document.getElementById("recommendations");

    try {
        
        recommendationsList.innerHTML = "<li>Loading...</li>";

        const response = await fetch(url);
        const data = await response.json();

        if (data.recommendations) {
            recommendationsList.innerHTML = "";
            data.recommendations.forEach(title => {
                const li = document.createElement("li");
                li.textContent = title;
                recommendationsList.appendChild(li);
            });
        } else {
            recommendationsList.innerHTML = "<li>No recommendations found.</li>";
        }
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        recommendationsList.innerHTML = "<li>There was an error while loading the recommendations.\nPlease try again."
    }
}
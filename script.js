var inputboxes_list = []
var inputboxes_created = -1

async function getRecommendations() {
    console.log("Fetching recommendations")

    const recommendationsList = document.getElementById("recommendations");
    recommendationsList.inertHTML = "";
    recommendationsList.appendChild(document.createElement("li")).textContent = "Loading...";

    const book = getBooks()
    const apiKey = "sdpgiuhjs;nfgbhvgtcr6v7hubvcft7d5x646vgb7tsdpgiuhjs;nfgbhvgtcr6v7hubvcft7d5x646vgb7tsdpgiuhjs;nfgbhvgtcr6v7hubvcft7d5x646vgb7tsdpgiuhjs;nfgbhvgtcr6v7hubvcft7d5x646vgb7tfupihgpsjfnghosfhguidfjs";
    const url = `https://book-api-kknn.onrender.com/recommend?books=${encodeURIComponent(book)}&access_key=${apiKey}`;
    

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.recommendations) {
            console.log("Recommendations found:", data.recommendations);
            recommendationsList.innerHTML = "";
            data.recommendations.forEach(title => {
                const li = document.createElement("li");
                li.textContent = title;
                recommendationsList.appendChild(li);
            });
        } else {
            console.error("No recommendations found.");
            recommendationsList.innerHTML = "<li>No recommendations found.</li>";
        }
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        recommendationsList.innerHTML = "<li>There was an error while loading the recommendations.\nPlease try again."
    }
}

function getBooks() {
    try {
        var output = ""
        inputboxes_list.forEach( inputbox => {
            input_elem = inputbox.children[0]
            output += input_elem.value + "\n"
        })
        return(output)
    } catch (error) {
        console.error("Error fetching user input:", error)
    }
}

function addField() {
    const input_div = document.getElementById("input_div");

    inputboxes_created ++

    new_input = getNewInput()

    input_div.appendChild(new_input);

    inputboxes_list.push(new_input);

}

function removeinputbox(id) {
    const inputbox = inputboxes_list[id]
    if (inputbox != undefined) {
        dead_id = inputbox.id
        inputbox.remove()
        inputboxes_list.splice(id, 1)
        inputboxes_created --
        inputboxes_list.forEach( inputbox => {
            if (inputbox.id) {
                if (inputbox.id > dead_id) {
                    inputbox.id --
                }
            }
        })
    }
}

function getNewInput() {
    const container = document.createElement("div") // Container for inputbox and button
    const inputbox = document.createElement("input") // Input box
    const button = document.createElement("button") // Button to remove inputbox
    const button_img = document.createElement("img") // Image for button

    // Input Box Setup
    inputbox.type = "text"
    inputbox.placeholder = "Enter a book title"

    // Button Image Setup
    button_img.src = "images/cross-icon.svg"
    button_img.alt = "X"
    button_img.className = "icon"

    // Button Setup
    button.appendChild(button_img)
    button.onclick = () => removeinputbox(container.id)

    
    // Container Setup
    container.id = inputboxes_created
    container.className = "inputcontainer"
    container.appendChild(inputbox)
    container.appendChild(button)

    return(container)
}
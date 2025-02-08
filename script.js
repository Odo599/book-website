var boxes_list = []
var boxes_created = -1

async function getRecommendations() {
    console.log("Fetching recommendations")
    const book = getBooks()
    const apiKey = "sdpgiuhjs;nfgbhvgtcr6v7hubvcft7d5x646vgb7tsdpgiuhjs;nfgbhvgtcr6v7hubvcft7d5x646vgb7tsdpgiuhjs;nfgbhvgtcr6v7hubvcft7d5x646vgb7tsdpgiuhjs;nfgbhvgtcr6v7hubvcft7d5x646vgb7tfupihgpsjfnghosfhguidfjs";
    const url = `https://book-api-kknn.onrender.com/recommend?books=${encodeURIComponent(book)}&access_key=${apiKey}`;
    
    const recommendationsList = document.getElementById("recommendations");

    try {
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

function getBooks() {
    try {
        var output = ""
        boxes_list.forEach( box => {
            input_elem = box.children[0]
            output += input_elem.value + "\n"
        })
        return(output)
    } catch (error) {
        console.error("Error fetching user input:", error)
    }
}

function addField() {
    const input_div = document.getElementById("input_div");

    boxes_created ++

    new_input = getNewInput()

    input_div.appendChild(new_input);

    boxes_list.push(new_input);

}

function removeBox(id) {
    const box = boxes_list[id]
    if (box != undefined) {
        dead_id = box.id
        box.remove()
        boxes_list.splice(id, 1)
        boxes_created --
        boxes_list.forEach( box => {
            if (box.id) {
                if (box.id > dead_id) {
                    box.id --
                }
            }
        })
    }
}

function getNewInput() {
    const div = document.createElement("div")
    const box = document.createElement("input")
    const button = document.createElement("button")

    div.id = boxes_created
    button.innerHTML = "X"
    button.onclick = () => removeBox(div.id)

    div.appendChild(box)
    div.appendChild(button)

    return(div)
}
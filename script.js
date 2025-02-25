const input_boxes = {}

function init() {
    input_boxes.inputboxes_list = []
    input_boxes.inputboxes_created = -1

    addField(true, false)
}

/* Ran when get recommendations button is clicked */
async function getRecommendations() {
    cleanUserInputs()
    
    var input_exists = checkForInputExistence()
    if (!input_exists) {
        console.log("No input detected")
        setOutputToText("Please enter a book title.")
        addField()
        cleanUserInputs()
        return
    }

    console.log("Fetching recommendations")

    setOutputToText("Loading recommendations...")

    const book = getBooks()
    const url = `https://swift-joline-book-recommendations-d151df8c.koyeb.app/recommend?books=${encodeURIComponent(book)}`;
    

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.recommendations) {
            console.log("Recommendations found:", data.recommendations);
            if (data.recommendations == "Error: Could not generate recommendations") {
                setOutputToText("Error fetching recommendations.");
            } else {
                setOutputToList(data.recommendations);
            }
        } else {
            console.error("No recommendations found.");
            setOutputToText("No recommendations found.");
        }
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        setOutputToText("Error fetching recommendations.");
    }
}

/* Sets the output to a list of text */
function setOutputToList (output) {
    const recommendationsList = document.getElementById("recommendations");

    recommendationsList.innerHTML = "";
    output.forEach(title => {
        const div = document.createElement("div");
        div.textContent = title;
        div.className = "card"
        recommendationsList.appendChild(div);
    });
}

/* Sets the output to a single text */
function setOutputToText (output) {
    const recommendationsList = document.getElementById("recommendations");
    recommendationsList.textContent  = "";
    recommendationsList.appendChild(document.createElement("p")).textContent = output;
}

/* Gets the user input */
function getBooks() {
    try {
        var output = ""
        input_boxes.inputboxes_list.forEach( inputbox => {
            input_elem = inputbox.children[0]
            output += input_elem.value + ","
        })
        return(output)
    } catch (error) {
        console.error("Error fetching user input:", error)
    }
}

/* Adds a new input field */
function addField(override = false, fadein = true) {
    if ((checkForInputExistence() && !checkForBlankFields()) || override) {
        cleanUserInputs()

        const input_div = document.getElementById("input_div");

        input_boxes.inputboxes_created ++

        new_input = getNewInput()
        if (fadein) {
            new_input.className += " fade-in"
        }
        new_input.addEventListener("animationend", () => new_input.classList.remove("fade-in"))

        input_div.appendChild(new_input);

        input_boxes.inputboxes_list.push(new_input);

        updateCheckboxes(fadein)
    }
}

function deleteInputBox(id) {
    const inputbox = input_boxes.inputboxes_list[id]
    if (inputbox != undefined) {
        dead_id = inputbox.id
        inputbox.remove()
        input_boxes.inputboxes_list.splice(id, 1)
        input_boxes.inputboxes_created --
        input_boxes.inputboxes_list.forEach( inputbox => {
            if (inputbox.id) {
                if (inputbox.id > dead_id) {
                    inputbox.id --
                }
            }
        })
        updateCheckboxes()
    }
}

/* Starts input field removal */
function removeinputbox(id) {
    const inputbox = input_boxes.inputboxes_list[id]

    inputbox.className += " fade-out"
    inputbox.addEventListener("animationend", () => deleteInputBox(id))
}

/* Gets node for a new input field */
function getNewInput() {
    const container = document.createElement("div") // Container for inputbox and button
    const inputbox = document.createElement("input") // Input box
    const button = document.createElement("button") // Button to remove inputbox
    const button_img = document.createElement("img") // Image for button

    // Input Box Setup
    inputbox.name = "text"
    inputbox.placeholder = "Enter a book title"

    // Button Image Setup
    button_img.src = "images/cross-icon.svg"
    button_img.alt = "X"
    button_img.className = "icon"

    // Button Setup
    button.appendChild(button_img)
    button.className = "button"
    button.onclick = () => removeinputbox(container.id)

    
    // Container Setup
    container.id = input_boxes.inputboxes_created
    container.className = "inputcontainer"
    container.appendChild(inputbox)
    container.appendChild(button)

    return(container)
}

/* Disables the remove button */
function disableRemoveButton(fadeout = true) {
    input_boxes.inputboxes_list.forEach( inputbox => {
        if (fadeout) {
            inputbox.children[1].className = "fade-out button"
            inputbox.children[1].addEventListener("animationend", () => inputbox.children[1].className = "hidden")
        } else {
            inputbox.children[1].className = "hidden"
        }
        
        inputbox.children[1].disabled = true
        
    })
}

/* Enables the remove button */
function enableRemoveButton() {
    input_boxes.inputboxes_list.forEach( inputbox => {
        if (inputbox.children[1].disabled) {
            inputbox.children[1].className = "button fade-in"
            inputbox.children[1].disabled = false
        }
    })
}

/* Updates the remove buttons */
function updateCheckboxes(fade = true) {
    if (input_boxes.inputboxes_created == 0) {
        disableRemoveButton(fade)
    } else {
        enableRemoveButton()
    }
}

/* Removes unnecessary input fields */
function cleanUserInputs() {
    if (input_boxes.inputboxes_list.length > 1) {
        input_boxes.inputboxes_list.forEach( inputbox => {
            if (inputbox.children[0].value == "") {
                removeinputbox(inputbox.id)
            }
        })
    }  
}

/* Checks if any input exists */
function checkForInputExistence() {
    var input_exists = false
    input_boxes.inputboxes_list.forEach( inputbox => {
        if (inputbox.children[0].value != "") {
            input_exists = true
        }
    })
    return input_exists
}

/* Check if there are blank fields */
function checkForBlankFields() {
    var blank_exists = false
    input_boxes.inputboxes_list.forEach( inputbox => {
        if (inputbox.children[0].value == "") {
            blank_exists = true
        }
    })
    return blank_exists
}
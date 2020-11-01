// Get all collections
let coll = document.getElementsByClassName("collapsible")
let collections
chrome.storage.sync.get("collections", (val) => collections = val)

//let collections = []

for (let i = 0; i < coll.length; i++) {
    // Add listeners for the buttons
    coll[i].addEventListener("click", () => {

        coll[i].classList.toggle("active")
        content = coll[i].nextElementSibling
        console.log(coll[i].nextElementSibling)
        if (content.style.display === "block") {
            content.style.display = "none"
        } else {
            content.style.display = "block"
        }

        // If it's the collections then we need to add in existing collections
        if (content.id === "Collections") {
            let newText = ""
            if (collections.length) for (collection of collections) {
                newText += collection.name
            }
            if (newText == "") {
                newText = "No Collections"
            }
            // Add in the new button code
            newText += "<br><button id= newCollection class=collapsible> + New Collection </button><div class=content><form id=newCollectionForm method=post><input type=text id=name name=name value = \"New Collection\"><br><input type=submit id=submit name=submit></form></div>"
            content.innerHTML = newText
            newCollection = document.getElementById("newCollection")
            // Re-Add listener
            newCollection.addEventListener("click", () => {
                newCollection.classList.toggle("active")
                content = newCollection.nextElementSibling
                //console.log(newCollection.nextElementSibling)
                if (content.style.display === "block") {
                    content.style.display = "none"
                } else {
                    content.style.display = "block"
                }
            })
        }
        // Add Submit listener
        let newCollectionForm = document.getElementById("newCollectionForm")
        newCollectionForm.addEventListener("submit", (event) => {
            // Sort by numbers at second to last position
            existing = collections.sort((a, b) => pareseInt(b.name[-2]) - parseInt(a.name[-2]))
            // Find the newest unnamed collection
            lastNew = existing.find(val => val.name.includes("New Collection"))
            tabs = []
            // Add selected tabs
            for (let i = 1; i < event.target.length; i++) {
                tabs.push({ name: event.target[i].name, url: event.target[i].id })
            }
            collection = {
                name: event.target[0].value ? event.target[0] != "New Collection" : `New Collection${lastNew ? ` (${parseInt(lastNew[-2]) == NaN ? "1" : parseInt(lastNew[-2] + 1)})` : ""}`,
                tabs: tabs
            }
            // Stop it reloading
            return false;

        }
        )
    })
}
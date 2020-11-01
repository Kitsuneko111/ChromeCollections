let coll = document.getElementsByClassName("collapsible")
let collections
chrome.storage.sync.get("collections", (val) => collections = val)

//let collections = []

for( let i = 0; i<coll.length;i++){
    coll[i].addEventListener("click", () => {
        
        coll[i].classList.toggle("active")
        content = coll[i].nextElementSibling
        console.log(coll[i].nextElementSibling)
        if(content.style.display ==="block"){
            content.style.display = "none"
        } else {
            content.style.display = "block"
        }
        if(content.id === "Collections"){
            let newText = ""
            if(collections.length) for(collection of collections){
                newText += collection.name
            }
            if(newText == ""){
                newText = "No Collections"
            }
            newText += "<br><button id= newCollection class=collapsible> + New Collection </button><div class=content><form id=newCollectionForm method=post><input type=text id=name name=name value = \"New Collection\"><br><input type=submit id=submit name=submit></form></div>"
            content.innerHTML = newText
            newCollection = document.getElementById("newCollection")
            newCollection.addEventListener("click", () => {
            newCollection.classList.toggle("active")
            content = newCollection.nextElementSibling
            //console.log(newCollection.nextElementSibling)
            if(content.style.display ==="block"){
                content.style.display = "none"
            } else {
                content.style.display = "block"
            }
                })
            }
            let newCollectionForm = document.getElementById("newCollectionForm")
newCollectionForm.addEventListener("submit", (event) => {
    existing = collections.sort((a,b) => pareseInt(b.name[-2]) - parseInt(a.name[-2]))
    lastNew = existing.find(val => val.name.includes("New Collection"))
    tabs = []
    for(let i = 1; i<event.target.length;i++){
        tabs.push({name:event.target[i].name, url:event.target[i].id})
    }
    collection = {
        name: event.target[0].value ? event.target[0] != "New Collection" : `New Collection${lastNew ? ` (${parseInt(lastNew[-2]) == NaN ? "1" : parseInt(lastNew[-2] + 1)})` : ""}`,
        tabs:tabs
    }
    return false;

}
)
    })
}

test = (vals) => {
    console.log(vals)
}

let newCollectionForm = document.getElementById("newCollectionForm")
newCollectionForm.addEventListener("submit", (event) => {
    event.preventDefault()
    alert("test")
    return false;

}
)
let newCollection = document.getElementById("newCollection")
newCollection.addEventListener("click", () => {

})
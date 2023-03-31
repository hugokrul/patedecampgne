var now = ['dungeons.jpg','johnwick4.jpg','maybeido.jpg','firstblood.jpg','65.jpg','creed3.jpg','scream6.jpg']
var soon = ['beautifuldisaster.jpg','blacklotus.jpg','fastx.jpg','guardiansvol3.jpg','littlemermaid.png','mariobros.jpg','zomerfrankrijk.jpg']
const slidingContentElement = document.getElementById("slidingcontent");
const slidingContentElement2 = document.getElementById("slidingcontent2");

function resetState() {
    while(slidingContentElement.firstChild){
        slidingContentElement.removeChild(slidingContentElement.firstChild)
    }
    while(slidingContentElement2.firstChild){
        slidingContentElement2.removeChild(slidingContentElement2.firstChild)
    }
}


function showSoon() {
    resetState()
    for (let i=0; i<soon.length; i++){
        var containerElement = document.createElement("div");
        containerElement.classList.add("marquee-tag-container");
        var imageElement = document.createElement("img")
        imageElement.setAttribute("src", `./images/playing/${soon[i]}`)
        imageElement.setAttribute("alt",soon[i])
        imageElement.setAttribute("width","250")
        imageElement.setAttribute("height","400")
        imageElement.classList.add("marquee-tag-icon")
        containerElement.appendChild(imageElement)
        slidingContentElement.appendChild(containerElement)
    }
    for (let i=0; i<soon.length; i++){
        var containerElement = document.createElement("div");
        containerElement.classList.add("marquee-tag-container");
        var imageElement = document.createElement("img")
        imageElement.setAttribute("src", `./images/playing/${soon[i]}`)
        imageElement.setAttribute("alt",soon[i])
        imageElement.setAttribute("width","250")
        imageElement.setAttribute("height","400")
        imageElement.classList.add("marquee-tag-icon")
        containerElement.appendChild(imageElement)
        slidingContentElement2.appendChild(containerElement)
    }
}

function showNow() {
    resetState()
    for (let i=0; i<now.length; i++){
        var containerElement = document.createElement("div");
        containerElement.classList.add("marquee-tag-container");
        var imageElement = document.createElement("img")
        imageElement.setAttribute("src", `./images/playing/${now[i]}`)
        imageElement.setAttribute("alt",now[i])
        imageElement.setAttribute("width","250")
        imageElement.setAttribute("height","400")
        imageElement.classList.add("marquee-tag-icon")
        containerElement.appendChild(imageElement)
        slidingContentElement.appendChild(containerElement)
    }
    for (let i=0; i<now.length; i++){
        var containerElement = document.createElement("div");
        containerElement.classList.add("marquee-tag-container");
        var imageElement = document.createElement("img")
        imageElement.setAttribute("src", `./images/playing/${now[i]}`)
        imageElement.setAttribute("alt",now[i])
        imageElement.setAttribute("width","250")
        imageElement.setAttribute("height","400")
        imageElement.classList.add("marquee-tag-icon")
        containerElement.appendChild(imageElement)
        slidingContentElement2.appendChild(containerElement)
    }
} 
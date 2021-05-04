function getReq(url, completion) {
    let xhr = new XMLHttpRequest()
    xhr.open("GET", url, true)
    xhr.onload = () => {
        if (xhr.status === 200) {
            completion(xhr.response)
        }
    }
    xhr.send()
}

function postReq(url, completion) {
    let xhr = new XMLHttpRequest()
    xhr.open("POST", url, true)
    xhr.onload = () => {
        if (xhr.status === 200) {
            completion(JSON.parse(xhr.response))
        }
    }
    xhr.send()
}

let comments = []

function createCommentNode(comment) {
    const div = document.createElement("div")
    const h4 = document.createElement("h4")
    const p = document.createElement("p")
    const likeButton = document.createElement("button")
    const span = document.createElement("span")
    const deleteButton = document.createElement("button")

    h4.innerText = comment["author"]
    p.innerText = comment["content"]
    likeButton.innerText = comment["liked"] ? "Unlike" : "Like"

    likeButton.style.backgroundColor = comment["liked"] ? "red" : "green"

    span.innerText = `Number of likes ${comment["numberOfLikes"]}`
    deleteButton.innerText = "Delete"

    deleteButton.onclick = () => {
        const id = parseInt(deleteButton.parentNode.dataset["id"])
        comments = comments.filter((comment) => {
            return comment["id"] !== id
        })
        render()
    }

    likeButton.onclick = () => {
        if (comment["liked"]) {
            comments.forEach((c) => {
                if (c["id"] === comment["id"]) {
                    c["liked"] = false
                    c["numberOfLikes"]--;
                }
            })
        } else {
            comments.forEach((c) => {
                if (c["id"] === comment["id"]) {
                    c["liked"] = true
                    c["numberOfLikes"]++;
                }
            })
        }
        render()
    }

    div.appendChild(h4)
    div.appendChild(p)
    div.appendChild(likeButton)
    div.appendChild(span)
    div.appendChild(deleteButton)

    div.dataset["id"] = comment["id"]

    document.querySelector(".comments").appendChild(div)
}

function render() {
    document.querySelector(".comments").innerHTML = ""
    comments.forEach((comment) => {
        createCommentNode(comment)
    })
}

postReq("comments.json", (response) => {
    comments = response
    render()
})
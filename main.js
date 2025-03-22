// Add Homepage with blog listing

if (document.URL.includes("index.html")){


const blogContainer = document.getElementById("blogContainer")
let index = 0

if (!localStorage.getItem("blogPosts")){
    addPostElement("Start a Blog!", "Press the Add Post button to create a new post" )
} 

function postLocalStorage(){
    let blogPosts = JSON.parse(localStorage.getItem("blogPosts"))
    for (const [title, post] of Object.entries(blogPosts)){
        addPostElement(title, post)
    }
}


function addPostElement(title, post){
    const newLi = document.createElement("li")
    const newH1 = document.createElement("h2")
    const newP = document.createElement("p")
    const newButton = document.createElement("button")

    const titleContent = document.createTextNode(title)
    const postContent = document.createTextNode(post)
    
    newH1.appendChild(titleContent)
    newP.appendChild(postContent)
    newLi.appendChild(newH1)
    newLi.appendChild(newP)
    newLi.appendChild(newButton)


    newLi.classList.add("blog-post")
    newH1.classList.add("title")
    newP.classList.add("post")
    newButton.classList.add("edit")
    newButton.innerHTML = "Edit"

    blogContainer.appendChild(newLi)
}


postLocalStorage()

}

// Form
// Add new post Creation functionality

if (document.URL.includes("new-post.html")) {

    const successMessage = document.getElementById("success")
    const postError = document.getElementById("postError")
    const titleError = document.getElementById("titleError")

    successMessage.style.display = "none"

    document.querySelector("form").onsubmit = function(event) {
        event.preventDefault()

        titleError.style.display = "none"
        postError.style.display = "none"

        let newTitle = document.getElementById("newTitle").value
        let newPost = document.getElementById("newPost").value

        titlevalidated = validateTitle(newTitle)
        postvalidated = validatePost(newPost)

        if(titlevalidated && postvalidated){
            post(newTitle, newPost)
            successMessage.style.display = "block"
        }
    }


    function validateTitle(title) {
        if(title.trim() === ""){
            titleError.style.display = "block"
            return false
        } else {
            titleError.style.display = "none"
            return true
        }
    }


    function validatePost(post) {
        if(post.trim() === ""){
            postError.style.display = "block"
            return false
        } else {
            postError.style.display = "none"
            return true
        }
    }


    function post(title, post) {
        if (!localStorage.getItem("blogPosts")){
            let firstPost = {}
            firstPost[title] = post
            localStorage.setItem("blogPosts", JSON.stringify(firstPost))
        }else {
            let blogPosts = JSON.parse(localStorage.getItem("blogPosts"))
            blogPosts[title] = post
            localStorage.setItem("blogPosts", JSON.stringify(blogPosts))
        }
    }


}
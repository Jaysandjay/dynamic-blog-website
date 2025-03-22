// Add Homepage with blog listing

if (document.URL.includes("index.html")){

const blogContainer = document.getElementById("blogContainer")

if (!localStorage.getItem("blogPosts")){
    const starter = {
        id: 0,
        title: "Start a Blog",
        post: "Press the Add Post button to create a new post" 
    }
    localStorage.setItem("blogPosts", [])
    addPostElement(starter.title, starter.post)
} else{
    postLocalStorage()
}

function postLocalStorage(){
    for(const entry of (JSON.parse(localStorage.getItem("blogPosts")))){

        addPostElement(entry.title, entry.post)
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

}

// Form
// Add new post Creation functionality

if (document.URL.includes("new-post.html")) {

    // if (!localStorage.getItem("blogPosts")){
    //      index = 0
    // } else{
    //     index = JSON.parse(localStorage.getItem("blogPosts")).length 
    // }
    
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
        let index = 0
        if(localStorage.getItem("blogPosts")){
            index = JSON.parse(localStorage.getItem("blogPosts")).length
        }
        
        let newPost = {}
        newPost.id = index
        newPost.title = title
        newPost.post = post

        if (!localStorage.getItem("blogPosts")){
            console.log("Empty")
            let firstPost = []
            firstPost.push(newPost)
            localStorage.setItem("blogPosts", JSON.stringify(firstPost))
        }else {
            let blogPosts = JSON.parse(localStorage.getItem("blogPosts"))
            blogPosts.push(newPost)
            localStorage.setItem("blogPosts", JSON.stringify(blogPosts))
        }
    }


}
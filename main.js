// Add Homepage with blog listing

function homePage(){
const blogContainer = document.getElementById("blogContainer")

if (!localStorage.getItem("blogPosts") || JSON.parse(localStorage.getItem("blogPosts")).length === 0){
    const starter = {
        id: "starter",
        title: "Start a Blog",
        post: "Press the Add Post button to create a new post" 
    }
    localStorage.setItem("blogPosts", [])
    addPostElement(starter.id, starter.title, starter.post, false)
} else{
    postLocalStorage()
}

function postLocalStorage(){
    for(const entry of (JSON.parse(localStorage.getItem("blogPosts")))){
        addPostElement(entry.id, entry.title, entry.post)
    }
}


function addPostElement(id, title, post, button=true){
    const newLi = document.createElement("li")
    const newH1 = document.createElement("h2")
    const newP = document.createElement("p")
    const newButton = document.createElement("button")
    const newA = document.createElement("a")

    const titleContent = document.createTextNode(title)
    const postContent = document.createTextNode(post)
    
    newH1.appendChild(titleContent)
    newP.appendChild(postContent)

    newLi.appendChild(newH1)
    newLi.appendChild(newP)

    newA.href = `post.html?id=${id}`
    newLi.appendChild(newA)
    

    newLi.classList.add("blog-post")
    newH1.classList.add("title")
    newP.classList.add("post")
    

    // button
    if(button){
        newA.appendChild(newButton)
        newButton.classList.add("edit")
        newButton.innerHTML = "Edit"   
    }
    

    blogContainer.appendChild(newLi)
}







}

// Form
// Add new post Creation functionality

function newPost() {
    
    const successMessage = document.getElementById("success")
    const postError = document.getElementById("postError")
    const titleError = document.getElementById("titleError")
    const homeButton = document.getElementById("goHome")

    successMessage.style.display = "none"

    // Submit Button
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

    // Post to local storage function
    function post(title, post) {
        console.log("POST")
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

    // Go Home Button
    homeButton.addEventListener("click", (e) => {
        e.preventDefault()
        window.location.href = "index.html"
    })
}


// Edit Post.html

function editPost(){
    // Get ID
    const url = new URL(window.location.href)
    const postId = parseInt(url.searchParams.get("id"))

    // Get blog title and post
    const blogs = JSON.parse(localStorage.getItem("blogPosts"))
    console.log(blogs)
    const currentblog = blogs.filter((blog) => blog.id === postId)
    console.log(currentblog)

    const currentTitle = currentblog[0].title
    const currentPost =currentblog[0].post
    console.log(currentTitle)
    console.log(currentPost)

    // Get HTML Elements
    const titleElement = document.getElementById("newTitle")
    const postElement = document.getElementById("newPost")
    const successMessage = document.getElementById("success")
    const postError = document.getElementById("postError")
    const titleError = document.getElementById("titleError")
    const saveButton = document.getElementById("save")
    const homeButton = document.getElementById("goHome")
    const deleteButton = document.getElementById("delete")
    const messageMethod = document.getElementById("method")

    successMessage.style.display = "none"
    enableButtons()

    // Fill HTML
    titleElement.value = currentTitle
    postElement.value = currentPost

    // Save Button
    document.querySelector("form").onsubmit = function(event) {
        event.preventDefault()

        titleError.style.display = "none"
        postError.style.display = "none"

        let newTitle = document.getElementById("newTitle").value
        let newPost = document.getElementById("newPost").value

        titlevalidated = validateTitle(newTitle)
        postvalidated = validatePost(newPost)

        if(titlevalidated && postvalidated){
            replace(newTitle, newPost)
        }
    }

    // Validation functions
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

    // replace blog
    function replace(title, post) {
        const index = blogs.findIndex(blog => blog.id === postId)
        blogs[index].title = title
        blogs[index].post = post
        localStorage.setItem("blogPosts", JSON.stringify(blogs))
        messageMethod.innerHTML = "Edited"
        successMessage.style.display = "block"
        disableButtons()
    }

    // Delete blog
    deleteButton.addEventListener("click",(e) => {
        e.preventDefault()
        const index = blogs.findIndex(blog => blog.id === postId)
        blogs.splice(index, 1)
        localStorage.setItem("blogPosts", JSON.stringify(blogs))
        messageMethod.innerHTML = "Deleted"
        successMessage.style.display = "block"
        disableButtons()
    })

    // Go Home Button
    homeButton.addEventListener("click", (e) => {
        e.preventDefault()
        window.location.href = "index.html"
    })

    // Enable Buttons
    function enableButtons(){
        saveButton.disabled = false
        deleteButton.disabled = false
        homeButton.disabled = false
    }

    // Disable Buttons
    function disableButtons(){
        saveButton.disabled = true
        deleteButton.disabled = true
        homeButton.disabled = true
    }
}
// Add Homepage with blog listing

if (document.URL.includes("index.html")){

const blogContainer = document.getElementById("blogContainer")

let temp = {
    // "Post One": "Lorem ipsum dolor sit amet consectetur adipisicing elit. At nobis quis explicabo tenetur veniam voluptate sequi sit inventore beatae quam.",
    // "Post Two": "Lorem ipsum dolor sit amet consectetur adipisicing elit. At nobis quis explicabo tenetur veniam voluptate sequi sit inventore beatae quam.",
    // "Post Three": "Lorem ipsum dolor sit amet consectetur adipisicing elit. At nobis quis explicabo tenetur veniam voluptate sequi sit inventore beatae quam.",
}

if (!localStorage.getItem("blogPosts")){
    localStorage.setItem("blogPosts", JSON.stringify(temp))
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

    const titleContent = document.createTextNode(title)
    const postContent = document.createTextNode(post)
    
    newH1.appendChild(titleContent)
    newP.appendChild(postContent)
    newLi.appendChild(newH1)
    newLi.appendChild(newP)

    newLi.classList.add("blog-post")
    newH1.classList.add("title")
    newP.classList.add("post")

    blogContainer.appendChild(newLi)
}


postLocalStorage()

}

// Form

if (document.URL.includes("new-post.html")) {


    const postError = document.getElementById("postError")
    const titleError = document.getElementById("titleError")

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
            console.log("post")
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
            console.log(blogPosts)
            blogPosts[title] = post
            localStorage.setItem("blogPosts", JSON.stringify(blogPosts))
        }
    }
}
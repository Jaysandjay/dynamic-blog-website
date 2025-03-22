const blogContainer = document.getElementById("blogContainer")

let temp = {
    "Post One": "Lorem ipsum dolor sit amet consectetur adipisicing elit. At nobis quis explicabo tenetur veniam voluptate sequi sit inventore beatae quam.",
    "Post Two": "Lorem ipsum dolor sit amet consectetur adipisicing elit. At nobis quis explicabo tenetur veniam voluptate sequi sit inventore beatae quam.",
    "Post Three": "Lorem ipsum dolor sit amet consectetur adipisicing elit. At nobis quis explicabo tenetur veniam voluptate sequi sit inventore beatae quam.",
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
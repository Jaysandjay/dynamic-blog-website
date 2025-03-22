
let temp = {
    "Post One": "Lorem ipsum dolor sit amet consectetur adipisicing elit. At nobis quis explicabo tenetur veniam voluptate sequi sit inventore beatae quam.",
    "Post Two": "Lorem ipsum dolor sit amet consectetur adipisicing elit. At nobis quis explicabo tenetur veniam voluptate sequi sit inventore beatae quam.",
    "Post Three": "Lorem ipsum dolor sit amet consectetur adipisicing elit. At nobis quis explicabo tenetur veniam voluptate sequi sit inventore beatae quam.",
}

if (!localStorage.getItem("blogPosts")){
    localStorage.setItem("blogPosts", JSON.stringify(temp))
}

console.log(JSON.parse(localStorage.getItem("blogPosts")))


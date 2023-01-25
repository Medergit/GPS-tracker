

const html = document.querySelector(".content")
const num = document.querySelector("input")
const btn = document.querySelector("button")


btn.addEventListener("click", function(){
    
num.style.backgroundColor = "coral"

    if(num.value > 0 && num.value < 101){
        html.innerHTML = ''

        async function URL(){
        const https =await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${num.value}`)
        const posts = await https.json()

        posts.map(function(newarr){
            const div = document.createElement("div")
                
            div.innerHTML = `<h1>${newarr.id} ${newarr.title}</h1>
                             <p>${newarr.body}</p>`

            html.append(div)
            })
        }
    URL()

    num.value='' 

    }else{
            num.style.backgroundColor = "red"
    }
})

/////////////////////////////////////game/////////////////////////////////


const platform = document.querySelector(".platform")
const block = document.querySelectorAll(".block")
const platformArr = Array.from(platform.children)


block.forEach((element, index) => {
    element.addEventListener("click", function(){
        element.style.backgroundColor = "cornflowerblue";
        setTimeout(
            function(){
                block[index + 8].style.backgroundColor = "cornflowerblue"
                block[index - 8].style.backgroundColor = "cornflowerblue"
                block[index + 1].style.backgroundColor = "cornflowerblue"
                block[index - 1].style.backgroundColor = "cornflowerblue"
            }
        ,500)
    })
});


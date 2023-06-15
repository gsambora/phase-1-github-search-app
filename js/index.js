let userButton = true;

function searchUser(input){
    const url = "https://api.github.com/search/users?q="+input
        fetch(url,{method:"GET",
            headers: {"Accept": "application/vnd.github.v3+json"}  })
        .then(response => response.json())
        .then(data => {
            const numUsers = data.items.length
            //console.log(data.items[0])
            for(index in data.items){
                const newUser = document.createElement("li")
                newUser.innerHTML = "Username: "+ data.items[index].login
                const userInfo = document.createElement("div")
                userInfo.innerHTML = "Id: "+data.items[index].id
                newUser.style.fontWeight = "bold"
                userInfo.style.fontWeight = "normal"

                newUser.append(userInfo)
                document.querySelector("#user-list").append(newUser)

                newUser.addEventListener("click", ()=>{
                    console.log("click")
                    newUser.style.color = "#9F2B68"
                    document.querySelector("#user-list").innerHTML = ''
                    searchRepo(input)
                })
            }

        })
}

function searchRepo(input){
    console.log("searching for repos")
    const url = "https://api.github.com/users/"+input+"/repos"
    console.log(url)
    fetch(url,{method:"GET",
            headers: {"Accept": "application/vnd.github.v3+json"}  })
        .then(response => response.json())
        .then(data => {
            //console.log(data[0])
            const userName = document.createElement("h3")
                userName.innerHTML = data[0].owner.login
                userName.style.fontWeight = "bold"
                document.querySelector("#repos-list").append(userName)

            for(index in data){
                const name = document.createElement("li")
                name.innerHTML = data[index].name
                document.querySelector("#repos-list").append(name)

                if(data[index].description != undefined){
                    const descUL = document.createElement("ul")
                    document.querySelector("#repos-list").append(descUL)

                    const descLI = document.createElement("li")
                    descLI.innerHTML = data[index].description
                    document.querySelector("#repos-list").lastChild.append(descLI)
                }
                
            }
        })
}

document.addEventListener("DOMContentLoaded", ()=>{
    const toggle = document.createElement("button")
    toggle.id = "user-repo-tgl"
    toggle.innerHTML = "Switch to repos 🔄"
    const label = document.createElement("h4")
    label.innerHTML = "Now searching for: USERS"

    toggle.addEventListener("click", ()=>{
        //console.log("switching search")
        if(userButton === true){
            //console.log("now repos")
            userButton = false
            toggle.innerHTML = "Switch to users 🔄"
            label.innerHTML = "Now searching for: REPOS"
        } else {
            //console.log("now users")
            userButton = true
            toggle.innerHTML = "Switch to repos 🔄"
            label.innerHTML = "Now searching for: USERS"
        }

    })

    document.querySelector("#main").insertBefore(label, document.querySelector("#github-form"))
    document.querySelector("#main").insertBefore(toggle, document.querySelector("#github-form"))

    const form = document.querySelector("#github-form")
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        const input = e.target.querySelector("#search").value
        //console.log(input)
        document.querySelector("#repos-list").innerHTML = ''
        document.querySelector("#user-list").innerHTML = ''

        if(userButton === true){
            searchUser(input)
        } else{
            searchRepo(input)
        }
        form.reset()
    })

})
document.addEventListener("click", async function(e){
    if(e.target.classList.contains("registration")){
        let form = {
            login: document.getElementById("exampleInputEmail1").value,
            password: document.getElementById("exampleInputPassword1").value
        }
        let resp = await fetch("/registration", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        location = "/main/quik"
        Window.location.reload(true)
    }
    if(e.target.classList.contains("login")){
        let form = {
            login: document.getElementById("exampleInputEmail1").value,
            password: document.getElementById("exampleInputPassword1").value
        }
        let resp = await fetch("/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        let t = await resp.json();
        if(t.t){
            location = "/main/quik"
            Window.location.reload(true)
        }
        else{
            alert("Неправильный ввод")
        }
    }
    if(e.target.id == "logout"){
        location = "/"
        Window.location.reload(true)
    }
    if(e.target.id == "profile"){
        location = `/profile/${e.target.innerText}`
        Window.location.reload(true)
    }
    if(e.target.classList.contains("cat")){
        e.preventDefault()
        // console.log(e.target.innerText)
       let resp = await fetch(`https://search-maps.yandex.ru/v1/?text=Москва,${e.target.innerText} VR-CLUB&type=biz&lang=ru_RU&results=120&apikey=705b2d36-f59c-42bf-8a60-5e1db0c7f6b0`);
       let dat = await resp.json();
       console.log(dat);
        let i = Math.floor(Math.random() * (100 - 0)) + 0
       console.log(dat.features[i].properties.name, dat.features[i].properties.description);
       let div = document.getElementById("req")
       div.innerHTML += listHBS({
           title: dat.features[i].properties.name,
           adress: dat.features[i].properties.description,
           cat: e.target.innerText
    })
    }

    if(e.target.id=="id"){
        e.preventDefault()
        // console.log(e.target.innerText)
        let m = document.getElementById("in").value
        console.log(m);
       let resp = await fetch(`https://search-maps.yandex.ru/v1/?text=Москва,${m}&type=biz&lang=ru_RU&results=100&apikey=705b2d36-f59c-42bf-8a60-5e1db0c7f6b0`);
       let dat = await resp.json();
        let i = Math.floor(Math.random() * (100 - 0)) + 0
       console.log(dat.features[i].properties.name, dat.features[i].properties.description);
       let div = document.getElementById("req")
       div.innerHTML += listHBS({
           title: dat.features[i].properties.name,
           adress: dat.features[i].properties.description,
           cat: m
    })
    }
        
    if(e.target.id == "plan"){
        // console.log("hi")
        console.log(e.target.name)
        let adr = document.getElementById(`adr${e.target.name}`).innerText.split(": ")[1]
        let cat = document.getElementById(`cat${e.target.name}`).innerText.split(": ")[1]
        console.log(adr, cat);
        let data= {
            title: e.target.name,
            adr: adr,
            cat: cat
        }
        let resp = await fetch("/plans", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        let div = document.getElementsByClassName(`${e.target.name}`)[0]
        console.log(div);
        div.remove();
    }

    if(e.target.id == "delt"){
        // console.log("hi")
        console.log(e.target.name)
        // console.log(adr, cat);
        let data= {
            title: e.target.name,
        }
        let resp = await fetch("/plans/del", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        let div = document.getElementsByClassName(`${e.target.name}`)[0]
        console.log(div);
        div.remove();
    }
    if(e.target.id == "ad"){
        // console.log("hi")
        console.log(e.target.name)
        // console.log(adr, cat);
        let data= {
            title: e.target.name,
        }
        let resp = await fetch("/plans/p", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        let papa = await resp.json()
        let div = document.getElementsByClassName(`${e.target.name}`)[0]
        console.log(div);
        div.remove();
        let ld = document.getElementById("last");
        ld.innerHTML += lastHBS(papa)
    }
})
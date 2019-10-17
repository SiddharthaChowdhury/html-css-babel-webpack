let selected = [];
let countries = [];
let timer = null;
let backFlag = 1;

let container = document.getElementById("container");
let input = document.getElementById("search");
let dropdown = document.getElementById("dropdown");
let output = document.getElementById("output");

function req (method, url, data = null) {
    let xhr;
    if(window.XMLHttpRequest) { xhr = new XMLHttpRequest() }
    else { xhr = new ActiveXObject("Microsoft.XMLHTTP") }

    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {  
                    resolve(xhr.responseText);
                } else {  
                    reject(xhr.responseText);  
                }
            }
        }
        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data ? JSON.stringify(data) : null);
    })    
}

req("GET", "https://cors-anywhere.herokuapp.com/https://restcountries.eu/rest/v2/all").then((data) => {
    try {
        let ctrs = JSON.parse(data);
        countries = ctrs.map((item) => {
            return {...item, name: item.name.toLowerCase()}
        })
        // TODO: remove console
        console.log(countries)
    } catch (err) {
        alert(err)
    }
}).catch(err => {
    console.log("err", err)
})

input.addEventListener('keyup', (e) => {
    clearTimeout(timer);
    let val = e.target.value;
    if(e.key === "Backspace" && val.length === 0){
        // pop selected and render;
        if(backFlag === 0){
            selectFromDropdown(null);
        }
        else
            backFlag --;
    }

    if (val.length > 0) {
        clearDropDown()
        backFlag = 1;
        timer = setTimeout(() => {
            let ip = val.toLowerCase();
            let list = countries.filter((item) => {
                return item.name.indexOf(ip) > -1 || item.alpha3Code.indexOf(ip) > -1
            })

            // console.log(list)
            list.forEach(item => {
                let div = document.createElement('DIV');
                div.setAttribute('class', 'option');
                div.setAttribute('data-id', item.alpha3Code);
                div.innerHTML = item.name;
                div.addEventListener('click', () => {
                    selectFromDropdown(item.alpha3Code)
                    clearDropDown();
                    clearInput();
                })
                dropdown.appendChild(div)
            })
        }, 300);
    } else {
        clearDropDown()
    }
})

function selectFromDropdown (val) {
    if(!val) {
        selected.shift()
    }
    if (val && val.length > 0 && selected.indexOf(val) === -1){
        selected.unshift(val);
    }

    // removeElementsByClass('tag');
    renderSelected();
}

function closeTag (code) {
    const index = selected.indexOf(code);
    console.log(code)
    if(index > -1) {
        selected.splice(index, 1);
        renderSelected();
    }
}

function renderSelected() {
    removeElementsByClass('tag');
    selected.forEach(item => {
        let div = document.createElement('DIV');
            div.setAttribute('class', 'tag');
            div.setAttribute('data-id', item);
            div.innerHTML = item;

            let closeBtn = document.createElement('DIV');
            closeBtn.innerHTML = '&times;';
            closeBtn.setAttribute('class', 'tag-close');
            div.addEventListener('click', () => {
                closeTag(item)
                clearDropDown()
            })
            div.appendChild(closeBtn);
            
        container.prepend(div)
    })

    const toPrint = []
    selected.forEach((item) => {
        const data = countries.find((ctr) => ctr.alpha3Code === item) 
        toPrint.push(data)
    })

    output.innerHTML = JSON.stringify(toPrint)
}

function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function clearDropDown () {
    dropdown.innerHTML = ""
}

function clearInput () {
    input.value = "";
}
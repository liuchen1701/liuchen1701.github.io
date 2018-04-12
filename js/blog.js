let request = new XMLHttpRequest();
request.open('GET', '../json/blog.json', false);
request.send(null);
let blog_data = JSON.parse(request.responseText);

blog_data.forEach(loadHeader);

function loadHeader(item, index) {
    let entry = createDiv("entry");
    entry.setAttribute("id", "entry" + index);

    let article_header = createDiv("article_header");
    article_header.setAttribute("id", "article" + index);

    // Used for making header clickable
    let clickable = document.createElement("a");
    clickable.setAttribute("class", "clickable");
    clickable.setAttribute("href", "#entry" + index);
    article_header.appendChild(clickable);

    let title = createTitle(item);
    clickable.appendChild(title);

    let info = createInfo(item);
    article_header.appendChild(info);

    entry.appendChild(article_header);

    clickable.onclick = function() {
        if(this.parentElement.parentElement.childElementCount <= 1) {
            loadContent(item, index);
        }

        let entryList = document.getElementsByClassName("entry");

        for(let i = 0; i < entryList.length; i++) {
            if(i !== index && entryList[i].childElementCount > 1) {
                entryList[i].lastElementChild.classList.remove("show");
            }
        }

        if(this.parentElement.parentElement.childElementCount > 1) {
            this.parentElement.parentElement.lastElementChild.classList.toggle("show");
            document.getElementById("to_article_header").classList.toggle("show");
        }

        document.getElementById("to_article_header").setAttribute("href", "#entry" + index);
    };

    document.getElementsByTagName("main")[0].appendChild(entry);
}

function loadContent(item, index) {
    let article_content = createDiv("article_content");
    let main_content = createContent(item);
    article_content.appendChild(main_content);
    document.getElementsByClassName("entry")[index].appendChild(article_content);
}

function createDiv(classValue) {
    let ret = document.createElement("DIV");
    ret.setAttribute("class", classValue);
    return ret;
}

function createTitle(item) {
    let ret = document.createElement("h2");
    ret.setAttribute("class", "title");

    if(item.title === "") {
        let filename = item.src.replace(/^.*[\\\/]/, '');
        ret.innerText = filename.substring(0, filename.indexOf('.'));
    } else {
        ret.innerText = item.title;
    }

    return ret;
}

function createInfo(item) {
    let ret = document.createElement("h6");
    ret.setAttribute("class", "info");

    if(item.author === "") {
        ret.innerHTML += "By 刘晨 Chen Liu @liuchen1701";
    } else {
        ret.innerHTML += "转载 Repost";
    }

    if(item.date === "") {

    } else {
        ret.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;";
        ret.innerHTML += item.date;
    }

    if(item.url === "") {

    } else {
        ret.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;";
        ret.innerHTML += "<a href='"  + item.url + "'>Link to Source</a>";
    }

    return ret;
}

function createContent(item) {
    let ret = document.createElement("p");
    ret.setAttribute("class", "main_content");

    let request = new XMLHttpRequest();
    request.open('GET', item.src, false);
    request.send(null);

    let text;

    if(item.src.includes(".html")) {
        text = request.responseText;
    } else {
        text = request.responseText.replace(new RegExp('\n', 'g'), '<br>');
    }

    ret.innerHTML = text;

    return ret;
}


function showCaption(elem) {
    elem.firstElementChild.classList.add("show");
}

function hideCaption(elem) {
    elem.firstElementChild.classList.remove("show");
}
var request = new XMLHttpRequest();
request.open('GET', '../json/blog.json', false);
request.send(null);
var blog_data = JSON.parse(request.responseText);

blog_data.forEach(loadArticle);

function loadArticle(item, index) {
    var entry = createDiv("entry");

    var article_header = createDiv("article_header");
    var title = createTitle(item);
    article_header.appendChild(title);
    var info = createInfo(item);
    article_header.appendChild(info);
    entry.appendChild(article_header);

    var article_content = createDiv("article_content");
    var main_content = createContent(item);
    article_content.appendChild(main_content);
    entry.appendChild(article_content);
    
    document.getElementsByTagName("main")[0].appendChild(entry);
}

function createDiv(classValue) {
    var ret = document.createElement("DIV");
    ret.setAttribute("class", classValue);
    return ret;
}

function createTitle(item) {
    var ret = document.createElement("h2");
    ret.setAttribute("class", "title");

    if(item.title === "") {
        var filename = item.src.replace(/^.*[\\\/]/, '');
        ret.innerText = filename.substring(0, filename.indexOf('.'));
    } else {
        ret.innerText = item.title;
    }

    return ret;
}

function createInfo(item) {
    var ret = document.createElement("h6");
    ret.setAttribute("class", "info");

    if(item.author === "") {
        ret.innerHTML += "By Chen Liu @liuchen1701";
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
    var ret = document.createElement("p");
    ret.setAttribute("class", "main_content");

    var request = new XMLHttpRequest();
    request.open('GET', item.src, false);
    request.send(null);

    var text;

    if(item.src.includes(".html")) {
        text = request.responseText;
   } else {
        text = request.responseText.replace(new RegExp('\n', 'g'), '<br>');
    }

    ret.innerHTML = text;
    
    return ret;
}
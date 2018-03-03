function about() {
    var about = document.getElementById("about");

    var about_height = about.offsetTop;

    var current_height = $(window).scrollTop();

    console.log(about_height + " " + current_height);

    if(about_height < current_height + 100) {
        var about_button = document.getElementsByClassName("button-to-about")[0];
        about_button.classList.add("live-page");
    } else {
        var about_button = document.getElementsByClassName("button-to-about")[0];
        about_button.classList.remove("live-page");
    }
}

$(window).scroll(about);
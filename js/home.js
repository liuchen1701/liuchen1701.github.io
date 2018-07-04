let index = Math.floor(Math.random() * 4) + 1;
console.log(index);
document.getElementsByTagName("header")[0].style.backgroundImage = "url('./resources/images/profile/jpg/Portrait" + index + ".jpg')";
console.log(document.getElementsByTagName("header")[0].style);
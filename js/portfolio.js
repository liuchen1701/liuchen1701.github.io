var i;
var slides = document.getElementsByClassName("portfolio showcase");
var dots = document.getElementsByClassName("dot");
var main_colors = ["#E91E63", "#009688"];
var main_colorthemes = ["white", "white"];
var slideIndex = 1;
// showSlides(slideIndex);
loopSlides();

function loopSlides() {
  showSlides(slideIndex);
  slideIndex++;
  setTimeout(loopSlides, 5000);
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  if (n >= slides.length) {slideIndex = 0}
  if (n < 0) {slideIndex = slides.length - 1}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  dots[slideIndex].className += " active";
  slides[slideIndex].style.display = "inline-block";
  document.getElementById("main").style.backgroundColor = main_colors[slideIndex];
  document.getElementById("main").style.color = main_colorthemes[slideIndex];



}

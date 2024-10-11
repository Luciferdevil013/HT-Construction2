const menuOpen = document.querySelector('#menu-open')
const mobileMenu = document.querySelector('.mobile')

const menuClose = document.querySelector('#close')

menuOpen.addEventListener('click', () => {
  gsap.to(mobileMenu, {
    right: 0,
    duration: 1
  })
})

menuClose.addEventListener('click', () => {
  gsap.to(mobileMenu, {
    right: '-30vh',
    duration: 1
  })
})

const serviceList = document.querySelector('.mobile #services .link')
const serviceLink = document.querySelector('.mobile .service-other-link')


serviceList.addEventListener('click', () => {
  if (serviceLink.style.display == 'none' || serviceLink.style.display == '') {
    serviceLink.style.display = 'flex';
  } else {
    serviceLink.style.display = 'none'
  }
})




var swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

const img = ['./Assets/Images/Home-Section-Slider-1.jfif','./Assets/Images/Home-Section-Slider-2.jfif','./Assets/Images/Home-Section-Slider-3.jfif'];


img.forEach(function(img){
    new Image().src = img; 
});

secs = 4;

const heroSection = document.querySelector('.hero-section');


function backgroundSequence() {
	window.clearTimeout();
	var k = 0;
	for (i = 0; i < img.length; i++) {
		setTimeout(function(){ 
			heroSection.style.background = "url(" + img[k] + ") no-repeat center center";
            heroSection.style.backgroundSize = "cover";
		if ((k + 1) === img.length) { setTimeout(function() { backgroundSequence() }, (secs * 1000))} else { k++; }			
		}, (secs * 1000) * i)	
	}
}
backgroundSequence();



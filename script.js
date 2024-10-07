var swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

const img = ['./Assets/Images/imge1.jfif','./Assets/Images/image2.jfif','./Assets/Images/image3.jfif'];


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
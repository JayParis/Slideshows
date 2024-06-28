var s = document.getElementById('center-slide');
var si = document.getElementById('slide-image');

var slides = [
    'Slide-00',
    'Slide-01',
    'Slide-02',
];

var slideIndex = 0;
var allButtons = [];

function resize(){
    let w = document.documentElement.clientWidth;
    let h = document.documentElement.clientHeight;
    let pad = document.documentElement.clientHeight * 0.0379;

    let fw = w - pad;
    let fh = fw * 0.5625;

    let tall = fh > (h - pad);
    if(tall){
        fh = h - pad;
        fw = fh * 1.77777777778;
    }

    document.documentElement.style.setProperty('--slide-width', fw + 'px');
    document.documentElement.style.setProperty('--slide-height', fh + 'px');
}

function clicked(event){
    let w = document.documentElement.clientWidth;
    let h = document.documentElement.clientHeight;
    let leftRight = event.x < (w / 2);
    if(event.y > (h*0.8)) return;

    if(leftRight) slideIndex -= 1;
    if(!leftRight) slideIndex += 1;

    if(slideIndex < 0) slideIndex = slides.length-1;
    if(slideIndex > slides.length-1) slideIndex = 0;

    displaySlide(slideIndex);
}

window.addEventListener('mousemove', (event) => {
    let h = document.documentElement.clientHeight;
    let p = document.getElementById('jump-to-slide-cont');
    let show = event.y > (h - 100);

    p.style.display = show ? "flex" : "none";
    // document.body.style.cursor = show ? "default" : "none";
});

window.addEventListener("load", (event) => {

    var original = document.getElementById('slide-button');
    for (let i = 0; i < slides.length; i++) {
        var clone = original.cloneNode(true); // "deep" clone
        original.parentNode.appendChild(clone);
        allButtons.push(clone);

        clone.addEventListener('click', (event) => {
            displaySlide(i);
        });
        clone.innerHTML = (i+1).toString();
    }
    original.style.display = "none";
    displaySlide(0);
});

function displaySlide(id){
    var newImg = new Image();
    newImg.src = './Images/' + slides[id] + '.png';
    newImg.decode().then(() => {
        si.src = newImg.src; 
    });

    for (let i = 0; i < allButtons.length; i++) {
        const b = allButtons[i];
        b.style.backgroundColor = i == id ? "#767676" : "#2b2b2b";
    }
}

window.addEventListener('click', (event) => clicked(event));
window.addEventListener('keydown', (event) => {
    if(event.key == 'ArrowLeft' || event.key == 'ArrowRight'){
        let leftRight = event.key == 'ArrowLeft';

        if(leftRight) slideIndex -= 1;
        if(!leftRight) slideIndex += 1;

        if(slideIndex < 0) slideIndex = slides.length-1;
        if(slideIndex > slides.length-1) slideIndex = 0;

        displaySlide(slideIndex);
    }
});
window.addEventListener('resize', () => resize());
window.addEventListener('orientationchange', () => resize());
resize();
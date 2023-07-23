var onAbout = 0;
window.onclick = function(event){
    if ((event.target == document.getElementById("modal") && onAbout == 1) || (event.target == document.getElementById("aboutbutton") && onAbout == 2)){
        document.getElementById("modal").style.display = "none", onAbout = 0;   
        document.querySelector('.about').classList.remove('aboutactive');
    }
}
function clickAbout(){
    document.getElementById("modal").style.display = "inline-flex";
    document.querySelector('.about').classList.add('aboutactive');
    onAbout++;
}
var imgFeature = document.querySelector('.imgFeature');
var imgAsL = document.querySelector('.L');
var imgAsR = document.querySelector('.R');
var imgAsLL = document.querySelector('.LL');
var imgAsRR = document.querySelector('.RR');
var listImg = document.querySelectorAll('.listImage img');
var nextBtn = document.querySelector('.next');
var prevBtn = document.querySelector('.prev');
var current = 0;
var nextSlide = 0;
function Calc(index, operate)
{
    if (operate > 0)
        return (index + 1 == listImg.length ? 0 : index + 1);
    else
        return (index - 1 < 0 ? listImg.length - 1 : index - 1);
}
function updateImageByIndex(index){
    nextSlide = 0;
    document.querySelectorAll('.listImage div').forEach(imgItem => {
        imgItem.classList.remove('active');
    });
    imgAsL.src = listImg[Calc(index, -1)].getAttribute('src');
    imgAsR.src = listImg[Calc(index, 1)].getAttribute('src');
    listImg[index].parentElement.classList.add('active');
    imgFeature.style.opacity = '0';
    setTimeout(()=>{
        imgFeature.src = listImg[index].getAttribute('src');
        imgFeature.style.opacity = '1';
    }, 400);
}
listImg.forEach((imgElement, index) => {
    imgElement.addEventListener('click', e =>{
        updateImageByIndex(index);
        nextSlide = -1;
        current = index;
    });
});
nextBtn.addEventListener('click', e => {
    updateImageByIndex(current = Calc(current, 1));
    nextSlide = -1;
});
prevBtn.addEventListener('click', e => {
    updateImageByIndex(current = Calc(current, -1));
    nextSlide = -1;
});
moveSlide();
function moveSlide(){
    if (nextSlide == 1){
        updateImageByIndex(current = (++current == listImg.length) ? 0 : current);
        moveSlide();
    } 
    else {
        setTimeout(() => {moveSlide()}, nextSlide == -1 ? 100000 : 3000);
        nextSlide = 1;
    }
}
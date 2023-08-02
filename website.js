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
function broadenSearch(){
    document.querySelector('.search').style = "width: 60%; visibility: visible";
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
function highlightImage(index){
    document.querySelectorAll('.listImage div').forEach(imgItem => {
        imgItem.classList.remove('active');
    });
    listImg[index].parentElement.classList.add('active');
}
function updateImageByIndex(index){
    nextSlide = 0;
    imgAsL.src = listImg[Calc(index, -1)].getAttribute('src');
    imgAsR.src = listImg[Calc(index, 1)].getAttribute('src');
    imgFeature.style.opacity = '0';
    highlightImage(index);
    setTimeout(()=>{
        imgFeature.src = listImg[index].getAttribute('src');
        imgFeature.style.opacity = '1';
    }, 400);
}
var tmp = imgAsLL;
tmp.src = imgAsLL.src;
function returnNormal_moveRight(){
    imgAsRR.src = imgAsR.src; 
    imgAsR.src = imgFeature.src;
    imgFeature.src = imgAsL.src;
    imgAsL.src = imgAsLL.src;
    
    imgAsRR.style = imgAsR.style;
    imgAsR.style = imgFeature.style;
    imgFeature.style = imgAsL.style;
    imgAsL.style = imgAsLL.style;
    
    imgAsLL.style = tmp.style;
    imgAsLL.src = tmp.src;
}
function updateImageByAutos(index){
    imgFeature.style.animation = 'moveRightAs 2s ease-in-out forwards';
    setTimeout(() => {
        imgAsL.style.animation = 'moveRightMain 2s ease-in-out forwards';
        imgAsLL.style.animation = 'moveRight 1s ease-in-out forwards';
        imgAsR.style.animation = 'moveRight 1s ease-in-out forwards';
        imgAsRR.style.animation = 'moveRight 1s ease-in-out forwards';}
        , 1000);
        setTimeout(() => {
            returnNormal_moveRight();
            tmp = imgAsLL;
            tmp.src = listImg[index].src;
        }, 3000);
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
        updateImageByAutos((current - 3 < 0) ? listImg.length - (3 - current) : current - 3);
        current--;
        if (current < 0) current = listImg.length - 1;
        highlightImage(current);
        setTimeout(() => {moveSlide()}, 8000);
    } 
    else {
        setTimeout(() => {moveSlide()}, nextSlide == -1 ? 15000 : 8000);
        nextSlide = 1;
    }
}
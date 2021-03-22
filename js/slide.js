var pageIndex = 0;
var delay = 3000;
var resizeflag = false;
var windowFirstSize = 0;
var windowEndSize = 0;

// n크기만큼 움직인다.
function MovePage(){
    var imgBackground = $(".main_slide_box ul");
    var imgs = $(".main_slide_box ul li");

    var imgHeight = imgs[pageIndex].clientHeight;
    var imgWidth = imgs[pageIndex].clientWidth;

//    console.log(imgHeight);
//    console.log(imgWidth);

    imgBackground.animate({left:-imgWidth * pageIndex},500);
}

function pageIndexPlus(){

    var maxIndex = 2;
    setInterval(() => {
        MovePage();
        pageIndex = pageIndex + 1 > maxIndex ? 0 : pageIndex + 1;
    }, delay);
}

//브라우저 사이즈 변화 감지.
$( window ).resize(function() {
    var imgBackground = $(".main_slide_box ul");
    var imgs = $(".main_slide_box ul li");

    var imgHeight = imgs[pageIndex].clientHeight;
    var imgWidth = imgs[pageIndex].clientWidth;
    
    if(resizeflag == false){
        resizeflag = true;
        windowFirstSize = window.outerWidth;

        return false;
    }
    console.log(window.outerWidth);
    //imgBackground.css("left",`${}`);

    windowEndSize = window.outerWidth;

    var remainder = windowFirstSize < windowEndSize ? (windowFirstSize - windowEndSize) : (windowEndSize - windowFirstSize);
    imgBackground.css("left",`${(((-imgWidth) - remainder)* pageIndex)}`);

    if(this.resizeTO) {
        clearTimeout(this.resizeTO);
    }
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 500);
 });

 // 브라우저 사이즈 조절 끝난 후 한 번 발동.
 $(window).on("resizeEnd",function(){
    console.log("아하");
    resizeflag = false;
});

pageIndexPlus();


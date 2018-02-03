

function response_background() {
    if (document.body.offsetHeight > document.body.offsetWidth) {
        document.all.background.src = "image/theme/1.jpg";
    }
    else {
        document.all.background.src = "image/theme/l-1.jpg";
    }
}
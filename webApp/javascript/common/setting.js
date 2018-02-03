function response_background() {
    let img = document.all.theme.getElementsByTagName("img");
    if (document.body.offsetHeight > document.body.offsetWidth) {
        for (let i = 0; i < img.length; i++) {
            img[i].src = "image/theme/" + (i + 1) + ".jpg";
        }
    }
    else {
        for (let i = 0; i < img.length; i++) {
            img[i].src = "image/theme/l-" + (i + 1) + ".jpg";
        }
    }
}
function change_theme(obj) {
    window.parent.$("#background").attr("src",obj.src);
}
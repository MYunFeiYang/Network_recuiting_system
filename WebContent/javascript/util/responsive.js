function welt_hidden() {
    let body_width=document.body.offsetWidth;
    if (body_width<760){
        let welt_hidden=document.getElementsByClassName("welt_hidden");
        for (let i=0;i<welt_hidden.length;i++){
            welt_hidden[i].style="position:fixed";
        }
    }
}
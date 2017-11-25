
function marquee(target) {
        var ul=document.getElementById(target).getElementsByTagName("ul")[0];
        var liList=ul.getElementsByTagName("li");
        var ulOffset=ul.offsetTop;
        for (var i=0;i<liList.length;i++){
            var top=liList[i].style.top;
            top=top.replace(/\s+|px/gi,"");
            top-=0.5;
            liList[i].style.top=top+"px";
            var liOffset=liList[i].offsetTop;
            var marginTop=ulOffset-liOffset;
            if(marginTop>0){
                var liText=liList[i].innerHTML;
                var removeLi=liList[i];
                removeLi.parentNode.removeChild(removeLi);
                var li=document.createElement("li");
                li.innerHTML=liText;
                var top=li.style.top;
                top=top.replace(/\s+|px/gi,"");
                top-=1;
                li.style.top=top+"px";
                ul.appendChild(li);
            }
        };
    }
function marquee_control() {
    setInterval("marquee(\"marquee1\"),marquee(\"marquee\")",1500);
}

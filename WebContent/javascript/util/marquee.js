
function marquee() {
        var ul=document.getElementById("marquee").getElementsByTagName("ul")[0];
        var liList=ul.getElementsByTagName("li");
        for (var i=0;i<liList.length;i++){
            var top=liList[i].style.top;
            top=top.replace(/\s+|px/gi,"");
            top-=20;
            liList[i].style.top=top+"px";
        };
        var liText=liList[0].innerHTML;
        ul.removeChild(liList[0]);
        var li=document.createElement("li");
        li.innerHTML=liText;
        ul.appendChild(li);
    }

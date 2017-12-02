"use strict"
function complete_content(){
    var query={};
    var content=document.getElementById("search-con").value;
    if (content!=""){
        query.content=content;
        $.ajax({
            url:"/public?public=query",
            data:query,
            type:"POST",
            dataType:"JSON",
            success:function (data) {
                show_preselected_search(data)
            },
            fail:function () {

            }
        })
    }else {
        return;
    }
}
function show_preselected_search(data) {
    var div=document.getElementById("preselected_search");
    div.style.display="block";
    div.innerHTML="";
    var ul=document.createElement("ul");
    div.appendChild(ul);
    for (var i=0;i<data.length;i++){
        var li=document.createElement("li");
        ul.appendChild(li);
        var a=document.createElement("a");
        a.text=data[i].company
        li.appendChild(a);
        li.setAttribute(`onclick`,`add_preselected_search_to_search(${i})`);
    }
    ul.children[0].focus();
}
function add_preselected_search_to_search(i) {
    var a=document.getElementById("preselected_search").children[0].children[i].children[0];
    document.getElementById("search-con").value=a.text;
}
function close_preselected_search() {
    document.getElementById("preselected_search").style.display="none";
}
function query() {
    alert("该功能还在完善");
    var search=document.getElementById("search-con").value;
}
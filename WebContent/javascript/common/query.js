"use strict"
// quick query
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
//filter query
function query_job_class() {
    $.ajax({
        url:"/school/job",
        type:"POST",
        dataType:"JSON",
        success:function (data) {
            insert_job_class(data);
        },
        fail:function () {

        }
    });
}
function insert_job_class(data) {
    var job_class=document.getElementById("job_class");
    job_class.innerHTML="";
    var ul=document.createElement("ul");
    ul.setAttribute("class","main")
    job_class.appendChild(ul);
    for (var i=0;i<data.length;i++){
        var href=data[i].href;
        var text=data[i].text;
        var li=document.createElement("li");
        ul.appendChild(li);
        var a=document.createElement("a");
        li.appendChild(a);
        a.text=text;
        a.setAttribute("href",href)
        a.setAttribute("onclick","return false");
        var span=document.createElement("span");
        span.setAttribute("class","glyphicon glyphicon-chevron-right");
        span.setAttribute("style","float:right;border:none");
        li.appendChild(span);
        li.setAttribute("onclick","query_filter_job(),query_filter_address(),query_company(),change_checked(event,'job_class')");
    }
    ul.children[0].classList.add("checked");
    change_footer_position();
}
function change_checked(event,id) {
    var job_class=document.getElementById(id);
    var ul=job_class.getElementsByTagName("ul");
    var li=ul[0].getElementsByTagName("li");
    var i=0;
    for (;i<li.length;i++){
        if (li[i].classList.toString().indexOf("checked")!=-1){
            li[i].classList.remove("checked");
        }
    }
    if (event.target.toString().indexOf("a")!=-1){
        event.target.parentNode.classList.add("checked");
    }else {
        event.target.classList.add("checked");
    }
}
function query_filter_job() {
    $.ajax({
        url:"/school/job",
        type:"POST",
        dataType:"JSON",
        success:function (data) {
            insert_filter_job(data);
        },
        fail:function () {

        }
    });
}
function insert_filter_job(data) {
    var filter_job=document.getElementById("filter_job");
    filter_job.innerHTML="";
    var ul=document.createElement("ul");
    filter_job.appendChild(ul);
    for (var i=0;i<data.length;i++){
        var href=data[i].href;
        var text=data[i].text;
        var li=document.createElement("li");
        ul.appendChild(li);
        li.setAttribute("style","float:left;padding: 2px 10px;list-style:none");
        var a=document.createElement("a");
        li.appendChild(a);
        li.setAttribute("onclick","change_checked(event,'filter_job')")
        a.text=text;
        a.setAttribute("href",href)
        a.setAttribute("onclick","return false");
    }
    ul.children[0].classList.add("checked");
    change_footer_position();
}

function query_filter_address() {
    $.ajax({
        url:"/school/address",
        type:"POST",
        dataType:"JSON",
        success:function (data) {
            insert_filter_address(data);
        },
        fail:function () {

        }
    });
}
function insert_filter_address(data) {
    document.getElementById("filter").style.display="block";
    var filter_address=document.getElementById("filter_address");
    filter_address.innerHTML="";
    var ul=document.createElement("ul");
    filter_address.appendChild(ul);
    for (var i=0;i<data.length;i++) {
        var href = data[i].href;
        var text = data[i].text;
        var li=document.createElement("li");
        ul.appendChild(li);
        li.setAttribute("style","float:left;padding: 2px 10px;list-style:none");
        var a=document.createElement("a");
        li.appendChild(a);
        li.setAttribute("onclick","change_checked(event,'filter_address')")
        a.setAttribute("href",href);
        a.setAttribute("onclick","return false")
        a.text=text;
    }
    ul.children[0].classList.add("checked");
}

function query_company() {
    $.ajax({
        url:"/school/company",
        type:"POST",
        dataType:"JSON",
        success:function (data) {
            insert_company(data)
        },
        fail:function () {

        }
    });
}
function insert_company(data) {
    var companys=document.getElementById("company");
    for (var i=0;i<data.length;i++){
        var company=data[i].company;
        var position=data[i].position;
        var address=data[i].address;
        var time=data[i].time;
        var tr=document.createElement("tr");
        companys.appendChild(tr);
        tr.setAttribute("class","row")
        var td1=document.createElement("td");
        var a1=document.createElement("a");
        a1.text=company;
        tr.appendChild(td1);
        td1.setAttribute("class","col-md-2");
        td1.appendChild(a1);
        var td2=document.createElement("td");
        var a2=document.createElement("a");
        a2.text=position;
        tr.appendChild(td2);
        td2.setAttribute("class","col-md-6");
        td2.appendChild(a2);
        var td3=document.createElement("td");
        var a3=document.createElement("a");
        a3.text=address;
        tr.appendChild(td3);
        td3.setAttribute("class","col-md-2");
        td3.appendChild(a3);
        var td4=document.createElement("td");
        var a4=document.createElement("a");
        a4.text=time;
        tr.appendChild(td4);
        td4.setAttribute("class","col-md-2");
        td4.appendChild(a4);
        a1.setAttribute("title",company);
        a2.setAttribute("title",position);
        a3.setAttribute("title",address);
        a4.setAttribute("title",time);
        a1.setAttribute("onclick","return false");
        a2.setAttribute("onclick","return false");
        a3.setAttribute("onclick","return false");
        a4.setAttribute("onclick","return false");
        a4.setAttribute("style","font-size:6px");
    }
}
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
        url:"/query/job",
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
        li.setAttribute("onclick","change_checked(event,'job_class',insert_filter_job(),query_filter_address()),query_company()");
    }
    ul.children[0].classList.add("checked");
    change_footer_position();
}

function insert_filter_job() {
    var filter_job=document.getElementById("filter_job");
    filter_job.innerHTML="";
    var job_class=document.getElementById("job_class").innerHTML;
    filter_job.innerHTML=job_class;
    var ul=filter_job.getElementsByTagName("ul")[0];
    ul.classList.remove("main");
    var li=ul.getElementsByTagName("li");
    for (var i=0;i<li.length;i++){
        var span=li[i].getElementsByTagName("span")[0];
        li[i].removeChild(span);
        li[i].setAttribute("onclick","change_checked(event,'filter_job'),query_company()");
    }
    change_footer_position();
}
function query_filter_address() {
    $.ajax({
        url:"/query/address",
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
        var a=document.createElement("a");
        li.appendChild(a);
        li.setAttribute("onclick","change_checked(event,'filter_address'),query_company()");
        a.setAttribute("href",href);
        a.setAttribute("onclick","return false")
        a.text=text;
    }
    ul.children[0].classList.add("checked");
}

function query_company() {
    var filter={};
    var filter_job=document.getElementById("filter_job");
    var job=filter_job.getElementsByTagName("li");
    for (var i=0;i<job.length;i++){
        if (job[i].classList.toString().indexOf("checked")!=-1){
            filter.job=job[i].firstChild.text;
        }
    };
    var filter_address=document.getElementById("filter_address");
    var address=filter_address.getElementsByTagName("li");
    for (var i=0;i<address.length;i++){
        if (address[i].classList.toString().indexOf("checked")!=-1){
            filter.address=address[i].firstChild.text;
        }
    };
    $.ajax({
        url:"/query/company",
        type:"POST",
        data:filter,
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
    companys.innerHTML="";
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
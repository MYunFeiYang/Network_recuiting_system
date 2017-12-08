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
}
function add_preselected_search_to_search(i) {
    var a=document.getElementById("preselected_search").children[0].children[i].children[0];
    document.getElementById("search-con").value=a.text;
}
function close_preselected_search() {
    document.getElementById("preselected_search").style.display="none";
}
function query() {
    close_preselected_search();
    var search_con=document.getElementById("search-con").value;
    var search={};
    search.content=search_con;
    $.ajax({
        url:"/public?public=query",
        data:search,
        type:"POST",
        dataType:"JSON",
        success:function () {
            
        },
        fail:function () {
            
        }
    })
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
        li.setAttribute("onclick","change_checked(event,'job_class',insert_filter_job(),get_address(insert_filter_address))");
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
        li[i].setAttribute("onclick","change_checked(event,'filter_job'),query_filter_position(this.firstChild.text)");
    }
    change_footer_position();
}
function get_address(event) {
    $.ajax({
        url:"/query/address",
        type:"POST",
        dataType:"JSON",
        success:function (data) {
            event(data);
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
        li.setAttribute("onclick","change_checked(event,'filter_address'),paging(1)");
        a.setAttribute("href",href);
        a.setAttribute("onclick","return false")
        a.text=text;
    }
    ul.children[0].classList.add("checked");
}
function query_filter_position(text) {
    var job={};
    job.job_name=text;
    $.ajax({
        url:"/query/position",
        type:"POST",
        data:job,
        dataType:"JSON",
        success:function (data) {
            insert_filter_position(data);
        },
        fail:function () {

        }
    });
}
function insert_filter_position(data) {
    document.getElementById("filter").style.display="block";
    var filter_position=document.getElementById("filter_position");
    filter_position.innerHTML="";
    var ul=document.createElement("ul");
    filter_position.appendChild(ul);
    filter_position.setAttribute("class","main");
    for (var i=0;i<data.length;i++) {
        var li=document.createElement("li");
        ul.appendChild(li);
        li.setAttribute("onclick","change_checked(event,'filter_position'),paging(1)");
        li.innerHTML=data[i].position;
    }
    ul.children[0].classList.add("checked");
}

function paging(pageNum) {
    var page={};
    page.pageSize=10;
    page.pageNum=pageNum;
    var filter_position=document.getElementById("filter_position");
    var position=filter_position.getElementsByTagName("li");
    for (var i=0;i<position.length;i++){
        if (position[i].classList.toString().indexOf("checked")!=-1){
            page.position=position[i].firstChild.text;
        }
    };
    var filter_address=document.getElementById("filter_address");
    var address=filter_address.getElementsByTagName("li");
    for (var i=0;i<address.length;i++){
        if (address[i].classList.toString().indexOf("checked")!=-1){
            page.address=address[i].firstChild.text;
        }
    };
    $.ajax({
        url:"/public?public=paging",
        data:page,
        type:"POST",
        dataType:"JSON",
        success:function (data) {
            pagingResult(data);
        },
        fail:function () {

        }
    })
}
function pagingResult(data) {
    var start=data[0].start;
    var end=data[0].end;
    var ul=document.getElementsByClassName("pagination")[0];
    ul.innerHTML="";
    for (var i=start;i<=end;i++){
        var li=document.createElement("li");
        var a=document.createElement("a");
        ul.append(li);
        li.appendChild(a);
        a.setAttribute("onclick","paging(this.text)");
        a.text=i;
    };
    var list=data[0].list;
    var company=document.getElementById("company");
    company.innerHTML="";
    for (var i=0;i<list.length;i++){
        var tr=document.createElement("tr");
        var td1=document.createElement("td");
        var td2=document.createElement("td");
        var td3=document.createElement("td");
        var td4=document.createElement("td");
        company.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        var a1=document.createElement("a");
        var a2=document.createElement("a");
        var a3=document.createElement("a");
        td1.appendChild(a1);
        td2.appendChild(a2);
        td3.appendChild(a3);
        a1.innerHTML=list[i].name;
        a2.innerHTML=list[i].position;
        a3.innerHTML=list[i].address;
        td4.innerHTML=list[i].time;
        tr.setAttribute("class","row");
        td1.setAttribute("class","col-md-2");
        td2.setAttribute("class","col-md-7");
        td3.setAttribute("class","col-md-2");
        td4.setAttribute("class","col-md-1");
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
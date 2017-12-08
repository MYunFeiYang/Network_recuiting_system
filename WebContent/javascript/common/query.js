"use strict";
// quick query
function complete_content(){
    let query={};
    let content=document.getElementById("search-con").value;
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
    }
}
function show_preselected_search(data) {
    let div=document.getElementById("preselected_search");
    div.style.display="block";
    div.innerHTML="";
    let ul=document.createElement("ul");
    div.appendChild(ul);
    for (let i=0;i<data.length;i++){
        let li=document.createElement("li");
        ul.appendChild(li);
        let a=document.createElement("a");
        a.text=data[i].company;
        li.appendChild(a);
        li.setAttribute(`onclick`,`add_preselected_search_to_search(${i})`);
    }
}
function add_preselected_search_to_search(i) {
    let a=document.getElementById("preselected_search").children[0].children[i].children[0];
    document.getElementById("search-con").value=a.text;
}
function close_preselected_search() {
    document.getElementById("preselected_search").style.display="none";
}
function query() {
    close_preselected_search();
    let search_con=document.getElementById("search-con").value;
    let search={};
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
    let job_class=document.getElementById("job_class");
    job_class.innerHTML="";
    let ul=document.createElement("ul");
    ul.setAttribute("class","main");
    job_class.appendChild(ul);
    for (let i=0;i<data.length;i++){
        let href=data[i].href;
        let text=data[i].text;
        let li=document.createElement("li");
        ul.appendChild(li);
        let a=document.createElement("a");
        li.appendChild(a);
        a.text=text;
        a.setAttribute("href",href);
        a.setAttribute("onclick","return false");
        let span=document.createElement("span");
        span.setAttribute("class","glyphicon glyphicon-chevron-right");
        span.setAttribute("style","float:right;border:none");
        li.appendChild(span);
        li.setAttribute("onclick","change_checked(event,'job_class',insert_filter_job(),get_address(insert_filter_address))");
    }
    ul.children[0].classList.add("checked");
    change_footer_position();
}

function insert_filter_job() {
    let filter_job=document.getElementById("filter_job");
    filter_job.innerHTML="";
    let job_class=document.getElementById("job_class").innerHTML;
    filter_job.innerHTML=job_class;
    let ul=filter_job.getElementsByTagName("ul")[0];
    ul.classList.remove("main");
    let li=ul.getElementsByTagName("li");
    for (let i=0;i<li.length;i++){
        let span=li[i].getElementsByTagName("span")[0];
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
    let filter_address=document.getElementById("filter_address");
    filter_address.innerHTML="";
    let ul=document.createElement("ul");
    filter_address.appendChild(ul);
    for (let i=0;i<data.length;i++) {
        let href = data[i].href;
        let text = data[i].text;
        let li=document.createElement("li");
        ul.appendChild(li);
        let a=document.createElement("a");
        li.appendChild(a);
        li.setAttribute("onclick","change_checked(event,'filter_address'),paging(1)");
        a.setAttribute("href",href);
        a.setAttribute("onclick","return false")
        a.text=text;
    }
    ul.children[0].classList.add("checked");
}
function query_filter_position(text) {
    let job={};
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
    let filter_position=document.getElementById("filter_position");
    filter_position.innerHTML="";
    let ul=document.createElement("ul");
    filter_position.appendChild(ul);
    filter_position.setAttribute("class","main");
    for (let i=0;i<data.length;i++) {
        let li=document.createElement("li");
        ul.appendChild(li);
        li.setAttribute("onclick","change_checked(event,'filter_position'),paging(1)");
        li.innerHTML=data[i].position;
    }
    ul.children[0].classList.add("checked");
}

function paging(pageNum) {
    let page={};
    page.pageSize=10;
    page.pageNum=pageNum;
    let filter_position=document.getElementById("filter_position");
    let position=filter_position.getElementsByTagName("li");
    for (let i=0;i<position.length;i++){
        if (position[i].classList.toString().indexOf("checked")!=-1){
            page.position=position[i].firstChild.text;
        }
    };
    let filter_address=document.getElementById("filter_address");
    let address=filter_address.getElementsByTagName("li");
    for (let i=0;i<address.length;i++){
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
    let start=data[0].start;
    let end=data[0].end;
    let ul=document.getElementsByClassName("pagination")[0];
    ul.innerHTML="";
    for (let i=start;i<=end;i++){
        let li=document.createElement("li");
        let a=document.createElement("a");
        ul.append(li);
        li.appendChild(a);
        a.setAttribute("onclick","paging(this.text)");
        a.text=i;
    };
    let list=data[0].list;
    let company=document.getElementById("company");
    company.innerHTML="";
    for (let i=0;i<list.length;i++){
        let tr=document.createElement("tr");
        let td1=document.createElement("td");
        let td2=document.createElement("td");
        let td3=document.createElement("td");
        let td4=document.createElement("td");
        company.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        let a1=document.createElement("a");
        let a2=document.createElement("a");
        let a3=document.createElement("a");
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
    let job_class=document.getElementById(id);
    let ul=job_class.getElementsByTagName("ul");
    let li=ul[0].getElementsByTagName("li");
    let i=0;
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
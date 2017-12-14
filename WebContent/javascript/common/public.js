"use strict";
let n_industry;
let n_address;
let n_position;
let n_company;
let ul;
let li;
function get_news(user_type) {
    let user = {};
    user.user_type = user_type;
    $.ajax({
        url: "../public?public=get_news",
        data: user,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            show_news(data)
        },
        fail: function () {

        }
    })
}

function show_news(data) {
    document.getElementById("marquee").style.display = "block";
    let ul = document.getElementById("marquee").children[0];
    ul.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        let li = document.createElement("li");
        ul.appendChild(li);
        let a = document.createElement("a");
        li.appendChild(a);
        a.text = data[i].company;
        a.href = data[i].href;
        let span = document.createElement("span");
        span.setAttribute("class", "glyphicon glyphicon-log-in");
        li.appendChild(span);
        span.setAttribute("style", "float:right")
    }
}

//filter query
function query_industry() {
    $.ajax({
        url: "/query/industry",
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            insert_industry(data);
        },
        fail: function () {

        }
    });
}

function insert_industry(data) {
    n_industry = document.getElementById("industry");
    n_industry.innerHTML = "";
    let ul = document.createElement("ul");
    n_industry.appendChild(ul);
    for (let i = 0; i < data.length; i++) {
        let href = data[i].href;
        let text = data[i].text;
        let li = document.createElement("li");
        ul.appendChild(li);
        let a = document.createElement("a");
        li.appendChild(a);
        a.text = text;
        a.setAttribute("href", href);
        a.setAttribute("onclick", "return false");
        li.onclick = function () {
            change_checked(event, 'industry');
            get_address(insert_address);
            query_position(this.innerText)
        };
    }
    ul.children[0].setAttribute("class", "checked");
}

function get_address(event) {
    $.ajax({
        url: "/query/address",
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            event(data);
        },
        fail: function () {

        }
    });
}

function insert_address(data) {
    document.getElementById("filter").style.display = "block";
    n_address = document.getElementById("address");
    n_address.classList.remove("hidden");
    n_address.innerHTML = "";
    let ul = document.createElement("ul");
    n_address.appendChild(ul);
    for (let i = 0; i < data.length; i++) {
        let href = data[i].href;
        let text = data[i].text;
        let li = document.createElement("li");
        ul.appendChild(li);
        let a = document.createElement("a");
        li.appendChild(a);
        li.onclick=function(){
            change_checked(event,'address');
            paging(1);
        };
        a.setAttribute("href", href);
        a.setAttribute("onclick", "return false");
        a.text = text;
    }
    ul.children[0].setAttribute("class", "checked");
}

function query_position(text) {
    let job = {};
    job.job_name = text;
    $.ajax({
        url: "/query/position",
        type: "POST",
        data: job,
        dataType: "JSON",
        success: function (data) {
            insert_position(data);
        },
        fail: function () {

        }
    });
}

function insert_position(data) {
    document.getElementById("filter").style.display = "block";
    n_position = document.getElementById("position");
    n_position.classList.remove("hidden");
    n_position.innerHTML = "";
    let ul = document.createElement("ul");
    n_position.appendChild(ul);
    if (data.length>0) {
        for (let i = 0; i < data.length; i++) {
            let li = document.createElement("li");
            ul.appendChild(li);
            li.onclick = function () {
                change_checked(event, 'position');
                paging(1);
            };
            li.innerHTML = data[i].position;
        }
        ul.children[0].setAttribute("class", "checked");
    }
}

function paging(pageNum) {
    let page = {};
    page.pageSize = 12;
    page.pageNum = pageNum;
    n_position = document.getElementById("position");
    li = position.getElementsByTagName("li");
    for (let i = 0; i < li.length; i++) {
        if (li[i].classList.toString().indexOf("checked") !== -1) {
            page.position = li[i].firstChild.text;
        }
    }
    n_address = document.getElementById("address");
    li = n_address.getElementsByTagName("li");
    for (let i = 0; i < li.length; i++) {
        if (li[i].classList.toString().indexOf("checked") !== -1) {
            page.address = li[i].firstChild.text;
        }
    }
    $.ajax({
        url: "/public?public=paging",
        data: page,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            pagingResult(data);
        },
        fail: function () {

        }
    });
}

function pagingResult(data) {
    let start = data[0].start;
    let end = data[0].end;
    ul = document.getElementsByClassName("pagination")[0];
    ul.innerHTML = "";
    for (let i = start; i <= end; i++) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        ul.append(li);
        li.appendChild(a);
        a.setAttribute("onclick", "paging(this.text)");
        a.text = i;
    }
    let list = data[0].list;
    n_company = document.getElementById("company");
    n_company.innerHTML = "";
    for (let i = 0; i < list.length; i++) {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        n_company.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        let a1 = document.createElement("a");
        let a2 = document.createElement("a");
        let a3 = document.createElement("a");
        td1.appendChild(a1);
        td2.appendChild(a2);
        td3.appendChild(a3);
        a1.innerHTML = list[i].name;
        a2.innerHTML = list[i].position;
        a3.innerHTML = list[i].address;
        td4.innerHTML = list[i].time;
        td1.width="16%";
        td2.width="64%";
        td3.width="10%";
        td4.width="10%";
        td1.height="20px";
        td2.height="20px";
        td2.height="20px";
        td2.height="20px";
    }
}

function change_checked(event, id) {
    let industry = document.getElementById(id);
    let ul = industry.getElementsByTagName("ul");
    let li = ul[0].getElementsByTagName("li");
    let i = 0;
    for (; i < li.length; i++) {
        if (li[i].classList.toString().indexOf("checked") !== -1) {
            li[i].classList.remove("checked");
        }
    }
    if (event.target.toString().indexOf("a") !==-1) {
        event.target.parentNode.classList.add("checked");
    } else {
        event.target.classList.add("checked");
    }
}
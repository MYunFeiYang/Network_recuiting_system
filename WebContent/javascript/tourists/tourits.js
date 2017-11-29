function init_filter() {
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
    $.ajax({
        url:"/school/company",
        type:"POST",
        dataType:"JSON",
        success:function (data) {
            init_school(data)
        },
        fail:function () {

        }
    });
}
function insert_filter_job(data) {
    document.getElementById("tourists").classList.remove("hidden")
    var fliter_job_left=document.getElementById("fliter_job_left");
    var ul=document.createElement("ul");
    ul.setAttribute("class","main")
    fliter_job_left.appendChild(ul);
    var fliter_job_right=document.getElementById("fliter_job_right");
    for (var i=0;i<data.length;i++){
        var href=data[i].href;
        var text=data[i].text;
        var li=document.createElement("li");
        ul.appendChild(li);
        var a=document.createElement("a");
        li.appendChild(a);
        li.setAttribute("style","border:1px slide green")
        a.text=text;
        a.setAttribute("href",href);
        var span=document.createElement("span");
        span.setAttribute("class","glyphicon glyphicon-chevron-right");
        span.setAttribute("style","float:right;border:none");
        li.appendChild(span);
        var col=document.createElement("div");
        fliter_job_right.appendChild(col);
        col.setAttribute("class","col-md-3 col-sm-4");
        var a1=document.createElement("a");
        a1.text=text;
        a1.setAttribute("href",href);
        col.appendChild(a1);
    }
    change_footer_position();
}
function insert_filter_address(data) {
    var fliter_address=document.getElementById("fliter_address");
    for (var i=0;i<data.length;i++) {
        var href = data[i].href;
        var text = data[i].text;
        var col=document.createElement("div");
        fliter_address.appendChild(col);
        col.setAttribute("class","col-md-2");
        var a=document.createElement("a");
        col.appendChild(a);
        a.setAttribute("href",href);
        a.text=text;
    }
}
function init_school(data) {
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
        td2.setAttribute("class","col-md-5");
        td2.appendChild(a2);
        var td3=document.createElement("td");
        var a3=document.createElement("a");
        a3.text=address;
        tr.appendChild(td3);
        td3.setAttribute("class","col-md-3");
        td3.appendChild(a3);
        var td4=document.createElement("td");
        var a4=document.createElement("a");
        a4.text=time;
        tr.appendChild(td4);
        td4.setAttribute("class","col-md-2");
        td4.appendChild(a4);
    }
}


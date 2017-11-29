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
        col.setAttribute("class","col-md-3");
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


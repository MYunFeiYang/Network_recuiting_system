function auto_match() {
    let user=JSON.parse(document.cookie.split(";")[0].split("=")[1]);
    $.ajax({
        url:"/person?person=auto_match",
        data:user,
        type:"POST",
        dataType:"JSON",
        success:function () {
            
        },
        fail:function () {
            
        }
    })
    
}
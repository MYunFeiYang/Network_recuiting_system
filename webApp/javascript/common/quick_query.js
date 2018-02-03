// quick query
function complete_content() {
    let query = {};
    let content = document.getElementById("search-con").value;
    if (content !== "") {
        query.content = content;
        $.ajax({
            url: "/public?public=query",
            data: query,
            type: "POST",
            dataType: "JSON",
            success: function (data) {
                show_preselected_search(data)
            },
            fail: function () {

            }
        })
    }
}

function show_preselected_search(data) {
    let div = document.getElementById("preselected_search");
    div.style.display = "block";
    div.innerHTML = "";
    let ul = document.createElement("ul");
    div.appendChild(ul);
    for (let i = 0; i < data.length; i++) {
        let li = document.createElement("li");
        ul.appendChild(li);
        let a = document.createElement("a");
        a.text = data[i].company;
        li.appendChild(a);
        li.onclick = add_preselected_search_to_search(i);
    }
}

function add_preselected_search_to_search(i) {
    let a = document.getElementById("preselected_search").children[0].children[i].children[0];
    document.getElementById("search-con").value = a.text;
}

function query() {
    document.all.preselected_search.innerHTML="";
    let search_con = document.getElementById("search-con").value;
    let search = {};
    search.content = search_con;
    $.ajax({
        url: "/public?public=query",
        data: search,
        type: "POST",
        dataType: "JSON",
        success: function (data) {

        },
        fail: function () {

        }
    })
}
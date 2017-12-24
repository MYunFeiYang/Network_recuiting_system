let n_resume;
let row;
let n_confirm_box_p;
let n_identification;
let n_name;
let n_age;
let n_sex;
let n_origin;
let n_collage;
let n_specialty;
let n_degree;
let n_admission_data;
let n_graduation_data;
let n_operate;
let c_identification;
let c_name;
let c_age;
let c_sex;
let c_origin;
let c_collage;
let c_specialty;
let c_degree;
let c_admission_data;
let c_graduation_data;
let o_resume;

function init_resume() {
    let user_string = document.cookie.split(";")[0].split("=")[1];
    let user = JSON.parse(user_string);
    $.ajax({
        url: '/person?person=initResume',
        data: user,
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            if (data !== null) {
                document.getElementById("resume_name").value = data.name;
                document.getElementById("telephone").value = data.telephone;
                document.getElementById("resume_email").value = data.email;
            }
        },
        fail: function () {

        }
    })
}

function add_resume() {
    let user_string = document.cookie.split(";")[0].split("=")[1];
    let user = JSON.parse(user_string);
    let nickname = user.nickname;
    let password = user.password;
    let name = document.getElementById("resume_name").value;
    let age = document.getElementById("age").value;
    let sex = document.getElementById("sex").value;
    let origin = document.getElementById("origin").value;
    let collage = document.getElementById("collage").value;
    let specialty = document.getElementById("specialty").value;
    let degree = document.getElementById("degree").value;
    let admission_data = document.getElementById("admission_data").value;
    let graduation_data = document.getElementById("graduation_data").value;
    let telephone = document.getElementById("telephone").value;
    let email = document.getElementById("resume_email").value;
    n_confirm_box_p = document.getElementById("confirm_resume_box");
    if (age === "") {
        n_confirm_box_p.classList.remove("hidden");
        n_confirm_box_p.innerHTML = "请输入年龄";
        n_confirm_box_p.setAttribute("class", "alert-warning");
    } else if (origin === "") {
        n_confirm_box_p.classList.remove("hidden");
        n_confirm_box_p.innerHTML = "请输入籍贯";
        n_confirm_box_p.setAttribute("class", "alert-warning");
    } else if (collage === "") {
        n_confirm_box_p.classList.remove("hidden");
        n_confirm_box_p.innerHTML = "请输入毕业学校";
        n_confirm_box_p.setAttribute("class", "alert-warning");
    } else if (specialty === "") {
        n_confirm_box_p.classList.remove("hidden");
        n_confirm_box_p.innerHTML = "请输入专业";
        n_confirm_box_p.setAttribute("class", "alert-warning");
    } else if (admission_data === "") {
        n_confirm_box_p.classList.remove("hidden");
        n_confirm_box_p.innerHTML = "请输入入学时间";
        n_confirm_box_p.setAttribute("class", "alert-warning");
    } else if (graduation_data === "") {
        n_confirm_box_p.classList.remove("hidden");
        n_confirm_box_p.innerHTML = "请输入毕业时间";
        n_confirm_box_p.setAttribute("class", "alert-warning");
    } else {
        n_confirm_box_p.classList.remove("hidden");
        n_confirm_box_p.innerHTML = "通过验证";
        n_confirm_box_p.setAttribute("class", "alert-success");
        o_resume = {};
        o_resume.nickname = nickname;
        o_resume.password = password;
        o_resume.name = name;
        o_resume.age = age;
        o_resume.sex = sex;
        o_resume.origin = origin;
        o_resume.collage = collage;
        o_resume.specialty = specialty;
        o_resume.degree = degree;
        o_resume.admission_data = admission_data;
        o_resume.graduation_data = graduation_data;
        o_resume.telephone = telephone;
        o_resume.email = email;
        $.ajax({
            url: '/person?person=addResume',
            data: o_resume,
            type: 'POST',
            dataType: 'JSON',
            success: function (data) {
                if (data.msg === "add_resume_success") {
                    n_confirm_box_p.classList.remove("hidden");
                    n_confirm_box_p.innerHTML = "简历添加成功";
                    n_confirm_box_p.setAttribute("class", "alert-success");
                } else {
                    n_confirm_box_p.classList.remove("hidden");
                    n_confirm_box_p.innerHTML = "请不要重复添加相同的简历";
                    n_confirm_box_p.setAttribute("class", "alert-warning");
                }
            },
            fail: function () {

            }
        })
    }
}

function get_resume1() {
    let user_string = document.cookie.split(";")[0].split("=")[1];
    let user = JSON.parse(user_string);
    $.ajax({
        url: '/person?person=manageResume',
        data: user,
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            n_resume = document.getElementById("resume");
            n_resume.parentNode.classList.remove("hidden");
            n_resume.innerHTML="";
            for (let i = 0; i < data.length; i++) {
                row = document.createElement("tr");
                n_resume.appendChild(row);
                n_identification = document.createElement("td");
                n_name = document.createElement("td");
                n_age = document.createElement("td");
                n_sex = document.createElement("td");
                n_origin = document.createElement("td");
                n_collage = document.createElement("td");
                n_specialty = document.createElement("td");
                n_degree = document.createElement("td");
                n_admission_data = document.createElement("td");
                n_graduation_data = document.createElement("td");
                n_operate = document.createElement("td");
                row.appendChild(n_identification);
                row.appendChild(n_name);
                row.appendChild(n_age);
                row.appendChild(n_sex);
                row.appendChild(n_origin);
                row.appendChild(n_collage);
                row.appendChild(n_specialty);
                row.appendChild(n_degree);
                row.appendChild(n_admission_data);
                row.appendChild(n_graduation_data);
                row.appendChild(n_operate);
                c_identification = data[i].identification;
                c_name = data[i].name;
                c_age = data[i].age;
                c_sex = data[i].sex;
                c_origin = data[i].origin;
                c_collage = data[i].collage;
                c_specialty = data[i].specialty;
                c_degree = data[i].degree;
                c_admission_data = data[i].admission_data;
                c_graduation_data = data[i].graduation_data;
                n_identification.innerHTML = `<input type="text" size="6" maxlength="20" disabled="disabled" value="${c_identification}">`;
                n_name.innerHTML = `<input type="text" size="6" maxlength="8" disabled="disabled" value="${c_name}">`;
                n_age.innerHTML = `<input type="text" size="3" maxlength="3" value="${c_age}">`;
                n_sex.innerHTML = `<input type="text" size="3" maxlength="5" disabled="disabled" value="${c_sex}">`;
                n_origin.innerHTML = `<input type="text" size="10" maxlength="20" disabled="disabled" value="${c_origin}">`;
                n_collage.innerHTML = `<input type="text" size="10" maxlength="20" value="${c_collage}">`;
                n_specialty.innerHTML = `<input type="text" size="10" maxlength="20" value="${c_specialty}">`;
                n_degree.innerHTML = `<input type="text" size="8" maxlength="8" value="${c_degree}">`;
                n_admission_data.innerHTML = `<input type="text" size="10" maxlength="20" value="${c_admission_data}">`;
                n_graduation_data.innerHTML = `<input type="text" size="10" maxlength="20" value="${c_graduation_data}">`;
                n_operate.innerHTML = `<button class="btn btn-primary btn-sm" onclick="modify_resume(this)">保存</button><button class="btn btn-danger btn-sm" onclick="delete_resume(this)">删除</button>`
            }
        },
        fail: function () {

        }
    })
}

function modify_resume(obj) {
    row = obj.parentNode.parentNode;
    c_identification = row.children[0].firstChild.value;
    c_age = row.children[2].firstChild.value;
    c_collage = row.children[5].firstChild.value;
    c_specialty = row.children[6].firstChild.value;
    c_degree = row.children[7].firstChild.value;
    c_admission_data = row.children[8].firstChild.value;
    c_graduation_data = row.children[9].firstChild.value;
    o_resume = {};
    o_resume.identification = c_identification;
    o_resume.age = c_age;
    o_resume.collage = c_collage;
    o_resume.specialty = c_specialty;
    o_resume.degree = c_degree;
    o_resume.admission_data = c_admission_data;
    o_resume.graduation_data = c_graduation_data;
    $.ajax({
        url: "/person?person=modifyResume",
        data: o_resume,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            if (data.msg === "modify_resume_success") {
                row.classList.add("success");
            } else {
                row.classList.add("warning");
            }
        },
        fail: function () {

        }
    })
}

function delete_resume(obj) {
    row = obj.parentNode.parentNode;
    c_identification = row.children[0].firstChild.value;
    o_resume = {};
    o_resume.identification = c_identification;
    $.ajax({
        url: "/person?person=deleteResume",
        data: o_resume,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            if (data.msg === "delete_resume_success") {
                row.classList.add("hidden");
            }
        },
        fail: function () {

        }
    })
}
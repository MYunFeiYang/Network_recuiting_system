let n_resume;
let row;
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
function init_resume_ajax() {
    let user_string = document.cookie.split(";")[0].split("=")[1];
    let user = JSON.parse(user_string);
    $.ajax({
        url: '/person?person=manageResume',
        data: user,
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            init_resume(data);
        },
        fail: function () {

        }
    })
}
function init_resume(data) {
    n_resume=document.getElementById("resume");
    for (let i=0;i<data.length;i++){
        row=document.createElement("tr");
        n_resume.appendChild(row);
        n_identification=document.createElement("td");
        n_name=document.createElement("td");
        n_age=document.createElement("td");
        n_sex=document.createElement("td");
        n_origin=document.createElement("td");
        n_collage=document.createElement("td");
        n_specialty=document.createElement("td");
        n_degree=document.createElement("td");
        n_admission_data=document.createElement("td");
        n_graduation_data=document.createElement("td");
        n_operate=document.createElement("td");
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
        c_identification=data[i].identification;
        c_name=data[i].name;
        c_age=data[i].age;
        c_sex=data[i].sex;
        c_origin=data[i].origin;
        c_collage=data[i].collage;
        c_specialty=data[i].specialty;
        c_degree=data[i].degree;
        c_admission_data=data[i].admission_data;
        c_graduation_data=data[i].graduation_data;
        n_identification.innerHTML=`<input type="text" size="6" maxlength="20" value="${c_identification}">`;
        n_name.innerHTML=`<input type="text" size="6" maxlength="8" value="${c_name}">`;
        n_age.innerHTML=`<input type="text" size="3" maxlength="3" value="${c_age}">`;
        n_sex.innerHTML=`<input type="text" size="3" maxlength="5" value="${c_sex}">`;
        n_origin.innerHTML=`<input type="text" size="10" maxlength="20" value="${c_origin}">`;
        n_collage.innerHTML=`<input type="text" size="10" maxlength="20" value="${c_collage}">`;
        n_specialty.innerHTML=`<input type="text" size="10" maxlength="20" value="${c_specialty}">`;
        n_degree.innerHTML=`<input type="text" size="8" maxlength="8" value="${c_degree}">`;
        n_admission_data.innerHTML=`<input type="text" size="10" maxlength="20" value="${c_admission_data}">`;
        n_graduation_data.innerHTML=`<input type="text" size="10" maxlength="20" value="${c_graduation_data}">`;
        n_operate.innerHTML=`<button class="btn btn-primary btn-sm">保存</button><button class="btn btn-danger btn-sm">删除</button>`
    }
}

import axios from 'axios';
import qs from 'qs'

const path = 'http://localhost:80'
export function LoginSession (data, user) {
    user.login = data;
    axios({
        method: 'post',
        url: `${path}/public?public=loginSession`,
        data: qs.stringify(user),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    }).then(function (response) {
        
    }).catch(function (error) {
        console.log(error);
    });
}


// function init_user(nickname) {
//     $("#register_btu").html("");
//     $("#login_btu").html(nickname);
//     $("#user_center").html("");
// }

// function get_head_picture(user) {
//     $.ajax({
//         url: '/public?public=getHeadPicture',
//         data: user,
//         type: "POST",
//         dataType: "JSON",
//         success: function (data) {
//             if (data.email !== undefined) {
//                 show_head_picture(data)
//             }
//         }
//     })
// }

// function show_head_picture(data) {
//     let email = data.email;
//     let fileType = data.fileType;
//     let fileName = data.fileName;
//     let src = "/resource/files" + "/" + email + "/" + fileType + "/" + fileName;
//     $("#head_picture").attr("src", src);
//     $("#head_picture").removeClass("hidden");

// }

// function job_reg() {
//     $.ajax({
//         url: "/person?person=jobReg",
//         type: "GET",
//         dataType: "JSON",
//         success: function (data) {
//             if (data !== null) {
//                 show_jobs(data)
//             }
//         }
//     })
// }

// function resume_reg() {
//     $.ajax({
//         url: "/enterprise?enterprise=resumeReg",
//         type: "GET",
//         dataType: "JSON",
//         success: function (data) {
//             if (data !== null) {
//                 show_resumes(data)
//             }
//         }
//     })
// }

// function show_jobs(data) {
//     $("#job_and_resume").html(`<thead>
//         <tr>
//             <td>姓名</td>
//             <td>城市</td>
//             <td>行业</td>
//             <td>岗位类型</td>
//             <td>投递时间</td>
//             <td>有效时间</td>
//             <td>电话</td>
//             <td>邮箱</td>
//         </tr>
//         </thead>
//          <tbody>

//         </tbody>`)
//     for (var item of data) {
//         $("#job_and_resume tbody:first").append(`<tr>
//             <td>${item.name}</td>
//             <td>${item.address}</td>
//             <td>${item.industry}</td>
//             <td>${item.position}</td>
//             <td>${item.publish_time}</td>
//             <td>${item.effective_time}</td>
//             <td>${item.telephone}</td>
//             <td>${item.email}</td>
//         </tr>`)
//     }
// }
// function show_resumes(data) {
//     $("#job_and_resume").html(`<thead>
//         <tr>
//             <td>姓名</td>
//             <td>性别</td>
//             <td>年龄</td>
//             <td>学校</td>
//             <td>专业</td>
//             <td>毕业时间</td>
//             <td>籍贯</td>
//             <td>教育程度</td>
//             <td>电话</td>
//             <td>邮箱</td>
//         </tr>
//         </thead>
//          <tbody>

//         </tbody>`)
//     for (var item of data) {
//         console.table(item)
//         $("#job_and_resume tbody:first").append(`<tr>
//             <td>${item.name}</td>
//             <td>${item.sex}</td>
//             <td>${item.age}</td>
//             <td>${item.collage}</td>
//             <td>${item.specialty}</td>
//             <td>${item.graduation_data}</td>
//             <td>${item.origin}</td>
//             <td>${item.degree}</td>
//             <td>${item.telephone}</td>
//             <td>${item.email}</td>
//         </tr>`)
//     }
// }
"use strict";
let n_industry;
let n_address;
let n_position;
let c_industry_init;

function get_address(address) {
    $.ajax({
        url: "/query/address",
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            n_address = document.getElementById(address);
            for (let i = 1; i < data.length; i++) {
                let option = document.createElement("option");
                n_address.appendChild(option);
                option.value = data[i].text;
                option.innerHTML = data[i].text;
            }
        },
        fail: function () {

        }
    });
}

function get_industry(industry) {
    $.ajax({
        url: "/query/industry",
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            n_industry = document.getElementById(industry);
            for (let i = 1; i < data.length; i++) {
                let option = document.createElement("option");
                n_industry.appendChild(option);
                option.value = data[i].text;
                option.innerHTML = data[i].text;
            }
        },
        fail: function () {

        }
    });
}

function get_position(industry, position) {
    let job = {};
    c_industry_init = document.getElementById(industry).value;
    job.job_name = c_industry_init;
    $.ajax({
        url: "/query/position",
        type: "POST",
        data: job,
        dataType: "JSON",
        success: function (data) {
            n_position = document.getElementById(position);
            n_position.innerHTML = "";
            for (let i = 1; i < data.length; i++) {
                let option = document.createElement("option");
                n_position.appendChild(option);
                option.value = data[i].position;
                option.innerHTML = data[i].position;
            }
        },
        fail: function () {

        }
    });
}
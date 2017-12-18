function key_down_event(id) {
    document.getElementById(id).onkeyup = function (e) {
        if (window.event)//如果window.event对象存在，就以此事件对象为准
            e = window.event;
        let code = e.charCode || e.keyCode;
        if (code === 13) {
            if (id === "login") {
                reset_user();
                login();
            } else if (id === "preselected_search") {
                query();
            }
        }
    }
}

function direction_key_event(id) {
    document.getElementById(id).onkeyup = function (e) {
        if (window.event)//如果window.event对象存在，就以此事件对象为准
            e = window.event;
        let code = e.charCode || e.keyCode;
        let inputs = document.getElementById(id).getElementsByTagName("input");
        let i = 0;
        for (; i < inputs.length; i++) {
            if (inputs[i].id === document.activeElement.id) {
                break;
            }
        }
        if (code === 37) {//左方向键

        } else if (code === 38) {//上方向键
            if (i > 0) {
                i--;
                inputs[i].focus();
            }
        } else if (code === 39) {//右方向键

        } else if (code === 40) {//下方向键
            if (i < inputs.length) {
                i++;
                inputs[i].focus();
            }
        }
    }

}
// 使用MVVM框架另行封装

function processReturn(data, success, fail) {
    if (data.code === 401) {
        location = '/login.html';
    }else{
        data.code === 200 ? success && success(data.data) : fail && fail(data.code, data.msg);
    }
}

// 错误默认处理器
function defaultFailProcessor(code, msg) {
    alert(msg);
}

// 统一请求方式
function request(url, type, data, success, fail = defaultFailProcessor) {
    $.ajax({
        url: url,
        type: type,
        data: data,
        dataType: 'json',
        success: function (data) {
            processReturn(data, success, fail)
        },
        error: function () {
            fail && fail(-1, '连接服务器失败');
        },
        beforeSend: function () {

        },
        complete: function () {

        }
    })
}

function post(url, data, success, fail = defaultFailProcessor) {
    request(url, 'post', data, success, fail);
}


function get(url, data, success, fail = defaultFailProcessor) {
    request(url, 'get', data, success, fail);
}
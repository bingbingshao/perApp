import FetchUrl from "./Config";

const FetchNet = {
    jsonToFormdata(param) {
        var data = new FormData();
        for (var key in param) {
            var value = param[key];
            data.append(key, value);
        }
        return data;
    },
    fetchGetJson(url, param, success, fail) {
        fetch(FetchUrl.baseUrl + url, {
            method: 'GET',
            body: this.jsonToFormdata(param),
        }).then(response => response.json())
            .then(json => {
                success(json);
            })
            .catch(function (error) {
                fail(error);
            })
    },
    fetchPostJson(url, param, success, fail) {
        fetch(FetchUrl.baseUrl + url, {
            method: 'POST',
            body: this.jsonToFormdata(param),
        }).then(response => response.json())
            .then(json => {
                success(json);
            })
            .catch(function (error) {
                fail(error);
            })
    },
    uploadImage(url, params, success, fail) {
        // console.log("params",params);
        fetch(FetchUrl.baseUrl + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data;charset=utf-8',
            },
            body: this.jsonToFormdata(params),
        }).then(response => response.json())
            .then(json => {
                success(json);
            })
            .catch(function (error) {
                fail(error);
            })
    }
}

export default FetchNet;
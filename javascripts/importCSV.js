function importCSV(fileName) {
    var _this = this;
    this._fileName = fileName;
    return new Promise(function (resolve, reject) {
        _this._loadCSV().then (function (str) {
            var arr = [];
            var tmp = str.split("\n");
            for(var i=0;i<tmp.length;++i){
                arr[i] = tmp[i].split(',');
            }
            resolve(arr);
        });
    });
}

importCSV.prototype._loadCSV = function () {
    var _this = this;
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open("get", _this._fileName, true);
        request.send(null);
        request.onload = function(){
            resolve(request.responseText);
        }
    });
}


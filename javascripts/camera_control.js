function cameraControl(viewer) {
    var _this = this;
    _this._viewer = viewer;
    var _cameraHome;
    var _cameraStep2;
    var _cameraStep3;
    var _cameraStep4_1;
    var _cameraStep4_2;
    var _cameraStep5;
    var _cameraStep6_1;
    var _cameraStep6_2;
    var _cameraDetail1_1;
    var _cameraDetail1_2;
    var _cameraDetail1_3;
    var _cameraDetail1_4;
    var _cameraDetail3_1;
    _this._loadCameraData();
}

cameraControl.prototype._loadCameraData = function () {
    var _this = this;  
    var fileName = "/json/front_door_camera_positions.json?201701091002";
    $.get(fileName, function () {
        $.getJSON(fileName, function (data) {
            if (data) {
                $.each(data.cameras, function (key, val) {
                    var position = new Communicator.Point3(
                        val.position.x,
                        val.position.y,
                        val.position.z
                    );
                    var target = new Communicator.Point3(
                        val.target.x,
                        val.target.y,
                        val.target.z
                    );
                    var up = new Communicator.Point3(
                        val.up.x,
                        val.up.y,
                        val.up.z
                    );
                    if (_this._cameraHome == undefined) {
                        _this._cameraHome = Communicator.Camera.create(position, target, up, val.projection, val.width, val.height, val.nearLimit);
                    } else if (_this._cameraStep2 == undefined) {
                        _this._cameraStep2 = Communicator.Camera.create(position, target, up, val.projection, val.width, val.height, val.nearLimit);
                    } else if (_this._cameraStep3 == undefined) {
                        _this._cameraStep3 = Communicator.Camera.create(position, target, up, val.projection, val.width, val.height, val.nearLimit);
                    } else if (_this._cameraStep4_1 == undefined) {
                        _this._cameraStep4_1 = Communicator.Camera.create(position, target, up, val.projection, val.width, val.height, val.nearLimit);
                    } else if (_this._cameraStep4_2 == undefined) {
                        _this._cameraStep4_2 = Communicator.Camera.create(position, target, up, val.projection, val.width, val.height, val.nearLimit);
                    } else if (_this._cameraStep5 == undefined) {
                        _this._cameraStep5 = Communicator.Camera.create(position, target, up, val.projection, val.width, val.height, val.nearLimit);
                    } else if (_this._cameraStep6_1 == undefined) {
                        _this._cameraStep6_1 = Communicator.Camera.create(position, target, up, val.projection, val.width, val.height, val.nearLimit);
                    } else if (_this._cameraStep6_2 == undefined) {
                        _this._cameraStep6_2 = Communicator.Camera.create(position, target, up, val.projection, val.width, val.height, val.nearLimit);
                    } else if (_this._cameraDetail1_1 == undefined) {
                        _this._cameraDetail1_1 = Communicator.Camera.create(position, target, up, val.projection, val.width, val.height, val.nearLimit);
                    } else if (_this._cameraDetail1_2 == undefined) {
                        _this._cameraDetail1_2 = Communicator.Camera.create(position, target, up, val.projection, val.width, val.height, val.nearLimit);
                    } else if (_this._cameraDetail1_3 == undefined) {
                        _this._cameraDetail1_3 = Communicator.Camera.create(position, target, up, val.projection, val.width, val.height, val.nearLimit);
                    } else if (_this._cameraDetail1_4 == undefined) {
                        _this._cameraDetail1_4 = Communicator.Camera.create(position, target, up, val.projection, val.width, val.height, val.nearLimit);
                    } else if (_this._cameraDetail3_1 == undefined) {
                        _this._cameraDetail3_1 = Communicator.Camera.create(position, target, up, val.projection, val.width, val.height, val.nearLimit);
                    }
                });
                if (_this._cameraHome != undefined) {
                    _this._setCamera("home", 500);
                }
            }
        });                
    });
}

cameraControl.prototype._setCamera = function(name, duration) {
    var _this = this;
    switch (name) {
        case "home":
            _this._viewer.getView().setCamera(_this._cameraHome, duration);
            break;
        case "step2":
            _this._viewer.getView().setCamera(_this._cameraStep2, duration);
            break;
        case "step3":
            _this._viewer.getView().setCamera(_this._cameraStep3, duration);
            break;
        case "step4_1":
            _this._viewer.getView().setCamera(_this._cameraStep4_1, duration);
            break;
        case "step4_2":
            _this._viewer.getView().setCamera(_this._cameraStep4_2, duration);
            break;
        case "step5":
            _this._viewer.getView().setCamera(_this._cameraStep5, duration);
            break;
        case "step6_1":
            _this._viewer.getView().setCamera(_this._cameraStep6_1, duration);
            break;
        case "step6_2":
            _this._viewer.getView().setCamera(_this._cameraStep6_2, duration);
            break;
        case "detail1_1":
            _this._viewer.getView().setCamera(_this._cameraDetail1_1, duration);
            break;
        case "detail1_2":
            _this._viewer.getView().setCamera(_this._cameraDetail1_2, duration);
            break;
        case "detail1_3":
            _this._viewer.getView().setCamera(_this._cameraDetail1_3, duration);
            break;
        case "detail1_4":
            _this._viewer.getView().setCamera(_this._cameraDetail1_4, duration);
            break;
        case "detail3_1":
            _this._viewer.getView().setCamera(_this._cameraDetail3_1, duration);
            break;
    }
    
};

cameraControl.prototype.setCamera = function(name, duration, wait) {
    var _this = this;
    if (wait == undefined) {
        _this._setCamera(name, duration);
    } else {
        var count = 0;
        var countup = function () {
            count++;
        };
        var id = setInterval(function () {
            countup();
            if (count > 0) {
                clearInterval(id);
                _this._setCamera(name, duration);
            }
        }, wait);
    }
};


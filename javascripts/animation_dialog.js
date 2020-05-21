function annimationDialog(language, target) {
    var _this = this;
    this._annDialog = $('#annDialog');
    this._annimationViewer;
    this._isStop = false;
    this._currentStep = 0;
    this._annimationCtrl;
    this._targetStep = target;
    this._backButton_N = "/images/BTN_BACK_N_J.png";
    this._backButton_P = "/images/BTN_BACK_P_J.png";

    if (language != "ja") {
        $("#annViewTitle").html("Detailed Procedure");
        _this._backButton_N = "/images/BTN_BACK_N.png";
        _this._backButton_P = "/images/BTN_BACK_P.png";
        $("#backButton").attr("src", _this._backButton_N);
    }

    $("#startButton").hide();
    $("#loadingImage").show();
    _this._initDialog();
    _this._initEvent();
    _this._initViewer();
}

annimationDialog.prototype._initDialog = function () {
    var _this = this;
    _this._annDialog.dialog({
        autoOpen: false,
        modal: true,
        title: "",
        closeOnEscape: true,
        open: function () {
            _this._dialogResize();
        },
        resize: function () {
            _this._dialogResize();
        }
    });
};

annimationDialog.prototype._initEvent = function () {
    var _this = this;
    var element;
    element = document.getElementById("backButton");
    element.onmousedown = function () {
        this.src = _this._backButton_P;
    };
    element.onmouseup = function () {
        this.src = _this._backButton_N;
        _this._isStop = true;
    };
    element.onclick = function () {
        _this._annDialog.dialog("close");
    };
    element = document.getElementById("rewindButton");
    element.onclick = function () {
        _this._annimationCtrl.home(_this._targetStep);
        _this._currentStep = 0;
        $("#annSlider").slider("value", 0);
        $("#doorClipImage").hide();
    };
    element = document.getElementById("playButton");
    element.onclick = function () {
        onPlay();
    };
    element = document.getElementById("startButton");
    element.onclick = function () {
        onPlay();
    };
    element = document.getElementById("pauseButton");
    element.onclick = function () {
        _this._isStop = true;
    };
    element = document.getElementById("saveCamera2");
    element.onclick = function () {
        saveCameraAsJson(_this._annimationViewer);
    };
    element = document.getElementById("dumpNodes2");
    element.onclick = function () {
        var model = _this._annimationViewer.getModel();
        var root = model.getRootNode();
        var level = "";
        dumpNodes(root, model, level);
    };
    element = document.getElementById("test");
    element.onclick = function () {
        if (_this._targetStep == 1) {
            _this._annimationCtrl.detail1_explode(19);
        } else {
            _this._annimationCtrl.detail3_explode(22);
        }
    };
    function onPlay() {
        _this._preAnnimation();
        $("#startButton").hide();
        if (_this._targetStep == 1) {
            _this._forward(0, 19);
        } else {
            _this._forward(0, 22);
        }
    }
};

// hack this in because the global state is an utter mess in this demo
const getEndpoint = (args) => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open("POST", "/api/request_session");
        request.setRequestHeader("Content-Type", "application/json");
        request.onload = () => {
            if (request.status != 200) {
                reject(`ERROR: ${request.responseText}`)
            }
            resolve(JSON.parse(request.responseText));
        }
        request.send(JSON.stringify(args));
    });
}

annimationDialog.prototype._initViewer = function () {
    var _this = this;
    var models = ["front_door_assy.scz", "flathead_screwdriver.scz", 'clip_remover.scz', 'LH_hand.scz', 'RH_hand.scz'];
    getEndpoint({ type: "collection", models: models, initial: "front_door_assy.scz" }).then((data) => {
        if (data === 'error: 429 - Too many requests') {
            window.location.replace("/error/too-many-requests");
        }

        _this._annimationViewer = new Communicator.WebViewer({
            containerId: "annContainer",
            endpointUri: data.endpoint,
            model: 'front_door_assy',
        });

        function modelStrReady() {
            var model = _this._annimationViewer.getModel();
            var root = model.getRootNode();
            var screwNode = model.createNode(root, "flathead_screwdriver", undefined, undefined, false);
            var removerNode = model.createNode(root, "clip_remover", undefined, undefined, false);
            var leftHandNode = model.createNode(root, "LH_hand", undefined, undefined, false);
            var rightHandNode = model.createNode(root, "RH_hand", undefined, undefined, false);
            model.loadSubtreeFromModel(screwNode, "flathead_screwdriver").then(function () {
                model.loadSubtreeFromModel(removerNode, "clip_remover").then(function () {
                    model.loadSubtreeFromModel(leftHandNode, "LH_hand").then(function () {
                        model.loadSubtreeFromModel(rightHandNode, "RH_hand").then(function () {
                            _this._annimationCtrl.setToolNodeID(screwNode, removerNode, leftHandNode, rightHandNode);
                            _this._annimationCtrl.home(_this._targetStep);
                            _this._postAnnimation();
                            $("#startButton").show();
                        });
                    });
                });
            });
        }

        _this._annimationViewer.setCallbacks({
            sceneReady: sceneReadyFunc,
            modelStructureReady: modelStrReady
        });

        _this._annimationViewer.start()
        _this._annimationCtrl = new annimationControl(_this._annimationViewer);

        window.onbeforeunload = () => { $.get('/api/delete_collection?collection=' + [data.collection_id]); };
    });

    function sceneReadyFunc() {
        _this._dialogResize();
        _this._annimationCtrl.cameraHome();
        _this._annimationViewer.getView().setBackgroundColor(
            Communicator.Color.createFromFloat(238 / 255, 239 / 255, 239 / 255),
            Communicator.Color.createFromFloat(238 / 255, 239 / 255, 239 / 255)
        );
        _this._annimationViewer.getSelectionManager().setHighlightFaceElementSelection(false);
        _this._annimationViewer.getSelectionManager().setHighlightLineElementSelection(false);
        _this._annimationViewer.getSelectionManager().setNodeSelectionColor(new Communicator.Color(255, 128, 128));

        $("#loadingImage").hide();
    }
};

annimationDialog.prototype.open = function (w, h, target) {
    var _this = this;
    _this._targetStep = target;
    $("#annSlider").slider({
        min: 0,
        range: 1,
        value: 0
    });
    if (_this._targetStep == 1) {
        $("#annSlider").slider({
            max: 19,
        });
    } else {
        $("#annSlider").slider({
            max: 22,
        });
    }
    _this._annDialog.dialog({
        width: w,
        height: h
    })
    _this._annDialog.dialog("open");
    _this._currentStep = 0;
    if (_this._annimationCtrl != undefined)
        _this._annimationCtrl.home(_this._targetStep);
    if (_this._annimationViewer != undefined)
        $("#startButton").show();
};

annimationDialog.prototype._dialogResize = function () {
    var _this = this;
    if (_this._annimationViewer != undefined)
        _this._annimationViewer.resizeCanvas();
    var annHeight = $('#annDialog').innerHeight();
    var annWidth = $('#annDialog').innerWidth();
    var annOffset = $("#annContainer").offset();
    $("#annViewMark").offset({
        top: annOffset.top,
        left: annOffset.left + 10
    });
    $("#annViewTitle").offset({
        top: annOffset.top + 5,
        left: annOffset.left + 23
    });
    $("#backButton").offset({
        top: annOffset.top + 40,
        left: annOffset.left + 23
    });
    $("#annButtons").offset({
        top: annOffset.top + annHeight - 50,
        left: annOffset.left + (annWidth - $("#annButtons").width() - 260) / 2
    });
    $("#annTestButtons").offset({
        top: annOffset.top + annHeight - 100,
        left: annOffset.left + 20
    });
    $("#annSlider").offset({
        top: annOffset.top + annHeight - 35,
        left: annOffset.left + (annWidth - $("#annButtons").width() - 260) / 2 + $("#annButtons").width() + 10
    });
    var imgSize = annWidth * 0.2;
    if (imgSize < 80) {
        imgSize = 80;
    } else if (imgSize > 300) {
        imgSize = 300;
    }
    $("#doorClipImage").show()
        .width(imgSize).height(imgSize)
        .offset({
            top: annOffset.top + annHeight / 2 - $("#doorClipImage").height() / 2,
            left: annOffset.left + 50
        });
    $("#doorClipImage").hide();
}

annimationDialog.prototype._forward = function (waitTime, maxStep) {
    var _this = this;
    if (waitTime == undefined)
        waitTime = 1000;
    setTimeout(function () {
        if (_this._isStop) {
            _this._postAnnimation();
            return;
        }
        if (_this._currentStep >= maxStep) {
            $("#doorClipImage").hide();
            _this._postAnnimation();
            return;
        }
        _this._currentStep++;
        if (_this._targetStep == 1) {
            _this._annimationCtrl.detail1_explode(_this._currentStep);
        } else {
            _this._annimationCtrl.detail3_explode(_this._currentStep);
        }
        $("#annSlider").slider("value", _this._currentStep);
        _this._forward(undefined, maxStep);
    }, waitTime);
}

annimationDialog.prototype._preAnnimation = function () {
    $("#backButton").prop("disabled", false);
    $("#rewindButton").prop("disabled", true);
    $("#playButton").prop("disabled", true);
    $("#pauseButton").prop("disabled", false);
};

annimationDialog.prototype._postAnnimation = function () {
    var _this = this;
    _this._isStop = false;
    $("#backButton").prop("disabled", false);
    $("#rewindButton").prop("disabled", false);
    $("#playButton").prop("disabled", false);
    $("#pauseButton").prop("disabled", true);
};

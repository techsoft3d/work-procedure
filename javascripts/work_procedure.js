
export default function workProcedure(language) {
    this._language = language;
    this._mainViewer;
    this._subViewer;
    this._annimationCtrl;
    this._subViewCtrl;
    this._partNum = "";
    this._partName = "";
    this._partPrice = "";
    this._partID = 0;
    this._mouseOverOperator;
    this._mouseOeratorHandle;
    this._partPropertyData;
    this._annDialog;
    this._currentStep = 0;
    this._currentAnnimationStep = 8;
    this._checkButton_D = "./images/BTN_CHECK_D_J.png";
    this._checkButton_N = "./images/BTN_CHECK_N_J.png";
    this._checkButton_P = "./images/BTN_CHECK_P_J.png";
    this._addCartButton_N = "./images/BTN_ADDCART_N_J.png";
    this._addCartButton_P = "./images/BTN_ADDCART_P_J.png";
}

workProcedure.prototype.start = function () {
    var _this = this;
    _this._initResources();
    _this._initEvents();
    _this._loadPartProperties();
    _this._createMainViewer();
    _this._createSubViewer();
    _this.layoutPage();
};

workProcedure.prototype._initResources = function () {
    var _this = this;
    if (_this._language != "ja") {
        document.title = "Power Window Switch Removable and Installation";
        $("#title").html("Power Window Switch Removable and Installation");
        $("#mainViewTitle").html("Exploded View and Procedure");
        $("#subViewTitle").html("Part Information");
        $("#drawMode").html("Illustration");
        $(".partNumLabel").html("Part No.");
        $(".partNameLabel").html("Name");
        $(".partPriceLabel").html("Price");
        $(".partQtyLabel").html("Qty");
        $("#addCart").prepend('<i class="glyphicon glyphicon-shopping-cart"></i>');
        $("#legacyManual").html("Legacy Manual");
        _this._checkButton_D = "./images/BTN_CHECK_D.png";
        _this._checkButton_N = "./images/BTN_CHECK_N.png";
        _this._checkButton_P = "./images/BTN_CHECK_P.png";
        $("#annimation").attr("src", _this._checkButton_D);
        _this._addCartButton_N = "./images/BTN_ADDCART_N.png";
        _this._addCartButton_P = "./images/BTN_ADDCART_P.png";
        $("#addCart").attr("src", _this._addCartButton_N);
    }
};

workProcedure.prototype.resizeCanvas = function () {
    var _this = this;
    _this._mainViewer.resizeCanvas();
    _this._subViewer.resizeCanvas();
};

workProcedure.prototype.layoutPage = function () {
    var _this = this;
    var mainOffset = $("#mainContainer").offset();
    var subOffset = $("#subContainer").offset();
    var mainWidth = $("#mainContainer").width();

    var mainHeight = 550;
    var subHeight = 330;
    var cartHeight = 180;

    $("#mainViewMark").offset({
        top: mainOffset.top,
        left: mainOffset.left + 20
    });
    $("#subViewMark").offset({
        top: subOffset.top,
        left: subOffset.left + 20
    });
    $("#mainViewTitle").offset({
        top: mainOffset.top + 5,
        left: mainOffset.left + 33
    });
    $("#subViewTitle").offset({
        top: subOffset.top + 5,
        left: subOffset.left + 33
    });
    $("#arrowMark").offset({
        top: subOffset.top + 145,
        left: subOffset.left - 10
    });
    $("#drawMode").offset({
        top: mainOffset.top + 10,
        left: mainOffset.left + mainWidth - $("#drawMode").width() - 30
    });
    $("#annimation").offset({
        top: mainOffset.top + 40,
        left: mainOffset.left + 33
    })
        .prop("disabled", true);
    $("#stepButtons").offset({
        top: mainOffset.top + mainHeight - 50,
        left: mainOffset.left + (mainWidth - $("#stepButtons").width()) / 2
    });
    $("#slider").offset({
        top: mainOffset.top + mainHeight - 70,
        left: mainOffset.left + (mainWidth - 300) / 2
    });
    $("#partProperties").offset({
        top: subOffset.top + 40,
        left: subOffset.left + 20
    });
    $("#addCart").offset({
        top: subOffset.top + subHeight + 3,
        left: subOffset.left + ($("#subContainer").width() - $("#addCart").width()) / 2
    });
    if ($(window).width() < 992) {
        $("#shoppingCart").height('auto').css('overflowY', 'auto');
    } else {
        $("#shoppingCart").height(180).css('overflowY', 'scroll');
    }
    $("#loadingImageMain").show();
    $("#loadingImageSub").show();
    _this._controlScrollButtons();

};

workProcedure.prototype._initEvents = function () {
    var _this = this;
    var element;

    element = document.getElementById("saveCamera");
    element.onclick = function () {
        saveCameraAsJson(_this._mainViewer);
    };

    element = document.getElementById("dumpNodes");
    element.onclick = function () {
        var model = _this._mainViewer.getModel();
        var root = model.getRootNode();
        dumpNodes(root, model);
    };

    element = document.getElementById("setTexture");
    element.onclick = function () {
        _this._mainViewer.getModel().getPrimaryModelId().then(function (modelId) {
            _this._mainViewer.getModel().setNodesFaceMaterial([66], [modelId, 12]);
        });
    };

    element = document.getElementById("explode");
    element.onmousedown = function () {
        this.src = "./images/BTN_PROCESS_ALL_P.png";
    };
    element.onclick = function () {
        preStepProcesses();
        if (_this._currentAnnimationStep == 8) {
            _this._annimationCtrl.collapse();
            $("#slider").slider("value", 0);
            _this._currentAnnimationStep = 0;
            this.src = "./images/BTN_PROCESS_ALL_N.png";
        } else {
            _this._annimationCtrl.explode();
            $("#slider").slider("value", 8);
            _this._currentAnnimationStep = 8;
            this.src = "./images/BTN_PROCESS_ALL_R.png";
        }
        setTimeout(function () {
            postStepProcesses();
        }, 3000);
    };

    element = document.getElementById("step1");
    element.onmousedown = function () {
        this.src = "./images/BTN_PROCESS_1_P.png";
    };
    element.onclick = function () {
        preStepProcesses();
        this.src = "./images/BTN_PROCESS_1_R.png";
        _this._annimationCtrl.home();
        _this._annimationCtrl.step1();
        setTimeout(function () {
            postStepProcesses("step1");
            $("#annimation").attr("src", _this._checkButton_N).prop("disabled", false);
            this.disabled = true;
        }, 1000);
        $("#slider").slider("value", 0);
        _this._currentStep = 1;
        _this._currentAnnimationStep = 0;
    };

    element = document.getElementById("step2");
    element.onmousedown = function () {
        this.src = "./images/BTN_PROCESS_2_P.png";
    };
    element.onclick = function () {
        preStepProcesses();
        this.src = "./images/BTN_PROCESS_2_R.png";
        if (_this._currentAnnimationStep > 0) {
            _this._annimationCtrl.home();
            _this._currentAnnimationStep = 0;
        }
        _this._annimationCtrl.step2();
        $("#slider").slider("value", 0);
        _this._currentStep = 2;
        _this._currentAnnimationStep = 0;
        setTimeout(function () {
            postStepProcesses("step2");
            this.disabled = true;
        }, 800);
    };

    element = document.getElementById("step3");
    element.onmousedown = function () {
        this.src = "./images/BTN_PROCESS_3_P.png";
    };
    element.onclick = function () {
        preStepProcesses();
        this.src = "./images/BTN_PROCESS_3_R.png";
        if (_this._currentAnnimationStep > 0) {
            _this._annimationCtrl.home();
            _this._currentAnnimationStep = 0;
        }
        _this._annimationCtrl.step3();
        setTimeout(function () {
            postStepProcesses("step3");
            this.disabled = true;
            $("#annimation").attr("src", _this._checkButton_N).prop("disabled", false);
        }, 1100);
        $("#slider").slider("value", 0);
        _this._currentStep = 3;
        _this._currentAnnimationStep = 0;
    };

    element = document.getElementById("step4");
    element.onmousedown = function () {
        this.src = "./images/BTN_PROCESS_4_P.png";
    };
    element.onclick = function () {
        preStepProcesses();
        this.src = "./images/BTN_PROCESS_4_R.png";
        if (_this._currentAnnimationStep > 0) {
            _this._annimationCtrl.home();
            _this._currentAnnimationStep = 0;
        }
        _this._annimationCtrl.step4();
        $("#slider").slider("value", 0);
        _this._currentStep = 4;
        _this._currentAnnimationStep = 0;
        setTimeout(function () {
            postStepProcesses("step4");
            this.disabled = true;
        }, 1400);
    };

    element = document.getElementById("step5");
    element.onmousedown = function () {
        this.src = "./images/BTN_PROCESS_5_P.png";
    };
    element.onclick = function () {
        preStepProcesses();
        this.src = "./images/BTN_PROCESS_5_R.png";
        if (_this._currentAnnimationStep > 0) {
            _this._annimationCtrl.home();
            _this._currentAnnimationStep = 0;
        }
        _this._annimationCtrl.step5();
        $("#slider").slider("value", 0);
        _this._currentStep = 5;
        _this._currentAnnimationStep = 0;
        setTimeout(function () {
            postStepProcesses("step5");
            this.disabled = true;
        }, 900);
    };

    element = document.getElementById("step6");
    element.onmousedown = function () {
        this.src = "./images/BTN_PROCESS_6_P.png";
    };
    element.onclick = function () {
        preStepProcesses();
        this.src = "./images/BTN_PROCESS_6_R.png";
        if (_this._currentAnnimationStep > 0) {
            _this._annimationCtrl.home();
            _this._currentAnnimationStep = 0;
        }
        _this._annimationCtrl.step6();
        $("#slider").slider("value", 0);
        _this._currentStep = 6;
        _this._currentAnnimationStep = 0;
        setTimeout(function () {
            postStepProcesses("step6");
            this.disabled = true;
        }, 800);
    };

    element = document.getElementById("annimation");
    element.onmousedown = function () {
        this.src = _this._checkButton_P;
    };
    element.onmouseup = function () {
        this.src = _this._checkButton_N;
    };
    element.onclick = function () {
        if (_this._annDialog == undefined) {
            _this._annDialog = new annimationDialog(_this._language, _this._currentStep);
        }
        //Need to somehow delay this until AFTER sceneReadyFunc in animation_dialog runs.
        //It's throwing undefined errors to console if it runs to early.
        _this._annDialog.open(window.innerWidth, window.innerHeight, _this._currentStep); 
    };

    $("#slider").slider({
        slide: function (event, ui) {
            _this._annimationCtrl.all(ui.value);
            document.getElementById("explode").disabled = false;
            if (ui.value == 6) {
                document.getElementById("explode").disabled = true;
            }
        },
        min: 0,
        max: 6,
        range: 1
    });

    $("#drawMode").button()
        .click(function () {
            if (_this._mainViewer.getView().getDrawMode() == Communicator.DrawMode.HiddenLine) {
                _this._mainViewer.getView().setDrawMode(Communicator.DrawMode.WireframeOnShaded);
                _this._subViewer.getView().setDrawMode(Communicator.DrawMode.WireframeOnShaded);
                if (language != "ja") {
                    $("#drawMode").text("Illustration");
                } else {
                    $("#drawMode").text("イラストレーション");
                }
            } else {
                _this._mainViewer.getView().getHiddenLineSettings().setObscuredLineTransparency(0);
                _this._mainViewer.getView().setDrawMode(Communicator.DrawMode.HiddenLine);
                _this._subViewer.getView().getHiddenLineSettings().setObscuredLineTransparency(0);
                _this._subViewer.getView().setDrawMode(Communicator.DrawMode.HiddenLine);
                if (language != "ja") {
                    $("#drawMode").text("Shaded");
                } else {
                    $("#drawMode").text("シェーディング");
                }
            }
        })

    element = document.getElementById("addCart");
    element.onmousedown = function () {
        this.src = _this._addCartButton_P;
    };
    element.onmouseup = function () {
        this.src = _this._addCartButton_N;
    };
    element.onclick = function () {
        if (_this._partNum != "") {
            var table = document.getElementById("shoppingCartTable");
            var isExist = false;
            for (var i = 2; i < table.rows.length && isExist == false; i++) {
                var row = table.rows[i];
                var cells = row.childNodes;
                if (cells[0].innerHTML == _this._partNum) {
                    var qty = cells[2].innerHTML;
                    qty++;
                    cells[2].innerHTML = qty;
                    isExist = true;
                }
            }
            if (!isExist) {
                var row = table.insertRow(-1);
                var cell1 = row.insertCell(-1);
                var cell2 = row.insertCell(-1);
                var cell3 = row.insertCell(-1);
                var cell4 = row.insertCell(-1);
                var plusButton = '<input type="image" name="image_button" onclick="incrementQty(this)" src="./images/BTN_PLUS_N.png" width="24px" height="24px"/>';
                var minusButton = '<input type="image" name="image_button" onclick="decrementQty(this)" src="./images/BTN_MINUS_N.png" width="24px" height="24px"/>';
                cell1.innerHTML = _this._partNum;
                cell1.noWrap = true;
                cell2.innerHTML = _this._partName;
                cell2.noWrap = true;
                cell3.innerHTML = 1;
                cell3.noWrap = true;
                cell3.style.textAlign = "right";
                cell4.innerHTML = plusButton + minusButton;
                cell4.noWrap = true;
                row.id = _this._partID;
                row.onclick = cartRowSelection;
                _this._controlScrollButtons();
            }
        }
    };

    function preStepProcesses() {
        _this.disableDynamicHighlight();
        $("#annimation").attr("src", _this._checkButton_D).prop("disabled", true);
        $("#explode").attr("src", "./images/BTN_PROCESS_ALL_N.png").prop("disabled", true);
        $("#step1").attr("src", "./images/BTN_PROCESS_1_N.png").prop("disabled", true);
        $("#step2").attr("src", "./images/BTN_PROCESS_2_N.png").prop("disabled", true);
        $("#step3").attr("src", "./images/BTN_PROCESS_3_N.png").prop("disabled", true);
        $("#step4").attr("src", "./images/BTN_PROCESS_4_N.png").prop("disabled", true);
        $("#step5").attr("src", "./images/BTN_PROCESS_5_N.png").prop("disabled", true);
        $("#step6").attr("src", "./images/BTN_PROCESS_6_N.png").prop("disabled", true);
    }

    function postStepProcesses(current) {
        _this.enableDynamicHighlight();
        $("#explode").prop("disabled", false);
        $("#step1").prop("disabled", false);
        $("#step2").prop("disabled", false);
        $("#step3").prop("disabled", false);
        $("#step4").prop("disabled", false);
        $("#step5").prop("disabled", false);
        $("#step6").prop("disabled", false);
        if (current != undefined)
            $("#" + current).prop("disabled", true);
    }

    $('#page-up').click(function () {
        if ($(window).scrollTop() > 655) {
            $('html,body').animate({ scrollTop: 650 }, 'slow');
        } else if ($(window).scrollTop() > 380) {
            $('html,body').animate({ scrollTop: 375 }, 'slow');
        } else if ($(window).scrollTop() > 105) {
            $('html,body').animate({ scrollTop: 100 }, 'slow');
        } else {
            $('html,body').animate({ scrollTop: 0 }, 'slow');
        }
    });
    $('#page-down').click(function () {
        if ($(window).scrollTop() < 100) {
            $('html,body').animate({ scrollTop: 100 }, 'slow');
        } else if ($(window).scrollTop() < 370) {
            $('html,body').animate({ scrollTop: 375 }, 'slow');
        } else if ($(window).scrollTop() < 645) {
            $('html,body').animate({ scrollTop: 650 }, 'slow');
        } else {
            var h = $('body').height();
            $('html,body').animate({ scrollTop: h }, 'slow');
        }
    });

    var timer = false;
    $(window).resize(function () {
        if (timer !== false) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            _this.resizeCanvas();
            _this.layoutPage();
        }, 200);
    });

    $(window).scroll(function () {
        _this._controlScrollButtons();
    });

};

workProcedure.prototype._loadPartProperties = function () {
    var _this = this;
    $.getJSON("./json/front_door_part_properties.json", function (data) {
        _this._partPropertyData = data;
    });
};

workProcedure.prototype._createMainViewer = function () {
    var _this = this;


    _this._mainViewer = new Communicator.WebViewer({
        containerId: "mainContainer",
        endpointUri: './model_data/front_door_assy.scs',
    });

    _this._mouseOverOperator = new mouseOverOperator(_this._mainViewer);
    _this._mouseOeratorHandle = _this._mainViewer.registerCustomOperator(_this._mouseOverOperator);
    var mouseDragOp = new mouseDragOperator();
    var mouseDragHandle = _this._mainViewer.registerCustomOperator(mouseDragOp);

    function modelStrReady() {
        _this._mainViewer.pauseRendering();
        _this.disableDynamicHighlight();
        _this._annimationCtrl.explode(6, true);
        $("loadingImageMain").hide();
        setTimeout(function () {
            _this._mainViewer.resumeRendering();
            _this.enableDynamicHighlight();
        }, 3000);
    }

    _this._mainViewer.setCallbacks({
        selection: selectionFunc,
        sceneReady: sceneReadyFunc,
        modelStructureReady: modelStrReady
    });

    _this._mainViewer.start();
    _this._mainViewer.getOperatorManager().push(mouseDragHandle);
    _this._mainViewer.getOperatorManager().push(_this._mouseOeratorHandle);
    _this._annimationCtrl = new annimationControl(_this._mainViewer);

    function selectionFunc(selectionEvent) {
        var id = selectionEvent.getSelection().getNodeId();
        if (selectionEvent.getType() != Communicator.SelectionType.None && id > 0) {
            var parentID = _this._mainViewer.getModel().getNodeParent(id);
            if (parentID == 19 || parentID == 30) {
                parentID = 19;
                var nodes = [parentID, 30];
                _this._mainViewer.getModel().setNodesHighlighted(nodes, true);
            } else if (parentID == 3 || parentID == 4) {
                parentID = 3;
                nodes = [parentID, 4];
                _this._mainViewer.getModel().setNodesHighlighted(nodes, true);
            }
            if (_this._mainViewer.getModel().getNodeType(parentID) == Communicator.NodeType.PartInstance) {
                _this.clearTableRowColor();
                _this.showPartProperties(parentID);
                _this._waitDynamicHighlight();
            }
        }
        _this._mouseOverOperator.setCurrentNode(0);
    }

    function sceneReadyFunc() {
        _this._annimationCtrl.cameraHome();
        _this._mainViewer.getView().setBackgroundColor(
            Communicator.Color.createFromFloat(238 / 255, 239 / 255, 239 / 255),
            Communicator.Color.createFromFloat(238 / 255, 239 / 255, 239 / 255)
        );
        _this._mainViewer.getSelectionManager().setHighlightFaceElementSelection(false);
        _this._mainViewer.getSelectionManager().setHighlightLineElementSelection(false);
        _this._mainViewer.getSelectionManager().setNodeSelectionColor(new Communicator.Color(255, 128, 128));
    }
};

workProcedure.prototype._waitDynamicHighlight = function () {
    var _this = this;
    _this._mainViewer.getOperatorManager().pop();
    setTimeout(function () {
        _this._mainViewer.getOperatorManager().push(_this._mouseOeratorHandle);
    }, 2000)
};

workProcedure.prototype.disableDynamicHighlight = function () {
    var _this = this;
    _this._mainViewer.getOperatorManager().pop();
};

workProcedure.prototype.enableDynamicHighlight = function () {
    var _this = this;
    _this._mainViewer.getOperatorManager().push(_this._mouseOeratorHandle);
};

workProcedure.prototype._createSubViewer = function () {
    var _this = this;

    _this._subViewer = new Communicator.WebViewer({
        containerId: "subContainer",
        endpointUri: './model_data/front_door_assy.scs',
    });

    function modelStrReady() {
        _this._subViewCtrl = new subViewControl(_this._subViewer);
        _this._subViewCtrl.start();
        _this.showPartProperties(22);
    }

    _this._subViewer.setCallbacks({
        sceneReady: sceneReadyFunc,
        modelStructureReady: modelStrReady
    });
    _this._subViewer.start()

    function sceneReadyFunc() {
        _this._subViewer.getView().setBackgroundColor(
            Communicator.Color.createFromFloat(238 / 255, 239 / 255, 239 / 255),
            Communicator.Color.createFromFloat(238 / 255, 239 / 255, 239 / 255)
        );
        _this._subViewer.getSelectionManager().setHighlightFaceElementSelection(false);
        _this._subViewer.getSelectionManager().setHighlightLineElementSelection(false);
        $("loadingImageSub").hide();
    }
};

workProcedure.prototype.showPartProperties = function (partID) {
    var _this = this;
    $.each(_this._partPropertyData.NodeData, function (key, val) {
        if (partID == val.ID) {
            $("#partNum").text(val.PartNum);
            if (language != "ja") {
                $("#partName").text(val.NameEn);
                $("#partPrice").text(String(val.Price + " JPY").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                _this._partName = val.NameEn;
            } else {
                $("#partName").text(val.NameJa);
                $("#partPrice").text(String(val.Price + "円").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                _this._partName = val.NameJa;
            }
            _this._partID = partID;
            _this._partNum = val.PartNum;
            _this._partPrice = val.Price;
            return false;
        }
    });
    var nodeIDs = [partID];
    if (partID == 19) {
        nodeIDs = [partID, 30];
    } else if (partID == 3) {
        nodeIDs = [partID, 4];
    }
    var camera = _this._mainViewer.getView().getCamera();
    _this._subViewCtrl.showParts(nodeIDs, camera);
};

workProcedure.prototype.clearSelection = function () {
    var _this = this;
    var nodes = [0];
    _this._mainViewer.getModel().setNodesHighlighted(nodes, false);
    _this._mouseOverOperator.setCurrentNode(0);
};

workProcedure.prototype.clearTableRowColor = function () {
    var table = document.getElementById("shoppingCartTable");
    for (var i = 2; i < table.rows.length; i++) {
        var row = table.rows[i];
        row.style.color = "";
        row.style.backgroundColor = "";
    }
};

workProcedure.prototype._controlScrollButtons = function () {
    var upHidden = $('#page-up').is(":hidden");
    var downHidden = $('#page-down').is(":hidden");
    if ($(window).width() < 992) {
        var now = $(window).scrollTop();
        var under = $('body').height() - (now + $(window).height());

        if (now < 100) {
            if (!upHidden)
                $('#page-up').fadeOut('slow');
        } else {
            if (upHidden)
                $('#page-up').fadeIn('slow');
        }
        if (under < 50) {
            if (!downHidden)
                $('#page-down').fadeOut('slow');
        } else {
            if (downHidden)
                $('#page-down').fadeIn('slow');
        }
    } else {
        if (!upHidden)
            $('#page-up').fadeOut('slow');
        if (!downHidden)
            $('#page-down').fadeOut('slow');
    }
};

// These were moved to general_functions 
//Because work-procedure is a module and did not export them.
// function incrementQty(obj) {
//     var tr = obj.parentNode.parentNode;
//     var childlen = tr.childNodes;
//     var qty = childlen[2].innerHTML;
//     qty++;
//     childlen[2].innerHTML = qty;
// }

// function decrementQty(obj) {
//     var tr = obj.parentNode.parentNode;
//     var childlen = tr.childNodes;
//     var qty = childlen[2].innerHTML;
//     if (qty == 1) {
//         tr.parentNode.deleteRow(tr.sectionRowIndex);
//     } else {
//         qty--;
//         childlen[2].innerHTML = qty;
//     }
// }

function cartRowSelection() {
    var tr = this;
    workProcedure.clearSelection();
    workProcedure.showPartProperties(tr.id);
    workProcedure.clearTableRowColor()
    tr.style.color = "#000000";
    tr.style.backgroundColor = "#ff8080";
}

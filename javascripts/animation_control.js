function annimationControl(viewer) {
    this._viewer = viewer;
    this._cameraCtrl = new cameraControl(viewer);
    this._nodeTopID = [0];
    this._nodeIDs1 = [23];
    this._nodeIDs2 = [27];
    this._nodeIDs3_1 = [19, 20, 21, 22, 24, 25, 26, 28, 29, 30];
    this._nodeIDs3_2 = [5, 7, 9, 11, 13, 15, 17];
    this._nodeIDs3_3 = [6, 8, 10, 12, 14, 16, 18];
    this._nodeIDs3_4 = [3, 4];
    this._nodeIDs4_1 = [28, 29];
    this._nodeIDs4_2 = [20, 21, 22, 24, 25, 26];
    this._nodeIDs5 = [21, 22, 24, 25, 26];
    this._nodeIDs6_1 = [24, 25, 26];
    this._nodeIDs6_2 = [21];
    this._meshIDs = [];
    this._vectorY = { x: 0, y: 1, z: 0 };
    this._vectorZ = { x: 0, y: 0, z: 1 };
    this._vector_Y = { x: 0, y: -1, z: 0 };
    this._vector_Z = { x: 0, y: 0, z: -1 };
    this._vector6 = { x: - 0.378324 / 3, y: 2.976050 / 3, z: 0 };
    this._vector_6 = { x: 0.378324 / 3, y: - 2.976050 / 3, z: 0 };
    this._currentStep = -1;
    this._currentAnnimationStep = 6;
    this._screwNode;
    this._removerNode;
    this._leftHandNode;
    this._rightHandNode;
    this._xAxis = new Communicator.Point3(1, 0, 0);
    this._yAxis = new Communicator.Point3(0, 1, 0);
    this._zAxis = new Communicator.Point3(0, 0, 1);

    this._startPoints1 = [];
    this._startPoints1.push(new Communicator.Point3(770.3360937395948, 461.1314408842327, 159.99549556962006));
    this._startPoints1.push(new Communicator.Point3(655.2286119217954, 450.3678863177083, 202.8581892343409));
    this._startPoints1.push(new Communicator.Point3(499.6371555704877, 432.98991307836013, 215.00000000074942));
    this._startPoints1.push(new Communicator.Point3(505.11783499342187, 382.2225733532032, 169.01259504008885));
    this._startPoints1.push(new Communicator.Point3(769.2699809528831, 398.30771932478365, 164.83026270834853));

    this._startPoints2 = [];
    this._startPoints2.push(new Communicator.Point3(749.7401627879242, 424.9894275891387, 140.89999985707027));

    this._startPoints3 = [];
    this._startPoints3.push(new Communicator.Point3(990.1713916797693, 597.9847794032801, 204.57647639885909));
    this._startPoints3.push(new Communicator.Point3(939.9188451052868, 380.60031172660933, 143.11521999008255));
    this._startPoints3.push(new Communicator.Point3(865.1916305679604, 158.21087354264318, 131.46027884204534));
    this._startPoints3.push(new Communicator.Point3(625.0988038910338, 108.28581405852765, 128.84381654768413));
    this._startPoints3.push(new Communicator.Point3(380.2770757723101, 88.97522522513191, 122.82493274570334));
    this._startPoints3.push(new Communicator.Point3(110.28162750914043, 353.6389483921871, 131.68850607162335));
    this._startPoints3.push(new Communicator.Point3(133.8709923036913, 590.1120556978431, 199.15701441820056));

    this._startPoints4_1 = [];
    this._startPoints4_1.push(new Communicator.Point3(421.93411695105755, 383.1431292020281, 769.9999999999717 - 600));
    this._startPoints4_1.push(new Communicator.Point3(563.9426271398613, 413.0917612437357, 769.9999999999802 - 600));

    this._startPoints4_2 = [];
    this._startPoints4_2.push(new Communicator.Point3(421.93411695105755, 383.1431292020281, 769.9999999999717 - 600));
    this._startPoints4_2.push(new Communicator.Point3(563.9426271398613, 413.0917612437357, 769.9999999999802 - 600));

    this._startPoints5 = [];
    this._startPoints5.push(new Communicator.Point3(515.6587265033368, 398.5613708495621, 1162.0081596434638 - 200));
    this._startPoints5.push(new Communicator.Point3(471.1106783717549, 398.5613708495931, 1161.9723100725437 - 200));

    this._startPoints6 = [];
    this._startPoints6.push(new Communicator.Point3(426.4339607188854, 612.688914716395 + 100, 1184.9939618035141 - 200));
    this._startPoints6.push(new Communicator.Point3(536.8716923010777, 616.6475485864701 + 100, 1158.961831875789 - 200));
    this._startPoints6.push(new Communicator.Point3(536.8904600844197, 616.6499344013002 + 100, 1210.998258057193 - 200));

    this._centerPoints1_1 = [];
    this._centerPoints1_1.push(new Communicator.Point3(455.0637548427025, 375.4636535644522, 163.50178743408156));
    this._centerPoints1_1.push(new Communicator.Point3(505.3487638531434, 380.2113342285137, 163.4902913928653));
    this._centerPoints1_1.push(new Communicator.Point3(555.1941942803606, 384.49954223632517, 163.52005516732112));

    this._centerPoints1_2 = [];
    this._centerPoints1_2.push(new Communicator.Point3(785.7548720637019, 459.962310340175, 162.95536529973015));
    this._centerPoints1_2.push(new Communicator.Point3(756.0682229080667, 457.53163493399506, 162.91714546834328));
    this._centerPoints1_2.push(new Communicator.Point3(705.6589488129198, 452.81665906962417, 209.07524714839747));
    this._centerPoints1_2.push(new Communicator.Point3(656.3486471279739, 447.90465735783437, 208.97740541816074));
    this._centerPoints1_2.push(new Communicator.Point3(605.7167144302816, 442.3474056734258, 208.99836553856994));
    this._centerPoints1_2.push(new Communicator.Point3(550.3805683528099, 439.3268158150303, 215.00245118669636));
    this._centerPoints1_2.push(new Communicator.Point3(500.26606295094393, 432.7562618609569, 214.9991240479858));
    this._centerPoints1_2.push(new Communicator.Point3(450.4755936371513, 425.6255989016239, 214.99741621358476));

    this._centerPoints1_3 = [];
    this._centerPoints1_3.push(new Communicator.Point3(754.2578999059745, 400.87716674696776, 155.0426519147113));
    this._centerPoints1_3.push(new Communicator.Point3(784.4481094658004, 401.73978772581995, 154.98293785000806));

    this._centerPoints3_1_1 = [];
    this._centerPoints3_1_1.push(new Communicator.Point3(379.7583245162418, 88.85689127346203, 122.8187311279089));

    this._centerPoints3_1_2 = [];
    this._centerPoints3_1_2.push(new Communicator.Point3(624.9384656472532, 108.02626209382709, 128.83021400291182));

    this._centerPoints3_2 = [];
    this._centerPoints3_2.push(new Communicator.Point3(939.8898274560333, 381.22683489162273, 143.14805468214672));
    this._centerPoints3_2.push(new Communicator.Point3(864.8773786498623, 158.55127851465022, 131.47811871279555));
    this._centerPoints3_2.push(new Communicator.Point3(109.65017676080956, 353.9029619147368, 131.70234243446566));

    this._centerPoints3_3 = [];
    this._centerPoints3_3.push(new Communicator.Point3(989.7291716602292, 598.3207842299089, 204.59408566492584));
    this._centerPoints3_3.push(new Communicator.Point3(134.00370297511148, 591.2113142886196, 199.21462411732455));

    this._centerPoints3_4 = [];
    this._centerPoints3_4.push(new Communicator.Point3(949.9896069932397, 708.2948895372266, 186.0000000000109));
    this._centerPoints3_4.push(new Communicator.Point3(759.6998197851638, 704.514800274876, 186.0000000000091));
    this._centerPoints3_4.push(new Communicator.Point3(570.1300136469299, 701.2969574830399, 186.00000000003092));
    this._centerPoints3_4.push(new Communicator.Point3(379.9836155380417, 697.6724056342873, 186.00000000002728));
}

annimationControl.prototype._blinkNodes = function (nodeIDs, waitTime) {
    var _this = this;
    var model = _this._viewer.getModel();
    var count = 0;
    var interval = 200;
    var waitCount = waitTime / interval;

    var countup = function () {
        if (count >= waitCount) {
            if ((count - waitCount) % 2 == 0) {
                model.setNodesHighlighted(nodeIDs, true);
            } else {
                model.setNodesHighlighted(nodeIDs, false);
            }
        }
        count++;
    };

    var id = setInterval(function () {
        countup();
        if (count > (waitCount + 4)) {
            clearInterval(id);
        }
    }, interval);
};

annimationControl.prototype._highlightNodes = function (nodeIDs, waitTime) {
    var _this = this;
    var countup = function () {
        _this._viewer.getModel().setNodesHighlighted(nodeIDs, true);
    };
    var id = setInterval(function () {
        countup();
        clearInterval(id);
    }, waitTime);
};

annimationControl.prototype._blinkMarkup = function (markupItem, waitTime) {
    var _this = this;
    var model = _this._viewer.getModel();
    var count = 0;
    var interval = 200;
    var waitCount = waitTime / interval;
    var circleMarkupHandle;

    var countup = function () {
        if (count >= waitCount) {
            if ((count - waitCount) % 2 == 0) {
                circleMarkupHandle = _this._viewer.getMarkupManager().registerMarkup(markupItem);
            } else {
                _this._viewer.getMarkupManager().unregisterMarkup(circleMarkupHandle);
            }
        }
        count++;
    };

    var id = setInterval(function () {
        countup();
        if (count > (waitCount + 4)) {
            clearInterval(id);
            setTimeout(function () {
                _this._viewer.getMarkupManager().unregisterMarkup(circleMarkupHandle);
            }, 2500);
        }
    }, interval);
};

annimationControl.prototype._translateNodes = function (nodeIDs, vector, time, distance, interval, waitTime, startPoints, collapse, polylineCount) {
    var _this = this;
    var markupHandle;
    var model = _this._viewer.getModel();
    var count = 0;
    var stepDistance = distance / time * interval;
    var stepCount = time / interval;
    var waitCount = waitTime / interval;
    var translation = { x: vector.x * stepDistance, y: vector.y * stepDistance, z: vector.z * stepDistance };
    var translationMatrix = new Communicator.Matrix();
    translationMatrix.setTranslationComponent(translation.x, translation.y, translation.z);

    if (startPoints != undefined) {
        var markupItem = new lineMarkup(_this._viewer, startPoints);
        if (interval <= 20) {
            markupHandle = _this._viewer.getMarkupManager().registerMarkup(markupItem);
        }
    }

    var countup = function () {
        if (count == waitCount && startPoints != undefined && collapse) {
            if (polylineCount == undefined) {
                _this._viewer.getModel().deleteMeshInstances(_this._meshIDs);
                _this._meshIDs = [];
            } else {
                var meshIDs = _this._meshIDs.slice(_this._meshIDs.length - polylineCount);
                _this._viewer.getModel().deleteMeshInstances(meshIDs);
                _this._meshIDs.splice(_this._meshIDs.length - polylineCount, polylineCount);
            }

            var endPoints = [];
            for (var i = 0; i < startPoints.length; i++) {
                var startPoint = startPoints[i];
                endPoints.push(new Communicator.Point3(
                    startPoint.x - vector.x * distance,
                    startPoint.y - vector.y * distance,
                    startPoint.z - vector.z * distance));
            }
            markupItem.setEndPoints(endPoints);
        }

        if (count >= waitCount) {
            for (var i = 0; i < nodeIDs.length; i++) {
                var nodeMatrix = model.getNodeMatrix(nodeIDs[i]);
                model.setNodeMatrix(nodeIDs[i], Communicator.Matrix.multiply(nodeMatrix, translationMatrix));
            }
            if (startPoints != undefined) {
                markupItem.increment(translation);
            }
        }
        count++;
    };

    var id = setInterval(function () {
        countup();
        if (count >= (waitCount + stepCount)) {
            if (startPoints != undefined && collapse == undefined) {
                var lineVector = { x: vector.x * distance, y: vector.y * distance, z: vector.z * distance };
                _this._createPolyLines(lineVector, startPoints);
            }
            _this._viewer.getMarkupManager().unregisterMarkup(markupHandle);
            clearInterval(id);
        }
    }, interval);
};

annimationControl.prototype._rotateNodes = function (nodeIDs, rotationAxis, angle, basePoint, distinationPoint,
    annimationTime, annimaitonAngle, interval) {
    var _this = this;
    var rotationMatrix = new Communicator.Matrix();
    rotationMatrix = Communicator.Matrix.createFromOffAxisRotation(rotationAxis, angle);

    var point = applyTransform(rotationMatrix, basePoint);

    var translationMatrix = new Communicator.Matrix();
    translationMatrix.setTranslationComponent(
        distinationPoint.x - point.x,
        distinationPoint.y - point.y,
        distinationPoint.z - point.z);
    var nodeMatrixes = [];
    for (var i = 0; i < nodeIDs.length; i++) {
        nodeMatrixes.push(_this._viewer.getModel().getNodeMatrix(nodeIDs[i]));
        var multiplyMatrix = Communicator.Matrix.multiply(nodeMatrixes[i], rotationMatrix);
        _this._viewer.getModel().setNodeMatrix(nodeIDs[i], Communicator.Matrix.multiply(multiplyMatrix, translationMatrix));
    }

    if (annimationTime == undefined)
        return;
    var stepAngle = annimaitonAngle / annimationTime * interval;
    var stepCount = annimationTime / interval;

    var ii = 0;
    var id = setInterval(function () {
        ii++;
        rotationMatrix = Communicator.Matrix.createFromOffAxisRotation(rotationAxis, angle + stepAngle * ii);
        point = applyTransform(rotationMatrix, basePoint);
        translationMatrix.setTranslationComponent(
            distinationPoint.x - point.x,
            distinationPoint.y - point.y,
            distinationPoint.z - point.z);
        for (var i = 0; i < nodeIDs.length; i++) {
            //            _this._viewer.getModel().setNodeMatrix(nodeIDs[i], Communicator.Matrix.multiply(rotationMatrix, translationMatrix));
            var multiplyMatrix = Communicator.Matrix.multiply(nodeMatrixes[i], rotationMatrix);
            _this._viewer.getModel().setNodeMatrix(nodeIDs[i], Communicator.Matrix.multiply(multiplyMatrix, translationMatrix));
        }
        if (ii >= stepCount)
            clearInterval(id);
    }, interval);
};

annimationControl.prototype._createPolyLines = function (lineVector, startPoints) {
    var _this = this;
    var polylineData = [0, 0, 0,
        lineVector.x, lineVector.y, lineVector.z];
    var meshData = new Communicator.MeshData();
    meshData.addPolyline(polylineData);
    _this._viewer.getModel().createMesh(meshData).then(function (meshId) {
        var matrix = new Communicator.Matrix();
        var color = new Communicator.Color(98, 99, 100);
        for (var i = 0; i < startPoints.length; i++) {
            matrix.setTranslationComponent(startPoints[i].x, startPoints[i].y, startPoints[i].z);
            var meshInstanceData = new Communicator.MeshInstanceData(meshId, matrix, null, null, color);
            _this._viewer.getModel().createMeshInstance(meshInstanceData).then(function (instacdId) {
                _this._meshIDs.push(instacdId);
            });
        }
    });
};

annimationControl.prototype.cameraHome = function () {
    var _this = this;
    _this._cameraCtrl.setCamera("home", 0);
}

annimationControl.prototype.home = function (target) {
    var _this = this;
    if(_this._viewer.model._firstModelRootId == -1) { // breaks out of function if model hasn't been built by sceneReadyFunc yet.
        console.log("Returning from annimationControl.home as modelStrReady isn't built yet");
        return;
    }
    _this._viewer.getModel().setNodesHighlighted(_this._nodeTopID, false);
    _this._viewer.getModel().reset();
    _this._viewer.getModel().resetModelTransparency();

    if (_this._screwNode != undefined && _this._removerNode != undefined) {
        _this._viewer.getModel().setNodesVisibility([_this._screwNode, _this._removerNode], false);
    }

    if (_this._meshIDs.length > 0) {
        _this._viewer.getModel().deleteMeshInstances(_this._meshIDs);
        _this._meshIDs.length = 0;
    }

    _this._cameraCtrl.setCamera("home", 500);
    _this._currentAnnimationStep = 0;

    if (target != undefined) {
        if (target == 1) {
            _this._viewer.getModel().setNodesVisibility([23, 24, 25, 26, 27, 28, 29], true);
        } else {
            _this._viewer.getModel().setNodesVisibility([23, 24, 25, 26, 27, 28, 29], false);
        }
    }

    if (_this._screwNode != undefined) {
        _this._viewer.getModel().setNodesVisibility(
            [_this._screwNode, _this._removerNode, _this._leftHandNode, _this._rightHandNode], false);
    }
};

annimationControl.prototype.all = function (targetStep) {
    var _this = this;
    if (_this._currentAnnimationStep < targetStep) {
        _this.explode(targetStep);
    } else {
        _this.collapse(targetStep);
    }
};

annimationControl.prototype.collapse = function (targetStep) {
    var _this = this;
    _this._viewer.getModel().setNodesHighlighted(_this._nodeTopID, false);
    if (targetStep == undefined)
        targetStep = 0;
    if (_this._currentAnnimationStep == -1 || _this._currentAnnimationStep == 0) {
        _this.home();
        _this._cameraCtrl.setCamera("home", 500);
        _this._currentAnnimationStep = 0
        return;
    }
    _this._currentStep = 0;

    var stepInterval = 400;
    interval = 20;
    var waitTime = 0;

    // Step -6
    if (_this._currentAnnimationStep == 6) {
        _this._translateNodes(_this._nodeIDs6_1, this._vector6, stepInterval, 150, interval, waitTime, _this._startPoints6, true, 3);
        _this._translateNodes(_this._nodeIDs6_2, this._vector_6, stepInterval, 150, interval, waitTime, _this._startPoints6, true, 3);

        _this._currentAnnimationStep--;
        waitTime += stepInterval;
        if (_this._currentAnnimationStep == targetStep)
            return;
    }

    // Step -5
    if (_this._currentAnnimationStep == 5) {
        _this._translateNodes(_this._nodeIDs5, this._vector_Y, stepInterval, 300, interval, waitTime, _this._startPoints5, true, 2);

        _this._currentAnnimationStep--;
        waitTime += stepInterval;
        if (_this._currentAnnimationStep == targetStep)
            return;
    }

    // Step -4
    if (_this._currentAnnimationStep == 4) {
        _this._translateNodes(_this._nodeIDs4_1, this._vectorZ, stepInterval, 300, interval, waitTime, _this._startPoints4_1, true, 2);
        _this._translateNodes(_this._nodeIDs4_2, this._vector_Z, stepInterval, 800, interval, waitTime, _this._startPoints4_2, true, 2);

        _this._currentAnnimationStep--;
        waitTime += stepInterval;
        if (_this._currentAnnimationStep == targetStep)
            return;
    }

    // Step -3
    if (_this._currentAnnimationStep == 3) {
        _this._translateNodes(_this._nodeIDs3_4, this._vectorZ, stepInterval, 600, interval, waitTime, _this._startPoints3, true, 7);
        _this._translateNodes(_this._nodeIDs3_2, this._vectorZ, stepInterval, 450, interval, waitTime);
        _this._translateNodes(_this._nodeIDs3_3, this._vectorZ, stepInterval, 150, interval, waitTime);

        _this._currentAnnimationStep--;
        waitTime += stepInterval;
        if (_this._currentAnnimationStep == targetStep)
            return;
    }

    // Step -2
    if (_this._currentAnnimationStep == 2) {
        _this._translateNodes(_this._nodeIDs2, this._vector_Z, stepInterval, 900, interval, waitTime, _this._startPoints2, true, 1);

        _this._currentAnnimationStep--;
        waitTime += stepInterval;
        if (_this._currentAnnimationStep == targetStep)
            return;
    }

    // Step -1
    if (_this._currentAnnimationStep == 1) {
        _this._translateNodes(_this._nodeIDs1, this._vector_Z, stepInterval, 1000, interval, waitTime, _this._startPoints1, true);

        waitTime += stepInterval;
        _this._currentAnnimationStep--;
    }

    // Home camera
    _this._cameraCtrl.setCamera("home", 500, waitTime);
};

annimationControl.prototype.explode = function (targetStep, quick) {
    var _this = this;
    _this._viewer.getModel().setNodesHighlighted(_this._nodeTopID, false);
    if (targetStep == undefined)
        targetStep = 6;
    if (_this._currentAnnimationStep == -1 || _this._currentAnnimationStep == 6) {
        _this.home();
        _this._cameraCtrl.setCamera("home", 500);
        _this._currentAnnimationStep = 0
    }
    _this._currentStep = -1;

    var stepInterval = 400;
    var interval = 20;
    if (quick != undefined) {
        stepInterval = 400;
        interval = 100;
    }

    var waitTime = 0;
    // Step 1
    if (_this._currentAnnimationStep == 0) {
        _this._translateNodes(_this._nodeIDs1, this._vectorZ, stepInterval, 1000, interval, waitTime, _this._startPoints1);
        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    }

    // Step 2
    if (_this._currentAnnimationStep == 1) {
        _this._translateNodes(_this._nodeIDs2, this._vectorZ, stepInterval, 900, interval, waitTime, _this._startPoints2);
        _this._currentAnnimationStep++;
        waitTime += stepInterval;
        if (_this._currentAnnimationStep == targetStep)
            return;
    }

    // Step 3
    if (_this._currentAnnimationStep == 2) {
        _this._translateNodes(_this._nodeIDs3_4, this._vector_Z, stepInterval, 600, interval, waitTime, _this._startPoints3);
        _this._translateNodes(_this._nodeIDs3_2, this._vector_Z, stepInterval, 450, interval, waitTime);
        _this._translateNodes(_this._nodeIDs3_3, this._vector_Z, stepInterval, 150, interval, waitTime);
        _this._currentAnnimationStep++;
        waitTime += stepInterval;
        if (_this._currentAnnimationStep == targetStep)
            return;
    }

    // Step 4
    if (_this._currentAnnimationStep == 3) {
        _this._translateNodes(_this._nodeIDs4_1, this._vector_Z, stepInterval, 300, interval, waitTime, _this._startPoints4_1);
        _this._translateNodes(_this._nodeIDs4_2, this._vectorZ, stepInterval, 800, interval, waitTime, _this._startPoints4_2);
        _this._currentAnnimationStep++;
        waitTime += stepInterval;
        if (_this._currentAnnimationStep == targetStep)
            return;
    }

    // Step 5
    if (_this._currentAnnimationStep == 4) {
        _this._translateNodes(_this._nodeIDs5, this._vectorY, stepInterval, 300, interval, waitTime, _this._startPoints5);
        _this._currentAnnimationStep++;
        waitTime += stepInterval;
        if (_this._currentAnnimationStep == targetStep)
            return;
    }

    // Step 6
    if (_this._currentAnnimationStep == 5) {
        _this._translateNodes(_this._nodeIDs6_1, this._vector_6, stepInterval, 150, interval, waitTime, _this._startPoints6);
        _this._translateNodes(_this._nodeIDs6_2, this._vector6, stepInterval, 150, interval, waitTime, _this._startPoints6);
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    }
};

annimationControl.prototype.stepPreperation = function (targetStep) {
    var _this = this;

    _this._viewer.getModel().setNodesHighlighted(_this._nodeTopID, false);

    if (_this._meshIDs.length > 0) {
        _this._viewer.getModel().deleteMeshInstances(_this._meshIDs);
        _this._meshIDs.length = 0;
    }

    if (_this._currentStep > targetStep || _this._currentStep == -1) {
        _this.home();
        _this._currentStep = 0;
    }

    if (targetStep >= 2) {
        _this._viewer.getModel().setNodesVisibility(_this._nodeIDs1, false);
    }

    if (targetStep >= 3) {
        _this._viewer.getModel().setNodesVisibility(_this._nodeIDs2, false);
    }

    if (targetStep >= 4) {
        _this._viewer.getModel().setNodesVisibility(_this._nodeIDs3_2, false);
        _this._viewer.getModel().setNodesVisibility(_this._nodeIDs3_3, false);
        _this._viewer.getModel().setNodesVisibility(_this._nodeIDs3_4, false);
    }

    if (targetStep >= 5) {
        _this._viewer.getModel().setNodesVisibility(_this._nodeIDs4_1, false);
        var nodeIDs = [19, 30];
        _this._viewer.getModel().setNodesVisibility(nodeIDs, false);

    }

    if (targetStep >= 6) {
        var nodeIDs = [20];
        _this._viewer.getModel().setNodesVisibility(nodeIDs, false);
    }

    if (_this._currentStep < 3 && targetStep > 3) {
        var translationMatrix = new Communicator.Matrix();
        translationMatrix.setTranslationComponent(0, 0, 600);
        for (var i = 0; i < _this._nodeIDs3_1.length; i++) {
            var nodeMatrix = _this._viewer.getModel().getNodeMatrix(_this._nodeIDs3_1[i]);
            _this._viewer.getModel().setNodeMatrix(_this._nodeIDs3_1[i], Communicator.Matrix.multiply(nodeMatrix, translationMatrix));
        }
    }

    if (_this._currentStep < 4 && targetStep > 4) {
        var translationMatrix = new Communicator.Matrix();
        translationMatrix.setTranslationComponent(0, 0, 600);
        for (var i = 0; i < _this._nodeIDs4_2.length; i++) {
            var nodeMatrix = _this._viewer.getModel().getNodeMatrix(_this._nodeIDs4_2[i]);
            _this._viewer.getModel().setNodeMatrix(_this._nodeIDs4_2[i], Communicator.Matrix.multiply(nodeMatrix, translationMatrix));
        }
    }

    if (_this._currentStep < 5 && targetStep > 5) {
        var translationMatrix = new Communicator.Matrix();
        translationMatrix.setTranslationComponent(0, 200, 0);
        for (var i = 0; i < _this._nodeIDs5.length; i++) {
            var nodeMatrix = _this._viewer.getModel().getNodeMatrix(_this._nodeIDs5[i]);
            _this._viewer.getModel().setNodeMatrix(_this._nodeIDs5[i], Communicator.Matrix.multiply(nodeMatrix, translationMatrix));
        }
    }

};

annimationControl.prototype.step1 = function () {
    var _this = this;
    _this.stepPreperation(1);
    _this._cameraCtrl.setCamera("home", 500);

    var startPoints = [];
    startPoints.push(new Communicator.Point3(770.3360937395948, 461.1314408842327, 159.99549556962006));
    startPoints.push(new Communicator.Point3(655.2286119217954, 450.3678863177083, 202.8581892343409));
    startPoints.push(new Communicator.Point3(499.6371555704877, 432.98991307836013, 215.00000000074942));
    startPoints.push(new Communicator.Point3(505.11783499342187, 382.2225733532032, 169.01259504008885));
    startPoints.push(new Communicator.Point3(769.2699809528831, 398.30771932478365, 164.83026270834853));
    _this._translateNodes(_this._nodeIDs1, this._vectorZ, 500, 500, 20, 500, startPoints)
    _this._currentStep = 1;
    _this._currentAnnimationStep = -1;
};

annimationControl.prototype.step2 = function () {
    var _this = this;
    _this.stepPreperation(2);

    _this._cameraCtrl.setCamera("step2", 500);

    var startPoints = [];
    startPoints.push(new Communicator.Point3(749.7401627879242, 424.9894275891387, 140.89999985707027));
    _this._translateNodes(_this._nodeIDs2, this._vectorZ, 300, 300, 20, 500, startPoints);
    _this._currentStep = 2;
    _this._currentAnnimationStep = -1;
};

annimationControl.prototype.step3 = function () {
    var _this = this;
    _this.stepPreperation(3);
    _this._cameraCtrl.setCamera("step3", 500);

    var startPoints = [];
    startPoints.push(new Communicator.Point3(990.1713916797693, 597.9847794032801, 204.57647639885909));
    startPoints.push(new Communicator.Point3(939.9188451052868, 380.60031172660933, 143.11521999008255));
    startPoints.push(new Communicator.Point3(865.1916305679604, 158.21087354264318, 131.46027884204534));
    startPoints.push(new Communicator.Point3(625.0988038910338, 108.28581405852765, 128.84381654768413));
    startPoints.push(new Communicator.Point3(380.2770757723101, 88.97522522513191, 122.82493274570334));
    startPoints.push(new Communicator.Point3(110.28162750914043, 353.6389483921871, 131.68850607162335));
    startPoints.push(new Communicator.Point3(133.8709923036913, 590.1120556978431, 199.15701441820056));
    _this._translateNodes(_this._nodeIDs3_1, this._vectorZ, 600, 600, 20, 500, startPoints)

    var translation2 = { x: 0, y: 0, z: 16 };
    _this._translateNodes(_this._nodeIDs3_2, this._vectorZ, 600, 500, 20, 500);

    var translation3 = { x: 0, y: 0, z: 4 };
    _this._translateNodes(_this._nodeIDs3_3, this._vectorZ, 600, 100, 20, 500);
    _this._currentStep = 3;
    _this._currentAnnimationStep = -1;
};

annimationControl.prototype.step4 = function () {
    var _this = this;
    _this.stepPreperation(4);
    _this._cameraCtrl.setCamera("step4_2", 500);

    var startPoints = [];
    startPoints.push(new Communicator.Point3(421.93411695105755, 383.1431292020281, 769.9999999999717 - 20));
    startPoints.push(new Communicator.Point3(563.9426271398613, 413.0917612437357, 769.9999999999802 - 20));
    _this._translateNodes(_this._nodeIDs4_1, this._vector_Z, 600, 600, 20, 500, startPoints)

    var startPoints2 = [];
    startPoints2.push(new Communicator.Point3(421.93411695105755, 383.1431292020281, 769.9999999999717));
    startPoints2.push(new Communicator.Point3(563.9426271398613, 413.0917612437357, 769.9999999999802));
    _this._translateNodes(_this._nodeIDs4_2, this._vectorZ, 600, 600, 20, 800, startPoints);
    _this._currentStep = 4;
    _this._currentAnnimationStep = -1;
};

annimationControl.prototype.step5 = function () {
    var _this = this;
    _this.stepPreperation(5);

    _this._cameraCtrl.setCamera("step5", 500);

    var startPoints = [];
    startPoints.push(new Communicator.Point3(515.6587265033368, 398.5613708495621, 1162.0081596434638 + 200));
    startPoints.push(new Communicator.Point3(471.1106783717549, 398.5613708495931, 1161.9723100725437 + 200));
    _this._translateNodes(_this._nodeIDs5, this._vectorY, 400, 200, 20, 500, startPoints);
    _this._currentStep = 5;
    _this._currentAnnimationStep = -1;
};

annimationControl.prototype.step6 = function () {
    var _this = this;
    _this.stepPreperation(6);
    _this._cameraCtrl.setCamera("step6_2", 500);

    var startPoints = [];
    startPoints.push(new Communicator.Point3(426.4339607188854, 612.688914716395, 1184.9939618035141 + 200));
    startPoints.push(new Communicator.Point3(536.8716923010777, 616.6475485864701, 1158.961831875789 + 200));
    startPoints.push(new Communicator.Point3(536.8904600844197, 616.6499344013002, 1210.998258057193 + 200));
    _this._translateNodes(_this._nodeIDs6_1, _this._vector_6, 200, 100, 20, 500, startPoints)

    _this._translateNodes(_this._nodeIDs6_2, _this._vector6, 200, 100, 20, 600, startPoints);
    _this._currentStep = 6;
    _this._currentAnnimationStep = -1;
};

annimationControl.prototype.setToolNodeID = function (screwNode, removerNode, leftHandNode, rightHandNode) {
    var _this = this;
    _this._screwNode = screwNode;
    _this._removerNode = removerNode;
    _this._leftHandNode = leftHandNode;
    _this._rightHandNode = rightHandNode;
};

annimationControl.prototype.detail1_explode = function (targetStep) {
    var _this = this;
    var stepInterval = 1000;
    var waitTime = 0;
    var rotationMatrix = new Communicator.Matrix();
    var translationMatrix = new Communicator.Matrix();
    var vector = [];
    var counter = 0;

    // Step
    if (_this._currentAnnimationStep == counter++) {
        _this._cameraCtrl.setCamera("detail1_1", stepInterval, waitTime);
        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        var markupItem = new circleMarkup(_this._viewer, _this._centerPoints1_1);
        _this._blinkMarkup(markupItem, waitTime);

        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        setTimeout(function () {
            _this._viewer.getModel().setNodesVisibility([_this._screwNode], true);
            var basePoint = { x: 0, y: 0, z: 0 };
            var distinaitonPoint = { x: 455, y: 288.9, z: 213.5 };
            _this._rotateNodes([_this._screwNode], _this._xAxis, 150, basePoint, distinaitonPoint);
        }, waitTime);
        waitTime += stepInterval / 2;

        vector = { x: 0, y: Math.cos(30 * (Math.PI / 180)), z: -Math.sin(30 * (Math.PI / 180)) };
        _this._translateNodes([_this._screwNode], vector, stepInterval / 2, 90, 100, waitTime);
        _this._cameraCtrl.setCamera("detail1_2", stepInterval, waitTime);

        waitTime += stepInterval / 2;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        setTimeout(function () {
            var gifImage = document.getElementById("doorClipImage");
            gifImage.src = "./images/kango1.gif?" + (new Date).getTime();
            $("#doorClipImage").show();
        }, waitTime);

        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        vector = { x: 0, y: Math.cos(30 * (Math.PI / 180)), z: -Math.sin(30 * (Math.PI / 180)) };
        _this._translateNodes([_this._screwNode], vector, stepInterval / 2, 15, 100, waitTime);
        vector = { x: 0, y: -Math.cos(30 * (Math.PI / 180)), z: Math.sin(30 * (Math.PI / 180)) };
        _this._translateNodes([_this._screwNode], vector, stepInterval / 2, 15, 100, waitTime + stepInterval / 2);

        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        setTimeout(function () {
            var point = { x: 727.7162605398893, y: 462.5056449964488, z: 155.25009206935084 };
            _this._rotateNodes([23], _this._xAxis, 0, point, point, stepInterval / 2, -3, 200);
        }, waitTime);

        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        setTimeout(function () {
            $("#doorClipImage").hide();
            _this._viewer.getModel().setNodesVisibility([_this._screwNode], false);
            _this._cameraCtrl.setCamera("detail1_3", stepInterval);
            _this._viewer.getModel().setNodesTransparency([23], 0.7);
        }, waitTime);

        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        var markupItem = new circleMarkup(_this._viewer, _this._centerPoints1_2);
        _this._blinkMarkup(markupItem, waitTime);

        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        setTimeout(function () {
            var basePoint = { x: 0, y: -204.82, z: 19.7 };
            var distinaitonPoint = { x: 679.5, y: 453, z: 200 - 3 };
            _this._rotateNodes([_this._removerNode], _this._xAxis, 20, basePoint, distinaitonPoint);
            _this._viewer.getModel().setNodesVisibility([_this._removerNode], true);
        }, waitTime);

        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        setTimeout(function () {
            var gifImage = document.getElementById("doorClipImage");
            gifImage.src = "./images/kango2.gif?" + (new Date).getTime();
            $("#doorClipImage").show();
        }, waitTime);

        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        // Step n-1
        setTimeout(function () {
            var basePoint = { x: 679.5, y: 453, z: 200 - 3 };
            var distinaitonPoint = { x: 679.5, y: 453, z: 200 };
            _this._rotateNodes([_this._removerNode], _this._xAxis, -3, basePoint, distinaitonPoint);
        }, waitTime);
        waitTime += 300;

        // Step n-2
        setTimeout(function () {
            $("#doorClipImage").hide();
            var point = { x: 807, y: 428.8, z: 155.1 };
            _this._rotateNodes([23], _this._yAxis, 0, point, point, 600, 3, 100);

            var basePoint = { x: 679.5, y: 453, z: 200 };
            var distinaitonPoint = { x: 679.5, y: 453, z: 200 + 6 };
            _this._rotateNodes([_this._removerNode], _this._xAxis, -3, basePoint, distinaitonPoint);
        }, waitTime);
        waitTime += 300;

        // Step n-3
        vector = { x: 0, y: - Math.cos(16 * (Math.PI / 180)), z: Math.sin(16 * (Math.PI / 180)) };
        _this._translateNodes([_this._removerNode], vector, 400, 20, 100, waitTime);

        waitTime += 400;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        setTimeout(function () {
            _this._viewer.getModel().setNodesVisibility([_this._removerNode], false);
            _this._cameraCtrl.setCamera("detail1_4", stepInterval);
        }, waitTime);

        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        var markupItem = new circleMarkup(_this._viewer, _this._centerPoints1_3);
        _this._blinkMarkup(markupItem, waitTime);

        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        setTimeout(function () {
            var gifImage = document.getElementById("doorClipImage");
            gifImage.src = "./images/kango3.gif?" + (new Date).getTime();
            $("#doorClipImage").show();
        }, waitTime);

        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        // Step n-1
        setTimeout(function () {
            var point = { x: 807, y: 428.8, z: 155.1 };
            _this._rotateNodes([23], _this._yAxis, 3, point, point, stepInterval / 2, 5, 100);
        }, waitTime);
        waitTime += stepInterval / 2;

        // Step n-2
        vector = { x: 0, y: 0, z: 1 };
        _this._translateNodes([23], vector, stepInterval / 2, 30, 100, waitTime);

        waitTime += stepInterval / 2;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };
};

annimationControl.prototype.detail3_explode = function (targetStep) {
    var _this = this;
    var stepInterval = 1000;
    var waitTime = 0;
    var rotationMatrix = new Communicator.Matrix();
    var translationMatrix = new Communicator.Matrix();
    var vector = [];
    var counter = 0;

    // Step
    if (_this._currentAnnimationStep == counter++) {
        _this._viewer.getModel().setNodesTransparency(_this._nodeIDs3_1, 0.7);
        _this._cameraCtrl.setCamera("detail3_1", stepInterval, waitTime);

        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        var markupItem = new circleMarkup(_this._viewer, _this._centerPoints3_1_1);
        _this._blinkMarkup(markupItem, waitTime);

        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        setTimeout(function () {
            rotationMatrix = Communicator.Matrix.createFromOffAxisRotation(_this._yAxis, 180);
            _this._viewer.getModel().setNodeMatrix(_this._removerNode, rotationMatrix);

            var basePoint = { x: 0, y: -204.82, z: -19.7 };
            var distinaitonPoint = { x: 506.5188910525194 - 100, y: 69.06743145859946 - 100, z: 115.07673933148544 };
            _this._rotateNodes([_this._removerNode], _this._xAxis, 149, basePoint, distinaitonPoint);
            _this._viewer.getModel().setNodesVisibility([_this._removerNode], true);

        }, waitTime);
        waitTime += stepInterval / 2

        _this._translateNodes([_this._removerNode], _this._vectorY, stepInterval / 2, 150, 100, waitTime);

        waitTime += stepInterval / 2;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        setTimeout(function () {
            var gifImage = document.getElementById("doorClipImage");
            gifImage.src = "./images/kango4.gif?" + (new Date).getTime();
            $("#doorClipImage").show();
        }, waitTime);

        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    var pointTop = { x: 669.8728002885282, y: 722.2030377254177, z: 177.7673137640577 };
    // Step
    if (_this._currentAnnimationStep == counter++) {
        waitTime += stepInterval / 2;
        setTimeout(function () {
            _this._rotateNodes(_this._nodeIDs3_1, _this._xAxis, -1, pointTop, pointTop);

            var point = { x: 506.5188910525194, y: 69.06743145859946 + 50, z: 115.07673933148544 };
            _this._rotateNodes([_this._removerNode], _this._xAxis, -10, point, point);
        }, waitTime);

        waitTime += stepInterval / 2;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        setTimeout(function () {
            $("#doorClipImage").hide();
        }, waitTime);
        var markupItem = new circleMarkup(_this._viewer, _this._centerPoints3_1_2);
        _this._blinkMarkup(markupItem, waitTime);

        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        setTimeout(function () {
            _this._viewer.getModel().resetNodeMatrixToInitial(_this._removerNode);

            rotationMatrix = Communicator.Matrix.createFromOffAxisRotation(_this._yAxis, 180);
            _this._viewer.getModel().setNodeMatrix(_this._removerNode, rotationMatrix);

            var basePoint = { x: 0, y: -204.82, z: -19.7 };
            var distinaitonPoint = { x: 506.5188910525194 + 90, y: 69.06743145859946 - 90, z: 115.07673933148544 };
            _this._rotateNodes([_this._removerNode], _this._xAxis, 149, basePoint, distinaitonPoint);

        }, waitTime);
        waitTime += stepInterval / 2

        _this._translateNodes([_this._removerNode], _this._vectorY, stepInterval / 2, 150, 100, waitTime);

        waitTime += stepInterval / 2;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        waitTime += stepInterval / 2;
        setTimeout(function () {
            _this._rotateNodes(_this._nodeIDs3_1, _this._xAxis, -1, pointTop, pointTop);

            var point = { x: 506.5188910525194, y: 69.06743145859946 + 60, z: 115.07673933148544 };
            _this._rotateNodes([_this._removerNode], _this._xAxis, -10, point, point);
        }, waitTime);

        waitTime += stepInterval / 2;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    var pointL1 = { x: 90.93039815396605, y: 258.6036757680795, z: 110.23818202869006 };
    var pointR1 = { x: 936.8161672616753, y: 236.03021975969705, z: 119.86139075199026 };
    // Step: hands
    if (_this._currentAnnimationStep == counter++) {
        setTimeout(function () {
            _this._viewer.getModel().setNodesVisibility([_this._removerNode], false);

            // Left Hand
            var basePoint = { x: 0, y: 111.5, z: 20 };
            var distinaitonPoint = { x: 0, y: 0, z: 0 };
            _this._rotateNodes([_this._leftHandNode], _this._xAxis, -58, basePoint, distinaitonPoint);

            basePoint = { x: 0, y: 0, z: 0 };
            distinaitonPoint = {
                x: pointL1.x - Math.cos(30 * (Math.PI / 180)) * 100 - 10,
                y: pointL1.y - Math.sin(30 * (Math.PI / 180)) * 100,
                z: pointL1.z + 50
            };
            _this._rotateNodes([_this._leftHandNode], _this._zAxis, -90, basePoint, distinaitonPoint);
            _this._rotateNodes([_this._leftHandNode], _this._yAxis, 40, distinaitonPoint, distinaitonPoint);

            _this._viewer.getModel().setNodesVisibility([_this._leftHandNode], true);

            // Right Hand
            rotationMatrix = Communicator.Matrix.createFromOffAxisRotation(_this._yAxis, 180);
            _this._viewer.getModel().setNodeMatrix(_this._rightHandNode, rotationMatrix);

            basePoint = { x: 0, y: 111.5, z: 20 };
            distinaitonPoint = { x: 0, y: 0, z: 0 };
            _this._rotateNodes([_this._rightHandNode], _this._xAxis, -58, basePoint, distinaitonPoint);

            basePoint = { x: 0, y: 0, z: 0 };
            distinaitonPoint = {
                x: pointR1.x + Math.cos(30 * (Math.PI / 180)) * 100,
                y: pointR1.y - Math.sin(30 * (Math.PI / 180)) * 100,
                z: pointR1.z + 50
            };
            _this._rotateNodes([_this._rightHandNode], _this._zAxis, 70, basePoint, distinaitonPoint);
            _this._rotateNodes([_this._rightHandNode], _this._yAxis, -40, distinaitonPoint, distinaitonPoint);

            _this._viewer.getModel().setNodesVisibility([_this._rightHandNode], true);
        }, waitTime);

        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        vector = { x: Math.cos(30 * (Math.PI / 180)), y: Math.sin(30 * (Math.PI / 180)), z: 0 };
        _this._translateNodes([_this._leftHandNode], vector, stepInterval, 100, 100, waitTime);

        vector = { x: -Math.cos(30 * (Math.PI / 180)), y: Math.sin(30 * (Math.PI / 180)), z: 0 };
        _this._translateNodes([_this._rightHandNode], vector, stepInterval, 100, 100, waitTime);

        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        var markupItem = new circleMarkup(_this._viewer, _this._centerPoints3_2);
        _this._blinkMarkup(markupItem, waitTime);

        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        setTimeout(function () {
            _this._rotateNodes(_this._nodeIDs3_1, _this._xAxis, -3, pointTop, pointTop);
            _this._rotateNodes([_this._leftHandNode, _this._rightHandNode], _this._xAxis, -3, pointTop, pointTop);

        }, stepInterval / 2);

        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    var pointL2 = { x: 98.98955671508338, y: 458.0999717411878, z: 148.94027722602368 };
    var pointR2 = { x: 987.9690123874543, y: 485.3984112594171, z: 158.54825555525076 };
    // Step
    if (_this._currentAnnimationStep == counter++) {
        var dx = pointL2.x - pointL1.x;
        var dy = pointL2.y - pointL1.y;
        var dz = pointL2.z - pointL1.z - 30;
        var l = Math.sqrt(dx * dx + dy * dy + dz * dz);
        vector = { x: dx / l, y: dy / l, z: dz / l };
        _this._translateNodes([_this._leftHandNode], vector, stepInterval, l, 100, waitTime);

        dx = pointR2.x - pointR1.x;
        dy = pointR2.y - pointR1.y - 20;
        dz = pointR2.z - pointR1.z - 20;
        l = Math.sqrt(dx * dx + dy * dy + dz * dz);
        vector = { x: dx / l, y: dy / l, z: dz / l };
        _this._translateNodes([_this._rightHandNode], vector, stepInterval, l, 100, waitTime);

        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        var markupItem = new circleMarkup(_this._viewer, _this._centerPoints3_3);
        _this._blinkMarkup(markupItem, waitTime);

        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        setTimeout(function () {
            _this._rotateNodes(_this._nodeIDs3_1, _this._xAxis, -3, pointTop, pointTop);
            _this._rotateNodes([_this._leftHandNode, _this._rightHandNode], _this._xAxis, -3, pointTop, pointTop);

        }, stepInterval / 2);

        waitTime += stepInterval / 2;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        var markupItem = new circleMarkup(_this._viewer, _this._centerPoints3_4);
        _this._blinkMarkup(markupItem, waitTime);

        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        setTimeout(function () {
            var gifImage = document.getElementById("doorClipImage");
            gifImage.src = "./images/kango5.gif?" + (new Date).getTime();
            $("#doorClipImage").show();
        }, waitTime);

        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        waitTime += stepInterval;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };

    // Step
    if (_this._currentAnnimationStep == counter++) {
        setTimeout(function () {
            _this._rotateNodes(_this._nodeIDs3_1, _this._xAxis, 0, pointTop, pointTop, stepInterval / 2, -3, 100);
            _this._rotateNodes([_this._leftHandNode, _this._rightHandNode], _this._xAxis, 0, pointTop, pointTop, stepInterval / 2, -2, 100);
        }, waitTime);
        waitTime += stepInterval / 2

        vector = { x: 0, y: Math.sin(20 * (Math.PI / 180)), z: Math.cos(20 * (Math.PI / 180)) };
        _this._translateNodes(_this._nodeIDs3_1, vector, 100, 50, 20, waitTime);
        _this._translateNodes([_this._leftHandNode, _this._rightHandNode], vector, 100, 50, 20, waitTime);

        waitTime += stepInterval / 2;
        _this._currentAnnimationStep++;
        if (_this._currentAnnimationStep == targetStep)
            return;
    };
};


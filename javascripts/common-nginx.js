function getRendererType() {
    var val = getURLArgument("viewer");
    if (val == "SSR") {
        return Communicator.RendererType.Server;
    } else {
        return Communicator.RendererType.Client;
    }
}

function requestEndpoint(rendererType) {
    var request = new XMLHttpRequest();
    var promise = new Promise(function (resolve, reject) {
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var response = request.responseText;
                    var obj = JSON.parse(response);
                    var endpoint = obj.endpoints.ws;
                    var re = /ws:\/\/(.*):(.*)/g;
                    var wsProtocol = (window.location.protocol == "https:") ? "wss:" : "ws:";
              
                    endpoint = endpoint.replace(re, wsProtocol+"//"+window.location.hostname+"/wssproxy/$2/");
                    resolve(endpoint);
                } else {
                    reject("ws://localhost:55555");
                }
            }
        };
        var serviceBrokerURL = window.location.protocol + "//" + window.location.hostname + "/httpproxy/11182";
        request.open("POST", serviceBrokerURL + "/service", true);
        var data;
        if (rendererType == Communicator.RendererType.Server) {
            data = '{"class": "ssr_session"}';
        } else {
            data = '{"class": "csr_session"}';
        }
        request.send(data);
    });
    return promise;
}

function getURLArgument(name) {
    if (1 < document.location.search.length) {
        var query = document.location.search.substring(1);
        var parameters = query.split('&');
        var result = new Object();
        for (var i = 0; i < parameters.length; i++) {
            var element = parameters[i].split('=');
            var paramName = decodeURIComponent(element[0]);
            var paramValue = decodeURIComponent(element[1]);
            result[paramName] = decodeURIComponent(paramValue);
        }
        return result[name];
    }
}

function dumpNodes(node, model, level) {
    var modelNodeName = model.getNodeName(node);
    if (modelNodeName != undefined) {
        console.log(level + node + ": " + modelNodeName);
    }
    var children = model.getNodeChildren(node);
    if (!children) {
        return;
    }
    level += " ";
    for (var i = 0; i < children.length; i++) {
        dumpNodes(children[i], model, level);
    }
}

function partProperties(modelNodeName, props_promise) {
    props_promise.then(function (props) {
        console.log("Node: " + modelNodeName);
        if (props && Object.keys(props).length) {
            for (var key in props) {
                console.log("  " + Communicator.Internal.Utility.utf8Decode(key) + " = " + Communicator.Internal.Utility.utf8Decode(props[key]));
            }
        }
    });
}

function ImageToBase64(img, mime_type) {
    // New Canvas
    var canvas = document.createElement('canvas');
    canvas.width  = img.width;
    canvas.height = img.height;
    // Draw Image
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    // To Base64
    return canvas.toDataURL(mime_type);
}

function saveCameraAsJson(viewer) {
    var camera = viewer.getView().getCamera();
    var json = camera.forJson();
    var cameraString = JSON.stringify(json);
    $('#exportResult').load('exportCamera.php', {data: cameraString});
}

function createRotateTransform(vector, degree) {
    var x = vector.x, y = vector.y, z = vector.z;
    var r = degree * (Math.PI / 180);
    return [
        x * x * (1 - Math.cos(r)) + 1 * Math.cos(r),
        x * y * (1 - Math.cos(r)) + z * Math.sin(r),
        z * x * (1 - Math.cos(r)) - y * Math.sin(r),
        0,
        x * y * (1 - Math.cos(r)) - z * Math.sin(r),
        y * y * (1 - Math.cos(r)) + 1 * Math.cos(r),
        y * z * (1 - Math.cos(r)) + x * Math.sin(r),
        0,
        z * x * (1 - Math.cos(r)) + y * Math.sin(r),
        y * z * (1 - Math.cos(r)) - x * Math.sin(r),
        z * z * (1 - Math.cos(r)) + 1 * Math.cos(r),
        0, 0, 0, 0, 1
    ]
}

function applyTransform (transform, point) {
    var a = transform.m[0], b = transform.m[4], c = transform.m[8], d = transform.m[12];
    var e = transform.m[1], f = transform.m[5], g = transform.m[9], h = transform.m[13];
    var i = transform.m[2], j = transform.m[6], k = transform.m[10], l = transform.m[14];
    var m = transform.m[3], n = transform.m[7], o = transform.m[11], p = transform.m[15];
    var x = point.x;
    var y = point.y;
    var z = point.z;
    var w = 1;
    return {
        x: a*x + b*y + c*z + d*w,
        y: e*x + f*y + g*z + h*w,
        z: i*x + j*y + k*z + l*w
    }
}

function unitVector (P1, P2, l) {
    var dx = P2.x - P1.x;
    var dy = P2.y - P1.y;
    var dz = P2.z - P1.z;
    l = Math.sqrt(dx * dx + dy * dy + dz * dz);
    return {x: dx / l, y: dy / l, z: dz / l};
}
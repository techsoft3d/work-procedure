function findNodeIdsFromName(node, model, nodeName, nodes) {
    var modelNodeName = model.getNodeName(node);
    if (modelNodeName == nodeName) {
        nodes.push(node);
        return;
    } else {
        var children = model.getNodeChildren(node);
        if (!children) {
            return;
        }
        for (var i = 0; i < children.length; i++) {
            findNodeIdsFromName(children[i], model, nodeName, nodes);
        }
    }
}

function findNodeIdsFromName_part(node, model, nodeName, nodes) {
    var modelNodeName = model.getNodeName(node);
    if (modelNodeName.indexOf(nodeName) == 0) {
        nodes.push(node);
        return;
    } else {
        var children = model.getNodeChildren(node);
        if (!children) {
            return;
        }
        for (var i = 0; i < children.length; i++) {
            findNodeIdsFromName(children[i], model, nodeName, nodes);
        }
    }
}

function findNodeIdsFromMultiNames_part(node, model, nodeNames, nodes) {
    var modelNodeName = model.getNodeName(node);
    var isExist = false;
    for (var i = 0; i < nodeNames.length; i++) {
        if (modelNodeName.indexOf(nodeNames[i]) == 0)
            isExist = true;
    }
    if (isExist) {
        nodes.push(node);
        return;
    } else {
        var children = model.getNodeChildren(node);
        if (!children) {
            return;
        }
        for (var i = 0; i < children.length; i++) {
            findNodeIdsFromMultiNames_part(children[i], model, nodeNames, nodes);
        }
    }
}

function createBaseMesh(viewer) {
    viewer.getModel().getModelBounding(true, false).then(function (box) {
        var vertices = [
            box.min.x, box.min.y, 0,
            box.min.x, box.max.y, 0,
            box.max.x, box.max.y, 0,
            box.min.x, box.min.y, 0,
            box.max.x, box.max.y, 0,
            box.max.x, box.min.y, 0
        ];

        var normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ];

        var meshData = new Communicator.MeshData();
        meshData.setFaceWinding(Communicator.FaceWinding.Clockwise);
        meshData.addFaces(vertices, normals);
        viewer.getModel().createMesh(meshData).then(function (meshId) {
            var faceColor = new Communicator.Color(128, 129, 130);
            meshInstanceData = new Communicator.MeshInstanceData(meshId, undefined, "ground_plane", faceColor);
            viewer.getModel().createMeshInstance(meshInstanceData).then(function (instacdId) {
                return instacdId;
            });
        });                  
    });
}
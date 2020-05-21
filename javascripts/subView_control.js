function subViewControl(viewer) {
    this._viewer = viewer;
}

subViewControl.prototype.start = function () {
    var _this = this;
    var nodes = [];
    var model = _this._viewer.getModel();
    var root = model.getRootNode();
    findNodes(root, model, nodes)
    if (nodes.length > 0) {
        _this._viewer.getModel().setNodesVisibility(nodes, false);
    }
};

subViewControl.prototype.showParts = function (parts, camera) {
    var _this = this;
    _this.start();
    _this._viewer.getModel().setNodesVisibility(parts, true);
    _this._viewer.getView().setCamera(camera);
    _this._viewer.getView().fitNodes(parts, 0);
    var currentCamera = _this._viewer.getView().getCamera();
};

function findNodes(node, model, nodes) {
    var modelNodeType = model.getNodeType(node);
    if (modelNodeType == Communicator.NodeType.PartInstance) {
        nodes.push(node);
        return;
    } else {
        var children = model.getNodeChildren(node);
        if (!children) {
            return;
        }
        for (var i = 0; i < children.length; i++) {
            findNodes(children[i], model, nodes);
        }
    }
}
class mouseOverOperator extends Communicator.Operator.Operator {
    constructor(viewer) {
        super();
        this._viewer = viewer;
        this._currentNode = 0;
        this._pickConfig; // Communicator.PickConfig was added in HC2017
        if (getViewerVersion(this._viewer) >= 5.0) {
            this._pickConfig = new Communicator.PickConfig(Communicator.SelectionMask.Face);
        }
        function getViewerVersion(viewer) {
            var version = viewer.getViewerVersionString();
            var id = version.indexOf( " " );
            if (id != -1)
                version = version.slice(0, id);
            return Number(version);
        }
    }

    onActivate() {
    };

    onMouseMove(event) {
        var _this = this;
        this._viewer.getView().pickFromPoint(event.getPosition(), _this._pickConfig).then(function (selectionItem) {
            var nodeID = selectionItem.getNodeId();
            if (nodeID > 0) {
                var parentID = _this._viewer.getModel().getNodeParent(nodeID);
                if (parentID != _this._currentNode) {
                    var nodes = [0];
                    _this._viewer.getModel().setNodesHighlighted(nodes, false);
                    if (parentID == 19 || parentID == 30) {
                        parentID = 19;
                        nodes = [parentID, 30];
                    } else if (parentID == 3 || parentID == 4) {
                        parentID = 3;
                        nodes = [parentID, 4];
                    } else {
                        nodes = [parentID];
                    }
                    _this._viewer.getModel().setNodesHighlighted(nodes, true);
                    workProc.showPartProperties(parentID);
                    workProc.clearTableRowColor();
                    _this._currentNode = parentID;
                }
            }
        });
    };

    setCurrentNode(id) {
        var _this = this;
        _this._currentNode = id;
    }
}

class mouseDragOperator extends Communicator.Operator.Operator {
    constructor() {
        super();
    }

   onActivate() {
    };

    onMouseDown(event) {
        workProc.disableDynamicHighlight();
    };

    onMouseUp(event) {
        workProc.enableDynamicHighlight();
    };
}
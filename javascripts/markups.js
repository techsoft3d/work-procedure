function lineMarkup(viewer, startPoints) {
    this._viewer = viewer;
    this._startPoints = [];
    this._endPoints = [];
    for (var i = 0; i < startPoints.length; i++) {
        this._startPoints.push(startPoints[i].copy());
        this._endPoints.push(startPoints[i].copy());
    }
}

lineMarkup.prototype.increment = function (translation) {
    for (var i = 0; i < this._endPoints.length; i++) {
        this._endPoints[i].x += (translation.x);
        this._endPoints[i].y += (translation.y);
        this._endPoints[i].z += (translation.z );            
    }
};

lineMarkup.prototype.setEndPoints = function (endPoints) {
    this._endPoints.length = 0;
    for (var i = 0; i < endPoints.length; i++) {
        this._endPoints.push(endPoints[i].copy());
    }
}

lineMarkup.prototype.draw = function () {
    var _this = this;
    var lines = [];
    for (var i = 0; i < _this._endPoints.length; i++) {
        lines.push(new Communicator.Markup.Shape.Line());
        lines[i].set(Communicator.Point2.fromPoint3(_this._viewer.getView().projectPoint(_this._startPoints[i])),
                     Communicator.Point2.fromPoint3(_this._viewer.getView().projectPoint(_this._endPoints[i])));
        lines[i].setStrokeColor(new Communicator.Color(255, 255, 0));
        _this._viewer.getMarkupManager().getRenderer().drawLine(lines[i]);
    }
};

function circleMarkup(viewer, centerPoints) {
    this._viewer = viewer;
    this._centerPoints = centerPoints;
    this._waitCount;
}

circleMarkup.prototype.draw = function () {
    var _this = this;
    var circles = [];
    for (var i = 0; i < _this._centerPoints.length; i++) {
        circles.push(new Communicator.Markup.Shape.Circle());
        var center = Communicator.Point2.fromPoint3(_this._viewer.getView().projectPoint(_this._centerPoints[i]));
        circles[i].set(center, 20);
        circles[i].setStrokeColor(new Communicator.Color(255, 0, 0));
        circles[i].setFillOpacity(0);
        circles[i].setStrokeWidth(3);
        _this._viewer.getMarkupManager().getRenderer().drawCircle(circles[i]);
    }
};


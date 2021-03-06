import 'paper';
import {CIRCLE, Shapes} from "../../Shapes";
import BaseCreatorTool from "./BaseCreatorTool";

class CircleTool extends BaseCreatorTool {
    initialPoint: paper.Point;
    type: Shapes = CIRCLE;

    onMouseDown = (event: paper.MouseEvent) => {
        this.initialPoint = event.point;

        this.path = new this.scope.Path.Circle(event.point, 0);
        this.updatePathData(this.path, CIRCLE, {selected: true});
    };

    onMouseDrag = (event: paper.MouseEvent) => {
        if (this.path === undefined) return;
        this.path.remove();

        this.path = new this.scope.Path.Circle(this.initialPoint, event.point.getDistance(this.initialPoint));
        this.updatePathData(this.path, CIRCLE, {selected: true});
    };

    onMouseUp = (_: paper.MouseEvent) => {
        if (this.path === undefined) return;

        this.updatePathData(this.path, CIRCLE, {selected: false});
        this.callback(this.path.id, this.path);

        this.path = undefined;
    };

    onKeyUp = (event: paper.KeyEvent) => {
        if (event.key === 'escape') {
            this.path?.remove();
            this.path = undefined;

            this.deactivate();
        }
    };
}

export default CircleTool;

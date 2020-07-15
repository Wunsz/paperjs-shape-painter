import 'paper';
import {ELLIPSE, Shapes} from "../../Shapes";
import BaseCreatorTool from "./BaseCreatorTool";

class EllipseTool extends BaseCreatorTool {
    initialPoint: paper.Point;
    type: Shapes = ELLIPSE;

    onMouseDown = (event: paper.MouseEvent) => {
        this.initialPoint = event.point;

        this.path = new this.scope.Path.Ellipse(new this.scope.Rectangle(event.point, event.point));
        this.updatePathData(this.path, ELLIPSE, {selected: true});
    };

    onMouseDrag = (event: paper.MouseEvent) => {
        if (this.path === undefined) return;
        this.path.remove();

        this.path = new this.scope.Path.Ellipse(new this.scope.Rectangle(this.initialPoint, event.point));
        this.updatePathData(this.path, ELLIPSE, {selected: true});
    };

    onMouseUp = (_: paper.MouseEvent) => {
        if (this.path === undefined) return;

        this.updatePathData(this.path, ELLIPSE, {selected: false});
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

export default EllipseTool;

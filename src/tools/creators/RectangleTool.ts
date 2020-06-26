import 'paper';
import BaseTool from "../BaseTool";
import {RECTANGLE, Tools} from "../../Shapes";

class RectangleTool extends BaseTool {
    path: paper.Path | undefined;
    initialPoint: paper.Point;
    type: Tools = RECTANGLE;

    onMouseDown = (event: paper.MouseEvent) => {
        this.initialPoint = event.point;

        this.path = new this.scope.Path.Rectangle(event.point, event.point);
        this.path.selected = true;
    };

    onMouseDrag = (event: paper.MouseEvent) => {
        if (this.path === undefined) return;
        this.path.remove();

        this.path = new this.scope.Path.Rectangle(this.initialPoint, event.point);
        this.path.selected = true;
    };

    onMouseUp = (_: paper.MouseEvent) => {
        if (this.path === undefined) return;

        this.updatePathData(this.path, RECTANGLE, {selected: false});

        this.path = undefined;
    };

    onKeyUp = (event: paper.KeyEvent) => {
        if (event.key === 'escape') {
            this.path?.remove();
            this.path = undefined;

            this.deactivate();
        }
    }
}

export default RectangleTool;

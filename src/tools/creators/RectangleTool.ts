import 'paper';
import {RECTANGLE, Shapes} from "../../Shapes";
import BaseCreatorTool from "./BaseCreatorTool";

class RectangleTool extends BaseCreatorTool {
    path: paper.Path | undefined;
    initialPoint: paper.Point;
    type: Shapes = RECTANGLE;

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
        this.callback(this.path.id, this.path);

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

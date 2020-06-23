import 'paper';
import BaseTool from "./BaseTool";

class EllipseTool extends BaseTool {
    path: paper.Path | undefined;
    initialPoint: paper.Point;

    onMouseDown = (event: paper.MouseEvent) => {
        this.initialPoint = event.point;

        this.path = new this.scope.Path.Ellipse(new this.scope.Rectangle(event.point, event.point));
        this.path.selected = true;
    };

    onMouseDrag = (event: paper.MouseEvent) => {
        if (this.path === undefined) return;
        this.path.remove();

        this.path = new this.scope.Path.Ellipse(new this.scope.Rectangle(this.initialPoint, event.point));
        this.path.selected = true;
    };

    onMouseUp = (_: paper.MouseEvent) => {
        if (this.path === undefined) return;

        this.path.strokeColor = new this.scope.Color('black');
        this.path.selected = false;
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

export default EllipseTool;

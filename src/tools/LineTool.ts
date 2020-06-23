import 'paper';
import BaseTool from "./BaseTool";

class LineTool extends BaseTool {
    path: paper.Path | undefined;

    onMouseDown = (event: paper.MouseEvent) => {
        if (this.path !== undefined) return;

        this.path = new this.scope.Path();
        this.path.selected = true;
        this.path.strokeColor = new this.scope.Color('black');
        this.path.add(event.point);
        this.path.add(event.point);
    };

    onMouseDrag = (event: paper.MouseEvent) => {
        if (this.path === undefined) return;

        this.path.segments[1].point = event.point;
    };

    onMouseUp = (event: paper.MouseEvent) => {
        if (this.path === undefined) return;

        this.path.segments[1].point = event.point;
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

export default LineTool;

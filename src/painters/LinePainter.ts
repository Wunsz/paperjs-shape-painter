import 'paper';

import ShapePainter from "./ShapePainter";

class LinePainter extends ShapePainter {
    path: paper.Path | undefined;

    begin(scope: paper.PaperScope) {
        this.path = new scope.Path();
        this.tool = new scope.Tool();
        this.active = true;

        this.tool.onMouseDown = this.onMouseDown;
        this.tool.onMouseMove = this.onMouseMove;
        this.tool.onMouseUp = this.onMouseUp;
        this.tool.onKeyUp = this.onKeyUp;

        this.tool.activate();

        this.path.strokeColor = new scope.Color('black');
        this.path.selected = true;
    }

    stop() {
        if (this.path === undefined) return;

        this.path.selected = false;
        this.path = undefined;
        this.tool.remove();
    }

    cancel() {
        if (this.path === undefined) return;

        this.path.remove();
        this.stop();
    }

    onMouseDown = (_: paper.MouseEvent) => {
    };

    onMouseMove = (event: paper.MouseEvent) => {
        if (this.path === undefined) return;

        if (this.path.segments.length > 0) {
            this.path.removeSegment(this.path.segments.length - 1);
        }

        this.path.add(event.point);
    };

    onMouseUp = (event: paper.MouseEvent) => {
        if (this.path === undefined) return;

        this.path.add(event.point);

        if (this.path.segments.length > 2) {
            this.stop();
        }
    };

    onKeyUp = (event: paper.KeyEvent) => {
        if (event.key === 'escape') {
            this.cancel();
        }
    }
}

export default LinePainter;

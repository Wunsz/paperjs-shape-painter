import 'paper';
import {LINE, Shapes} from "../../Shapes";
import BaseCreatorTool from "./BaseCreatorTool";

class LineTool extends BaseCreatorTool {
    path: paper.Path | undefined;
    type: Shapes = LINE;

    onMouseDown = (event: paper.MouseEvent) => {
        if (this.path !== undefined) return;

        this.path = new this.scope.Path();
        this.updatePathData(this.path, this.type as Shapes, {selected: true});
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
        this.updatePathData(this.path, this.type as Shapes, {selected: false});
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

export default LineTool;

import 'paper';
import LineTool from "./LineTool";
import {POLYGON, Tools} from "../../Shapes";

class PolygonTool extends LineTool {
    type: Tools = POLYGON;

    onMouseDrag = (event: paper.MouseEvent) => {
        if (this.path === undefined) return;

        if (this.shouldSnap(event.point) && !this.path.closed) {
            this.path.removeSegment(this.path.segments.length - 1);
            this.path.closed = true;
        } else if (this.path.closed) {
            this.path.closed = false;
            this.path.add(event.point);
        } else {
            this.path.lastSegment.point = event.point;
        }
    };

    onMouseUp = (event: paper.MouseEvent) => {
        if (this.path === undefined) return;

        if (this.path.closed) {
            this.updatePathData(this.path, POLYGON, {selected: false});

            this.path = undefined;
        } else {
            this.path.add(event.point);
        }
    };

    private shouldSnap(point: paper.Point): boolean {
        return this.path !== undefined &&
            this.path.segments.length > 2 &&
            this.path.firstSegment.point.getDistance(point, true) < 200;
    };
}

export default PolygonTool;

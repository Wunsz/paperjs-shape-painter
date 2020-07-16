import 'paper';
import LineTool from "./LineTool";
import {POLYGON, Shapes} from "../../Shapes";

class PolygonTool extends LineTool {
    type: Shapes = POLYGON;
    closed: boolean = false;

    onMouseDrag = (event: paper.MouseEvent) => {
        if (this.path === undefined) return;

        if (this.shouldSnap(event.point)) {
            this.path.lastSegment.point = this.path.firstSegment.point;
            this.closed = true;
        } else {
            this.closed = false;
            this.path.lastSegment.point = event.point;
        }
    };

    onMouseUp = (event: paper.MouseEvent) => {
        if (this.path === undefined) return;

        if (this.closed) {
            this.path.removeSegment(this.path.segments.length - 1);
            this.path.closed = true;
            this.updatePathData(this.path, POLYGON, {selected: false});
            this.callback(this.path.id, this.path);

            this.path = undefined;
        } else {
            this.path.add(event.point);
        }
    };

    private shouldSnap(point: paper.Point): boolean {
        return this.path !== undefined &&
            this.path.segments.length > 2 &&
            this.path.firstSegment.point.getDistance(point, true) < 20 * this.settings.settings.snappingDistance / this.scope.view.zoom;
    };
}

export default PolygonTool;

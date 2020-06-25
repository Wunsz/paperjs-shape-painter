import 'paper';
import BaseEditorTool from "./BaseEditorTool";

class CircleEditorTool extends BaseEditorTool {

    onMouseDown = (event: paper.MouseEvent) => {
        this.beginEdit(event, false);
    };

    onMouseDrag = (event: paper.MouseEvent) => {
        if (this.segment !== undefined) {
            const center = this.getCenter();
            const previousDistanceToCenter = this.segment.point.getDistance(center);
            const currentDistanceToCenter = event.point.getDistance(center);

            this.item.scale(currentDistanceToCenter / previousDistanceToCenter);

        } else if (this.item !== undefined) {
            this.item.position.x += event.delta.x;
            this.item.position.y += event.delta.y;
        }
    };

    onMouseUp = (event: paper.MouseEvent) => {
        this.endEdit(event);
    };

    private getCenter() {
        const path = this.item as paper.Path;

        return new this.scope.Point(path.firstSegment.next.point.x, path.firstSegment.point.y);
    }
}

export default CircleEditorTool;

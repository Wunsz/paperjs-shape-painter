import 'paper';
import BaseEditorTool from "./BaseEditorTool";

class EllipseEditorTool extends BaseEditorTool {
    segment: paper.Segment | undefined;

    onMouseDown = (event: paper.MouseEvent) => {
        this.beginEdit(event, false);
    };

    onMouseDrag = (event: paper.MouseEvent) => {
        if (this.segment !== undefined) {
            const center = this.getCenter();
            const previousDistanceToCenter = this.segment.point.getDistance(center);
            const currentDistanceToCenter = event.point.getDistance(center);

            const path = this.item as paper.Path;

            // Vertical
            if (this.segment === path.firstSegment.previous || this.segment === path.firstSegment.next) {
                this.item.scale(1, currentDistanceToCenter / previousDistanceToCenter);
            } else {
                this.item.scale(currentDistanceToCenter / previousDistanceToCenter, 1);
            }
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

export default EllipseEditorTool;

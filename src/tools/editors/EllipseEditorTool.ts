import 'paper';
import BaseEditorTool from "./BaseEditorTool";

class EllipseEditorTool extends BaseEditorTool {
    segment: paper.Segment | undefined;

    onMouseDown = (event: paper.MouseEvent) => {
        const hitResult = this.scope.project.hitTest(event.point, {
            segments: true,
            stroke: true,
            curves: true,
            handles: false,
            fill: false,
            guide: false,
            ends: true,
            tolerance: 3 / this.scope.view.zoom
        });

        if (hitResult !== null && hitResult.item === this.item) {
            if (hitResult.type === 'segment') {
                this.segment = hitResult.segment;
            }
        }
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

    onMouseUp = (_: paper.MouseEvent) => {
        if (this.item !== undefined) {
            if (this.segment !== undefined) {
                this.segment = undefined;
            }
        }
    };

    private getCenter() {
        const path = this.item as paper.Path;

        return new this.scope.Point(path.firstSegment.next.point.x, path.firstSegment.point.y);
    }
}

export default EllipseEditorTool;

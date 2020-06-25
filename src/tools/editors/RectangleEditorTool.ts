import 'paper';
import BaseEditorTool from "./BaseEditorTool";

class RectangleEditorTool extends BaseEditorTool {
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
                this.segment.selected = true;
            }
        }
    };

    onMouseDrag = (event: paper.MouseEvent) => {
        if(this.segment !== undefined) {

            if(this.segment.previous.point.x == this.segment.point.x) {
                this.segment.previous.point.x += event.delta.x;
                this.segment.next.point.y += event.delta.y;
            } else {
                this.segment.previous.point.y += event.delta.y;
                this.segment.next.point.x += event.delta.x;
            }
            this.segment.point.x += event.delta.x;
            this.segment.point.y += event.delta.y;
        } else if (this.item !== undefined) {
            this.item.position.x += event.delta.x;
            this.item.position.y += event.delta.y;
        }
    };

    onMouseUp = (_: paper.MouseEvent) => {
        if(this.item !== undefined) {
            if (this.segment !== undefined) {
                this.segment.selected = false;
                this.segment = undefined;
            }
        }
    };
}

export default RectangleEditorTool;

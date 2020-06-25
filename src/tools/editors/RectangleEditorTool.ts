import 'paper';
import BaseEditorTool from "./BaseEditorTool";

class RectangleEditorTool extends BaseEditorTool {
    segment: paper.Segment | undefined;

    onMouseDown = (event: paper.MouseEvent) => {
        this.beginEdit(event, true);
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

    onMouseUp = (event: paper.MouseEvent) => {
        this.endEdit(event);
    };
}

export default RectangleEditorTool;

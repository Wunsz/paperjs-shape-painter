import 'paper';
import BaseEditorTool from "./BaseEditorTool";

class LineEditorTool extends BaseEditorTool {
    segment: paper.Segment | undefined;

    onMouseDown = (event: paper.MouseEvent) => {
        this.beginEdit(event, true);
    };

    onMouseDrag = (event: paper.MouseEvent) => {
        if(this.segment !== undefined) {
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

export default LineEditorTool;

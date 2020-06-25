import 'paper';
import BaseTool from "./BaseTool";
import {CIRCLE, ELLIPSE, LINE, RECTANGLE} from "../Shapes";
import BaseEditorTool from "./editors/BaseEditorTool";
import LineEditorTool from "./editors/LineEditorTool";
import RectangleEditorTool from "./editors/RectangleEditorTool";
import CircleEditorTool from "./editors/CircleEditorTool";
import EllipseEditorTool from "./editors/EllipseEditorTool";

class EditTool extends BaseTool {
    lastEventTimestamp: number | undefined;
    editor: BaseEditorTool | undefined;
    item: paper.Item | undefined;

    onMouseDown = (event: paper.MouseEvent) => {
        if (this.lastEventTimestamp !== undefined && event.timeStamp - this.lastEventTimestamp < 250) {
            this.hitTest(event.point);
            this.lastEventTimestamp = undefined;
        } else {
            this.lastEventTimestamp = event.timeStamp;
        }

        if (this.editor !== undefined) {
            this.editor.onMouseDown(event);
        }
    };

    onMouseUp = (event: paper.MouseEvent) => {
        if (this.editor !== undefined) {
            this.editor.onMouseUp(event);
        }
    };

    onMouseMove = (event: paper.MouseEvent) => {
        if (this.editor !== undefined) {
            this.editor.onMouseMove(event);
        }
    };

    onMouseDrag = (event: paper.MouseEvent) => {
        if (this.editor !== undefined) {
            this.editor.onMouseDrag(event);
        }
    };

    onKeyUp = (event: paper.KeyEvent) => {
        if (event.key === 'escape' && this.item?.selected) {
            this.item.selected = false;
            this.item = undefined;
        }
    };

    private hitTest(point: paper.Point) {
        const hitResult = this.scope.project.hitTest(point, {
            segments: true,
            stroke: true,
            curves: true,
            handles: false,
            fill: false,
            guide: false,
            ends: true,
            tolerance: 3 / this.scope.view.zoom
        });

        if (hitResult !== null && this.item === undefined) {
            this.item = hitResult.item;
            this.item.selected = true;
            this.enableEditor();
        } else if (this.item !== undefined) {
            this.item.selected = false;
            this.item = undefined;
            this.disableEditor();
        }
    }

    private enableEditor() {
        if (this.item === undefined || this.item.data.type === undefined) return;

        switch (this.item.data.type) {
            case LINE:
                this.editor = new LineEditorTool();
                break;
            case RECTANGLE:
                this.editor = new RectangleEditorTool();
                break;
            case CIRCLE:
                this.editor = new CircleEditorTool();
                break;
            case ELLIPSE:
                this.editor = new EllipseEditorTool();
                break;
        }

        this.editor?.enable(this.item, this.scope);
    }

    private disableEditor() {
        if (this.editor === undefined) return;

        this.editor.disable();
        this.editor = undefined;
    }
}

export default EditTool;

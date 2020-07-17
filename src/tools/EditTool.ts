import 'paper';
import BaseTool from "./BaseTool";
import {ActionFinishedCallback, CIRCLE, ELLIPSE, LINE, POLYGON, RECTANGLE, Tools} from "../Shapes";
import BaseEditorTool from "./editors/BaseEditorTool";
import LineEditorTool from "./editors/LineEditorTool";
import RectangleEditorTool from "./editors/RectangleEditorTool";
import CircleEditorTool from "./editors/CircleEditorTool";
import EllipseEditorTool from "./editors/EllipseEditorTool";
import SettingsManager from "../Settings";

class EditTool extends BaseTool {
    lastEventTimestamp: number | undefined;
    editor: BaseEditorTool | undefined;
    item: paper.Item | undefined;
    type: Tools = "EDIT";

    constructor(scope: paper.PaperScope, settings: SettingsManager, callbackResolver: () => ActionFinishedCallback) {
        super(scope, settings, callbackResolver);
    }

    onMouseDown = (event: paper.MouseEvent) => {
        if (this.lastEventTimestamp !== undefined && event.timeStamp - this.lastEventTimestamp < 250) {
            this.checkAndActOnItem(event.point, true);
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
        } else {
            this.checkAndActOnItem(event.point);
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

    private checkAndActOnItem(point: paper.Point, enableEditorOnHit = false) {
        const hitResult = this.hitTest(point);

        if (hitResult !== null && this.editor === undefined) {
            if (this.item !== undefined) {
                this.item.selected = false;
            }
            this.item = hitResult.item;
            this.item.selected = true;

            if (enableEditorOnHit) {
                this.enableEditor();
            }
        } else if (this.item !== undefined) {
            this.item.selected = false;

            if (this.editor !== undefined) {
                this.callback(this.item.id, this.item);
            }

            this.item = undefined;
            this.disableEditor();
        }
    }

    private enableEditor() {
        if (this.item === undefined || this.item.data.type === undefined) return;

        switch (this.item.data.type) {
            case LINE:
            case POLYGON:
                this.editor = new LineEditorTool(this.settings);
                break;
            case RECTANGLE:
                this.editor = new RectangleEditorTool(this.settings);
                break;
            case CIRCLE:
                this.editor = new CircleEditorTool(this.settings);
                break;
            case ELLIPSE:
                this.editor = new EllipseEditorTool(this.settings);
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

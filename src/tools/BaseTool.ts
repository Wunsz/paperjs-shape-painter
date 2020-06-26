import 'paper';
import StyleAndDataEnabledTool from "./StyleAndDataEnabledTool";
import {ActionFinishedCallback, Tools} from "../Shapes";

abstract class BaseTool extends StyleAndDataEnabledTool {
    tool: paper.Tool | undefined;
    scope: paper.PaperScope;
    type: Tools;
    callback: ActionFinishedCallback;

    public onMouseDown = (_: paper.MouseEvent): void => {

    };
    public onMouseMove = (_: paper.MouseEvent): void => {

    };
    public onMouseDrag = (_: paper.MouseEvent): void => {

    };
    public onMouseUp = (_: paper.MouseEvent): void => {

    };
    public onKeyUp = (_: paper.KeyEvent): void => {

    };

    public activate(scope: paper.PaperScope, callback: ActionFinishedCallback, customData?: any, style?: Partial<paper.Style>) {
        this.tool = new scope.Tool();
        this.scope = scope;
        this.callback = callback;

        if (customData !== undefined) {
            this.setCustomData(customData);
        }

        if (style !== undefined) {
            this.setStyle(style);
        }

        this.tool.onMouseDown = this.onMouseDown;
        this.tool.onMouseMove = this.onMouseMove;
        this.tool.onMouseDrag = this.onMouseDrag;
        this.tool.onMouseUp = this.onMouseUp;
        this.tool.onKeyUp = this.onKeyUp;

        this.tool.activate();
    }

    public deactivate() {
        this.tool?.remove();
        this.tool = undefined;
    }
}

export default BaseTool;

import 'paper';

abstract class BaseTool {
    tool: paper.Tool | undefined;
    scope: paper.PaperScope;

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

    public activate(scope: paper.PaperScope) {
        this.tool = new scope.Tool();
        this.scope = scope;

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

import 'paper';

abstract class ShapePainter {
    tool: paper.Tool;
    active: boolean;

    public abstract begin(scope: paper.PaperScope): void;
    public abstract stop(): void;
    public abstract cancel(): void;
    public abstract onMouseDown(event: paper.MouseEvent): void;
    public abstract onMouseMove(event: paper.MouseEvent): void;
    public abstract onMouseUp(event: paper.MouseEvent): void;
    public abstract onKeyUp(event: paper.KeyEvent): void;

    protected activate(scope: paper.PaperScope) {
        this.tool = new scope.Tool();

        this.tool.onMouseDown = this.onMouseDown;
        this.tool.onMouseMove = this.onMouseMove;
        this.tool.onMouseUp = this.onMouseUp;
        this.tool.onKeyUp = this.onKeyUp;

        this.active = true;

        this.tool.activate();
    }
}

export default ShapePainter;

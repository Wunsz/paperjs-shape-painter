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
}

export default ShapePainter;

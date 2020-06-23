import 'paper';

class LineEditor {
    private line: paper.Path | undefined;
    private item: paper.Item | undefined;
    private tool: paper.Tool;

    constructor(scope: paper.PaperScope) {
        this.tool = new scope.Tool();
    };

    public select = (line: paper.Path) => {
        this.line = line;
        this.activate();
    };

    public onMouseDown = (event: paper.MouseEvent) => {
        console.log(event);
        if (this.line === undefined) return;

        const hitResult = this.line.hitTest(event.point);
        if (hitResult !== null) {
            this.item = hitResult.item;
            this.item.selected = true;
        }

    };

    public onMouseDrag = (event: paper.MouseEvent) => {
        if (this.item === undefined) return;

        this.item.position.x += event.delta.x;
        this.item.position.y += event.delta.y;

    };

    public onMouseUp = () => {
        if (this.item === undefined) return;

        this.item.selected = false;
        this.item = undefined;

    };

    public onKeyUp = (event: paper.KeyEvent) => {
        if (event.key === 'escape') {
            this.deactivate();
        }
    };


    public activate() {
        this.tool.onMouseDown = this.onMouseDown;
        this.tool.onMouseDrag = this.onMouseDrag;
        this.tool.onMouseUp = this.onMouseUp;
        this.tool.onKeyUp = this.onKeyUp;

        this.tool.activate();
    }

    public deactivate() {
        if (this.line !== undefined) {
            this.line.selected = false;
            this.line = undefined;
        }

        if (this.item !== undefined) {
            this.item.selected = false;
            this.item = undefined;
        }

        this.tool.onMouseDown = null;
        this.tool.onMouseDrag = null;
        this.tool.onMouseUp = null;
        this.tool.onKeyUp = null;
    }
}


export default LineEditor;

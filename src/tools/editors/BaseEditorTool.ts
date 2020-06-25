class BaseEditorTool {
    item: paper.Item;
    scope: paper.PaperScope;

    public enable(item: paper.Item, scope: paper.PaperScope) {
        this.item = item;
        this.scope = scope;
    }

    public disable() {
        if (this.item !== undefined) {
            this.item.selected = false;
        }
    }

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
}

export default BaseEditorTool;

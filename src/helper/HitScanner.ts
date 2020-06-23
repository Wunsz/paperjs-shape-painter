import 'paper';
import LineEditor from "../editors/LineEditor";

class HitScanner {
    scope: paper.PaperScope;
    hitResult: paper.HitResult | undefined;
    editor: LineEditor;

    constructor(scope: paper.PaperScope) {
        this.scope = scope;
        this.editor = new LineEditor(scope);
    }

    public enable() {
        this.scope.view.onMouseMove = this.onMouseMove;
    }

    public disable() {
        this.scope.view.onMouseMove = null;
    }

    public onMouseMove = (event: paper.MouseEvent) => {
        const hitResult = this.scope.project.hitTest(event.point);

        if (hitResult !== null) {
            if (this.hitResult !== hitResult) {
                this.hitResult = hitResult;
                this.hitResult.item.selected = true;
                this.hitResult.item.onClick = () => {
                    // @ts-ignore
                    this.editor.select(this.hitResult.item)
                }
            }
        } else {
            if (this.hitResult !== undefined) {
                this.hitResult.item.selected = false;
                this.editor.deactivate();
            }
            this.hitResult = undefined;
        }
    };
}

export default HitScanner;

class BaseEditorTool {
    item: paper.Item;
    scope: paper.PaperScope;
    segment: paper.Segment | undefined;

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

    protected beginEdit(event: paper.MouseEvent, selectSegment: boolean) {
        const hitResult = this.hitTest(event.point);

        if (hitResult !== null && hitResult.item === this.item) {
            if (hitResult.type === 'segment') {
                this.segment = hitResult.segment;
                this.segment.selected = selectSegment;
            }
        }
    }

    protected endEdit(_: paper.MouseEvent) {
        if (this.item !== undefined) {
            if (this.segment !== undefined) {
                this.segment.selected = false;
                this.segment = undefined;
            }
        }
    }

    protected hitTest(point: paper.Point) {
        return this.scope.project.hitTest(point, {
            segments: true,
            stroke: true,
            curves: true,
            handles: false,
            fill: false,
            guide: false,
            ends: true,
            tolerance: 8 / this.scope.view.zoom
        });
    }
}

export default BaseEditorTool;

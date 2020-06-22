import 'paper';

class HitScanner {
    scope: paper.PaperScope;
    hitResult: paper.HitResult | undefined;

    constructor(scope: paper.PaperScope) {
        this.scope = scope;
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
            }
        } else {
            if (this.hitResult !== undefined) {
                this.hitResult.item.selected = false;
            }
            this.hitResult = undefined;
        }
    };
}

export default HitScanner;

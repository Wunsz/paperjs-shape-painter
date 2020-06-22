import 'paper';
import ShapePainter from "./painters/ShapePainter";
import LinePainter from "./painters/LinePainter";

class Painter {
    scope: paper.PaperScope;
    shapePainter: ShapePainter | undefined;

    constructor(scope: paper.PaperScope) {
        this.scope = scope;
    }

    public startPainting() {
        this.shapePainter = new LinePainter();
        this.shapePainter.begin(this.scope);
    }

    public cancelCurrentPainting() {
        if (this.shapePainter !== undefined) {
            this.shapePainter.cancel();
            this.shapePainter = undefined;
        }
    }
}

export default Painter;

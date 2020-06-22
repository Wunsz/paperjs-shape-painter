import 'paper';
import ShapePainter from "./painters/ShapePainter";
import LinePainter from "./painters/LinePainter";
import HitScanner from "./helper/HitScanner";

class Painter {
    scope: paper.PaperScope;
    shapePainter: ShapePainter | undefined;
    hitScanner: HitScanner;

    constructor(scope: paper.PaperScope) {
        this.scope = scope;
        this.hitScanner = new HitScanner(scope);
        this.init();
    }

    public init() {
        this.scope.settings.hitTolerance = 10;
        this.hitScanner.enable();
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

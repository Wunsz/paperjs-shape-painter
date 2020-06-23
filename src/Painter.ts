import 'paper';
import HitScanner from "./helper/HitScanner";
import LineTool from "./tools/LineTool";
import RectangleTool from "./tools/RectangleTool";
import BaseTool from "./tools/BaseTool";
import EllipseTool from "./tools/EllipseTool";
import CircleTool from "./tools/CircleTool";

export type Tools = 'Line' | 'Rectangle' | 'Ellipse' | 'Circle'

class Painter {
    scope: paper.PaperScope;
    activeTool: BaseTool | undefined;
    hitScanner: HitScanner;
    tools: Record<Tools, BaseTool> = {
        Line: new LineTool(),
        Rectangle: new RectangleTool(),
        Ellipse: new EllipseTool(),
        Circle: new CircleTool(),
    };

    constructor(scope: paper.PaperScope) {
        this.scope = scope;
        this.hitScanner = new HitScanner(scope);

        this.init();
    }

    public init() {
        //this.scope.settings.hitTolerance = 10;
        //this.hitScanner.enable();
    }

    public selectTool(tool: Tools) {
        this.activeTool = this.tools[tool];
        this.activeTool.activate(this.scope);
    }

    public cancelCurrentPainting() {
        if (this.activeTool !== undefined) {
            this.activeTool.deactivate();
            this.activeTool = undefined;
        }
    }
}

export default Painter;

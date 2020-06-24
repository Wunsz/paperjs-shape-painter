import 'paper';
import HitScanner from "./helper/HitScanner";
import LineTool from "./tools/creators/LineTool";
import RectangleTool from "./tools/creators/RectangleTool";
import BaseTool from "./tools/BaseTool";
import EllipseTool from "./tools/creators/EllipseTool";
import CircleTool from "./tools/creators/CircleTool";
import PolygonTool from "./tools/creators/PolygonTool";
import EditTool from "./tools/EditTool";
import {CIRCLE, ELLIPSE, LINE, POLYGON, RECTANGLE, Tools} from "./Shapes";

class Painter {
    scope: paper.PaperScope;
    activeTool: BaseTool | undefined;
    hitScanner: HitScanner;
    tools: Record<Tools, BaseTool> = {
        [LINE]: new LineTool(),
        [RECTANGLE]: new RectangleTool(),
        [ELLIPSE]: new EllipseTool(),
        [CIRCLE]: new CircleTool(),
        [POLYGON]: new PolygonTool(),
        EDIT: new EditTool(),
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

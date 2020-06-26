import 'paper';
import LineTool from "./tools/creators/LineTool";
import RectangleTool from "./tools/creators/RectangleTool";
import BaseTool from "./tools/BaseTool";
import EllipseTool from "./tools/creators/EllipseTool";
import CircleTool from "./tools/creators/CircleTool";
import PolygonTool from "./tools/creators/PolygonTool";
import EditTool from "./tools/EditTool";
import {CIRCLE, ELLIPSE, LINE, POLYGON, RECTANGLE, Tools} from "./Shapes";

class Painter {
    private activeTool: BaseTool | undefined;
    private readonly scope: paper.PaperScope;
    private readonly tools: Record<Tools, BaseTool> = {
        [LINE]: new LineTool(),
        [RECTANGLE]: new RectangleTool(),
        [ELLIPSE]: new EllipseTool(),
        [CIRCLE]: new CircleTool(),
        [POLYGON]: new PolygonTool(),
        EDIT: new EditTool(),
    };

    private style: Partial<paper.Style> = {};
    private customData: any;

    constructor(scope: paper.PaperScope) {
        this.scope = scope;
    }

    public getActiveTool(): BaseTool | undefined {
        return this.activeTool;
    }

    public setDefaultStyle(style: Partial<paper.Style>) {
        this.style = style;
    }

    public updateDefaultStyle(style: Partial<paper.Style>) {
        this.style = {...this.style, ...style};
    }

    public setCustomData(data: any) {
        this.customData = data;
    }

    public selectTool(tool: Tools, customData?: any, style?: Partial<paper.Style>) {
        this.activeTool = this.tools[tool];
        this.activeTool.activate(
            this.scope,
            customData === undefined ? this.customData : customData,
            style === undefined ? this.style : style
        );
    }

    public cancelCurrentPainting() {
        if (this.activeTool !== undefined) {
            this.activeTool.deactivate();
            this.activeTool = undefined;
        }
    }
}

export default Painter;

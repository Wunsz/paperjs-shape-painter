import 'paper';
import LineTool from "./tools/creators/LineTool";
import RectangleTool from "./tools/creators/RectangleTool";
import BaseTool from "./tools/BaseTool";
import EllipseTool from "./tools/creators/EllipseTool";
import CircleTool from "./tools/creators/CircleTool";
import PolygonTool from "./tools/creators/PolygonTool";
import EditTool from "./tools/EditTool";
import {CIRCLE, ELLIPSE, LINE, POLYGON, RECTANGLE, Tools, ActionFinishedCallback} from "./Shapes";
import RemoveTool from "./tools/RemoveTool";

class Painter {
    private activeTool: BaseTool | undefined;
    private readonly scope: paper.PaperScope;

    public onAddedCallback: ActionFinishedCallback = (_id, _item) => null;
    public onChangedCallback: ActionFinishedCallback = (_id, _item) => null;
    public onRemovedCallback: ActionFinishedCallback = (_id, _item) => null;

    private readonly tools: Record<Tools, {tool: BaseTool, getCallback: () => ActionFinishedCallback}> = {
        [LINE]: {tool: new LineTool(), getCallback: () => this.onAddedCallback},
        [RECTANGLE]: {tool: new RectangleTool(), getCallback: () => this.onAddedCallback},
        [ELLIPSE]: {tool: new EllipseTool(), getCallback: () => this.onAddedCallback},
        [CIRCLE]: {tool: new CircleTool(), getCallback: () => this.onAddedCallback},
        [POLYGON]: {tool: new PolygonTool(), getCallback: () => this.onAddedCallback},
        EDIT: {tool: new EditTool(), getCallback: () => this.onChangedCallback},
        REMOVE: {tool: new RemoveTool(), getCallback: () => this.onRemovedCallback},
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

    public getItemById(id: string): paper.Item | undefined {
        return this.scope.project.getItem((item: paper.Item) => item.data !== undefined && item.data.id === id);
    }

    public selectTool(tool: Tools, customData?: any, style?: Partial<paper.Style>) {
        this.activeTool = this.tools[tool].tool;
        this.activeTool.activate(
            this.scope,
            this.tools[tool].getCallback(),
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

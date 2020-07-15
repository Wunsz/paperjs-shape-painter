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
import SettingsManager from "./Settings";

class Painter {
    private activeTool: BaseTool | undefined;
    private readonly scope: paper.PaperScope;
    public readonly settings: SettingsManager = new SettingsManager();

    public onAddedCallback: ActionFinishedCallback = (_id, _item) => null;
    public onChangedCallback: ActionFinishedCallback = (_id, _item) => null;
    public onRemovedCallback: ActionFinishedCallback = (_id, _item) => null;

    private readonly tools: Record<Tools, BaseTool>;

    constructor(scope: paper.PaperScope) {
        this.scope = scope;

        this.tools = {
            [LINE]: new LineTool(this.scope, this.settings, () => this.onAddedCallback),
            [RECTANGLE]: new RectangleTool(this.scope, this.settings, () => this.onAddedCallback),
            [ELLIPSE]: new EllipseTool(this.scope, this.settings, () => this.onAddedCallback),
            [CIRCLE]: new CircleTool(this.scope, this.settings, () => this.onAddedCallback),
            [POLYGON]: new PolygonTool(this.scope, this.settings, () => this.onAddedCallback),
            EDIT: new EditTool(this.scope, this.settings, () => this.onChangedCallback),
            REMOVE: new RemoveTool(this.scope, this.settings, () => this.onRemovedCallback),
        };
    }

    public getActiveTool(): BaseTool | undefined {
        return this.activeTool;
    }

    public getItemById(id: string | number): paper.Item | undefined {
        return this.scope.project.getItem((item: paper.Item) => item.data !== undefined && item.data.ext.id === id);
    }

    public selectTool(tool: Tools) {
        this.activeTool = this.tools[tool];
        this.activeTool.activate();
    }

    public cancelCurrentPainting() {
        if (this.activeTool !== undefined) {
            this.activeTool.deactivate();
            this.activeTool = undefined;
        }
    }
}

export default Painter;

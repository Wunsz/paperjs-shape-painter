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

    /**
     * Returns currently activated tool
     */
    public getActiveTool(): BaseTool | undefined {
        return this.activeTool;
    }

    /**
     * Returns item by its PaperJS given ID
     *
     * @param id
     */
    public getItemById(id: number): paper.Item | undefined {
        return this.scope.project.getItem({id});
    }

    /**
     * Finds object in editor project which custom data is equal to passed custom data.
     *
     * @param customData Data to match
     */
    public getItemByCustomData(customData: any): paper.Item | undefined {
        return this.scope.project.getItem((item: paper.Item) => item.data !== undefined
            && item.data.ext !== undefined
            && item.data.ext.customData === customData
        )
    }

    /**
     * Finds object in editor project that have custom data as an object and at least one object property matches.
     *
     * @param customData
     */
    public getItemByCustomDataPartialMatch(customData: object): paper.Item | undefined {
        return this.scope.project.getItem((item: paper.Item) => item.data !== undefined
            && item.data.ext !== undefined
            && typeof item.data.ext === 'object'
            && Object.getOwnPropertyNames(customData).some(key => customData[key] === item.data.ext[key])
        );
    }

    /**
     * Select and activates painter tool
     * @param tool
     */
    public selectTool(tool: Tools) {
        this.activeTool = this.tools[tool];
        this.activeTool.activate();
    }

    /**
     * Cancels current painting
     */
    public cancelCurrentPainting() {
        if (this.activeTool !== undefined) {
            this.activeTool.deactivate();
            this.activeTool = undefined;
        }
    }
}

export default Painter;

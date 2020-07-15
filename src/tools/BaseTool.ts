import 'paper';
import {ActionFinishedCallback, Shapes, Tools} from "../Shapes";
import SettingsManager from "../Settings";
import SettingsEnabledTool from "./SettingsEnabledTool";

abstract class BaseTool extends SettingsEnabledTool{
    protected readonly scope: paper.PaperScope;
    protected readonly callback: ActionFinishedCallback;

    protected tool: paper.Tool | undefined;
    public readonly type: Tools;

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

    constructor(scope: paper.PaperScope, settings: SettingsManager, callbackResolver: () => ActionFinishedCallback) {
        super(settings);

        this.scope = scope;
        this.callback = ((id, item) => callbackResolver()(id, item))
    }

    protected updatePathData(path: paper.Path, type: Shapes, props: Partial<paper.Path> = {}) {
        path.style = {...path.style, ...this.settings.settings.style};
        path.set({
            data: {type, ext: this.settings.settings.customData},
            ...props,
        })
    }

    public activate() {
        this.tool = new this.scope.Tool();

        this.tool.onMouseDown = this.onMouseDown;
        this.tool.onMouseMove = this.onMouseMove;
        this.tool.onMouseDrag = this.onMouseDrag;
        this.tool.onMouseUp = this.onMouseUp;
        this.tool.onKeyUp = this.onKeyUp;

        this.tool.activate();

        this.settings.addOnChangeListener(this.onSettingsChanged);
    }

    public deactivate() {
        this.tool?.remove();
        this.tool = undefined;

        this.settings.removeOnChangeListener(this.onSettingsChanged);
    }
}

export default BaseTool;

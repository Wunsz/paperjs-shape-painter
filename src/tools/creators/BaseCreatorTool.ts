import 'paper';
import BaseTool from "../BaseTool";
import {Settings} from "../../Settings";
import {Shapes} from "../../Shapes";

abstract class BaseCreatorTool extends BaseTool {
    protected path: paper.Path | undefined;
    public type: Shapes;

    protected onSettingsChanged = (_: Settings) => {
        if (this.path !== undefined) {
            this.updatePathData(this.path, this.type)
        }
    }
}

export default BaseCreatorTool;

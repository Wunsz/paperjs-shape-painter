import 'paper';
import BaseTool from "./BaseTool";
import {ActionFinishedCallback, Tools} from "../Shapes";
import SettingsManager from "../Settings";

class RemoveTool extends BaseTool {
    type: Tools = "REMOVE";
    item: paper.Item | undefined;

    constructor(scope: paper.PaperScope, settings: SettingsManager, callbackResolver: () => ActionFinishedCallback) {
        super(scope, settings, callbackResolver);
    }

    onMouseMove = (event: paper.MouseEvent) => {
        const result = this.hitTest(event.point);

        if (this.item !== undefined && (result === null || result.item !== this.item)) {
            this.item.selected = false;
            this.item = undefined;
        }

        if(result !== null) {
            this.item = result.item;
            this.item.selected = true;
        }
    };


    onMouseUp = (_: paper.MouseEvent) => {
        if (this.item !== undefined) {
            this.callback(this.item.id, this.item);
            this.item.remove();
        }
    };
}

export default RemoveTool;

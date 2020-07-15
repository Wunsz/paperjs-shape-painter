import 'paper';
import BaseTool from "./BaseTool";
import {ActionFinishedCallback, Tools} from "../Shapes";
import SettingsManager from "../Settings";

class RemoveTool extends BaseTool {
    type: Tools = "REMOVE";

    constructor(scope: paper.PaperScope, settings: SettingsManager, callbackResolver: () => ActionFinishedCallback) {
        super(scope, settings, callbackResolver);
    }

    onMouseUp = (event: paper.MouseEvent) => {
        const hitResult = this.scope.project.hitTest(event.point, {
            segments: true,
            stroke: true,
            curves: true,
            handles: false,
            fill: false,
            guide: false,
            ends: true,
            tolerance: this.settings.settings.snappingDistance / this.scope.view.zoom
        });

        if (hitResult !== null) {
            this.callback(hitResult.item.id, hitResult.item);
            hitResult.item.remove();
        }
    };
}

export default RemoveTool;

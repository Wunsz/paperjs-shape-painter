import 'paper';
import BaseTool from "./BaseTool";
import {Tools} from "../Shapes";

class RemoveTool extends BaseTool {
    type: Tools = "REMOVE";

    onMouseUp = (event: paper.MouseEvent) => {
        const hitResult = this.scope.project.hitTest(event.point, {
            segments: true,
            stroke: true,
            curves: true,
            handles: false,
            fill: false,
            guide: false,
            ends: true,
            tolerance: 8 / this.scope.view.zoom
        });

        if(hitResult !== null) {
            this.callback(hitResult.item.id, hitResult.item);
            hitResult.item.remove();
        }
    };
}

export default RemoveTool;

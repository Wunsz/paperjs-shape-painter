import {Shapes} from "../Shapes";

abstract class StyleAndDataEnabledTool {
    style: Partial<paper.Style> = {};
    customData: any;

    public setStyle(style: Partial<paper.Style>) {
        this.style = style;
    }

    public setCustomData(data: any) {
        this.customData = data;
    }

    public updateStyleAndMeta(customData?: any, style?: Partial<paper.Style>) {
        if (customData !== undefined) {
            this.setCustomData(customData);
        }

        if (style !== undefined) {
            this.setStyle({...this.style, ...style});
        }
    }

    protected updatePathData(path: paper.Path, type: Shapes, props: Partial<paper.Path> = {}) {
        path.style = {...path.style, ...this.style};
        path.set({
            data: {type, ext: this.customData},
            ...props,
        })
    }
}

export default StyleAndDataEnabledTool;

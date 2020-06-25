import React, {Component} from 'react'
import {PaperScope} from "paper";

import {Painter} from 'paperjs-shape-painter';
import Picker from "./Picker";


export default class App extends Component {
    ref;
    painter;

    constructor(props) {
        super(props);

        this.ref = React.createRef();
    }

    componentDidMount() {
        const scope = new PaperScope();
        scope.setup(this.ref.current);

        this.painter = new Painter(scope);
    }

    render() {
        return (
            <div id="canvasContainer">
                <canvas
                    ref={this.ref}
                    id="canvas"
                    width={1200}
                    height={800}
                />
                <div id="actions">
                    <button onClick={() => this.painter.cancelCurrentPainting()}>Cancel</button>
                    <button onClick={() => this.painter.selectTool('LINE')}>Draw line</button>
                    <button onClick={() => this.painter.selectTool('RECTANGLE')}>Draw rect</button>
                    <button onClick={() => this.painter.selectTool('ELLIPSE')}>Draw ellipse</button>
                    <button onClick={() => this.painter.selectTool('CIRCLE')}>Draw circle</button>
                    <button onClick={() => this.painter.selectTool('POLYGON')}>Draw polygon</button>
                    <button onClick={() => this.painter.selectTool('EDIT')}>Edit</button>
                    <Picker/>
                </div>
            </div>

        )
    }
}

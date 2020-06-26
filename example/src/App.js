import React, {Component} from 'react'
import {PaperScope} from "paper";

import {Painter} from 'paperjs-shape-painter';
import Picker from "./Picker";
import {Button, Paper, Slider, Typography} from '@material-ui/core';


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
            <div id="appContainer">
                <Paper id="canvasContainer">
                    <canvas
                        ref={this.ref}
                        id="canvas"
                        width={1200}
                        height={800}
                    />
                </Paper>
                <div id="actions">
                    <Paper id="actionButtons">
                        <Button onClick={() => this.painter.cancelCurrentPainting()}>Cancel</Button>
                        <Button onClick={() => this.painter.selectTool('LINE')}>Draw line</Button>
                        <Button onClick={() => this.painter.selectTool('RECTANGLE')}>Draw rect</Button>
                        <Button onClick={() => this.painter.selectTool('ELLIPSE')}>Draw ellipse</Button>
                        <Button onClick={() => this.painter.selectTool('CIRCLE')}>Draw circle</Button>
                        <Button onClick={() => this.painter.selectTool('POLYGON')}>Draw polygon</Button>
                        <Button onClick={() => this.painter.selectTool('EDIT')}>Edit</Button>
                    </Paper>
                    <Picker
                        onColorChange={color => {
                            this.painter.updateDefaultStyle({strokeColor: color});

                            const activeTool = this.painter.getActiveTool();
                            if (activeTool !== undefined) {
                                activeTool.updateStyleAndMeta(undefined, {strokeColor: color})
                            }
                        }}
                    />
                    <Paper id="slider">
                        <Typography variant="subtitle1">Slide width</Typography>
                        <Slider
                            defaultValue={1}
                            min={1}
                            max={50}
                            step={1}
                            valueLabelDisplay="auto"
                            onChange={(_, value) => {
                                this.painter.updateDefaultStyle({strokeWidth: value});

                                const activeTool = this.painter.getActiveTool();
                                if (activeTool !== undefined) {
                                    activeTool.updateStyleAndMeta(undefined, {strokeWidth: value});
                                }
                            }}/>
                    </Paper>
                </div>
            </div>

        )
    }
}

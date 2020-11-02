import React, {Component} from 'react'
import {PaperScope} from "paper";

import {Painter} from 'paperjs-shape-painter';
import Picker from "./Picker";
import {Button, Paper, Slider, Typography} from '@material-ui/core';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";


export default class App extends Component {
    ref;
    painter;
    scope;

    constructor(props) {
        super(props);

        this.ref = React.createRef();
    }

    componentDidMount() {
        const scope = new PaperScope();
        scope.setup(this.ref.current);

        this.scope = scope;

        this.painter = new Painter(scope);
        this.painter.settings.update({style: {strokeColor: '#000', strokeWidth: 1}});
        this.painter.onAddedCallback = (id, item) => console.log(`Added element: ${id}`, item.data);
        this.painter.onChangedCallback = (id, item) => console.log(`Changed element: ${id}`, item.data);
        this.painter.onRemovedCallback = (id, item) => console.log(`Removed element: ${id}`, item.data);
    }

    editRandom = () => {
        const {width, height} = this.scope.view.size;

        const items = this.scope.project.getItems({
            inside: new this.scope.Rectangle(0, 0, width, height),
            match: item => item.data !== undefined && item.data.type !== undefined
        });

        if (items.length > 0) {
            this.painter.editItem(items[0]);
        } else {
            console.warn("No items found!")
        }
    };

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
                        <Button style={{margin: 0}} onClick={() => this.painter.cancelCurrentPainting()}>Cancel</Button>
                        <Button style={{margin: 0}} onClick={() => this.painter.selectTool('LINE')}>Draw line</Button>
                        <Button style={{margin: 0}} onClick={() => this.painter.selectTool('RECTANGLE')}>Draw rect</Button>
                        <Button style={{margin: 0}} onClick={() => this.painter.selectTool('ELLIPSE')}>Draw ellipse</Button>
                        <Button style={{margin: 0}} onClick={() => this.painter.selectTool('CIRCLE')}>Draw circle</Button>
                        <Button style={{margin: 0}} onClick={() => this.painter.selectTool('POLYGON')}>Draw polygon</Button>
                        <Button style={{margin: 0}} onClick={this.editRandom}>Edit random</Button>
                        <Button style={{margin: 0}} onClick={() => this.painter.selectTool('EDIT')}>Edit</Button>
                        <Button style={{margin: 0}} onClick={() => this.painter.selectTool('REMOVE')}>Remove</Button>
                    </Paper>
                    <Picker
                        onColorChange={color => {
                            this.painter.settings.update({style: {strokeColor: color}}, true);
                        }}
                    />
                    <Paper className="slider">
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.painter?.settings.selectionColorMatchingItem}
                                    onChange={(event) => {
                                        this.painter.settings.update({selectionColorMatchingItem: !this.painter.settings.selectionColorMatchingItem})
                                    }}
                                    name="selectionColorMatching"
                                />
                            }
                            label="Match selection color"
                        />
                        <Typography variant="subtitle1">Slide width</Typography>
                        <Slider
                            defaultValue={1}
                            min={1}
                            max={50}
                            step={1}
                            valueLabelDisplay="auto"
                            onChange={(_, value) => {
                                this.painter.settings.update({style: {strokeWidth: value}}, true);
                            }}/>
                        <Typography variant="subtitle1">Snapping distance</Typography>
                        <Slider
                            defaultValue={10}
                            min={1}
                            max={1000}
                            step={1}
                            valueLabelDisplay="auto"
                            onChange={(_, value) => {
                                this.painter.settings.update({snappingDistance: value});
                            }}/>
                    </Paper>
                </div>
            </div>

        )
    }
}

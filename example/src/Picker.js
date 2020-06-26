import React, {useState} from 'react'
import {SketchPicker} from "react-color";

const Picker = ({onColorChange = (color) => null}) => {
    const [color, setColor] = useState("#000");
    return (
        <div id="pickerContainer">
            <SketchPicker
                color={color}
                onChange={color => {
                    setColor(color.hex);
                    onColorChange(color.hex)
                }}
            />
        </div>
    )
};

export default Picker;

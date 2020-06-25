import React, {useState} from 'react'
import {SketchPicker} from "react-color";

const Picker = () => {
    const [color, setColor] = useState("#000");
    return (
        <SketchPicker
            color={color}
            onChange={color => setColor(color.hex)}
        />
    )
};

export default Picker;

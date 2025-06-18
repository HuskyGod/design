import { CanvasType } from "./canvas"
import uuid from 'react-native-uuid';

export const createCanvasElement: () => CanvasType = () => {
    return {
        key: uuid.v4(),
        type: "rect",
        size: { width: 100, height: 100, x: 0, y: 0 },
        color: "lightblue"
    }
}
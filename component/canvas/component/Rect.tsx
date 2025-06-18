import { Rect } from "@shopify/react-native-skia";
import { CanvasType } from "../../../hook/canvas";

// create a component
const RectItem: React.FC<{ option: CanvasType }> = ({ option }) => {
    return (
        <Rect x={option.size.x} y={option.size.x} width={option.size.width} height={option.size.height} color={option.color} />
    );
};

//make this component available to the app
export default RectItem;

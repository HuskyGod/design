//import liraries

import { Group } from "@shopify/react-native-skia";
import { CanvasType } from "../../hook/canvas";
import RectItem from "./component/Rect";


// create a component
const ItemBox: React.FC<{ option: CanvasType }> = ({ option }) => {
    return (
        <Group>
            {option.type === "rect" && <RectItem option={option} />}
        </Group>
    );
};

//make this component available to the app
export default ItemBox;

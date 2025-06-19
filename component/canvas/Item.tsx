//import liraries

import { Group } from "@shopify/react-native-skia";
import { CanvasType } from "../../hook/canvas";
import RectItem from "./component/Rect";
import { useContext } from "react";
import context from "../gesture/context";


// create a component
const ItemBox: React.FC<{ option: CanvasType }> = ({ option }) => {
    return (
        <Group>
            {option.type === "rect" && <RectItem option={option} />}
        </Group>
    );
};

export const ListBox: React.FC<{ list: CanvasType[] }> = ({ list }) => {
    const contextValue = useContext(context);
    return (
        <Group>
            <Group transform={[{ translateX: -contextValue.translationX }, { translateY: -contextValue.translationY }]}>
                {
                    list.map((item) => <ItemBox key={item.key} option={item} />)
                }
            </Group>
        </Group>
    );
};

//make this component available to the app
export default ItemBox;

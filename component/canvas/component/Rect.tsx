import { RoundedRect } from '@shopify/react-native-skia';
import { CanvasType } from '../../../hook/canvas';

// create a component
const RectItem: React.FC<{ option: CanvasType }> = ({ option }) => {
    console.log(option);
    const propValue = {
        x: option.size.x,
        y: option.size.y,
        width: option.size.width,
        height: option.size.height,
        color: option.color,
        r: option.round?.show ? option.round?.value : 0,
    };
    return (
        <RoundedRect {...propValue} />
    );
};

//make this component available to the app
export default RectItem;

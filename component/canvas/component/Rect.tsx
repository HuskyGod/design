import { Paint, RoundedRect } from '@shopify/react-native-skia';
import { CanvasType } from '../../../hook/canvas';

// create a component
const RectItem: React.FC<{ option: CanvasType, children: React.ReactNode }> = ({ option, children }) => {
    const propValue = {
        x: option.size.x,
        y: option.size.y,
        width: option.size.width,
        height: option.size.height,
        color: option.color,
        r: option.round?.value,
    };
    return (
        <RoundedRect {...propValue}>
            {children}
            {/* <Paint color={option.border?.color} strokeWidth={option.border?.value} style="stroke" /> */}
        </RoundedRect>
    );
};

//make this component available to the app
export default RectItem;

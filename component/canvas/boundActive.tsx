import { useContext, useMemo } from 'react';
import { CanvasType } from '../../hook/canvas';
import { Group, Path, Rect, Skia } from '@shopify/react-native-skia';
import { rectSize } from '../../hook/util';
import context from '../gesture/context';

interface Props {
    active: CanvasType
}

const BoundActive: React.FC<Props> = ({ active }) => {
    const contextValue = useContext(context);
    const size = rectSize;
    const linePatch = useMemo(() => {
        const path = Skia.Path.Make();
        path.moveTo(active.bound.x1, active.bound.y1);
        path.lineTo(active.bound.x2, active.bound.y1);
        path.lineTo(active.bound.x2, active.bound.y2);
        path.lineTo(active.bound.x1, active.bound.y2);
        path.moveTo(active.bound.x1, active.bound.y1);
        path.close();
        return path;
    }, [active]);
    const rectList = useMemo(() => {
        // 先左上角的举行
        const leftTopRect = (<Rect key={'leftTop'} x={active.bound.x1 - (size / 2)} y={active.bound.y1 - (size / 2)} width={size} height={size} color="white" />);
        const rightTopRect = (<Rect key={'rightTop'} x={active.bound.x2 - (size / 2)} y={active.bound.y1 - (size / 2)} width={size} height={size} color="white" />);
        const leftBottomRect = (<Rect key={'leftBottom'} x={active.bound.x1 - (size / 2)} y={active.bound.y2 - (size / 2)} width={size} height={size} color="white" />);
        const rightBottomRect = (<Rect key={'rightBottom'} x={active.bound.x2 - (size / 2)} y={active.bound.y2 - (size / 2)} width={size} height={size} color="white" />);
        return [leftTopRect, rightTopRect, rightBottomRect, leftBottomRect];
    }, [active, size]);
    return (
        <Group transform={[{ translateX: -contextValue.translationX }, { translateY: -contextValue.translationY }]}>
            <Path
                path={linePatch}
                style="stroke" strokeWidth={1} color="#3EB489"
            />
            {rectList}
        </Group>
    );
};

export default BoundActive;

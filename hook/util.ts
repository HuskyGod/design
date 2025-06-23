import { CanvasType } from './canvas';
import uuid from 'react-native-uuid';

export const rectSize = 10;

export interface MoveEvent {
    x: number,
    y: number
}

export const createCanvasElement: () => CanvasType = () => {
    return {
        active: false,
        key: uuid.v4(),
        type: 'rect',
        size: { width: 100, height: 100, x: 0, y: 0 },
        color: 'lightblue',
        bound: { x1: 0, x2: 100, y1: 0, y2: 100 },
    };
};

export const checkBound = (event: MoveEvent, list: CanvasType[]) => {
    const findIndex = list.findIndex((item) => {
        return (
            (event.x >= item.bound.x1 && event.x <= item.bound.x2) &&
            (event.y >= item.bound.y1 && event.y <= item.bound.y2)
        );
    });
    return (findIndex === -1 ? false : [list[findIndex], findIndex]) as false | [CanvasType, number];
};

export const getBoundNumber = (num: number) => {
    return Math.max(num, 0);
};

export const getCanvaItemMoveInfo = (item: CanvasType, init: [number, number], x: number, y: number) => {
    const x1 = getBoundNumber(init[0] + x);
    const x2 = getBoundNumber(x1 + item.size.width);
    const y1 = getBoundNumber(init[1] + y);
    const y2 = getBoundNumber(y1 + item.size.height);
    return [x1, x2, y1, y2];
};

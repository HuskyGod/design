import { CanvasType } from './canvas';
import uuid from 'react-native-uuid';

export const rectSize = 10;
export const ruleSize = 25;

export interface MoveEvent {
    x: number,
    y: number
}

export const createCanvasElement: (type: CanvasType['type']) => CanvasType = (type) => {
    let size = { width: 100, height: 100, x: 0, y: 0, r: 50 };
    return {
        active: false,
        key: uuid.v4(),
        type: type,
        size: size,
        color: 'lightblue',
        bound: { x1: 0, x2: 100, y1: 0, y2: 100 },
        round: { show: false, value: 0 },
        checkLocation (e: MoveEvent) {
            const optionCheck = checkLocation(e, this.bound);
            const pointCheck = checkPointRect(e, this).findIndex((value) => !!value);
            return optionCheck || pointCheck !== -1;
        },
        checkPointRect (e: MoveEvent) {
            return checkPointRect(e, this);
        },
    };
};

export const checkPoint = (event: MoveEvent, activeOption: CanvasType) => {
    const pointRectList = activeOption.checkPointRect(event);
    const findIndex = pointRectList.findIndex((value) => !!value);
    if (findIndex !== -1) {
        return {
            key: activeOption.key,
            pointIndex: findIndex,
        };
    }
    return { key: '', pointIndex: -1 };
};

export const checkBound = (event: MoveEvent, list: CanvasType[]) => {
    const findIndex = list.findIndex((item) => {
        return item.checkLocation(event);
    });
    return (findIndex === -1 ? false : [list[findIndex], findIndex]) as false | [CanvasType, number];
};

export const checkLocation = (event: MoveEvent, item: { x1: number, x2: number, y1: number, y2: number }) => {
    return (
            (event.x >= item.x1 && event.x <= item.x2) &&
            (event.y >= item.y1 && event.y <= item.y2)
        );
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

export const checkPointRect = (e: MoveEvent, item: CanvasType) => {
    const fn = (x: number, y: number) => {
       return {
            x1: x - (rectSize / 2),
            x2: x + (rectSize / 2),
            y1: y - (rectSize / 2),
            y2: y + (rectSize / 2),
       };
    };
    const topLeft = fn(item.bound.x1, item.bound.y1);
    const topRight = fn(item.bound.x2, item.bound.y1);
    const bottomRight = fn(item.bound.x2, item.bound.y2);
    const bottomLeft = fn(item.bound.x1, item.bound.y2);
    const checkList = [topLeft, topRight, bottomRight, bottomLeft];
    return checkList.reduce((list, item, index) => {
        if (checkLocation(e, item)) {
            list[index] = true;
        }
        return list;
    }, [] as boolean[]);
};

export const getEvent = (e: MoveEvent, offsetX?: number, offsetY?: number) => {
    const event = { x: (e.x - ruleSize) + (offsetX || 0), y: (e.y - ruleSize) + (offsetY || 0) };
    return event;
};

export const getPointRectComplex = (e: MoveEvent, pointIndex: number, size: CanvasType['size']) => {
    if (pointIndex === 0) {
        const y = size.y + e.y;
        const x = size.x + e.x;
        console.log(JSON.stringify(size), x, y);
        return {
            ...size,
            y: y,
            x: x,
        };
    }
    return size;
};

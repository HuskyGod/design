import { configureProps } from 'react-native-reanimated/lib/typescript/ConfigHelper';
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

export const getCanvaItemMoveInfo = (item: CanvasType, initOption: CanvasType['size'], x: number, y: number) => {
    const x1 = getBoundNumber(initOption.x! + x);
    const x2 = getBoundNumber(x1 + item.size.width);
    const y1 = getBoundNumber(initOption.y! + y);
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
    const getRact = () => {
        console.log(pointIndex);
        const reversedX = [0, 3].includes(pointIndex) ? e.x - size.width : e.x + size.width;
        const reversedY = [2, 3].includes(pointIndex) ? e.y + size.height : e.y - size.height;
        let x = reversedX > 0 ? size.x! + size.width : size.x! + (e.x);
        let y = reversedY > 0 ? size.y! + size.height : size.y! + (e.y);
        let width = reversedX > 0 ? reversedX : size.width + (-e.x);
        let height = reversedY > 0 ? reversedY : size.height + (-e.y);
        if ([1, 2].includes(pointIndex)) {
            x = reversedX < 0 ? size.x! + reversedX : size.x;
            width = reversedX < 0 ? -(reversedX) : (size.width) + e.x;
        }
        if ([2, 3].includes(pointIndex)) {
            y = reversedY < 0 ? size.y! + reversedY : size.y!;
            height = reversedY < 0 ? -(reversedY) : (size.height) + e.y;
        }
        return {
            x, y, width, height,
        };
    };

    // getRact();

    // 左上
    // const reversedX = e.x - size.width;
    // const x = reversedX > 0 ? size.x! + size.width : size.x! + (e.x);
    // const width = reversedX > 0 ? reversedX : size.width + (-e.x);
    // const reversedY = e.y - size.height;
    // const y = reversedY > 0 ? size.y! + size.height : size.y! + (e.y);
    // const height = reversedY > 0 ? reversedY : size.height + (-e.y);
    // const topLeftSize = { x, width, y, height };
    // const list = [topLeftSize];

    // 右上
    // const reversedX = e.x + size.width;
    // const x = reversedX < 0 ? size.x! + reversedX : size.x;
    // const width = reversedX < 0 ? -(reversedX) : (size.width) + e.x;
    // const reversedY = e.y - size.height;
    // const y = reversedY > 0 ? size.y! + size.height : size.y! + (e.y);
    // const height = reversedY > 0 ? reversedY : size.height + (-e.y);
    // const list = [{}, { x, y, width, height }];
    // let option = list[pointIndex];

    // 右下角
    // const reversedX = e.x + size.width;
    // const x = reversedX < 0 ? size.x! + reversedX : size.x;
    // const width = reversedX < 0 ? -(reversedX) : (size.width) + e.x;
    // const reversedY = e.y + size.height;
    // const y = reversedY < 0 ? size.y! + reversedY : size.y!;
    // const height = reversedY < 0 ? -(reversedY) : (size.height) + e.y;
    // const list = [{}, {}, { x, y, width, height }, {}];
    // let option = list[pointIndex];

    // 左下角
    // const reversedX = e.x - size.width;
    // const x = reversedX > 0 ? size.x! + size.width : size.x! + (e.x);
    // const width = reversedX > 0 ? reversedX : size.width + (-e.x);
    // const reversedY = e.y + size.height;
    // const y = reversedY < 0 ? size.y! + reversedY : size.y!;
    // const height = reversedY < 0 ? -(reversedY) : (size.height) + e.y;
    // const list = [{}, {}, {}, { x, y, width, height }];

    let option = getRact();
    return {
        ...size,
        ...option,
    };
};

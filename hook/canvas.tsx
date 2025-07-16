import React, { useMemo, useState } from 'react';
import CanvasScreen from '../component/canvas';
import { checkBound, createCanvasElement, getCanvaItemMoveInfo, getEvent, MoveEvent } from './util';
export type CanvasElementType = 'rect' | 'circle'
export interface CanvasType {
    active: boolean,
    key: string,
    type: CanvasElementType,
    color: string,
    size: { width: number, height: number, x: number, y: number, r?: number },
    bound: { x1: number, x2: number, y1: number, y2: number }
    round?: { show: boolean, value: number }
    border?: { show: boolean, value: number }
}


export type CanvasOption = ReturnType<typeof useCanvas>['option']

export const useCanvas = () => {
    const [list, setList] = useState<CanvasType[]>([]);
    const initXAndY = React.useRef<[number, number]>([0, 0]);

    // 设置当前选中
    const setActiveOption: (fn: (item: CanvasType) => CanvasType) => void = (fn) => {
        setList((state) => {
            return state.map((item) => {
                if (item.active) {
                    const result = fn(item);
                    return {
                        ...item,
                        ...result,
                    };
                }
                return item;
            });
        });
    };
    // 查询激活对象
    const activeObject = useMemo(() => list.find(item => item.active) || null, [list]);
    // 设置颜色
    const setColor = (color: string) => setActiveOption((item) => ({ ...item, color: item.active ? color : item.color }));
    // 记录初始值X,Y
    const setInitLocation = (object: CanvasType) => {
        initXAndY.current = [object!.size.x, object!.size.y];
    };
    // 清空初始值X,Y
    const cleanInitLocation = () => {
        initXAndY.current = [0, 0];
    };
    // 设置x,y
    const setActiveLocation = (option: { x: number, y: number }) => {
        const { x, y } = option;
        setActiveOption((item) => {
            const [x1, x2, y1, y2] = getCanvaItemMoveInfo(item, initXAndY.current, x, y);
            return {
                ...item,
                size: Object.assign({}, item.size, { x: x1, y: y1 }),
                bound: { x1, x2, y1, y2 },
            };
        });
    };
    // 检查边界
    const onCheck = (event: MoveEvent) => {
        const e = getEvent(event);
        const data = checkBound(e, list);
        if (data) {
            const [object, findIndex] = data;
            setList((state) => state.map((item, index) => ({ ...item, active: findIndex === index })));
            setInitLocation(object);
            return true;
        }
        setList((state) => state.map((item) => ({ ...item, active: false })));
        return false;
    };
    // 设置宽高
    const setWidthAndHeight = (option: { width: number | string, height: number | string }) => {
        const { width, height } = option;
        setActiveOption((item) => {
            return {
                ...item,
                size: Object.assign({}, item.size, { width: +width, height: +height }),
                bound: Object.assign({}, item.bound, { x2: item.bound.x1 + (+width), y2: item.bound.y1 + (+height) }),
            };
        });
    };
    // 设置圆角
    const setRound = (option: { show: boolean, value: number }) => {
        setActiveOption((item) => {
            return {
                ...item,
                round: option,
            };
        });
    };
    // 设置边框
    const setBorder = (option: { show: boolean, value: number }) => {
        setActiveOption((item) => {
            return {
                ...item,
                border: option,
            };
        });
    };
    // 添加画布对象
    const addShapeElement = (type: CanvasType['type']) => {
        console.log('111', type);
        setList((state) => {
            return ([] as CanvasType[]).concat([createCanvasElement(type)], state);
        });
    };

    const option = {
        setBorder,
        setRound,
        setColor,
        checkBound: onCheck,
        activeObject,
        setInitLocation,
        setActiveLocation,
        cleanInitLocation,
        setWidthAndHeight,
        addShapeElement,
    };
    return {
        element: <CanvasScreen active={activeObject} list={list} />,
        option,
        list,
    };
};

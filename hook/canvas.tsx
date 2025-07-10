import React, { useMemo, useState } from 'react';
import CanvasScreen from '../component/canvas';
import { checkBound, createCanvasElement, getCanvaItemMoveInfo, getEvent, MoveEvent } from './util';
export type CanvasElementType = 'rect'
export interface CanvasType {
    active: boolean,
    key: string,
    type: CanvasElementType,
    color: string,
    size: { width: number, height: number, x: number, y: number },
    bound: { x1: number, x2: number, y1: number, y2: number }
}


export type CanvasOption = ReturnType<typeof useCanvas>['option']

export const useCanvas = () => {
    const [list, setList] = useState<CanvasType[]>([createCanvasElement()]);
    // const [activeObject, setActiveObject] = useState<CanvasType | null>(null);
    const initXAndY = React.useRef<[number, number]>([0, 0]);

    // 查询激活对象的index
    // const findActiveIndex = useMemo(() => {
    //     return list.find(item => item.key === activeObject?.key);
    // }, [list, activeObject]);

    // 查询激活对象
    const activeObject = useMemo(() => list.find(item => item.active) || null, [list]);

    // 设置颜色
    const setColor = (color: string) => setList((state) => state.map((item) => ({ ...item, color: item.active ? color : item.color })));
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
        setList((state) => {
            return state.map((item) => {
                if (item.active) {
                    const [x1, x2, y1, y2] = getCanvaItemMoveInfo(item, initXAndY.current, x, y);
                    return {
                        ...item,
                        size: Object.assign({}, item.size, { x: x1, y: y1 }),
                        bound: { x1, x2, y1, y2 },
                    };
                }
                return item;
            });
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
    const option = {
        setColor,
        checkBound: onCheck,
        activeObject,
        setInitLocation,
        setActiveLocation,
        cleanInitLocation,
    };
    return {
        element: <CanvasScreen active={activeObject} list={list} />,
        option,
        list,
    };
};

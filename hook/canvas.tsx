import { useState } from "react"
import CanvasScreen from "../component/canvas"
import { createCanvasElement } from "./util"
export type CanvasElementType = "rect"
export interface CanvasType {
    key: string,
    type: CanvasElementType,
    color: string,
    size: { width: number, height: number, x: number, y: number }
}


export type CanvasOption = ReturnType<typeof useCanvas>["option"]

export const useCanvas = () => {
    const [list, setList] = useState<CanvasType[]>([createCanvasElement()]);

    const setColor = (color: string) => {
        // list[0].color = color
        setList((state) => state.map((item) => ({ ...item, color })));
    }

    const option = {
        setColor
    }

    return {
        element: <CanvasScreen list={list} />,
        option
    }
}
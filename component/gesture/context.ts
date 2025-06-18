import React from "react";

export interface GestureInfo {
    translationX: number,
    translationY: number
}

const initDefaultValue = {
    translationX: 0,
    translationY: 0
}

const context = React.createContext<GestureInfo>(initDefaultValue);

export default context

const { Provider, Consumer } = context

export { Provider, Consumer }
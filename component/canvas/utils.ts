import { listFontFamilies, matchFont, vec } from "@shopify/react-native-skia";
const [fontFamily] = listFontFamilies();

console.log(listFontFamilies())
const fontStyle = {
  fontFamily,
  fontSize: 14,
};
const font = matchFont(fontStyle);

export interface LineOption {
    p1: ReturnType<typeof vec>,
    p2: ReturnType<typeof vec>,
    font?: typeof font,
    x?: number,
    y?: number,
    text?: string,
}


export const createXLine = (size: number, width: number, totaLength: number, offSet: number) => {
    const list: LineOption[] = [];
    const deepCreate = (index = 1) => {
        list.push({
            p1: vec(0, (index * size) - offSet),
            p2: vec(width, (index * size) - offSet)
        })
        if ((index + 1) * size < totaLength + offSet) {
            deepCreate(index + 1)
        };
    }
    const number = Math.ceil((offSet / size));
    deepCreate(number);
    return list;
}

export const createXLable = (size: number, totaLength: number, offSet: number) => {
    const list: LineOption[] = [];
    const deepCreate = (index = 1) => {
        list.push({
            p1: vec(0, (index * size) - offSet),
            p2: vec(size, (index * size) - offSet),
            y: ((index - 1) * size) + size - (fontStyle.fontSize /  3) - offSet,
            x: (fontStyle.fontSize * ((`${index}`.length) * (0.5 - ((`${index}`.length - 1) * 0.1)))) - ((`${index}`.length - 1) * (fontStyle.fontSize / 2)),
            text: `${(index)}`,
            font,
        })
        if ((index + 1) * size <= (totaLength + size + offSet)) {
            deepCreate(index + 1)
        };
    }
    const number = Math.ceil((offSet / size));
    deepCreate(number);
    return list;
}

export const createYLable = (size: number, totaLength: number, offSet: number) => {
    const list: LineOption[] = [];
    const deepCreate = (index = 1) => {
        list.push({
            p1: vec((index * size) - offSet, 0),
            p2: vec((index * size) - offSet, size),
            y: size - (fontStyle.fontSize / 2),
            x: (index * size - (fontStyle.fontSize + ((`${index}`.length) - 1) * (fontStyle.fontSize / 2))) - offSet,
            text: `${(index)}`,
            font,
        })
        if ((index + 1) * size <= (totaLength + size + offSet)) {
            deepCreate(index + 1)
        };
    }
    const number = Math.ceil((offSet / size));
    deepCreate(number);
    return list;
}

export const createYLine = (size: number, height: number, totaLength: number, offSet: number) => {
    const number = Math.ceil((offSet / size));
    const list: LineOption[] = [];
    const deepCreate = (index = 1) => {
        if ((index * size) - offSet >= 0) {
            list.push({
                p1: vec(((index * size) - offSet), 0),
                p2: vec(((index * size) - offSet), height)
            })
        }
        if ((index + 1) * size < totaLength + offSet) {
            deepCreate(index + 1);
        };
    }
    deepCreate(number);
    return list;
}
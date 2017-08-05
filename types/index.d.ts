export interface Box {
    top: number,
    left: number,
    width: number,
    height: number
}

declare namespace tinyDom {
    export function css(node: HTMLElement, properyty: string, pseudoEle: string | null): string;
    export function offset(node: HTMLElement): Box
}

export = tinyDom;
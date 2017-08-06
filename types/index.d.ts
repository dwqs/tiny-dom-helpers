export interface Box {
    top: number,
    left: number,
    width: number,
    height: number,
    right?: number,
    bottom?: number
}

export declare class TinyDOM {
    constructor(node: HTMLElement);
    toArray(): string[];
    hasClass(cls: string): boolean;
    addClass(cls: string): TinyDOM;
    removeClass(cls: string): TinyDOM;
    toggle(cls: string): TinyDOM;
    replaceClass(oldClass: string, newClass: string): TinyDOM;
    attr(prop: string, value: string): TinyDOM;
    getNodeName(): stirng;
    width(): stirng;
    height(): stirng;
    rect(): Box;
    offsetParent(): HTMLElement;
    positions(): Box;
    previous(): HTMLElement;
    next(): HTMLElement;
    parent(): HTMLElement;
    contains(): boolean
}

declare namespace tinyDom {
    export function css(node: HTMLElement, properyty: string, pseudoEle: string | null): string;
    export function offset(node: HTMLElement): Box;
    export function createTinyDOM(node: HTMLElement): TinyDOM
}

export = tinyDom;
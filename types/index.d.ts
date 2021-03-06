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
    attr(prop: string, value: string): void | string;
    text(text: string): void | string;
    getNodeName(): string;
    width(): string;
    height(): string;
    rect(): Box;
    offsetParent(): HTMLElement;
    positions(): Box;
    previous(): HTMLElement;
    next(): HTMLElement;
    parent(): HTMLElement;
    contains(): boolean
}

export function css(node: HTMLElement, properyty: string, pseudoEle: string | null): string;
export function offset(node: HTMLElement): Box;
export function createTinyDOM(node: HTMLElement): TinyDOM

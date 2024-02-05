declare namespace storyteller.canvas {
}
declare namespace storyteller.ctrl {
    class Comet2 {
        constructor();
        element: HTMLDivElement;
        get headColor(): string;
        set headColor(value: string);
        start(x0: number, y0: number, angle: number, speed: number, endWidth?: number): void;
    }
    class Comet {
        #private;
        constructor(parentElement?: HTMLElement);
        speed: number;
        speedIncreasement: number;
        fadeInDuration: number;
        fadeOutAt: number;
        fadeOutDuration: number;
        widthIncreasement: number;
        get element(): HTMLDivElement;
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        get angle(): number;
        set angle(value: number);
        get width(): number;
        set width(value: number);
        get headColor(): string;
        set headColor(value: string);
        get isDestroyed(): boolean;
        ended: boolean;
        update(elapsedTime: number): void;
    }
    class Moon {
        #private;
        constructor(parentElement?: HTMLElement);
        get element(): HTMLDivElement;
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        get width(): number;
        set width(value: number);
        get height(): number;
        set height(value: number);
        update(elapsedTime: number): void;
    }
    class Fireworks {
        #private;
        constructor(parentElement?: HTMLElement);
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        get style(): FireWorkType;
        set style(value: FireWorkType);
        get hue(): any;
        set hue(value: any);
        ended: boolean;
        random(): void;
        update(elapsedTime: number): void;
        static STYLES: FireWorkType[];
    }
    type FireWorkType = "SHORT" | "MEDIUM" | "LONG";
    class Star {
        #private;
        constructor(parentElement?: HTMLElement);
        get element(): HTMLDivElement;
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        ended: boolean;
        update(elapsedTime: number): void;
    }
    interface StoryObject {
        ended: boolean;
        update(elapsedTime: number): void;
    }
}
declare namespace storyteller {
    function radToDeg(rad: number): number;
    function degToRad(deg: number): number;
}

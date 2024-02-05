//type ReplaceReturnType<T> = (this: ThisParameterType<T>, ...args: Parameters<T>) => "stopPropagation" | void;

declare namespace intell {

    
    // ======= classes =======
    /** Event register object that is used to add, remove listeners and dispatch them. */
    export class EventRegister<T extends (this: any, ...args: any) => any> {

        /** Initializes a new instance of EventRegister object that is used to add, remove listeners and dispatch them. 
         * @param target The value of <mark>this</mark> provided for dispatching to listeners. */
        constructor(target?: object, option?: EventRegisterOption);

        protected option: EventRegisterOption;

        /** Private */
        protected listeners: T[];

        /** Private */
        protected target: ThisParameterType<T>;

        /** Registers an event listener callback to this event. Listeners can return "stop" to prevent further chain of callbacks. */
        addListener(callback: (this: ThisParameterType<T>, ...args: Parameters<T>) => "stop" | void | Promise<any>): void;
        
        /** Deregisters an event listener callback from this event. */
        removeListener(callback: T): void;

        /** Dispatches a synthetic event. */
        dispatch(...args: Parameters<T>): void;

        /** Determines whether this event includes a listener among its entries.
         * @param callback Listener whose registration status shall be tested */
        hasListener(callback: T): boolean;

        /** Determines whether this event has any listeners. */
        hasListeners(): boolean;
    }

    // ======= methods =======
    /** Creates and assigns on/off function for EventTarget object. */
    export function createOnOff(target: EventTarget): void;

    /** Get response from servers by using XMLHttpRequest. */
    export function get(url: string): HttpRequest;

    /** Post data to servers by using XMLHttpRequest. */
    export function post(url: string): HttpRequest;

    /** Create a query object from a string.
    * @param search The string containing key value pair that separate by =. If search is not specified, location.search.substr(1) will be used instead.
    * @returns Return the key value pair object. */
    export function qs(search?: string): { [T: string]: string };

    export function wait(timeout: number): Promise<void>;

    // ======= fields =======
    /** Gets the version of this library. */
    export var version: '2.0.0';


    interface EventRegisterOption {
        /** A boolean value indicating that the listener should be invoked at most once after being added. If true, the listener would be automatically removed when invoked. If not specified, defaults to false. */
        once: boolean;
    } 

    

    /** It is "on" function; and created by createOnOff. */
    interface OnRegister<EventMap = DocumentEventMap, This = void, ChainType = void> {
        <K extends keyof EventMap>(this: EventTarget, type: K, listener: (this: This, ev: EventMap[K]) => any, options?: boolean | AddEventListenerOptions): ChainType;
        <K extends keyof EventMap>(this: EventTarget, type: K, name: string, listener: (this: This, ev: EventMap[K]) => any, options?: boolean | AddEventListenerOptions): ChainType;
    }

    /** It is "on/off" function; and created by createOnOff. */
    interface OnOffEventTarget<EventMap = DocumentEventMap, This = void, ChainType = void> extends EventTarget {
        on: OnRegister<EventMap, This, ChainType>;
        off(name: string): void;
    }

    /** Internal used */
    interface CreateOnOffFunction {
        get(target: EventTarget): { name: string, type: string, listener: () => void, options?: boolean | AddEventListenerOptions }[];
        on: OnRegister<DocumentEventMap>;
        off(name: string): void;
        (): void;
    }



    interface HttpRequest extends XMLHttpRequest {

        on: OnRegister<XMLHttpRequestEventMap, HttpRequest, HttpRequest>;
        off(name: string): void;

        loadstart(handler: (this: this, ev: XMLHttpRequestEventMap["loadstart"]) => any, options?: boolean | AddEventListenerOptions): this;
        readystatechange(handler: (this: this, ev: XMLHttpRequestEventMap["readystatechange"]) => any, options?: boolean | AddEventListenerOptions): this;
        progress(handler: (this: this, ev: XMLHttpRequestEventMap["progress"]) => any, options?: boolean | AddEventListenerOptions): this;
        load(handler: (this: this, ev: XMLHttpRequestEventMap["load"]) => any, options?: boolean | AddEventListenerOptions): this;
        loadend(handler: (this: this, ev: XMLHttpRequestEventMap["loadend"]) => any, options?: boolean | AddEventListenerOptions): this;
        error(handler: (this: this, ev: XMLHttpRequestEventMap["error"]) => any, options?: boolean | AddEventListenerOptions): this;
    }

    

    //export var on: OnRegister<DocumentEventMap, void, typeof intell>;
    //export function off(name: string): void;
    //export var onLoad: EventRegister<(this: HTMLAudioElement, ev: MouseEvent) => any>;
}


type NotKeyOf<T, U> = { [k in keyof T]: T[k] extends U ? never : k }[keyof T];
type NotKeyOfFunction<T> = { [k in keyof T]: T[k] extends Function ? never : k }[keyof T];

type defineProperties<T> = {
    [K in keyof T]?: {
        get: (this: T) => T[K];
        set: (this: T, newValue: T[K]) => void;
    }
}






declare namespace intell.ctrl {




    // ======= methods =======
    /** Show the element by changing its display style. */
    export function show(element: HTMLElement): void;

    /** Hide the element by changing its display style. */
    export function hide(element: HTMLElement): void;

    /** Start hiding animation by adding specified classes then completely hide. Calling startHide multiple times will return the Promise from previous call. */
    export function startHide(element: HTMLElement, timeout: number, delayHideClass: string): Promise<void>;

    /** Stop hiding animation by reverting its classes and stop timer. */
    export function stopHide(element: HTMLElement): void;

    /** Returns a DOMRect object providing information about the size of an element and its position relative to the document instead of the viewport. */
    export function getBoundingClientRectOffset(element: HTMLElement): DOMRect;

    export function getRectWhenShowAtRect(popup: DOMRect, target: DOMRect, location: number, option?: GetRectWhenShowAtOption): GetRectWhenShowAtResult;
    export function getRectWhenShowAtCoord(popup: DOMRect, coord: CoordinatesLike, location: number, option?: GetRectWhenShowAtOption): GetRectWhenShowAtResult;

    export function showAt(element: HTMLElement, target: DOMRect, locations: number[], option?: ShowAtOption): GetRectWhenShowAtResult;
    export function showAt(element: HTMLElement, coord: CoordinatesLike, locations: number[], option?: ShowAtOption): GetRectWhenShowAtResult;
    export function showAt(element: HTMLElement, elementTarget: HTMLElement, locations: number[], option?: ShowAtOption): GetRectWhenShowAtResult;
    export function showAtRect(element: HTMLElement, target: DOMRect, locations: number[], option?: ShowAtOption): GetRectWhenShowAtResult;
    export function showAtCoord(elementPopup: HTMLElement, coord: CoordinatesLike, locations: number[], option?: ShowAtOption): GetRectWhenShowAtResult;
    export function showAtElement(elementPopup: HTMLElement, elementTarget: HTMLElement, locations: number[], option?: ShowAtOption): GetRectWhenShowAtResult;

    /** Returns the first element where the predicate is true while traversing up through its ancestors in the DOM tree. */
    export function findParentElement(element: HTMLElement, predicate: (value: HTMLElement) => boolean): HTMLElement | undefined;

    /** Returns the first element where the predicate is true while traversing up through itself and its ancestors in the DOM tree. */
    export function findClosestElement(element: HTMLElement, predicate: (value: HTMLElement) => boolean): HTMLElement | undefined;

    /** Returns a third DOMRect that represents the intersection of two other DOMRect. If there is no intersection, null is returned. */
    export function rectIntersect(a: DOMRect, b: DOMRect): DOMRect;

    //export function startClass(element: HTMLElement, timeout: number, classname: string): Promise<void>;
    //export function stopClass(element: HTMLElement, classname: string): void;

    /** Returns a deep copy of a list of ChildNode. */
    function duplicateNodes(childNodes: NodeListOf<ChildNode>): ChildNode[];

    /** internally used by startHide, stopHider. */
    interface StartHideProcess {
        element: HTMLElement;
        timer: number;
        class: string;
        promise: Promise<void>;
    }

    interface GetRectWhenShowAtOption {
        /** The rectangle popup must be placed inside specified rectangle. */
        container?: DOMRect;

        /** The minimum distance between popup and container. */
        margin?: number;

        /** The minimum distance between popup and target. */
        space?: number;
    }
    interface GetRectWhenShowAtResult {
        /** The location type 1 to 12.. */
        location: number;

        /** The position Rectangle. */
        rect: DOMRect;

        /** Higher is better.  */
        score: number;
    }

    interface ShowAtOption extends GetRectWhenShowAtOption {
        //** Move the popup element right after the target element. */
        // moveToTarget: boolean;

        /** If container_mode is present, `container` will be overridden. */
        container_mode?: 'auto' | 'window';
    }


    type CoordinatesLike = { x: number, y: number } | { left: number, top: number };
        
}



/** This namespace is internally used by classes in intell.ctrl 
* This typescript type declaration won't be built into output */
declare namespace intell.ctrl.template {

    /** Setups prototype methods and static methods for new class.
     * - getPrivate(),
     * - static getItem(), 
     * - static setItem()  */
    export function inherit(constructor: Constructor, option: InheritOption): void;
    export function defineProperties<T>(o: T, properties: defineProperties<T>): T;

    interface InheritOption {
        ctrlKey: symbol | string;
        mode: 'all';
        // methods: ['getPrivate']
        // static_methods: ['getItem', 'setItem'];
    }

    interface Constructor {
        (element: HTMLElement): void;

        prototype: {
            getPrivate(_default?: object): object;
        }

        getItem(element: HTMLElement): object;
        setItem(element: HTMLElement, control: object): object;
    }

}
declare namespace intell.portal {

    // classes
    /** Creates a portal for managing applications. */
    export class Portal {
        /** Initializes a new instance of portal from element. 
         @param element The element for which to create portal. */
        constructor(element: HTMLElement);

        // fields
        taskbar: PortalTaskbar;
        overlay: PortalOverlay;

        // properties
        /** The root element of portal. */
        element: HTMLElement;
        /** Gets the list of applications that are added to the portal. */
        applications: Application[];
        /** Gets or sets active application. */
        activeApplication: Application;

        // methods
        add(application: Partial<Application> & Pick<Application, "manifest">): void;

        /** Add a manifest to portal. */
        addManifest(manifest: Partial<ApplicationManifest>, callback: (application: Application) => any | Promise<any>): Application;

        /** Add a manifest to portal via module.
         * @description Required ES2020 (ES11) */
        addManifestModule(moduleName: string): Promise<any>;

        /** Add an application by its constructor method. */
        addManifestClass(constructor: { new(): Application }): Application;

        /** Add an application by its constructor method. */
        addManifestClassModule(moduleName: string): Promise<Application>;

        /** Gets Application by its id. */
        getApplication(id: string): Application;

        /** Open the first application that have manifest.startup equal true.  */
        open(): void;
        /** Open an application that added before. */
        open(application: Application): void;
        /** Open an application specified by its id. If there are no match id open default applcation. */
        open(applicationId: string): void;

        /** (private) Load all resources of an application. */
        protected load(application: Application): Promise<void>;
        /** (private) Load a single javascript. Javascript will be ignored if url that have loaded before. */
        protected loadJavascript(url: string): Promise<void>;
        /** (private) Load a single style sheet. Style sheet will be ignored if url that have loaded before. */
        protected loadStyle(url: string): Promise<void>;

        /** Occurs when the activeApplication property value changes. */
        onChange: intell.EventRegister<(this: Portal, event: { oldApplication: Application, newApplication: Application }) => void>;
    }
    /** The application that will be added to the portal. */
    export class Application {
        /** Initializes a new instance of application. */
        constructor();

        /** Gets the manifest of application. */
        manifest: ApplicationManifest;

        /** The root element of application. */
        elementRoot?: HTMLElement;

        /** Gets the sidebar element. */
        elementShortcut?: HTMLElement;

        /** The status of this application. "NONE" = 0, "LOADING" = 1, "LOADED" = 2, "FAIL" = 3 */
        status: "NONE" | "LOADING" | "LOADED" | "FAIL";

        /** The error occurs while loading. */
        error?: Error;

        /** Occur when the portal opens this application. */
        onOpen: intell.EventRegister<(this: Application) => void>;

        init?(this: Application, application: Application): Promise<any> | void;
    }
    type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;
    // methods
    // export function create(element?: HTMLElement): Portal;



    interface ApplicationManifest {

        /** An unique identifier of application. */
        id: string;

        /** The application name. */
        name: string;

        /** A plain text string (no HTML or other formatting) that describes the application while loading. */
        description: string;

        /** A short description of the application */
        title: string;

        /** Url to icon/image of the application. */
        icon?: string;

        /** Display a text as icon/image of the application. */
        iconText?: string;

        /** Pin this application to menu. The default is true. */
        shortcut?: boolean;

        /** The shortcut group */
        group?: string;

        /** Load the application immediately after add. The default is false. */
        startup?: boolean;

        content: ApplicationManifestContent;
    }
    interface ApplicationManifestContent {
        /** The HTML file to be injected into page. */
        html: string;

        /** The list of JavaScript files to be injected into portal. */
        js?: string[];

        /** (Unsupport) The list of CSS files to be injected into portal. */
        css?: string[];
    }

    interface PortalTaskbar {

        /** A collection of keyname of localStorage that allow taskbar to access. */
        keys: { collapsed: "portal.sidebar.collapsed" };

        // methods
        /** Add a shortcut to sidebar from application. This function doesn't check application already exist or not.*/
        add(application: Application): HTMLElement;
        /** Gets element from application */
        get(application: Application): HTMLElement
        /** Gets application out of element. */
        getApplication(element: HTMLElement): Application;
        /** Sets an application to element. */
        setApplication(element: HTMLElement, application: Application): void;

        /** Add "ACTIVE" classname to shortcut element of an application and remove "ACTIVE" class from others. */
        active(application: Application): HTMLElement

        enableCollapseStorage(key: string): void;
    }
    interface PortalOverlay {
        showLoading(application: Application): void;
        showError(application: Application): void;
        /** hide all overlay */
        hide(): void;
    }
}






declare namespace intell.ctrl {

    /** Represents a combo box control. */
    export class ComboBox<T = any> {

        /** Initializes a new instance of the ComboBox class from element.
         * @param element The element for which to create ComboBox.*/
        constructor(element: HTMLElement);


        // properties
        /** Gets the root element of ComboBox. */
        readonly element: HTMLElement;
        readonly elementSelect: HTMLElement;
        readonly elementDropdown: HTMLElement;
        readonly elementChildren: HTMLElement;
        readonly elementItemAbstract: HTMLElement;
        readonly childrenVisible: boolean;
        readonly items: ComboBoxItem<T>[];


        popupLocations: number[];
        popupOption: intell.ctrl.ShowAtOption;
        selectedItem: ComboBoxItem<T>;

        // methods
        getPrivate(): ComboBoxPrivate<T>;
        add(item: ComboBoxItem<T>): void;
        add(option: ComboBoxAddOption): ComboBoxItem<T>;
        private addItem(item: ComboBoxItem<T>): void;
        private addOption(option: ComboBoxAddOption): ComboBoxItem<T>;
        remove(item: ComboBoxItem<T>): void;
        clear(): void;

        // navigation methods
        toggleChildren(): void;
        showChildren(): void;
        showChildren(target: HTMLElement, hideOnFocusOut: boolean): void;
        showChildren(coord: intell.ctrl.CoordinatesLike): void;
        protected showChildrenElement(target: HTMLElement, hideOnFocusOut: boolean): void;
        protected showChildrenCoord(coord: intell.ctrl.CoordinatesLike): void;
        hideChildren(): void;

        protected _pressEsc(): void;
        protected _pressEnter(): void;
        protected _pressUpOrDown(keyCode: number): void;
        protected _mouseUpOrClickItem(element: HTMLElement): void;
        protected _setSearchKeyword(keyword: string): void;

        /** _setItem function works as selectedItem property. _setItem dispatchEvent events while property doesn't.  */
        protected _setItem(item: ComboBoxItem<T>): void;

        // events: comboboxchange

        // static methods
        static getItem(element: HTMLElement): ComboBox;
        static setItem(element: HTMLElement, comboBox: ComboBox): ComboBox;
        
    }
    interface ComboBoxPrivate<T = any> {
        element: HTMLElement;
        elementSelect: HTMLElement;
        elementDropdown: HTMLElement;
        elementSearch: HTMLElement;
        elementSearchInput: HTMLInputElement;
        elementChildren: HTMLElement;
        elementItemAbstract: HTMLElement;
        childrenVisible: boolean;
        items: ComboBoxItem<T>[];
        groups: ComboBoxGroup[]

        popupLocations: number[];
        popupOption: ctrl.ShowAtOption;
        selectedItem: ComboBoxItem<T>;

        // navigation
        session_elementAt: HTMLElement;
        session_selectedItem: ComboBoxItem<T>;
    }
    interface ComboBoxAddOption<T = any> {
        icon?: string;
        name: string;
        value: T;
        group?: string;
        disabled?: boolean;
    }


    export class ComboBoxItem<T = any> {

        constructor(element: HTMLElement);

        // properties
        readonly element: HTMLElement;
        readonly elementIcon: HTMLElement;
        readonly elementName: HTMLElement;
        readonly parent: ComboBox;

        icon: string;
        name: string;
        value: T;
        group: string;
        disabled: boolean;

        // methods
        getPrivate(): ComboBoxItemPrivate;

        // static methods

        /** Gets ComboBoxItem of a element. */
        static getItem(element: HTMLElement): ComboBoxItem;
        static setItem(element: HTMLElement, combobox: ComboBoxItem): ComboBoxItem;
    }
    interface ComboBoxItemPrivate {
        element: HTMLElement;
        elementIcon: HTMLElement;
        elementName: HTMLElement;
        parent: ComboBox;
        parentGroup: ComboBoxGroup;

        icon: string;
        name: string;
        value: any;
        group: string;
        disabled: boolean;
    }


    export class ComboBoxGroup {

        constructor(element: HTMLElement);

        // properties
        readonly element: HTMLElement;
        readonly elementName: HTMLElement;
        readonly elementChildren: HTMLElement;
        readonly items: ComboBoxItem[];

        get name(): string;
        set name(newValue: string);

        // methods
        getPrivate(): ComboBoxGroup;
        add(item: ComboBoxItem): void;
        remove(item: ComboBoxItem): void;

        // static methods
        static getItem(element: HTMLElement): ComboBoxGroup;
        static setItem(element: HTMLElement, comboBoxGroup: ComboBoxGroup): ComboBoxGroup;
    }
    interface ComboBoxGroupPrivate {
        element: HTMLElement;
        elementName: HTMLElement;
        elementChildren: HTMLElement;

        name: string;
        items: ComboBoxItem[];
    }
}






declare namespace intell.ctrl {

    /** Represents a spin box that displays numeric values. */
    export class Numeric {

        /** Initializes a new instance of the Numeric class from element.
         * @param element The element for which to create Numeric.*/
        constructor(element: HTMLElement);

        // properties
        /** Gets the root element of control. */
        element: HTMLElement;

        /** Gets the button up element. */
        elementUp: HTMLElement;

        /** Gets the button down element. */
        elementDown: HTMLElement;

        /** Gets the input element. */
        elementInput: HTMLInputElement;

        /** Gets or sets the minimum allowed value; the default is null. */
        min: number;

        /** Gets or sets the maxium allowed value; the default is null. */
        max: number;

        /** Gets or sets the minimum number of digits to appear after the decimal point; the default is 0. */
        minimumFractionDigits: number;

        /** Gets or sets the maximum number of digits to appear after the decimal point; the default is 2. */
        maximumFractionDigits: number;

        /** Gets or sets the decimal separator; the default is locale decimal separator. */
        decimalSeparator: string;

        /** Gets or sets the thousand separator; the default is locale thousand separator. */
        thousandSeparator: string;

        /** Gets or sets the value of Numeric. */
        value?: number;

        /** Gets or sets whether the value can be null; the default is false. */
        nullable: boolean;

        /** Gets or sets the value to increment or decrement the spin box (also known as an up-down control) when the up or down buttons are clicked; the default is 1. */
        increment: number;

        // methods
        getPrivate(): NumericPrivate;
        increaseSessionBy(value: number): void;
        protected _focusout(): void;

        // static methods
        /** Returns a floating point number parsed from the given string specified language-sensitive representation. */
        static parseFloat(text: string, option: NumericFormatOption): number;

        /** Returns a string with a language-sensitive representation of this number. If number is null/NaN, return empty string. 
         * @param number The value to parse. If this argument is not a string, then it is converted to one using the ToString abstract operation.
         * @param option An object that supplies culture-specific formatting information. */
        static formatNumber(number: number, option: NumericFormatOption): string;
        static getItem(element: HTMLElement): Numeric;
        static setItem(element: HTMLElement, comboBox: Numeric): Numeric;
    }

    interface NumericFormatOption {
        /** Gets or sets the minimum number of digits to appear after the decimal point; the default is 0. */
        minimumFractionDigits: number;

        /** Gets or sets the maximum number of digits to appear after the decimal point; the default is 2. */
        maximumFractionDigits: number;

        /** Gets or sets the decimal separator; the default is locale decimal separator. */
        decimalSeparator: string;

        /** Gets or sets the thousand separator; the default is locale thousand separator. */
        thousandSeparator: string;
    }

    interface NumericPrivate {
        element: HTMLElement;
        elementUp: HTMLElement;
        elementDown: HTMLElement;
        elementInput: HTMLInputElement;
        min: number;
        max: number;
        minimumFractionDigits: number;
        maximumFractionDigits: number;
        decimalSeparator: number;
        thousandSeparator: number;
        nullable: boolean;
        value: number;

        increment: number;
    }


}



declare namespace intell.ctrl {
    export class TargetPopup {

        constructor(element: HTMLElement);

        // properties
        readonly element: HTMLElement;
        readonly elementArrow: HTMLElement;
        popupLocations: number[];
        popupOption: intell.ctrl.ShowAtOption;
        popupDelayHideTime: number;

        // methods
        getPrivate(): TargetPopupPrivate;
        /** When the target element is set while the popup is already shown, the popup will immediately move to the new target element. */
        showAt(target: HTMLElement): void;
        showAt(coords: intell.ctrl.CoordinatesLike): void;
        protected showAtElement(target: HTMLElement): void;
        protected showAtCoord(coordinates: intell.ctrl.CoordinatesLike): void;
        hide(): void;
        protected setArrowPointToElement(target: HTMLElement, location: number): void;
        protected setArrowPointToCoordinates(coordinates: intell.ctrl.CoordinatesLike, location: number): void;

        // static methods
        static getItem(element: HTMLElement): TargetPopup;
        static setItem(element: HTMLElement, comboBox: TargetPopup): TargetPopup;
        static showAt(elementPopup: HTMLElement, target: HTMLElement, locations?: number[], option?: intell.ctrl.ShowAtOption): TargetPopup;
        static showAt(elementPopup: HTMLElement, coordinates: intell.ctrl.CoordinatesLike, locations?: number[], option?: intell.ctrl.ShowAtOption): TargetPopup;
        protected static showAtElement(elementPopup: HTMLElement, target: HTMLElement, locations?: number[], option?: intell.ctrl.ShowAtOption): TargetPopup;
        protected static showAtCoord(elementPopup: HTMLElement, coordinates: intell.ctrl.CoordinatesLike, locations?: number[], option?: intell.ctrl.ShowAtOption): TargetPopup;

    }

    interface TargetPopupPrivate {
        element: HTMLElement;
        elementArrow: HTMLElement;
        popupLocations: number[];
        popupOption: intell.ctrl.ShowAtOption;
        popupDelayHideTime: number;

        // state
        targetElement: HTMLElement;
        targetCoordinates: CoordinatesLike;
        isVisible: boolean;
        isFadingOut: boolean;
    }

}



declare namespace intell.ctrl {
    /** Represents a box that displays time/duration value. */
    export class Time {

        /** Initializes a new instance of the Time class from element.
         * @param element The element for which to create Time.*/
        constructor(element: HTMLElement);

        // properties
        /** Gets the root element of control. */
        readonly element: HTMLElement;

        /** Gets the hours element of control. */
        readonly elementHours: HTMLElement;

        /** Gets the minutes element of control. */
        readonly elementMinutes: HTMLElement;

        /** Gets the seconds element of control. */
        readonly elementSeconds: HTMLElement;

        /** Gets the miliseconds element of control. */
        readonly elementMilliseconds: HTMLElement;

        /** Gets or sets the value of time. */
        value: number

        /** Gets or sets whether the value can be null; the default is true. */
        nullable: boolean

        /**  Gets or sets the maxium allowed value; the default is 86399999 (23:59:59.999). */
        max: number;

        /** Gets or sets whether the seconds element is visible. */
        secondsEnabled: boolean;

        /** Gets or sets whether the miliseconds element is visible. */
        millisecondsEnabled: boolean;

        // methods
        getPrivate(): TimePrivate;

        /** Sets value of time. */
        setValue(newValue: number, keepLabel: boolean): void;

        /** Gets the element of the unit by its name. */
        getUnitElement(name: TimePrivate["currentUnitName"]): HTMLElement;

        // protected methods
        protected getEditName(element: HTMLElement): TimePrivate["currentUnitName"];
        protected setEditName(name: TimePrivate["currentUnitName"]): void;
        /** Set value of edit session. */
        protected setEditValue(name: TimePrivate["currentUnitName"], newUnitValue: number): void;
        protected updateElementLabel(name: TimePrivate["currentUnitName"], value: number): void;
        protected updateElementLabels(): void;

        // methods events
        protected _focus(): void;
        protected _mousedown(e: MouseEvent): void;
        protected _wheel(e: WheelEvent): void;
        protected _keydown(e: KeyboardEvent): void;
        protected _keydownLeft(): void;
        protected _keydownRight(): void;
        protected _keydownDel(): void;
        protected _keydownEsc(): void;
        protected _focusout(): void;

        // static methods
        static getItem(element: HTMLElement): Time;
        static setItem(element: HTMLElement, timespan: Time): Time;
        static getHHMMSS(value: number): { hours: number, minutes: number, seconds: number, milliseconds: number };
        static GetLengthOfNumber(value: number): number;

    }


    interface TimePrivate {
        element: HTMLElement;
        elementHours: HTMLElement;
        elementMinutes: HTMLElement;
        elementSeconds: HTMLElement;
        elementMilliseconds: HTMLElement;

        value: number;
        valueAsNumber: number;
        nullable: boolean
        max: number;
        secondsEnabled: boolean;
        millisecondsEnabled: boolean;

        // internal values
        hours: number;
        minutes: number;
        seconds: number;
        milliseconds: number;

        save_hours: number;
        save_minutes: number;
        save_seconds: number;
        save_milliseconds: number;
        currentUnitName: "hours" | "minutes" | "seconds" | "milliseconds";
        currentNumbers: number
    }

    
}
declare namespace intell.ctrl {
    export class Menu {
        /** Initializes a new instance of the Menu class from element. */
        constructor();

        /** Initializes a new instance of the Menu class from element. 
         * @param element The element for which to create Menu.*/
        constructor(element: HTMLElement);

        // ======================== properties ========================
        /** Gets the root element of the menu. */
        readonly element: HTMLElement;

        /** Gets the children element of the menu. */
        readonly elementChildren: HTMLElement;

        /** Gets the label element of the menu. */
        readonly elementLabel: HTMLElement;

        /** Gets the icon element of the menu. */
        readonly elementIcon: HTMLElement;

        /** Gets name element of the menu. */
        readonly elementName: HTMLElement;

        /** Gets the intersect element of the menu. */
        readonly elementIntersect: HTMLElement;

        /** Gets the abstract element of the menu. */
        readonly elementMenuAbstract: HTMLElement;

        /** Gets the parent of the menu. */
        readonly parent: Menu;

        /** Gets the children of the menu. The return value is a clone array, it is safe to modify or use on some where. */
        readonly children: Menu[];

        /** Gets or sets textContent of the icon element. */
        icon: string;

        /** Gets or sets textContent of the name element. */
        name: string;

        /** Gets or sets locations indicating where the children of the root menu are placed when displayed. */
        rootLocations: number[];

        /** Gets or sets option indicating where the children of the root menu are placed when displayed. */
        rootOption: ctrl.ShowAtOption;

        /** Gets or sets fading out duration for the children element of the root menu. */
        rootFadeOutTime: number;

        /** Gets or sets locations indicating where the children of the child menu are placed when displayed. */
        childLocations: number[];

        /** Gets or sets option indicating where the children of the child menu are placed when displayed. */
        childOption: ctrl.ShowAtOption;

        /** Gets or sets fading out duration for the children element of the child menu. */
        childFadeOutTime: number;

        /** Gets or sets the active state of this menu. */
        active: boolean;

        /** Gets or sets a value indicating whether its child are displayed. Return false when children are in the fading process. */
        childrenVisible: boolean;

        // ======================== methods ========================
        getPrivate(): MenuPrivate;

        /** Gets the root menu of its or itself if it is root menu. */
        getRoot(): Menu;

        /** Gets the current active menu at highest level. */
        getHighestActive(): Menu;

        /** Adds a new Menu, to the end of the current menu, with a specified caption. */
        add(name: string): Menu;

        /** Adds a previously created Menu to the end of the current menu. */
        add(menu: Menu): void;

        /** Adds a new Menu, to the end of the current menu, with a specified option. */
        add(option: MenuOption): Menu;

        protected addName(name: string): Menu;
        protected addMenu(menu: Menu): void;
        protected addOption(option: MenuOption): Menu;

        /** Adds a new separator, to the end of the current menu. */
        addSeparator(): HTMLElement;

        /** Removes the menu from its parent menu. */
        remove(): void;

        /** Removes the specified menu from the children. */
        removeChildren(menu: Menu): boolean;

        /** Removes all child from the list. */
        clear(): void;

        

        showChildrenAt(target: HTMLElement, locations?: number[], option?: ShowAtOption): void;
        showChildrenAt(coords: CoordinatesLike, locations?: number[], option?: ShowAtOption): void;
        protected showChildrenAtRect(target: DOMRect, locations?: number[], option?: ShowAtOption): void;
        protected showChildrenAtElement(target: HTMLElement, locations?: number[], option?: ShowAtOption): void;
        protected showChildrenAtCoord(coordinates: CoordinatesLike, locations?: number[], option?: ShowAtOption): void;
        hideChildren(): void;
        hideChildrenImmediately(): void;
        protected checkHasChildren(): void;


        // methods - ui events
        protected _keydown_tab(e: KeyboardEvent): void;
        protected _keydown_arrow_or_enter(e: KeyboardEvent): void;
        protected _dispatchEvent_menuclick(menu: Menu): void;

        // static methods
        static getItem(element: HTMLElement): Menu;
        static setItem(element: HTMLElement, menu: Menu): Menu;
    }

    interface MenuOption {
        icon: string;
        name: string;
        shortcut: string;
    }
    interface MenuPrivate {
        element: HTMLElement;
        elementLabel: HTMLElement;
        elementIcon: HTMLElement;
        elementName: HTMLElement;
        elementChildren: HTMLElement;
        elementIntersect: HTMLElement;

        elementMenuAbstract: HTMLElement;

        parent: Menu;
        children: Menu[];

        icon: string;
        name: string;

        rootLocations: number[];
        rootOption: intell.ctrl.ShowAtOption;
        rootFadeOutTime: number;

        childLocations: number[];
        childOption: intell.ctrl.ShowAtOption;
        childFadeOutTime: number;

        // session
        active: boolean;
        childrenVisible: boolean;
        childrenFadingOut: boolean;
    }
}



declare namespace intell.ctrl {
    export class MenuBar {
        /** Initializes a new instance of the MenuBar class from element.
        * @param element The element for which to create MenuBar.*/
        constructor(element: HTMLElement);

        // properties
        /** Gets the root element of the menu. */
        readonly element: HTMLElement;

        /** Gets the abstract element of the menu. */
        readonly elementMenuAbstract: HTMLElement;

        /** Gets the children of the menubar. The return value is a clone array, it is safe to modify or use on some where. */
        readonly children: Menu[];

        // methods
        getPrivate(): MenuBarPrivate;
        add(name: string): Menu;
        add(menuItem: Menu): void;
        add(option: MenuOption): Menu;
        protected addName(name: string): Menu;
        protected addMenu(menu: Menu): void;
        protected addOption(option: MenuOption): Menu;

        // methods - ui events
        protected _keydown_arrow(e: KeyboardEvent): void;

        // static methods
        static getItem(element: HTMLElement): MenuBar;
        static setItem(element: HTMLElement, comboBox: MenuBar): MenuBar;
    }


    interface MenuBarPrivate {
        element: HTMLElement;
        elementMenuAbstract: HTMLElement;

        children: Menu[];
    }

}
declare namespace intell.component {

    // properties
    /** Gets config. */
    export var config: Config;
    /** Gets loaded components. */
    export var manifests: ComponentManifest[];    

    // methods
    /** Register a new ComponentManifest. */
    export function addManifest(manifest: Omit<ComponentManifest, "_html" | "_default">): ComponentManifest;
    /** Gets ComponentManifest by its name.  */
    export function getManifest(name: string): Promise<ComponentManifest>;
    /** Transform a specified element. */
    export function transform(elementComponent: HTMLElement): Promise<void>;
    /** Transform all component elements in specified element. */
    export function transformAll(element: HTMLElement): Promise<void>;

    interface Config {
        rootDir: string;
    }
    
    interface ComponentManifest {
        /** The name of the component. The name of the component is case insensitive. */
        name: string;
        /** The url of html file.*/
        html?: string;
        /** The url of js file. */
        js?: string;
        /** The urls of css file. */
        css?: string[];

        _html: string;
        _default(element: HTMLElement, elementOriginal: HTMLElement): void;
    }

}
interface String {
    /** Returns the string that between specified start and end string.
     * @param startWith The characters to be searched for at the start of this string.
     * @param endWith The characters to be searched for at the end of this string.
     * @param include If true, return value will include startWith & endwith, else do not include. Default is false. */
    between(startWith: string, endWith: string, include?: boolean): string;
}
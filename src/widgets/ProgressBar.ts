import { Widget, Window, RoleType, EventArgs,
    IdleUpWidgetState } from "../core/ui";
import { Rect } from "../core/ui";
import { Theme } from "./theme";

export class ProgressBar extends Widget {
private track: Rect;
private fill: Rect;
private _incrementValue = 0;
private _currentValue = 0;
private _onIncrement: ((val: number) => void) | null = null;

constructor(parent: Window) {
super(parent);
this.role = RoleType.group;
this.width = 200;
this.height = 20;
this.selectable = false;
this.render();
this.setState(new IdleUpWidgetState());
}

render(): void {
this._group = (this.parent as Window).window.group();
this.outerSvg = this._group;
this.track = this._group.rect(this.width, this.height)
 .fill(Theme.fillColor)
 .stroke({ color: Theme.strokeColor, width: 1 });
this.fill = this._group.rect(0, this.height)
 .fill(Theme.accentColor)
 .move(0, 0);
}

get incrementValue(): number {
return this._incrementValue;
}
set incrementValue(val: number) {
this._incrementValue = Math.max(0, Math.min(100, val));
}

get currentValue(): number {
return this._currentValue;
}

increment(val: number): void {
this._currentValue = Math.max(0, Math.min(100, this._currentValue + val));
const w = (this._currentValue / 100) * this.width;
this.fill.width(w);
if (this._onIncrement) this._onIncrement(this._currentValue);
}

onIncrement(cb: (val: number) => void): void {
this._onIncrement = cb;
}

idleupState(): void { }
idledownState(): void { }
pressedState(): void { }
pressReleaseState(): void { }
hoverState(): void { }
hoverPressedState(): void { }
pressedoutState(): void { }
moveState(): void { }
keyupState(): void { }
}

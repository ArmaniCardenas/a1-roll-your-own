import { Widget, Window, RoleType, EventArgs,
    IdleUpWidgetState } from "../core/ui";
import { Rect, Text } from "../core/ui";
import { Theme } from "./theme";



export class ScrollBar extends Widget {
    private upButton: Rect;
    private downButton: Rect;
    private track: Rect;
    private thumb: Rect;
    private _onScroll: ((pos: number, dir: string) => void) | null = null;
    private _position = 0;
    private step = 20;
    private buttonSize = 20;
  
    constructor(parent: Window) {
      super(parent);
      this.role = RoleType.scrollbar;
      this.width = this.buttonSize;
      this.height = 100;
      this.render();
      this.setState(new IdleUpWidgetState());
      this.selectable = false;
    }
  
    render(): void {
      this._group = (this.parent as Window).window.group();
      this.upButton = this._group.rect(this.buttonSize, this.buttonSize)
        .fill(Theme.fillColor).stroke(Theme.strokeColor);
      this._group.text("▴").font({ size: 12 }).move(6,4);
      this.registerEvent(this.upButton);
      this.upButton.click(() => this.scrollBy(-this.step, 'up'));
  
      this.track = this._group.rect(this.buttonSize,
        this.height - 2 * this.buttonSize)
        .fill(Theme.fillColor)
        .move(0, this.buttonSize);
      this.registerEvent(this.track);
      this.track.click((e: any) => {
        const localY = e.offsetY - this.buttonSize;
        this.setThumb(localY);
        if (this._onScroll) this._onScroll(this._position, 'track');
      });
  
      this.thumb = this._group.rect(this.buttonSize, this.buttonSize)
        .fill(Theme.accentColor)
        .move(0, this.buttonSize);
      this.registerEvent(this.thumb);
  
      this.downButton = this._group.rect(this.buttonSize, this.buttonSize)
        .fill(Theme.fillColor)
        .move(0, this.height - this.buttonSize)
        .stroke(Theme.strokeColor);
      this._group.text("▾").font({ size: 12 }).move(6, this.height - this.buttonSize + 4);
      this.registerEvent(this.downButton);
      this.downButton.click(() => this.scrollBy(this.step, 'down'));
  
      this.outerSvg = this._group;
    }
  
    private scrollBy(delta: number, dir: string) {
      this.setThumb(this._position + delta);
      if (this._onScroll) this._onScroll(this._position, dir);
    }
  
    private setThumb(pos: number) {
      const max = this.height - 2 * this.buttonSize;
      this._position = Math.max(0, Math.min(pos, max));
      this.thumb.move(0, this.buttonSize + this._position);
    }
  
    onScroll(cb: (pos: number, dir: string) => void): void {
      this._onScroll = cb;
    }
  
    get thumbPosition(): number {
      return this._position;
    }
  
    set barHeight(val: number) {
      this.height = val;
      this.render();
    }
    get barHeight(): number { return this.height; }
  
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
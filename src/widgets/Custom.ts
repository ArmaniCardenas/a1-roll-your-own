import { Widget, Window, RoleType, EventArgs,
    IdleUpWidgetState } from "../core/ui";
import { Rect, Circle } from "../core/ui";
import { Theme } from "./theme";

export class CustomToggle extends Widget {
  private track: Rect;
  private thumb: Circle;
  private _toggled = false;
  private _onToggle: ((state: boolean) => void) | null = null;
  private readonly padding = 2;

  constructor(parent: Window) {
    super(parent);
    this.role = RoleType.button;
    this.width = 60;
    this.height = 30;
    this.render();
    this.setState(new IdleUpWidgetState());
    this.selectable = false;
  }

  render(): void {
    this._group = (this.parent as Window).window.group();
    this.track = this._group.rect(this.width, this.height)
      .radius(this.height / 2)
      .fill(Theme.fillColor)
      .stroke({ color: Theme.strokeColor, width: 1 });

    const r = this.height - this.padding * 2;
    this.thumb = this._group.circle(r)
      .fill(Theme.accentColor)
      .move(this.padding, this.padding);

    this.outerSvg = this._group;

    const hit = this._group.rect(this.width, this.height).opacity(0);
    this.registerEvent(hit);
  }

  private applyTogglePosition(): void {
    const x = this._toggled
      ? this.width - this.height + this.padding
      : this.padding;
    this.thumb.move(x, this.padding);
  }

  private toggle(): void {
    this._toggled = !this._toggled;
    this.applyTogglePosition();
    if (this._onToggle) this._onToggle(this._toggled);
  }

  get toggled(): boolean {
    return this._toggled;
  }

  onToggle(cb: (state: boolean) => void): void {
    this._onToggle = cb;
  }

  pressReleaseState(): void {
    this.toggle();
    this.raise(new EventArgs(this));
  }

  idleupState(): void {
    this.track.fill(Theme.fillColor);
    super.update();
  }

  idledownState(): void {
    this.track.fill(Theme.activeFill);
    super.update();
  }

  pressedState(): void {
    this.track.fill(Theme.hoverFill);
    super.update();
  }

  hoverState(): void {
    this.track.stroke({ color: Theme.accentColor, width: 1 });
    super.update();
  }

  hoverPressedState(): void {
    this.track.stroke({ color: Theme.strokeColor, width: 1 });
    super.update();
  }

  pressedoutState(): void {
    this.track.fill(Theme.fillColor);
    super.update();
  }

  moveState(): void { }

  keyupState(): void {
  }


  
}

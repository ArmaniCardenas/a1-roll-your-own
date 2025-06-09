import { Widget, Window, RoleType,
    IdleUpWidgetState, IdleDownWidgetState, HoverWidgetState,
    HoverPressedWidgetState, PressedWidgetState, PressedOutWidgetState } from "../core/ui";
import { Circle, Text } from "../core/ui";
import { Theme } from "./theme";


export class RadioGroup extends Widget {
    private choices: string[];
    private circles: Circle[] = [];
    private inners: Circle[] = []; 
    private labels: Text[] = [];
    private _selectedIndex = 0;
    private _onChange: ((index: number) => void) | null = null; 
    private gap = 4; 
    private radius = 8;

    constructor(parent: Window, choices: string[]) {
        super(parent);
        this.choices = choices;
        this.width = 200;
        this.height = choices.length * (this.radius * 2 + this.gap);
        this.render();
        this.setState(new IdleUpWidgetState());
        this.selectable = false;
      }

      get selectedIndex(): number {
        return this._selectedIndex; 
      }

      set selectedIndex(idx: number) {
        if (idx === this._selectedIndex) return;

        this._selectedIndex = idx;
        this.inners.forEach((inner, i) => {
          inner.fill(i === idx ? Theme.accentColor : "transparent");
        });
        if (this._onChange) this._onChange(idx);
      }

      onChange(cb: (index: number) => void): void {
        this._onChange = cb;
      }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this.outerSvg = this._group;
    
        this.choices.forEach((opt, i) => {
          const y = i * (this.radius * 2 + this.gap);
          const outer = this._group.circle(this.radius * 2)
            .fill(Theme.fillColor)
            .stroke({ color: Theme.strokeColor, width: 1 })
            .move(0, y);
          const inner = this._group.circle((this.radius - 4) * 2)
            .fill(i === this._selectedIndex ? Theme.accentColor : "transparent")
            .move(4, y + 4);
          const label = this._group.text(opt)
            .font({ size: Theme.fontSize, family: Theme.fontFamily })
            .fill(Theme.strokeColor)
            .move(this.radius * 2 + 6, y + (this.radius * 2 - Theme.fontSize) / 2);
    
          this.circles.push(outer);
          this.inners.push(inner);
          this.labels.push(label);
    
          const hit = this._group.rect(this.width, this.radius * 2)
            .opacity(0)
            .move(0, y);
          this.registerEvent(hit);
          hit.click(() => this.selectedIndex = i);
        });
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
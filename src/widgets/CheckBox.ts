import { Widget, Window, RoleType, EventArgs, IdleDownWidgetState,
     IdleUpWidgetState, HoverWidgetState, HoverPressedWidgetState, PressedWidgetState,
    PressedOutWidgetState } from "../core/ui";

import { Rect, Text } from "../core/ui";
import { Theme } from "./theme";


export class CheckBox extends Widget {
    private box: Rect; 
    private labelTxt: Text;
    private checkMark: Text | null = null; 
    private _checked = false;
    private _onChange: ((checked: boolean) => void) | null = null; 


    constructor(parent: Window) {
        super(parent);
        this.role = RoleType.button; 
        this.width = 20; 
        this.height = 20; 
        this.render();
        this.setState(new IdleUpWidgetState());
        this.selectable = false; 
    }

    render(): void {

        this._group = (this.parent as Window).window.group();
        this.box = this._group.rect(this.width, this.height)
          .fill(Theme.fillColor)
          .stroke({ color: Theme.strokeColor, width: 1 })
          .radius(Theme.cornerRadius);
        this.drawCheck();
        this.labelTxt = this._group.text("")
          .font({ size: Theme.fontSize, family: Theme.fontFamily })
          .fill(Theme.strokeColor)
          .move(this.width + 6, (this.height - Theme.fontSize) / 2);
    
        this.outerSvg = this._group;
        const hit = this._group.rect(this.width + 6 + 100, this.height).opacity(0);
        this.registerEvent(hit);
      }


    private drawCheck(): void{
        if (this.checkMark)
        {
            this.checkMark.remove(); 
            this.checkMark = null;
        }

        if (this._checked)
        {
            this.checkMark = this._group.text("✓")
                .addClass("checkmark")
                .font({ size: this.height, family: Theme.fontFamily })
                .fill(Theme.accentColor)
                .move(2, -4);
        }
    }

    get label(): string{
        return this.labelTxt.text().toString(); 
    }

    set label(val: string) {
        this.labelTxt.text(val);
    }

    get checked()
    {
        return this._checked;
        
    }

    set checked(val: boolean) {
        this._checked = val;
        this.drawCheck(); 
        if (this._onChange) this._onChange(this._checked);
      }

      onChange(cb: (checked: boolean) => void): void {
        this._onChange = cb; 
      }


    idleupState(): void { this.box.fill(Theme.fillColor); super.update(); }
    idledownState(): void { this.box.fill(Theme.activeFill); super.update(); }
    pressedState(): void { }
    pressReleaseState(): void { this.checked = !this.checked; }
    hoverState(): void { this.box.fill(Theme.hoverFill); super.update(); }
    hoverPressedState(): void { }
    pressedoutState(): void { this.box.fill(Theme.fillColor); super.update(); }
    moveState(): void { }
    keyupState(): void { }
}
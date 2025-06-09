import { Window } from "./core/ui";
import { CheckBox } from "./widgets/CheckBox";
import { ProgressBar } from "./widgets/ProgressBar";
import { CustomToggle } from "./widgets/Custom";
import { ScrollBar } from "./widgets/ScrollBar";
import { RadioGroup } from "./widgets/RadioGroup";

const w = new Window(window.innerHeight - 10, "100%");

const sb = new ScrollBar(w);
sb.move(320, 100);
sb.barHeight = 150;
sb.onScroll((pos, dir) => console.log("Scroll:", dir, pos));

const tog = new CustomToggle(w);
tog.move(100, 0);
tog.onToggle(state => console.log("Toggled:", state));

const cb = new CheckBox(w);
cb.move(100, 500);
cb.label = "Enable feature";
cb.onChange(checked => console.log("Checkbox:", checked));

const pb = new ProgressBar(w);
pb.move(10, 250);
pb.incrementValue = 0;
pb.onIncrement(val => console.log("Progress:", val));
pb.increment(30);



const rg = new RadioGroup(w, ["Red", "Green", "Blue"]);
rg.move(10, 300);
rg.onChange(idx => console.log("Radio selected:", idx));


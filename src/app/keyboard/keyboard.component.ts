import { Component, EventEmitter, Output, ViewEncapsulation } from "@angular/core";
import Keyboard from "simple-keyboard";

@Component({
  selector: "keyboard",
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./keyboard.component.html",
  styleUrls: ["./keyboard.component.scss"]
})
export class KeyboardComponent {
  value = "";
  keyboard!: Keyboard;

  @Output() keyboardEvent = new EventEmitter<string>();

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onKeyPress: (button: string) => this.onKeyPress(button),
      layout: {
        default: [
          "q w e r t y u i o p",
          "a s d f g h j k l",
          "{shift} z x c v b n m {bksp}",
          "{enter}"
        ]
      },
      display: {
        "{numbers}": "123",
        "{enter}": "submit",
        "{escape}": "esc ⎋",
        "{tab}": "tab ⇥",
        "{bksp}": "⌫",
        "{capslock}": "caps lock ⇪",
        "{shift}": "⇧",
        "{controlleft}": "ctrl ⌃",
        "{controlright}": "ctrl ⌃",
        "{altleft}": "alt ⌥",
        "{altright}": "alt ⌥",
        "{metaleft}": "cmd ⌘",
        "{metaright}": "cmd ⌘",
        "{abc}": "ABC",
        "{space}": "        "
      }
    });
  }

  onKeyPress = (button: string) => {
    this.keyboardEvent.emit(button);
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  };

}

export class Gate {
    name = "";
    target = null;
    control = null;

    constructor(name, target, control) {
      this.name = name;
      this.target = target;
      this.control = control;
    }
}
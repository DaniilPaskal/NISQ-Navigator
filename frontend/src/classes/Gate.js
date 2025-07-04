export class Gate {
    name = "";
    target = null;
    control = [];

    constructor(name, target, control) {
      this.name = name;
      this.target = target;
      this.control = control;
    }
}
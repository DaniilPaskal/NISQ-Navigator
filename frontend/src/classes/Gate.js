export class Gate {
    name = "";
    target = null;
    control = [];
    theta = null;

    constructor(name, target, control, theta) {
      this.name = name;
      this.target = target;
      this.control = control;
      this.theta = theta;
    }
}
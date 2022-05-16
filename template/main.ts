import {App} from "cdktf";
import {{{Name}}Stack} from "./lib/{{Name}}Stack";

const app = new App();

new {{Name}}Stack(app, "{{Name}}Stack", {
  myProp: "Hello World",
  CostCenter: "{{name}}"
});

app.synth();

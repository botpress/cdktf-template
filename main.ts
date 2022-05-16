import {App} from "cdktf";
import {MyAwsStack} from "./lib/myAwsStack";

const app = new App();

new MyAwsStack(app, "MyStack", {
  myProp: "Hello World",
  CostCenter: "{{baseName}}"
});

app.synth();

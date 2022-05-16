import {TerraformOutput} from "cdktf";
import {Construct} from "constructs";
import {AwsStack, AwsStackProps} from "../internal/aws/stack";

interface MyStackProps extends AwsStackProps {
  readonly myProp: string;
}

export class MyAwsStack extends AwsStack {
  constructor(scope: Construct, id: string, props: MyStackProps) {
    super(scope, id, props);

    new TerraformOutput(this, "myProp", {
      value: props.myProp,
    });

    // Example
    // const instance = new ec2.Instance(this, "compute", {
    //   ami: "ami-01456a894f71116f2",
    //   instanceType: "t2.micro",
    // });
    //
  }
}

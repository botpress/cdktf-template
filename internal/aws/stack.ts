import {TerraformStack} from "cdktf";
import {Construct} from "constructs";
import {AwsProvider} from "@cdktf/provider-aws";

export interface AwsStackProps {
  /** CostCenter Tag (i.e: {{baseName}})*/
  readonly CostCenter: string;
  /** AWS Region (default: us-east-1) */
  readonly region?: string;
}

export abstract class AwsStack extends TerraformStack {
  protected constructor(scope: Construct, id: string, props: AwsStackProps) {
    super(scope, id);

    const {CostCenter, region} = props;

    new AwsProvider(this, "AWS", {
      region: region || "us-east-1",
      defaultTags: {
        tags: {
          CostCenter,
        }
      },
    });
  }
}
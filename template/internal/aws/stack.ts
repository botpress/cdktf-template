import {Construct} from "constructs";
import {AwsProvider} from "@cdktf/provider-aws";
import {RemoteStack} from "../remoteStack";

export interface AwsStackProps {
  /** CostCenter Tag (default: {{CostCenter}})*/
  readonly CostCenter?: string;
  /** AWS Region (default: {{Region}}) */
  readonly region?: string;
}

export abstract class AwsStack extends RemoteStack {
  protected constructor(scope: Construct, id: string, props?: AwsStackProps) {
    super(scope, id);

    new AwsProvider(this, "AWS", {
      region: props?.region || "{{Region}}",
      defaultTags: {
        tags: {
          CostCenter: props?.CostCenter || "{{CostCenter}}",
        }
      },
    });
  }
}

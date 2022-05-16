import {RemoteBackend, TerraformStack} from "cdktf";
import {Construct} from "constructs";

export abstract class RemoteStack extends TerraformStack {
  protected constructor(scope: Construct, id: string) {
    super(scope, id);

    new RemoteBackend(this, {
      hostname: "app.terraform.io",
      organization: "{{OrganizationName}}",
      workspaces: {
        name: "{{WorkspaceName}}"
      }
    });
  }
}

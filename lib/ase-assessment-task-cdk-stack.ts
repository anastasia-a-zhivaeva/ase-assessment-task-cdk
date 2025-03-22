import * as cdk from 'aws-cdk-lib';
import { FunctionUrlAuthType } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class AseAssessmentTaskCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const recommendation = new NodejsFunction(this, "recommendation", {
      entry: "./src/lambda.ts",
      timeout: cdk.Duration.minutes(1),
      
    })

    const recommendationUrl = recommendation.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
    });

    new cdk.CfnOutput(this, "Recommendation Service URL", {
      value: recommendationUrl.url,
    });
  }
}

import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as AseAssessmentTaskCdk from '../lib/ase-assessment-task-cdk-stack';

test('Recommendation Lambda Function Created', () => {
  const app = new cdk.App();
    // WHEN
  const stack = new AseAssessmentTaskCdk.AseAssessmentTaskCdkStack(app, 'MyTestStack');
    // THEN
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::Lambda::Function', {
      Timeout: 60
  });
});

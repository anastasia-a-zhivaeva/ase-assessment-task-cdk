#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AseAssessmentTaskCdkStack } from '../lib/ase-assessment-task-cdk-stack';

const app = new cdk.App();
new AseAssessmentTaskCdkStack(app, 'AseAssessmentTaskCdkStack', {
  env: { account: '549803286551', region: 'us-east-1' },
});
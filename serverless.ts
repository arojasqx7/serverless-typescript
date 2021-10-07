import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';


const serverlessConfiguration: AWS = {
  service: 'serverless-andrey',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    apiKeys: [
    {
      name: "hello-andrey-dev-key",
      usagePlan: {
        name: "hello-andrey-dev-usage-plan",
        description: "Usage Plan setup for API", 
        quota: {
          limit: 1000000,
          period: "MONTH"
        }
      }
    }],
  },
  plugins: ['serverless-webpack', "serverless-offline", "serverless-add-api-key"],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: "dev",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },

  functions: { hello },
};

module.exports = serverlessConfiguration;

const { Stack, Duration } = require('aws-cdk-lib');
const s3 = require("aws-cdk-lib/aws-s3");
const lambda = require("aws-cdk-lib/aws-lambda");
const { HttpLambdaIntegration } = require("@aws-cdk/aws-apigatewayv2-integrations-alpha");
const {CorsHttpMethod, HttpApi, HttpMethod} = require("@aws-cdk/aws-apigatewayv2-alpha")
const iam = require("aws-cdk-lib/aws-iam");
const lambdaEventSource = require('@aws-cdk/aws-lambda-event-sources');
// const sqs = require('aws-cdk-lib/aws-sqs');

class CareGroupCdkStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const bucket = new s3.Bucket(this, "Store");

    const getAnnouncementHandler = new lambda.Function(this, "getAnnouncementHandler", {
      description: 'Function to get announcement.',
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("resources"),
      handler: "GetAnnouncementLambda.main",
      environment: {
        BUCKET: bucket.bucketName
      }
    });

    const getAnnouncementIntegration = new HttpLambdaIntegration("getAnnouncementIntegration", getAnnouncementHandler);

    const getAnnouncementHttpApi = new HttpApi(this, 'getAnnouncementHttpApi', {
      description: "Function to add a ministry for CG.",
      corsPreflight: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: [
          CorsHttpMethod.OPTIONS,
          CorsHttpMethod.GET,
          CorsHttpMethod.POST,
          CorsHttpMethod.PUT,
          CorsHttpMethod.PATCH,
          CorsHttpMethod.DELETE,
        ],
        allowCredentials: false,
        allowOrigins: ['*'],
      },
    });

    getAnnouncementHttpApi.addRoutes({
      path: '/announcements',
      methods: [ HttpMethod.GET ],
      integration: getAnnouncementIntegration,
    });



    const addMinistryHandler = new lambda.Function(this, "addMinistryHandler", {
      description: 'Function to add a ministry for CG.',
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("resources"),
      handler: "AddMinistryLambda.main",
      environment: {
        BUCKET: bucket.bucketName
      }
    });

    const addMinistryIntegration = new HttpLambdaIntegration("addMinistryIntegration", addMinistryHandler);

    const addMinistryHttpApi = new HttpApi(this, 'addMinistryHttpApi', {
      description: "Function to add a ministry for CG.",
      corsPreflight: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: [
          CorsHttpMethod.OPTIONS,
          CorsHttpMethod.GET,
          CorsHttpMethod.POST,
          CorsHttpMethod.PUT,
          CorsHttpMethod.PATCH,
          CorsHttpMethod.DELETE,
        ],
        allowCredentials: false,
        allowOrigins: ['*'],
      },
    });

    addMinistryHttpApi.addRoutes({
      path: '/add-ministry',
      methods: [ HttpMethod.POST ],
      integration: addMinistryIntegration,
    });

    const deleteMinistryHandler = new lambda.Function(this, "deleteMinistryHandler", {
      description: 'Function to delete a ministry for CG.',
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("resources"),
      handler: "DeleteMinistryLambda.main",
      environment: {
        BUCKET: bucket.bucketName
      }
    });

    const deleteMinistryIntegration = new HttpLambdaIntegration("deleteMinistryIntegration", deleteMinistryHandler);

    const deleteMinistryHttpApi = new HttpApi(this, 'deleteMinistryHttpApi', {
      description: "Function to delete a ministry for CG.",
      corsPreflight: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: [
          CorsHttpMethod.OPTIONS,
          CorsHttpMethod.GET,
          CorsHttpMethod.POST,
          CorsHttpMethod.PUT,
          CorsHttpMethod.PATCH,
          CorsHttpMethod.DELETE,
        ],
        allowCredentials: false,
        allowOrigins: ['*'],
      },
    });

    deleteMinistryHttpApi.addRoutes({
      path: '/delete-ministry',
      methods: [ HttpMethod.POST ],
      integration: deleteMinistryIntegration,
    });

    const changePasswordHandler = new lambda.Function(this, "changePasswordHandler", {
      description: 'Function to change password for CG.',
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("resources"),
      handler: "ChangePasswordLambda.main",
      environment: {
        BUCKET: bucket.bucketName
      }
    });

    const changePasswordIntegration = new HttpLambdaIntegration("changePasswordIntegration", changePasswordHandler);

    const changePasswordHttpApi = new HttpApi(this, 'changePasswordHttpApi', {
      description: "Function to change password for CG.",
      corsPreflight: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: [
          CorsHttpMethod.OPTIONS,
          CorsHttpMethod.GET,
          CorsHttpMethod.POST,
          CorsHttpMethod.PUT,
          CorsHttpMethod.PATCH,
          CorsHttpMethod.DELETE,
        ],
        allowCredentials: false,
        allowOrigins: ['*'],
      },
    });

    changePasswordHttpApi.addRoutes({
      path: '/change-password',
      methods: [ HttpMethod.POST ],
      integration: changePasswordIntegration,
    });

    const signInHandler = new lambda.Function(this, "signInHandler", {
      description: 'Function to sign in for CG.',
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("resources"),
      handler: "SignInLambda.main",
      environment: {
        BUCKET: bucket.bucketName
      }
    });

    const signInIntegration = new HttpLambdaIntegration("signInIntegration", signInHandler);

    const signInHttpApi = new HttpApi(this, 'signInHttpApi', {
      description: "API to sign in for CG.",
      corsPreflight: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: [
          CorsHttpMethod.OPTIONS,
          CorsHttpMethod.GET,
          CorsHttpMethod.POST,
          CorsHttpMethod.PUT,
          CorsHttpMethod.PATCH,
          CorsHttpMethod.DELETE,
        ],
        allowCredentials: false,
        allowOrigins: ['*'],
      },
    });

    signInHttpApi.addRoutes({
      path: '/sign-in',
      methods: [ HttpMethod.POST ],
      integration: signInIntegration,
    });

    const editAnnouncementHandler = new lambda.Function(this, "editAnnouncementHandler", {
      description: 'Function to edit the announcement for CG.',
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("resources"),
      handler: "EditAnnouncementLambda.main",
      environment: {
        BUCKET: bucket.bucketName
      }
    });

    const editAnnouncementIntegration = new HttpLambdaIntegration("editAnnouncementIntegration", editAnnouncementHandler);

    const editAnnouncementHttpApi = new HttpApi(this, 'editAnnouncementHttpApi', {
      description: "API to edit the announcement for CG.",
      corsPreflight: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: [
          CorsHttpMethod.OPTIONS,
          CorsHttpMethod.GET,
          CorsHttpMethod.POST,
          CorsHttpMethod.PUT,
          CorsHttpMethod.PATCH,
          CorsHttpMethod.DELETE,
        ],
        allowCredentials: false,
        allowOrigins: ['*'],
      },
    });

    editAnnouncementHttpApi.addRoutes({
      path: '/edit-announcement',
      methods: [ HttpMethod.POST ],
      integration: editAnnouncementIntegration,
    });

    const addInterestHandler = new lambda.Function(this, "addInterestHandler", {
      description: 'Function to get overall statistics from all rooms.',
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("resources"),
      handler: "AddInterestLambda.main",
      environment: {
        BUCKET: bucket.bucketName
      }
    });

    const addInterestIntegration = new HttpLambdaIntegration("addInterestIntegration", addInterestHandler);

    const addInterestHttpApi = new HttpApi(this, 'addInterestHttpApi', {
      description: "API to add people's interest to serve in the CG",
      corsPreflight: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: [
          CorsHttpMethod.OPTIONS,
          CorsHttpMethod.GET,
          CorsHttpMethod.POST,
          CorsHttpMethod.PUT,
          CorsHttpMethod.PATCH,
          CorsHttpMethod.DELETE,
        ],
        allowCredentials: false,
        allowOrigins: ['*'],
      },
    });

    addInterestHttpApi.addRoutes({
      path: '/add-interest',
      methods: [ HttpMethod.POST ],
      integration: addInterestIntegration,
    });

    const getInformationHandler = new lambda.Function(this, "getInformationHandler", {
      description: 'Function to get information on volunteers for CG.',
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("resources"),
      handler: "GetInformationLambda.main",
      environment: {
        BUCKET: bucket.bucketName
      }
    });

    const getInformationIntegration = new HttpLambdaIntegration("getInformationIntegration", getInformationHandler);

    const getInformationHttpApi = new HttpApi(this, 'getInformationHttpApi', {
      description: "API to get information on volunteers for CG.",
      corsPreflight: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: [
          CorsHttpMethod.OPTIONS,
          CorsHttpMethod.GET,
          CorsHttpMethod.POST,
          CorsHttpMethod.PUT,
          CorsHttpMethod.PATCH,
          CorsHttpMethod.DELETE,
        ],
        allowCredentials: false,
        allowOrigins: ['*'],
      },
    });

    getInformationHttpApi.addRoutes({
      path: '/get-information',
      methods: [ HttpMethod.GET ],
      integration: getInformationIntegration,
    });

    const toggleStatusHandler = new lambda.Function(this, "toggleStatusHandler", {
      description: 'Function to toggle the status for CG.',
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("resources"),
      handler: "ToggleStatusLambda.main",
      environment: {
        BUCKET: bucket.bucketName
      }
    });

    const toggleStatusIntegration = new HttpLambdaIntegration("toggleStatusIntegration", toggleStatusHandler);

    const toggleStatusHttpApi = new HttpApi(this, 'toggleStatusHttpApi', {
      description: "API to toggle the status for CG.",
      corsPreflight: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: [
          CorsHttpMethod.OPTIONS,
          CorsHttpMethod.GET,
          CorsHttpMethod.POST,
          CorsHttpMethod.PUT,
          CorsHttpMethod.PATCH,
          CorsHttpMethod.DELETE,
        ],
        allowCredentials: false,
        allowOrigins: ['*'],
      },
    });

    toggleStatusHttpApi.addRoutes({
      path: '/toggle-status',
      methods: [ HttpMethod.POST ],
      integration: toggleStatusIntegration,
    });

    const assignInterestHandler = new lambda.Function(this, "assignInterestHandler", {
      description: 'Function to assign the people for CG.',
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("resources"),
      handler: "AssignInterestLambda.main",
      environment: {
        BUCKET: bucket.bucketName
      }
    });

    const assignInterestIntegration = new HttpLambdaIntegration("assignInterestIntegration", assignInterestHandler);

    const assignInterestHttpApi = new HttpApi(this, 'assignInterestHttpApi', {
      description: "API to assign the people for CG.",
      corsPreflight: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: [
          CorsHttpMethod.OPTIONS,
          CorsHttpMethod.GET,
          CorsHttpMethod.POST,
          CorsHttpMethod.PUT,
          CorsHttpMethod.PATCH,
          CorsHttpMethod.DELETE,
        ],
        allowCredentials: false,
        allowOrigins: ['*'],
      },
    });

    assignInterestHttpApi.addRoutes({
      path: '/assign-interest',
      methods: [ HttpMethod.POST ],
      integration: assignInterestIntegration,
    });

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CareGroupCdkQueue', {
    //   visibilityTimeout: Duration.seconds(300)
    // });
  }
}

module.exports = { CareGroupCdkStack }

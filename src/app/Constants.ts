const resourceConfig = {
    auth:{
        aws_region: 'eu-central-1',
        user_pool_id: 'eu-central-1_zZBzuS3hF',//'Taken from Cognito user pool',
        user_pool_client_id: '5fsql4k1o42bs8jcqfufrrpvpn'//'Taken from Cognito user pool -> App Integration -> App client list'
    }
};

export default resourceConfig;
// mandatorySignIn: true

export const API_URL = 'http://restfulwebservices-env.uhpev7xzpb.us-east-1.elasticbeanstalk.com'
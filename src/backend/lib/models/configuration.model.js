class Configuration {

    nsTopicArn;
    rdsHost;
    rdsPort;
    rdsUserSecretArn;
    rdsPasswordSecretArn;
    rdsDbName;

    constructor() {
        this.snsTopicArn = process.env.SNS_TOPIC_ARN || 'default-sns-topic-arn';
        this.rdsHost = process.env.RDS_HOST || 'localhost';
        this.rdsPort = process.env.RDS_PORT || '5432';
        this.rdsUserSecretArn = process.env.RDS_USER_SECRET_ARN || 'default-user-secret-arn';
        this.rdsPasswordSecretArn = process.env.RDS_PASSWORD_SECRET_ARN || 'default-password-secret-arn';
        this.rdsDbName = process.env.RDS_DB_NAME || 'default-db-name';
    }

    validate() {
        if (!this.snsTopicArn) return false;
        if (!this.rdsHost) return false;
        if (!this.rdsPort) return false;
        if (!this.rdsUserSecretArn) return false;
        if (!this.rdsPasswordSecretArn) return false;
        if (!this.rdsDbName) return false;
        return true;
    }
}

module.exports = Configuration;
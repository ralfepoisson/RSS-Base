/**
 * Lambda: Get Feeds (load_feeds.js)
 * 
 * This lambda function is triggered by a scheduled event to fetch a list of RSS feed URL's, which
 * are then pushed into an SNS topic for further processing.
 * 
 * @author Ralfe Poisson <ralfepoisson@gmail.com>
 * @version 1.0.0
 */

// Import libraries
const Configuration = require('../lib/models/configuration.model');
const BLL = require('../lib/services/bll.service');
const AWSService = require('../lib/services/aws.service');

/**
 * Lambda handler
 * @param {Object} event - Input event containing order details
 * @returns {Promise<string>} Success message
 */
export const handler = async(event) => {
    try {
        // Access environment variables
        const snsTopicArn = process.env.SNS_TOPIC_ARN;
        const rdsHost = process.env.RDS_HOST;
        const rdsPort = process.env.RDS_PORT;
        const rdsUser = await AWSService.getSecret(process.env.RDS_USER_SECRET_NAME);
        const rdsPassword = await AWSService.getSecret(process.env.RDS_PASSWORD_SECRET_NAME);
        const rdsDbName = process.env.RDS_DB_NAME;

        // Prepare Configuration
        let config = new Configuration();
        config.snsTopicArn = snsTopicArn;
        config.rdsHost = rdsHost;
        config.rdsPort = rdsPort;
        config.rdsUser = rdsUser;
        config.rdsPassword = rdsPassword;
        config.rdsDbName = rdsDbName;

        // Validate Configuration
        if (!config.validate()) {
            throw new Error('Invalid configuration');
        }

        // Instantiate BLL
        const bll = new BLL(config);

        // Get RSS Feeds
        let feeds = await bll.getFeeds();

        // Publish RSS Feeds
        await bll.publishFeeds(feeds);

        // Log Success
        console.log(`Successfully loaded feeds`);
        return 'Success';
    } catch (error) {
        console.error(`Failed to get feeds: ${error.message}`);
        throw error;
    }
};
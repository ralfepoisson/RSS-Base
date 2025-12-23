/**
 * AWS Service
 * 
 * This is a helper service for interacting with AWS services such as SNS.
 * 
 * @author Ralfe Poisson <ralfepoisson@gmail.com>
 * @version 1.0.0
 */

// Import required libraries
import {
    GetSecretValueCommand,
    SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

class AWSService {
    /**
     * Get the value of a secret from AWS Secrets Manager
     * @param {string} secretName 
     * @returns {string} Secret Value
     */
    async getSecret(secretName) {
        // Create a Secrets Manager client
        const client = new SecretsManagerClient();

        // Retrieve the secret value
        const response = await client.send(
            new GetSecretValueCommand({
                SecretId: secretName,
            }),
        );

        // Return the secret value if it is a normal string
        if (response.SecretString) {
            return response.SecretString;
        }

        // Return the secret value if it is binary data
        if (response.SecretBinary) {
            return response.SecretBinary;
        }

        // If no retrievable value is returned, throw an error
        throw new Error(`Secret ${secretName} has no retrievable value`);
    }

    /**
     * Publish a message (object) to an SNS topic
     * @param {string} topicArn 
     * @param {object} message 
     */
    async publishToSNSTopic(topicArn, message) {
        // Log event
        console.log(`Publishing message to SNS topic ${topicArn}`);
    }
}

module.exports = new AWSService();
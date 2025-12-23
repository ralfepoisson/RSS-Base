/**
 * Business Logic Layer (bll.js)
 * 
 * This module contains the business logic for managing RSS feeds, including fetching feed URLs
 * from the database and publishing them to an SNS topic.
 * 
 * @author Ralfe Poisson <ralfepoisson@gmail.com>
 * @version 1.0.0
 */

// Import required libraries
const Feed = require('../models/feed.model');
const Configuration = require('../models/configuration.model');
const DAL = require('./dal.service');

/**
 * Business Logic Layer Class
 */
class BLL {
    constructor(config) {
        this.config = config;
        this.dal = new DAL(config.host, config.port, config.dbName, config.username, config.password);
    }

    /**
     * Get a list of active feeds from the database
     * @returns {Promise<Feed[]}
     */
    async getFeeds() {
        // Fetch a list of active feeds from the database
        console.log('Fetching active feeds from database');
        const sql = 'SELECT * FROM feeds WHERE active = true';
        let result = await this.dal.query(sql, []);
        console.log(`Fetched ${result.length} active feeds from database`);

        // Map database rows to Feed models
        console.log('Mapping database rows to Feed models');
        let feeds = result.map(row => Feed.fromDatabase(row));
        console.log(`Mapped ${feeds.length} feeds to Feed models`);
        return feeds;
    }

    /**
     * Publish feeds to SNS topic
     * @param {Feed[]} feeds 
     */
    async publishFeeds(feeds) {
        // Publish feeds to SNS topic
        console.log(`Publishing ${feeds.length} feeds to SNS topic ${this.config.snsTopicArn}`);

        // Loop through feeds and post each feed to SNS
        for (let feed of feeds) {
            console.log(`Publishing feed ${feed.id} to SNS topic`);
            await AWSService.publishToSNSTopic(this.config.snsTopicArn, feed.toJSON());
        }
    }
}

module.exports = BLL;
/**
 * Data Access Layer (dal.service.js)
 * 
 * This module handles data access operations with the PostgreSQL database.
 * 
 * @author Ralfe Poisson <ralfepoisson@gmail.com>
 * @version 1.0.0
 */

// Import required libraries
const { Client } = require('pg');

/**
 * Data Access Class
 */
class DAL {
    /**
     * Data Access Layer constructor. Creates a new DAL instance and connect to the database.
     * @param {string} host 
     * @param {number} port 
     * @param {string} user 
     * @param {string} password 
     * @param {string} dbName 
     */
    constructor(host, port, user, password, dbName) {
        this.host = host;
        this.port = port;
        this.user = user;
        this.password = password;
        this.dbName = dbName;

        try{
            this.client = new Client({
                host: this.host,
                port: this.port,
                user: this.user,
                password: this.password,
                database: this.dbName,
            });
            this.client.connect();
        } catch(error){
            console.error(`Failed to connect to database: ${error.message}`);
            throw error;
        }
    }

    /**
     * Execute a SQL query
     * @param {string} sql 
     * @param {string[]} params 
     * @returns {Promise<Object[]>} Query Results
     */
    async query(sql, params) {
        // Execute a SQL query against the PostgreSQL database
        console.log(`Executing SQL: ${sql} with params: ${params}`);
        try {
            let response = await this.client.query(sql, params);
            if (response && response.rows) {
                console.log(`Query returned ${response.rows.length} rows`);
                return response.rows;
            }
            console.log(`Query returned no rows`);
            return null;
        } catch (error) {
            console.error(`Database query failed: ${error.message}`);
            throw error;
        }
    }
}

module.exports = DAL;
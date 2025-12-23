# RSS-Base

RSS News Feed data pipeline tool integrated with AI and exposed via an MCP Server. This is intented to be used as a MCP-connected tool for AI Agents to create news summaries for users based on user-curated RSS feeds.

# Installation

## Prerequisites

In order to deploy the solution infrastructure, Terraform needs to be installed. Note that the infrastructure needs to be deployed to an AWS account.

## Deploying Infrastructure

1. Edit the terraform file /cd/terraform/variables.tf and change the region from `eu-west-1` to the desired target region.
2. Verify the terraform by running `terraform plan`.
3. Execute the terraform by running `terraform apply`.

# Architecture

![image](/doc/implementation_diagram.jpeg)

## Components

### Web GUI

A web interface built as an AngularJS SPA (Single Page Application) which uses the API to manage configuration of users, RSS Feeds, and to view summaries.

### API

The API exposes functionality to manage configuration of users and RSS feeds, as well as to retrieve summaries by AI Agents, user interfaces, and other consumer systems.

### Backend

The backend is a serverless system built ontop of AWS, with the following sub-components:

* RDS Postgres: Databased used to store the configuration (see Data Model below)
* Fetch Feeds Lambda: A lambda function which reads a list of RSS Feeds (typically triggered once per day) and writes the feed URLs into an SNS topic for processing.
* Feeds SNS topic: a queue of RSS Feeds to be processed
* Fetch RSS Feed Lambda: A lambda function which is triggered from the SNS topic and which the retrieves the raw RSS data from the feed URL and stores it in an S3 bucket.
* RSS S3 Bucket: An S3 Bucket used to store raw RSS data for further processes.
* Generate Summary Lambda: A lambda function which reads 

# Data Model

Configuration data is stored in an RDS database, and the RSS Summaries are stored in a NoSQL document store.

### Organisations

* id GUID (Primary Key)
* name VARCHAR
* creation_date TIMESTAMP
* active BOOLEAN
* archived_date TIMESTAMP NULL
* llm_model ENUM (ChatGPT, Claude) NULL
* llm_credentials BLOB NULL (e.g.: {OPENAI_API_KEY: "...", OPENAI_ORG_ID: "...", OPENAI_PROJECT_ID: "..."})

### Users

* id GUID (Primary Key)
* organisation_id GUID (Foreign Key)
* email VARCHAR
* creation_date TIMESTAMP
* active BOOLEAN
* archived_date TIMESTAMP NULL

### Categories

* id GUID (Primary Key)
* user_id GUID (Foreign Key)
* name VARCHAR
* creation_date TIMESTAMP
* active BOOLEAN
* archived_date TIMESTAMP NULL

### Feeds

* id GUID (Primary Key)
* user_id GUID (Foreign Key)
* url VARCHAR
* name VARCHAR
* description VARCHAR NULL
* category GUID (Foreign Key) NULL
* creation_date TIMESTAMP
* active BOOLEAN
* archived_date TIMESTAMP NULL

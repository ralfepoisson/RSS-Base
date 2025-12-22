/*
 This is the databaase script used to instantiate the database.
*/

CREATE DATABASE rssbase;

USE rssbase;

/* Table: Organisations */
CREATE OR REPLACE TABLE organisations (
    id UUID,
    name VARCHAR,
    creation_date TIMESTAMP,
    active BOOLEAN,
    archived_date TIMESTAMP NULL,
    llm_model ENUM("ChatGPT", "Claude"),
    llm_credentials blob,
    PRIMARY KEY (id)
);

/* Table: Users */
CREATE OR REPLACE TABLE users (
    id UUID,
    organisation_id UUID,
    name VARCHAR,
    active BOOLEAN,
    archived_date TIMESTAMP NULL,
    PRIMARY KEY (id)
);

/* Table: Categories */
CREATE OR REPLACE TABLE categories (
    id GUID,
    user_id GUID,
    name VARCHAR,
    creation_date TIMESTAMP,
    active BOOLEAN,
    archived_date TIMESTAMP NULL,
    PRIMARY KEY (id)
);

/* Table: Feeds */
CREATE OR REPLACE TABLE feeds (
    id GUID,
    user_id GUID,
    url VARCHAR,
    name VARCHAR,
    description VARCHAR NULL,
    category_id GUID NULL,
    creation_date TIMESTAMP,
    active BOOLEAN,
    archived_date TIMESTAMP NULL,
    PRIMARY KEY (id)
);
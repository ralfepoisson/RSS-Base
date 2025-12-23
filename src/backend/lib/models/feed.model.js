class Feed {
    constructor(data = {}) {
        this.id = data.id || null;
        this.url = data.url || '';
        this.title = data.title || '';
        this.description = data.description || '';
        this.link = data.link || '';
        this.language = data.language || null;
        this.lastFetched = data.lastFetched || data.last_fetched || null;
        this.createdAt = data.createdAt || data.created_at || null;
        this.updatedAt = data.updatedAt || data.updated_at || null;
    }

    toJSON() {
        return {
            id: this.id,
            url: this.url,
            title: this.title,
            description: this.description,
            link: this.link,
            language: this.language,
            lastFetched: this.lastFetched,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    toDatabase() {
        return {
            id: this.id,
            url: this.url,
            title: this.title,
            description: this.description,
            link: this.link,
            language: this.language,
            last_fetched: this.lastFetched,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        };
    }

    static fromDatabase(row) {
        return new Feed({
            id: row.id,
            url: row.url,
            title: row.title,
            description: row.description,
            link: row.link,
            language: row.language,
            last_fetched: row.last_fetched,
            created_at: row.created_at,
            updated_at: row.updated_at
        });
    }

    validate() {
        const errors = [];
        
        if (!this.url || typeof this.url !== 'string' || this.url.trim() === '') {
            errors.push('URL is required');
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }
}

module.exports = Feed;
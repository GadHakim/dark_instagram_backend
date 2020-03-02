const helper = require('../../app/helpers/helper');

const common = {
    findUserById: async (connection, userId) => {
        const sql = await connection.query(`
            SELECT account_id,
                   email,
                   first_name,
                   last_name,
                   avatar_image_path
            FROM main.accounts
            WHERE account_id = $1
            LIMIT 1
        `, [userId]);

        return helper.pg.firstResultOrNull(sql);
    },

    findPublication: async (connection, publicationId) => {
        const sql = await connection.query(`
            SELECT account_id,
                   like_count,
                   comment,
                   content_height,
                   content_width
            FROM main.publications
            WHERE publication_id = $1
            LIMIT 1
        `, [publicationId]);

        return helper.pg.firstResultOrNull(sql);
    },
};

const publication = {
    get: {
        findPublicationContent: async (connection, publicationId) => {
            const sql = await connection.query(`
                SELECT publication_content_id,
                       publication_content_type,
                       publication_content_path
                FROM main.publications_contents
                WHERE publication_id = $1
                ORDER BY publication_content_id
            `, [publicationId]);

            return helper.pg.resultOrEmptyArray(sql);
        },

        findPublicationComments: async (connection, publicationId) => {
            const sql = await connection.query(`
                SELECT publication_comment_id,
                       account_id,
                       comment
                FROM main.publications_comments
                WHERE publication_id = $1
                ORDER BY publication_comment_id DESC
            `, [publicationId]);

            return helper.pg.resultOrEmptyArray(sql);
        }
    },

    post: {
        addPublication: async (connection, userId, options) => {
            let result = await connection.query(`
                        INSERT
                        INTO main.publications
                        (account_id,
                         comment)
                        VALUES ($1, $2)
                        RETURNING publication_id
                `, [userId,
                    options.comment]
            );

            return helper.pg.getId(result, 'publication_id');
        },

        updatePublication: async (connection, publicationId, publicationHeight, publicationWidth) => {
            await connection.query(`
                UPDATE main.publications
                SET content_height  = $2,
                    content_width = $3
                WHERE publication_id = $1
            `, [publicationId,
                publicationHeight,
                publicationWidth
            ]);
        },

        addPublicationContent: async (connection, publicationId, options) => {
            let result = await connection.query(`
                        INSERT
                        INTO main.publications_contents
                        (publication_id,
                         publication_content_type,
                         publication_content_path)
                        VALUES ($1, $2, $3)
                        RETURNING publication_id
                `, [publicationId,
                    options.publication_content_type,
                    options.publication_content_path
                ]
            );

            return helper.pg.getId(result, 'publication_id');
        }
    }
};

const allPublication = {
    get: {
        findUserPublication: async (connection, userId, options) => {
            const sql = await connection.query(`
                SELECT publication_id,
                       account_id,
                       like_count,
                       comment,
                       content_height,
                       content_width
                FROM main.publications
                ORDER BY publication_id DESC
                LIMIT $1
            `, [
                options.limit
            ]);

            return helper.pg.resultOrEmptyArray(sql);
        },

        findPublicationContent: async (connection, publicationId) => {
            const sql = await connection.query(`
                SELECT publication_content_id,
                       publication_content_type,
                       publication_content_path
                FROM main.publications_contents
                WHERE publication_id = $1
                ORDER BY publication_content_id
            `, [publicationId]);

            return helper.pg.resultOrEmptyArray(sql);
        },

        findPublicationComments: async (connection, publicationId) => {
            const sql = await connection.query(`
                SELECT publication_comment_id,
                       account_id,
                       comment
                FROM main.publications_comments
                WHERE publication_id = $1
                ORDER BY publication_comment_id DESC
            `, [publicationId]);

            return helper.pg.resultOrEmptyArray(sql);
        }
    },
};

const subscribers = {
    get: {
        findSubscribers: async (connection, userId) => {
            const sql = await connection.query(`
                SELECT subscriber_id
                FROM main.subscriptions
                WHERE account_id = $1
                ORDER BY subscription_id
            `, [userId
            ]);

            return helper.pg.resultOrEmptyArray(sql);
        },

        findUserPublications: async (connection, userId) => {
            const sql = await connection.query(`
                SELECT publication_id,
                       account_id,
                       like_count,
                       comment,
                       content_height,
                       content_width
                FROM main.publications
                WHERE account_id = $1
                ORDER BY publication_id DESC
            `, [userId]);

            return helper.pg.resultOrEmptyArray(sql);
        },
    },
};

const comment = {
    post: {
        addComment: async (connection, userId, options) => {
            await connection.query(`
                        INSERT
                        INTO main.publications_comments
                        (account_id,
                         publication_id,
                         comment)
                        VALUES ($1, $2, $3)
                `, [userId,
                    options.publication_id,
                    options.comment
                ]
            );
        },
    },

    put: {
        findComment: async (connection, userId, commentId) => {
            const sql = await connection.query(`
                SELECT publication_comment_id,
                       account_id,
                       comment
                FROM main.publications_comments
                WHERE publication_comment_id = $1
                  AND account_id = $2
            `, [commentId,
                userId
            ]);

            return helper.pg.firstResultOrNull(sql);
        },

        updateComment: async (connection, options) => {
            await connection.query(`
                        UPDATE main.publications_comments
                        SET comment = $1
                        WHERE publication_comment_id = $2
                `, [options.comment,
                    options.comment_id
                ]
            );
        },
    }
};

module.exports = {
    common,
    publication,
    allPublication,
    subscribers,
    comment
};

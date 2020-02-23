const helper = require('../../app/helpers/helper');

const publication = {
    post: {
        findUserById: async (connection, userId) => {
            const sql = await connection.query(`
                SELECT account_id,
                       password,
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

module.exports = {
    publication
};

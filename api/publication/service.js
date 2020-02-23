const helper = require('../../app/helpers/helper');
const convertor = require('./convertor');
const sql = require('./sql');

const publication = {
    post: async (connection, user, options) => {
        let profile = await sql.publication.post.findUserById(connection, user.id);
        if (profile === null) {
            return helper.doom.error.userNotFound();
        }

        let publicationId = await sql.publication.post.addPublication(connection, user.id, options);

        for (let i = 0; i < options.content.length; i++) {
            let item = options.content[i];
            options.publication_content_type = 'image';
            options.publication_content_path = helper.aws.getRandomNameFile(item.name);
            await helper.aws.addImage(item, options.publication_content_path);
            await sql.publication.post.addPublicationContent(connection, publicationId, options);
        }

        return {
            "success": true,
            "message": "The publication published successfully."
        }
    }
};

module.exports = {
    publication
};

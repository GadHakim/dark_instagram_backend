const helper = require('../../app/helpers/helper');
const convertor = require('./convertor');
const sql = require('./sql');

const publication = {
    get: async (connection, user, options) => {
        let profile = await sql.common.findUserById(connection, user.id);
        if (profile === null) {
            return helper.doom.error.userNotFound();
        }

        let publication = await sql.common.findPublication(connection, options.publication_id);
        let publicationContent = await sql.publication.get.findPublicationContent(connection, options.publication_id);
        let publicationComments = await sql.publication.get.findPublicationComments(connection, options.publication_id);
        let publicationUser = await sql.common.findUserById(connection, publication.account_id);

        for (let i = 0; i < publicationComments.length; i++) {
            let comment = publicationComments[i];
            let commentUser = await sql.common.findUserById(connection, comment.account_id);
            comment["account_id"] = undefined;
            comment["comment_user"] = convertor.extra.publication.convertCommentUser(commentUser);
        }

        let result = convertor.publication.get(publication, publicationContent, publicationUser, publicationComments);

        return {
            "success": true,
            "result": result
        }
    },

    post: async (connection, user, options) => {
        let profile = await sql.common.findUserById(connection, user.id);
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
            "message": "The publication published successfully.",
            "publication_id": publicationId,
        }
    }
};

const allPublication = {
    get: async (connection, user, options) => {
        let publications = await sql.allPublication.get.findUserPublication(connection, user.id, options);
        let result = [];

        for (let i = 0; i < publications.length; i++) {
            let publication = publications[i];
            let publicationContent = await sql.allPublication.get.findPublicationContent(connection, publication.publication_id);
            let publicationComments = await sql.allPublication.get.findPublicationComments(connection, publication.publication_id);
            let publicationUser = await sql.common.findUserById(connection, publication.account_id);

            for (let i = 0; i < publicationComments.length; i++) {
                let comment = publicationComments[i];
                let commentUser = await sql.common.findUserById(connection, comment.account_id);
                comment["account_id"] = undefined;
                comment["comment_user"] = convertor.extra.publication.convertCommentUser(commentUser);
            }

            result.push(convertor.publication.get(publication, publicationContent, publicationUser, publicationComments));
        }

        return {
            "success": true,
            "result": result
        }
    },
};

const subscribers = {
    get: async (connection, user) => {
        let subscribers = await sql.subscribers.get.findSubscribers(connection, user.id);
        let result = [];

        for (let i = 0; i < subscribers.length; i++) {
            let subscriber = subscribers[i];

            let publications = await sql.subscribers.get.findUserPublications(connection, subscriber.subscriber_id);

            for (let i = 0; i < publications.length; i++) {
                let publication = publications[i];
                let publicationContent = await sql.allPublication.get.findPublicationContent(connection, publication.publication_id);
                let publicationComments = await sql.allPublication.get.findPublicationComments(connection, publication.publication_id);
                let publicationUser = await sql.common.findUserById(connection, publication.account_id);

                for (let i = 0; i < publicationComments.length; i++) {
                    let comment = publicationComments[i];
                    let commentUser = await sql.common.findUserById(connection, comment.account_id);
                    comment["account_id"] = undefined;
                    comment["comment_user"] = convertor.extra.publication.convertCommentUser(commentUser);
                }

                result.push(convertor.publication.get(publication, publicationContent, publicationUser, publicationComments));
            }
        }

        result.sort((a, b) => {
            return a.publication_id - b.publication_id;
        });
        result.reverse();

        return {
            "success": true,
            "result": result
        }
    },
};

const comment = {
    post: async (connection, user, options) => {
        let publication = await sql.common.findPublication(connection, options.publication_id);
        if (publication == null) {
            return helper.doom.error.publicationNotFound();
        }

        await sql.comment.post.addComment(connection, user.id, options);

        return {
            "success": true,
            "message": "Comment added successfully."
        }
    },

    put: async (connection, user, options) => {
        let comment = await sql.comment.put.findComment(connection, user.id, options.comment_id);
        if (comment == null) {
            return helper.doom.error.commentNotFound();
        }

        await sql.comment.put.updateComment(connection, options);

        return {
            "success": true,
            "message": "Comment updated successfully."
        }
    }
};

module.exports = {
    publication,
    allPublication,
    subscribers,
    comment
};

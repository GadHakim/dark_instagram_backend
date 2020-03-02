const helper = require('../../app/helpers/helper');

const extra = {
    publication: {
        convertPublicationContent(publicationContent) {
            let result = [];

            publicationContent.forEach(value => {
                result.push({
                    "content_id": value.publication_content_id,
                    "content_type": value.publication_content_type,
                    "content_path": value.publication_content_path ? helper.aws.getImagePath(value.publication_content_path) : null,
                });
            });

            return result;
        },

        convertCommentUser(commentUser) {
            return {
                "account_id": commentUser.account_id,
                "email": commentUser.email,
                "first_name": commentUser.first_name,
                "last_name": commentUser.last_name,
                "full_name": commentUser.first_name + " " + commentUser.last_name,
                "avatar_image_path": commentUser.avatar_image_path ? helper.aws.getImagePath(commentUser.avatar_image_path) : null,
            };
        },

        convertPublicationUser(publicationUser) {
            return {
                "email": publicationUser.email,
                "first_name": publicationUser.first_name,
                "last_name": publicationUser.last_name,
                "full_name": publicationUser.first_name + " " + publicationUser.last_name,
                "avatar_image_path": publicationUser.avatar_image_path ? helper.aws.getImagePath(publicationUser.avatar_image_path) : null,
            };
        }
    },
};

const publication = {
    get: (publication, publicationContent, publicationUser, publicationComments) => {
        return {
            ...publication,
            "content": extra.publication.convertPublicationContent(publicationContent),
            "post_creator": extra.publication.convertPublicationUser(publicationUser),
            "comments": publicationComments,
        }
    }
};

module.exports = {
    extra,
    publication
};

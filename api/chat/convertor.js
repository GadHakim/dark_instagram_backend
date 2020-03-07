const helper = require('../../app/helpers/helper');

const common = {
    getChats: (chats) => {
        let result = [];
        chats.forEach(chat => {
            result.push({
                "account_id": chat.account_id,
                "email": chat.email,
                "first_name": chat.first_name,
                "last_name": chat.last_name,
                "full_name": chat.first_name + " " + chat.last_name,
                "avatar_image_path": chat.avatar_image_path ? helper.aws.getImagePath(chat.avatar_image_path) : null,
                "chat_id": chat.chat_id,
                "chat_uuid": chat.chat_uuid
            });
        });
        return result;
    }
};

const chatAll = {
    get: (chatCreator, chats) => {
        return {
            "chat_creator": {
                "account_id": chatCreator.account_id,
                "email": chatCreator.email,
                "first_name": chatCreator.first_name,
                "last_name": chatCreator.last_name,
                "full_name": chatCreator.first_name + " " + chatCreator.last_name,
                "avatar_image_path": chatCreator.avatar_image_path ? helper.aws.getImagePath(chatCreator.avatar_image_path) : null
            },
            "chats": common.getChats(chats)
        }
    }
};

module.exports = {
    chatAll
};

const convertor = require('./convertor');
const sql = require('./sql');

const chatAll = {
    get: async (connection, user) => {
        let chatCreator = await sql.chatAll.get.findUserById(connection, user.id);
        let foundChats = await sql.chatAll.get.findChats(connection, user.id);

        let chats = [];

        for (let i = 0; i < foundChats.length; i++) {
            let chat = foundChats[i];
            let user = await sql.chatAll.get.findUserById(connection, chat.subscriber_id);
            chats.push({
                ...user,
                ...chat,
            });
        }

        let result = convertor.chatAll.get(chatCreator, chats);

        return {
            "success": true,
            "result": result
        }
    }
};

module.exports = {
    chatAll
};

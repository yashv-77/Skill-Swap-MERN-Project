const ExAsyncHandler = require("express-async-handler");
const Message = require("../models/MessageModel");
const Chat = require("../models/ChatModel");
const TheUser = require("../models/UserModel");

const sendMessageController = ExAsyncHandler(async (req, res) => {
    const { chatId, message } = req.body;
    if (!chatId || !message) {
        console.log("chatId or message not sent with request properly");
        return res.status(400);
    }
    const newMessage = {
        senderId: req.user._id,
        chatId,
        message: message,
    };
    try {
        // var createdMessage = await Message.create(newMessage);

        // createdMessage = await Message.populate("senderId", "name avatar")
        // createdMessage = await Message.populate("chatId")
        // createdMessage = await TheUser.populate("message",{
        //     path: "chat.users",
        //     select:"name avatar email"
        // });

        // await Chat.findByIdAndUpdate(req.body.chatId, {
        //     latestMessage: createdMessage,

        // })

        // res.status(200).send(createdMessage);
        let createdMessage = await Message.create(newMessage);

        createdMessage = await Message.findById(createdMessage._id)
            .populate("senderId", "name avatar")
            .populate("chatId");

        const updatedChat = await Chat.findByIdAndUpdate(
            req.body.chatId,
            { latestMessage: createdMessage },
            { new: true }
        ).populate({
            path: "users",
            select: "name avatar email"
        });

        res.status(200).send({ message: createdMessage, chat: updatedChat });

    } catch (error) {
        res.status(400);
        console.log("Error sending message ", error);
    }
});

const getAllMessagesController = ExAsyncHandler(async (req, res) => {
    const chatId = req.params.chatId;
    if (!chatId) {
        console.log("chatId not sent with request");
        return res.status(400);
    }
    try {
        const messages = await Message.find({ chatId })
            .populate("senderId", "name avatar")
            .populate("chatId");
        res.status(200).send(messages);
    } catch (error) {
        res.status(400);
        console.log("Error fetching messages ", error);
    }
});

module.exports = { sendMessageController, getAllMessagesController};
export const sendSocketMessage = (socket, userId, receiverId, text) => {
    socket?.emit("sendMessage", {
        senderId: userId,
        receiverId: receiverId,
        text: text
    })
}
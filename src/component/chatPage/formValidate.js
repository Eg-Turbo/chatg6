

function formValidate(values, chats) {
    const errors = {};


    if (!values.chatName) {
        errors.chatName = "This field is required";
    } else if (values.chatName.length < 3) {
        errors.chatName = "This chat name is too short, Try to make it more than 3 characters";

    } else if (values.chatName.length > 20) {
        errors.chatName = "This chat name is too long, Try to make it less than 20 characters";
    } else if (chats.some((chat) => chat.name === values.chatName)) {
        errors.chatName = "You have a chat with that name, try to pick another one";

    }

    if (!values.systemMessage) {
    } else if (values.systemMessage.length > 1000) {
        errors.systemMessage = "You reach the maximum number of characters, try to make it less than 1000 character";
    } else if (values.systemMessage.split(" ").length > 100) {
        errors.systemMessage = "You reach the maximum number of words, try to make it less than 100 words";
    }

    return errors;
}

export { formValidate }
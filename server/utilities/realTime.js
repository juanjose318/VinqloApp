

const emitEvent = (event,sentTo,data= {}) => {
    vinqloSocket.emit(event+sentTo, data);
};

module.exports = { 
    emitEvent
};

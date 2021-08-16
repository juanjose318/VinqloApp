let mongoose = require("mongoose");
let Notification = require('../models/notification');
const sendNotification = ({title,type,sentTo,user = null,data= {}}) => {
    //create notification object here

    vinqloSocket.emit('notification'+sentTo.email);

    new Notification({
        title,
        type,
        user,
        sentTo,
        data}).save().then(doc => {
            // TODO check here if user is online
        });
    
    
};

module.exports = { 
    sendNotification
};

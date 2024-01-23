const Notification = require("../models/Notification");

const viewMyNotifications = async (req, res) => {
    try {
      const loggedUser = req.user.id;
  
      let myNotifications = await Notification.find({ assignedTo: loggedUser , isSeen: false})
        .sort({ createdAt: -1 });

      myNotifications = myNotifications.map(notification => {
        notification.isSeen = true;
        return notification;
      });
  
      await Promise.all(myNotifications.map(notification => notification.save()));
  
      res.status(200).json(myNotifications);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
   

  const notificationsCounter = async (req, res) => {
    try {
      const loggedUser = req.user.id;

      let myNotifications = await Notification.find({ assignedTo: loggedUser, isSeen: false });
      let numOfNotifications = myNotifications.length;
  
      res.status(200).json(numOfNotifications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

module.exports = {
    notificationsCounter,
    viewMyNotifications
}

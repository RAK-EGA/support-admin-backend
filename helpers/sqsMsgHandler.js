const Notification = require('../models/Notification');

const handleSLAChecker = async (message) => {
    try {
      const exceedingSLA = JSON.parse(message.Body);
      const commonAttributes = {
        ticketID: exceedingSLA._id,
        citizenID: exceedingSLA.citizenID,
        status: exceedingSLA.status,
        sla_value: exceedingSLA.sla_value,
        sla_unit: exceedingSLA.sla_unit,
        slaExceedTime: exceedingSLA.slaExceedTime,
      };
      console.log(commonAttributes);
  
      if (exceedingSLA.serviceName) {
        const notification = new Notification({
          ...commonAttributes,
          serviceName: exceedingSLA.serviceName,
          assignedTo: exceedingSLA.assignedTo,
          type: 'permit',
          location: '', 
          category: undefined, 
        });

        await notification.save();
        console.log(notification);
      }
      else if (exceedingSLA.category) {
        const notification = new Notification({
          ...commonAttributes,
          category: exceedingSLA.category,
          assignedTo: exceedingSLA.assignedTo,
          type: 'complaint',
          location: exceedingSLA.location,
          serviceName: '',
        });
  
        await notification.save();
        console.log(notification);
      } else {
        console.log('Invalid message format, neither Permit nor Complaint.');
      }
    } catch (error) {
      console.error('Error processing SLA checker message:', error);
    }
  };

module.exports = { handleSLAChecker }
const Notification = require('../models/Notification');

const handleSLAChecker = async (message) => {
    try {
      const body = JSON.parse(message.Body);
      console.log(body);//////////////
  
      if (!body.detail || (!body.detail.complain && !body.detail.request)) {
        console.log('Invalid message format, missing complain or request details.');
        return;
      }
  
      let commonAttributes;
  
      if (body.detail.complain) {
        const complaintExceedingSLA = body.detail.complain;
  
        commonAttributes = {
          ticketID: complaintExceedingSLA._id,
          citizenID: complaintExceedingSLA.citizenID,
          status: complaintExceedingSLA.status,
          sla_value: complaintExceedingSLA.sla_value,
          sla_unit: complaintExceedingSLA.sla_unit,
          slaExceedTime: body.detail.slaExceededTime,
          location: complaintExceedingSLA.location,
          category: complaintExceedingSLA.category,
          assignedTo: complaintExceedingSLA.assignedTo,
          type: "complaint"
        };
  
      } else if (body.detail.request) {
        const requestExceedingSLA = body.detail.request;
  
        commonAttributes = {
          ticketID: requestExceedingSLA._id,
          citizenID: requestExceedingSLA.citizenID,
          status: requestExceedingSLA.status,
          sla_value: requestExceedingSLA.sla_value,
          sla_unit: requestExceedingSLA.sla_unit,
          slaExceedTime: body.detail.slaExceededTime,
          serviceName: requestExceedingSLA.serviceName,
          assignedTo: requestExceedingSLA.assignedTo,
          type: "permit"
        };
      } else {
        console.log('Invalid message format, neither complain nor request.');
        return;
      }
  
      const notification = new Notification(commonAttributes);
      await notification.save();
  
    } catch (error) {
      console.error('Error processing SLA checker message:', error);
    }
  };
  
  
module.exports = { handleSLAChecker }

module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
        eventName: DataTypes.STRING,
        hostName: DataTypes.STRING,
        address: DataTypes.STRING,
        city: DataTypes.STRING,
        eventDescription: DataTypes.STRING,
        indoorEvent: DataTypes.BOOLEAN,
        outdoorEvent: DataTypes.BOOLEAN,
        virtualEvent: DataTypes.BOOLEAN,
        numberofAttendees: DataTypes.STRING,
        dateTime: DataTypes.STRING,
        status: DataTypes.STRING,
    });
    return Event;
  };
  

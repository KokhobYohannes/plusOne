// Requiring our Event model
const db = require('../models');

// Routes
module.exports = (app) => {
  // GET route for getting all of the events
  app.get('/api/events', (req, res) => {
    // findAll returns all entries for a table when used with no options
    db.Event.findAll({}).then((dbEvent) => res.json(dbEvent));
  });

  // POST route for saving a new todo
  app.post('/api/events', (req, res) => {
    console.log(req.body);
    // Create takes an argument of an object describing the item we want to
    // Insert into our table. We pass in an object with a text and complete property.
    db.Event.create({
        eventName: req.body.eventName,
        hostName: req.body.hostName,
        address: req.body.address,
        city: req.body.city,
        eventDescription: req.body.eventDescription,
        indoorEvent: req.body.indoorEvent,
        outdoorEvent: req.body.outdoorEvent,
        virtualEvent: req.body.virtualEvent,
        numberofAttendees: req.body.numberofAttendees,
        dateTime: req.body.dateTime,
        status: req.body.status,
    }).then((dbEvent) => res.json(dbEvent));
  });

        // DELETE route for deleting events using the ID (req.params.id)
        app.delete('/api/events/delete/:id', (req, res) => {
            // We just have to specify which todo we want to destroy with "where"
            db.Event.destroy({
            where: {
                id: req.params.id,
            },
            }).then((dbEvent) => res.send("/eventsinvite"));
        });

        // DELETE route for deleting events using the ID (req.params.id)
        app.get('/api/events/delete/:id', (req, res) => {
            // We just have to specify which todo we want to destroy with "where"
            db.Event.destroy({
            where: {
                id: req.params.id,
            },
            }).then((dbEvent) => res.redirect("/eventsinvite"));
        });

         // DELETE route for deleting events using the ID (req.params.id)
         app.get('/api/events/update/:id/:statNum', (req, res) => {
            // We just have to specify which todo we want to destroy with "where"
            db.Event.update(
            {
                status: req.params.statNum
            },
            {
                where: {
                    id: req.params.id,
                },
            }
            ).then((dbEvent) => res.redirect("/eventsinvite"));
        });




        // PUT route for updating events. We can get the updated todo data from req.body
        app.put('/api/events', (req, res) => {
            db.Event.update(
            {
                text: req.body.text,
                complete: req.body.complete,
            },
            {
                where: {
                id: req.body.id,
                },
            }
            ).then((dbEvent) => res.json(dbEvent));
        });
};

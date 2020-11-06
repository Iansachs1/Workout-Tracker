const db = require("../models");

module.exports = function(app) {
    // Retrieve all from db
    app.get("/api/workouts", function(req, res) {
        db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(error => {
            console.log(error);
            res.json(error);
        });
    });

    // Creates new workout in database
    app.post("/api/workouts", async (req, res)=> {
        try{
            const response = await db.Workout.create({type: "workout"})
            res.json(response);
        }
        catch(error){
            console.log("An error occurred while creating a workout: ", error)
            res.json(error);
        }
    })
};
const db = require("../models");

module.exports = function (app) {
    // Retrieve all from db
    app.get("/api/workouts", function (req, res) {
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
    app.post("/api/workouts", async (req, res) => {
        try {
            const response = await db.Workout.create({ type: "workout" })
            res.json(response);
        }
        catch (error) {
            console.log("An error occurred while creating a workout: ", error)
            res.json(error);
        }
    })

    // Used by api.js to add an exercise to a workout
    app.put("/api/workouts/:id", ({ body, params }, res) => {
        const workoutId = params.id;
        let savedExercises = [];

        // gets all the currently saved exercises in the current workout
        db.Workout.find({ _id: workoutId })
            .then(dbWorkout => {
                savedExercises = dbWorkout[0].exercises;
                res.json(dbWorkout[0].exercises);
                var allExercises = [...savedExercises, body]


                db.Workout.findByIdAndUpdate(workoutId, { exercises: allExercises }, function (error, doc) {
                    if (error) {
                        console.log(error)
                    }

                })
            })
            .catch(error => {
                res.json(error);
            });

    })

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .then(workout => {
            res.json(workout);
        })
        .catch(error => {
            res.json(error);
        });
}); 
};
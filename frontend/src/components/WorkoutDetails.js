import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useState } from "react";

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    const [title, setTitle] = useState(workout.title);
    const [load, setLoad] = useState(workout.load);
    const [reps, setReps] = useState(workout.reps);
    const [isEdit, setIsEdit] = useState(false);

    // each elements came from line 11 - 13
    const workoutEdit = { title, load, reps }

    const handleClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json })
        }
        console.log('json delete', json);

    }

    const handleEditClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'PATCH',
            body: JSON.stringify(workoutEdit),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'EDIT_WORKOUT', payload: json })
        }
        console.log('json edit', json);
    }

    const handleEditClickIcon = () => {
        setIsEdit(!isEdit);
    }

    return (
        <div className="workout-details">
            <div className="layout">
                <h4 className="title">{workout.title}</h4>
                <h4 className="material-symbols-outlined" style={{ 'cursor': 'pointer' }} onClick={handleEditClickIcon}>edit</h4>
            </div>
            {isEdit &&
                <form className="edit" onSubmit={handleEditClick}>
                    <label>Exercise Title:</label>
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <label>Load (in kg):</label>
                    <input
                        type="number"
                        onChange={(e) => setLoad(e.target.value)}
                        value={load}
                    />
                    <label>Reps:</label>
                    <input
                        type="number"
                        onChange={(e) => setReps(e.target.value)}
                        value={reps}
                    />
                    <button>Edit Workout</button>
                </form>
            }
            {!isEdit &&
                <>
                    <p><strong>Load (kg): </strong>{workout.load}</p>
                    <p><strong>Reps: </strong>{workout.reps}</p>
                    <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
                    <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
                </>
            }
        </div>
    )
}

export default WorkoutDetails;
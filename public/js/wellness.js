const addGoal = async (event) => {
    event.preventDefault();

    console.log("Adding Goal...");

    const newGoal = document.querySelector('#goal-text').value.trim();
    console.log(newGoal);

    if (newGoal) {
        console.log("form filled out, starting fetch");
        const response = await fetch("/api/goal", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                goal: newGoal,
            })
        });

        if (response.ok) {
            document.location.replace("/wellness");
        } else {
            console.log(response.statusText);
            alert(response.statusText);
        }
    }
};

const deleteGoal = async (event) => {
    event.preventDefault();

    console.log("Removing Goal...");

    const deleteGoalId = event.target.getAttribute("data-deleteGoal-id");
    console.log(deleteGoalId);

   if (deleteGoalId) {
    console.log("starting fetch /api/goal/:id")
    const response = await fetch(`/api/goal/${deleteGoalId}`, {
        method: "DELETE",
        header: {
            "Content-Type": "application/json"
        },
    });

    if (response.ok) {
        document.location.replace("/wellness")
    } else {
        console.log(response.statusText)
    }
   }
}

document.querySelector('#goal-btn').addEventListener('click', addGoal)
const deleteGoalBtns = document.querySelectorAll(".deleteGoal");
deleteGoalBtns.forEach((btn) => {
    console.log(`click`);
    btn.addEventListener('click', deleteGoal);
})
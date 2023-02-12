async function deleteEntry(event) {
  event.preventDefault();
  const deleteEntryId = event.target.getAttribute("data-delete-entry-id");
  console.log(deleteEntryId);

  if (deleteEntryId) {
    const response = await fetch(`/api/entry/${deleteEntryId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace("/entries");
    } else {
      console.log(response.statusText);
      alert("You did not write this entry!");
    }
  }
}

const deleteEntryBtns = document.querySelectorAll(".delete-entry");
deleteEntryBtns.forEach((btn) => {
  btn.addEventListener("click", deleteEntry);
});

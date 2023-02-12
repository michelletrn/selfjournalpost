const addEntry = async (event) => {
  event.preventDefault();

  console.log("adding entry");

  const newEntryName = document.querySelector(".new-entry-title").value.trim();
  const newEntryText = document.querySelector(".new-entry-text").value.trim();

  console.log(newEntryName, newEntryText);

  if (newEntryName && newEntryText) {
    console.log("form filled out, starting fetch");
    const response = await fetch("/api/entry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newEntryName,
        text: newEntryText,
      }),
    });

    console.log("RES:", response);

    if (response.ok) {
      document.location.replace("/entries");
    } else {
      console.log(response.statusText);
      alert(response.statusText);
    }
  }
};

document.querySelector("#entry-btn").addEventListener("click", addEntry);


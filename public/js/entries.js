const addEntry = async (event) => {
  event.preventDefault();

  console.log("adding entry");

  const newEntryName = document.querySelector(".new-entry-title").value.trim();
  const newEntryText = document.querySelector(".new-entry-text").value.trim();
  const fileInput = document.querySelector('input[type="file"]');
  const file = fileInput.files[0];

  console.log(file);

  if (newEntryName && newEntryText && file) {
    console.log("form filled out, starting fetch");

    const formData = new FormData();
    formData.append("name", newEntryName);
    formData.append("text", newEntryText);
    formData.append("file", file)

    const response = await fetch("/api/entry", {
      method: "POST",
      body: formData,
    });

    console.log("RES:", response);

    if (response.ok) {
      document.location.reload();
    } else {
      console.log(response.statusText);
      alert(response.statusText);
    }
  }
};

document.querySelector("#entry-btn").addEventListener("click", addEntry);

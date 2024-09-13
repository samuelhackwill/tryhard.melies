import "./game_patronymes.html";

let chunkIndex = 0;
let loading = false; // Prevent multiple concurrent loads

Template.game_patronymes.onRendered(function () {
  const columns = [
    document.getElementById("column1"),
    document.getElementById("column2"),
    document.getElementById("column3"),
    document.getElementById("column4"),
  ];

  // Function to load a chunk of data
  async function loadChunk() {
    if (loading) return;
    loading = true;

    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      const chunkData = await fetch(
        `/api/chunked-file?chunk=${chunkIndex}`
      ).then((res) => res.text());
      const newElement = document.createElement("p");
      newElement.textContent = chunkData.trim(); // Trim any whitespace
      column.appendChild(newElement);
    }

    chunkIndex++;
    loading = false;
  }

  // Load the first chunk of data into all columns
  loadChunk();

  // Set up lazy loading with Intersection Observer API
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadChunk(); // Load more data when the observer is visible (scrolled down)
    }
  });

  // Observe the invisible div at the bottom
  observer.observe(document.getElementById("observer"));
});

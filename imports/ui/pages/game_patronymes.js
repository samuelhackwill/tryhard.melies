import "./game_patronymes.html";

let chunkIndex = 0;
let loading = false; // Prevent multiple concurrent loads

Template.game_patronymes.onRendered(function () {
  const columns = [
    document.getElementById("column1"),
    // document.getElementById("column2"),
    // document.getElementById("column3"),
    // document.getElementById("column4"),
  ];

  // Function to load a chunk of data
  async function loadChunk(columnId) {
    if (loading) return;
    loading = true;

    if (!columnId) {
      // initialize
      for (let i = 0; i < columns.length; i++) {
        const column = columns[i];
        await addLineTo(column);
      }
    } else {
      const column = columns[columnId - 1];
      await addLineTo(column);
    }

    chunkIndex++;
    loading = false;
  }

  // Load the first chunk of data into all columns
  loadChunk();

  // Set up lazy loading with Intersection Observer API
  const observer = new IntersectionObserver((entries) => {
    var columnId = entries[0].target.previousElementSibling.id;
    var columnIdNumber = columnId.match(/\d+$/)[0];

    if (entries[0].isIntersecting) {
      loadChunk(columnIdNumber); // Load more data when the observer is visible (scrolled down)
    }
  });

  // Observe the invisible div at the bottom
  for (
    let index = 0;
    index < document.getElementsByClassName("observer").length;
    index++
  ) {
    observer.observe(document.getElementsByClassName("observer")[index]);
  }
});

addLineTo = async function (column) {
  try {
    const chunkData = await fetch(`/api/chunked-file?chunk=${chunkIndex}`).then(
      (res) => res.text()
    );
    const arrayData = JSON.parse(chunkData);

    for (let index = 0; index < arrayData.length; index++) {
      const newElement = document.createElement("div");

      const nestedElement = document.createElement("div");

      let mappedValue = mapRange(arrayData[index][1], 1, 1000, 6, 64);
      // newElement.classList.add("text-[" + mappedValue + "px]");
      // newElement.style.fontSize = mappedValue + "px;";
      newElement.style.fontSize = mappedValue + "px"; // Set font-size to 12px

      newElement.classList.add("bg-blue-50");
      newElement.textContent = arrayData[index][0];
      column.appendChild(newElement);
    }
  } catch (error) {
    console.error("failed to fetch that bitch", error);
    return [];
  }
};

function mapRange(x, inMin, inMax, outMin, outMax) {
  return outMin + ((x - inMin) * (outMax - outMin)) / (inMax - inMin);
}

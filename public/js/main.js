const likeBtns = document.querySelectorAll(".like");
const deleteBtns = document.querySelectorAll(".trash");

// Array.from(likeBtns).forEach((likeBtn) => {
//   likeBtn.addEventListener("click", likeRapper);
// });

Array.from(deleteBtns).forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", deleteRapper);
});

// function likeRapper() {

// }

async function deleteRapper(e) {
  sName = e.target.parentNode.children[0].textContent;
  bName = e.target.parentNode.children[1].textContent;
  console.log(sName, bName);
  try {
    const response = await fetch("deleteRapper", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stageName: sName,
        birthName: bName,
      }),
    });
    const data = response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.error(err);
  }
}

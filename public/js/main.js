const likeBtns = document.querySelectorAll(".like");
const deleteBtns = document.querySelectorAll(".trash");

Array.from(likeBtns).forEach((likeBtn) => {
  likeBtn.addEventListener("click", likeRapper);
});

Array.from(deleteBtns).forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", deleteRapper);
});

async function likeRapper(e) {
  const stageName = e.target.parentNode.children[0].textContent;
  const birthName = e.target.parentNode.children[1].textContent;
  const likes = Number(e.target.parentNode.children[2].textContent);

  try {
    const response = await fetch("likeRapper", {
      method: "put",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        stageName,
        birthName,
        likes,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.error(err);
  }
}

async function deleteRapper(e) {
  const stageName = e.target.parentNode.children[0].textContent;
  const birthName = e.target.parentNode.children[1].textContent;
  const likes = Number(e.target.parentNode.children[2].textContent);
  //   console.log(sName, bName);
  try {
    const response = await fetch("deleteRapper", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stageName,
        birthName,
        likes,
      }),
    });
    const data = response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.error(err);
  }
}

// Sample data
const posts = [];
let lastActivityTime = null;

// Function to simulate creating a post
function createPost(post) {
  return new Promise((resolve, reject) => {
    // Call updateLastUserActivityTime before creating the post
    updateLastUserActivityTime()
      .then((updatedLastActivityTime) => {
        console.log("Last activity time before creating post:", updatedLastActivityTime);

        setTimeout(() => {
          posts.push(post);
          resolve(post);
        }, 1000);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Function to simulate updating the user's last activity time
function updateLastUserActivityTime() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      lastActivityTime = new Date();
      resolve(lastActivityTime);
    }, 1000);
  });
}

// Function to simulate deleting a post
function deletePost(index) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (index >= 0 && index < posts.length) {
        posts.splice(index, 1);
        resolve(true);
      } else {
        reject(new Error('Invalid index for deleting post'));
      }
    }, 1000);
  });
}

// Simulate the user creating a post and updating last activity time
Promise.all([createPost("First post")])
  .then(([createdPost]) => {
    console.log("Posts after creating:", posts);

    // Call updateLastUserActivityTime after creating the post
    return updateLastUserActivityTime();
  })
  .then((updatedLastActivityTime) => {
    console.log("Last activity time after creating post:", updatedLastActivityTime);

    // Simulate deleting the last post
    return deletePost(posts.length - 1);
  })
  .then((deleteResult) => {
    if (deleteResult) {
      console.log("Post deleted successfully.");
      console.log("Remaining posts:", posts);
    } else {
      console.log("Failed to delete the post.");
    }
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
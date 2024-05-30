"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

window.addEventListener("load", initApp); // When the page is loaded, run initApp function

// Function to initialize the Web App
async function initApp() {
  console.log("initApp: app.js is running 🎉"); // Log to the console that the app is running
  const posts = await getPosts();
  posts.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  console.log(posts);
  displayPostsGrid(posts);
}

async function getPosts() {
  const response = await fetch (
    "http://programming.exam.denikalenski.dk/wp-json/wp/v2/projects?acf_format=standard"
  );
  const data = await response.json();
  return data;
}

function displayPostsGrid (posts) {
  const postsGrid = document.querySelector("#posts-grid");
  
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const isEven = i % 2 === 1; // Check if index is odd for alternating layout
  
    // Add a CSS class based on whether the index is even or odd
    const layoutClass = isEven ? "grid-item-right" : "grid-item-left";
  
    postsGrid.insertAdjacentHTML(
      "beforeend",
      /*html*/ `
      <article class="grid-item ${layoutClass}">
        <img src="${post.acf.image}" alt="${post.title.rendered}" />
        <div class="grid-item-text">
          <h2>${post.title.rendered}</h2>
          <p><strong>${post.acf.type}</strong></p>
          <p>${post.acf.description}</p>
          <p><strong>Client:</strong> ${post.acf.client}</p>
          <p><a href="${post.acf.link}" target="_blank">Live Preview >>></a></p>
        
        </div>
      </article>
      `
    );
  }
  
  // Get the button
let scrollToTopBtn = document.getElementById("scrollToTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
scrollToTopBtn.onclick = function() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

  
}
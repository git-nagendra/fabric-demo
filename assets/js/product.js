let galleries = document.querySelectorAll(".product-gallery");
let popup = document.getElementById("popup");
let popupImage = document.getElementById("popupImage");
let popupBg = document.getElementById("popupBg");
let magnifier = document.getElementById("magnifier");

// 🔥 Select header background overlay
let headerBg = document.querySelector(".product_overlay.dynamic-bg");

let currentGallery = null;
let currentIndex = 0;
let zoomLevel = 1;

galleries.forEach((gallery, gIndex) => {
  let images = JSON.parse(gallery.dataset.images);
  let mainImage = gallery.querySelector(".main-image");
  let thumbs = gallery.querySelector(".thumbnails");
  let leftBtn = gallery.querySelector(".nav-btn-left");
  let rightBtn = gallery.querySelector(".nav-btn-right");
  let zoomBtn = gallery.querySelector(".zoom-btn");

  function updateGallery() {
    mainImage.src = images[currentIndex];
    thumbs
      .querySelectorAll(".thumbnail")
      .forEach((t, i) => t.classList.toggle("active", i === currentIndex));

    // 🔥 Update Premium Header background dynamically
    if (headerBg) {
      headerBg.style.backgroundImage = `url(${images[currentIndex]})`;
    }
  }

  images.forEach((src, i) => {
    let t = document.createElement("div");
    t.className = "thumbnail";
    t.innerHTML = `<img src="${src}">`;
    t.onclick = () => {
      currentIndex = i;
      updateGallery();
    };
    thumbs.appendChild(t);
  });

  updateGallery();

  // Nav
  leftBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateGallery();
  };
  rightBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateGallery();
  };

  // Open popup
  function openPopup() {
    currentGallery = images;
    popupImage.src = images[currentIndex];
    popupBg.style.backgroundImage = `url(${images[currentIndex]})`;
    zoomLevel = 1;
    popupImage.style.transform = "scale(1)";
    popup.classList.add("active");
  }

  mainImage.onclick = openPopup;
  zoomBtn.onclick = openPopup;
});

// Popup close
document.querySelector(".close-btn").onclick = () =>
  popup.classList.remove("active");

// Zoom controls
document.getElementById("zoomInBtn").onclick = () => {
  zoomLevel += 0.2;
  popupImage.style.transform = `scale(${zoomLevel})`;
};
document.getElementById("zoomOutBtn").onclick = () => {
  zoomLevel = Math.max(1, zoomLevel - 0.2);
  popupImage.style.transform = `scale(${zoomLevel})`;
};

// Magnifier - always in center
popupImage.addEventListener("mousemove", (e) => {
  const rect = popupImage.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Place magnifier in center of popup image
  magnifier.style.left = `${
    popupImage.offsetWidth / 2 - magnifier.offsetWidth / 2
  }px`;
  magnifier.style.top = `${
    popupImage.offsetHeight / 2 - magnifier.offsetHeight / 2
  }px`;

  // Background for zoom effect
  magnifier.style.backgroundImage = `url(${popupImage.src})`;
  magnifier.style.backgroundSize = `${popupImage.width * 2}px ${
    popupImage.height * 2
  }px`;
  magnifier.style.backgroundPosition = `-${
    x * 2 - magnifier.offsetWidth / 2
  }px -${y * 2 - magnifier.offsetHeight / 2}px`;

  magnifier.style.display = "block";
});

// Hide when leaving
popupImage.addEventListener(
  "mouseleave",
  () => (magnifier.style.display = "none")
);



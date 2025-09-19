let galleries = document.querySelectorAll(".product-gallery");
let popup = document.getElementById("popup");
let popupImage = document.getElementById("popupImage");
let popupBg = document.getElementById("popupBg");
let magnifierPopup = document.getElementById("magnifier"); // magnifier inside popup

let currentGallery = null;
let currentIndex = 0;
let zoomLevel = 1;

// Magnifier zoom factor (default 3x)
let magnifierZoom = 3;

galleries.forEach((gallery) => {
  let images = JSON.parse(gallery.dataset.images);
  let mainImage = gallery.querySelector(".main-image");
  let thumbs = gallery.querySelector(".thumbnails");
  let leftBtn = gallery.querySelector(".nav-btn-left");
  let rightBtn = gallery.querySelector(".nav-btn-right");
  let zoomBtn = gallery.querySelector(".zoom-btn");

  // ✅ Create magnifier for MAIN image
  let magnifierMain = document.createElement("div");
  magnifierMain.className = "magnifier";
  gallery.querySelector(".main-image-container").appendChild(magnifierMain);

  function updateGallery() {
    mainImage.src = images[currentIndex];
    thumbs
      .querySelectorAll(".thumbnail")
      .forEach((t, i) => t.classList.toggle("active", i === currentIndex));

    // 🔥 Removed headerBg dynamic background update
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

  // ✅ Magnifier for MAIN image (follows pointer)
  mainImage.addEventListener("mouseenter", () => {
    magnifierMain.style.display = "block";
  });

  mainImage.addEventListener("mouseleave", () => {
    magnifierMain.style.display = "none";
  });

  mainImage.addEventListener("mousemove", (e) => {
    if (magnifierMain.style.display !== "block") return;

    const rect = mainImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    magnifierMain.style.left = `${x - magnifierMain.offsetWidth / 2}px`;
    magnifierMain.style.top = `${y - magnifierMain.offsetHeight / 2}px`;

    magnifierMain.style.backgroundImage = `url(${mainImage.src})`;
    magnifierMain.style.backgroundSize = `${mainImage.width * magnifierZoom}px ${mainImage.height * magnifierZoom}px`;
    magnifierMain.style.backgroundPosition = `-${x * magnifierZoom - magnifierMain.offsetWidth / 2}px -${y * magnifierZoom - magnifierMain.offsetHeight / 2}px`;
  });
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

// ✅ Magnifier for POPUP image (fixed in center)
popupImage.addEventListener("mouseenter", () => {
  magnifierPopup.style.display = "block";

  // Keep magnifier fixed in the center of popup image
  magnifierPopup.style.left = `${popupImage.offsetWidth / 2 - magnifierPopup.offsetWidth / 2}px`;
  magnifierPopup.style.top = `${popupImage.offsetHeight / 2 - magnifierPopup.offsetHeight / 2}px`;
});

popupImage.addEventListener("mouseleave", () => {
  magnifierPopup.style.display = "none";
});

popupImage.addEventListener("mousemove", (e) => {
  if (magnifierPopup.style.display !== "block") return;

  const rect = popupImage.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Update zoom area, magnifier itself stays fixed
  magnifierPopup.style.backgroundImage = `url(${popupImage.src})`;
  magnifierPopup.style.backgroundSize = `${popupImage.width * magnifierZoom}px ${popupImage.height * magnifierZoom}px`;
  magnifierPopup.style.backgroundPosition = `-${x * magnifierZoom - magnifierPopup.offsetWidth / 2}px -${y * magnifierZoom - magnifierPopup.offsetHeight / 2}px`;
});

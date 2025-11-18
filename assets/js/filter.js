//<!-- ---------------- JAVASCRIPT FILTER ---------------- -->

  const checkboxes = document.querySelectorAll(".form-check-input");
  const products = document.querySelectorAll(".product-item");

  checkboxes.forEach(cb => {
    cb.addEventListener("change", filterProducts);
  });

  function filterProducts() {
    let selected = {
      product: [],
      material: [],
      industry: []
    };

    checkboxes.forEach(cb => {
      if (cb.checked) {
        if (["thread","elastic","ropes","tape","madeups"].includes(cb.id))
          selected.product.push(cb.id);

        if (["cotton","polyester","polypropylene","polyethylene","nylon","latex"].includes(cb.id))
          selected.material.push(cb.id);

        if (["apparel","footwear","medical","marine","safety","adventure"].includes(cb.id))
          selected.industry.push(cb.id);
      }
    });

    products.forEach(item => {
      let p = item.dataset.product?.split(",").map(s => s.trim()) || [];
      let m = item.dataset.material?.split(",").map(s => s.trim()) || [];
      let i = item.dataset.industry?.split(",").map(s => s.trim()) || [];

      let matchProduct = selected.product.length === 0 || selected.product.some(v => p.includes(v));
      let matchMaterial = selected.material.length === 0 || selected.material.some(v => m.includes(v));
      let matchIndustry = selected.industry.length === 0 || selected.industry.some(v => i.includes(v));

      item.style.display = (matchProduct && matchMaterial && matchIndustry) ? "block" : "none";
    });
  }
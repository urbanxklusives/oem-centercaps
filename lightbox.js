/* oemcentercaps.com — lightweight click-to-zoom lightbox. No libraries.
   Any <img class="zoomable"> (or inside figure.posthero / figure.brandfig /
   .photostrip) opens enlarged; tap anywhere or the × to close. */
(function () {
  var box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-label", "Enlarged image");
  box.innerHTML = '<button class="lb-close" aria-label="Close enlarged image">&times;</button>' +
    '<img alt="">' +
    '<div class="lb-cap"></div>';
  document.body.appendChild(box);
  var img = box.querySelector("img");
  var cap = box.querySelector(".lb-cap");
  function open(src, alt, caption) {
    img.src = src;
    img.alt = alt || "";
    cap.textContent = caption || alt || "";
    box.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function close() {
    box.classList.remove("open");
    img.removeAttribute("src");
    document.body.style.overflow = "";
  }
  box.addEventListener("click", close);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
  document.addEventListener("click", function (e) {
    var t = e.target;
    if (t.tagName !== "IMG") return;
    var zoomable = t.classList.contains("zoomable") ||
      t.closest("figure.posthero, figure.brandfig, .photostrip");
    if (!zoomable) return;
    var fig = t.closest("figure");
    var fc = fig ? fig.querySelector("figcaption") : null;
    open(t.currentSrc || t.src, t.alt, fc ? fc.textContent.trim() : "");
  });
})();

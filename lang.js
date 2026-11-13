// Escolhe o idioma: ?lang=xx, depois a última escolha, depois o idioma do aparelho.
(function () {
  var supported = ["pt", "en", "es"];
  function pick() {
    var q = new URLSearchParams(location.search).get("lang");
    if (supported.indexOf(q) >= 0) return q;
    try { var s = localStorage.getItem("nooli.lang"); if (supported.indexOf(s) >= 0) return s; } catch (e) {}
    var n = (navigator.language || "pt").slice(0, 2).toLowerCase();
    return supported.indexOf(n) >= 0 ? n : "en";
  }
  function apply(l) {
    var h = document.documentElement;
    h.className = h.className.replace(/\blang-\w+\b/g, "").trim() + " lang-" + l;
    h.lang = l === "pt" ? "pt-BR" : l;
    document.querySelectorAll(".langs button").forEach(function (b) {
      b.classList.toggle("on", b.getAttribute("data-set") === l);
    });
  }
  apply(pick());
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".langs button");
    if (!b) return;
    var l = b.getAttribute("data-set");
    try { localStorage.setItem("nooli.lang", l); } catch (err) {}
    apply(l);
  });
})();

document.addEventListener("turbolinks:click", function() {
  NProgress.start();
})
document.addEventListener("turbolinks:render", function() {
  NProgress.done();
  NProgress.remove();
})
document.addEventListener("turbolinks:load", function() {
  Prism.highlightAll();
})

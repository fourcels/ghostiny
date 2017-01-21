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


window.addEventListener('scroll', _.debounce(function(e) {
  var headerPost = document.getElementById('header-post')
  if (headerPost) {
    var scrollY = window.scrollY;
    if (scrollY > 100) {
      headerPost.classList.add('header-fixed')
    } else {
      headerPost.classList.remove('header-fixed')
    }
  }
}, 200));

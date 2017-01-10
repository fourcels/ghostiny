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


function throttle(fn, delay, mustRunDelay) {
  var delay = delay || 200;
  var mustRunDelay = mustRunDelay || 1000;
  var timer = null;
  var tStart;
  return function() {
    var _this = this,
        args = arguments,
        tCurr = +new Date();
    clearTimeout(timer);
    if (!tStart) {
      tStart = tCurr;
    }
    if (tCurr - tStart >= mustRunDelay) {
      fn.apply(_this, args);
      tStart = tCurr;
    } else {
      timer = setTimeout(function() {
        fn.apply(_this, args);
      }, delay);
    }
  }
}

window.addEventListener('scroll', throttle(function(e) {
  var headerPost = document.getElementById('header-post')
  if (headerPost) {
    var scrollY = window.scrollY;
    if (scrollY > 100) {
      headerPost.classList.add('header-fixed')
    } else {
      headerPost.classList.remove('header-fixed')
    }
  }
}));

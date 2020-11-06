'use strict';

/* SCROLL TO ANCHORS */

(function () {

  var smoothScroll = function (targetEl, duration) {
    var target = document.querySelector(targetEl);
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var startTime = null;

    var ease = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) {
        return c / 2 * t * t + b;
      }
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    var animation = function (currentTime) {
      if (startTime === null) {
        startTime = currentTime;
      }
      var timeElapsed = currentTime - startTime;
      var run = ease(timeElapsed, startPosition, targetPosition, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
    requestAnimationFrame(animation);

  };

  var scrollTo = function () {
    var links = document.querySelectorAll('.js-scroll');
    links.forEach(function (each) {
      each.addEventListener('click', function () {
        var currentTarget = each.getAttribute('href');
        smoothScroll(currentTarget, 1500);
      });
    });
  };
  scrollTo();
}());

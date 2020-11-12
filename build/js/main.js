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


/* MASK PHONE */

(function () {

  var inputPhone = document.querySelector('#phone');
  var inputTel = document.querySelector('#tel');

  function setMaskInputTel(input) {
    input.onclick = function () {
      input.value = '+7(';
    };
    var old = 0;
    input.onkeydown = function () {
      var curLen = input.value.length;
      if (curLen < old) {
        old--;
        return;
      }
      if (curLen === 6) {
        input.value = input.value + ') ';
      }
      if (curLen === 11 || curLen === 14) {
        input.value = input.value + ' ';
      }
      if (curLen > 16) {
        input.value = input.value.substring(0, input.value.length - 1);
      }
      old++;
    };
  }
  setMaskInputTel(inputPhone);
  setMaskInputTel(inputTel);
}());


/*  CROP TEXT */

(function () {

  var cropElement = document.querySelectorAll('.crop-text');
  var size = 233;
  var endCharacter = '..';

  cropElement.forEach(function (el) {
    var text = el.innerHTML;
    var cropText = text.substr(0, size);
    var onResizeText = function () {

      if (window.innerWidth > 1023) {
        document.querySelector('.crop-text').innerHTML = text;
      } else {
        document.querySelector('.crop-text').innerHTML = cropText + endCharacter;
      }
    };

    if ((el.innerHTML.length > size) && (window.innerWidth < 1024)) {
      el.innerHTML = cropText + endCharacter;
    }
    window.addEventListener('resize', onResizeText);
  });
}());


/* POP-UP */

(function () {

  var openBtn = document.querySelector('.header__btn');
  var closeBtn = document.querySelector('.modal__button-close');
  var popup = document.querySelector('.modal');
  var form = popup.querySelector('.modal__form');
  var nameInput = document.querySelector('#yourname');
  var telInput = document.querySelector('#tel');
  var messageInput = document.querySelector('#text');

  var isStorageSupport = true;
  var storageName = '';
  var storageTel = '';
  var storageMessage = '';

  try {
    storageName = localStorage.getItem('nameInput');
    storageTel = localStorage.getItem('telInput');
    storageMessage = localStorage.getItem('messageInput');
  } catch (err) {
    isStorageSupport = false;
  }

  openBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    popup.classList.add('modal--show');

    if (isStorageSupport) {
      if (storageName) {
        nameInput.value = storageName;
        nameInput.focus();
      }
      if (storageTel) {
        telInput.value = storageTel;
      }
      if (storageMessage) {
        messageInput.innerText = storageMessage;
      }
    }
  });

  closeBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    popup.classList.remove('modal--show');
  });

  popup.addEventListener('click', function (evt) {
    if (evt.target.closest('.modal__content') === null) {
      popup.classList.remove('modal--show');
    }
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.code === 'Escape') {
      popup.classList.remove('modal--show');
    }
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (isStorageSupport) {
      localStorage.setItem('nameInput', nameInput.value);
      localStorage.setItem('telInput', telInput.value);
      localStorage.setItem('messageInput', messageInput.value);
    }
    popup.classList.remove('modal--show');
  });
}());


/* ACCORDION */

(function () {

  var accordionTitles = document.querySelectorAll('.accordion__title');

  accordionTitles.forEach(function (accordionTitle) {
    accordionTitle.addEventListener('click', function () {

      var currentlyActiveTitle = document.querySelector('.accordion__title.active');

      if (currentlyActiveTitle && currentlyActiveTitle !== accordionTitle) {
        currentlyActiveTitle.classList.toggle('active');
      }
      accordionTitle.classList.toggle('active');
    });
  });
}());

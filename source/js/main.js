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
    var links = Array.prototype.slice.call(document.querySelectorAll('.js-scroll'));
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

  var phoneInputList = document.querySelectorAll('input[type="tel"]');
  var phoneInput;

  for (var i = 0; i < phoneInputList.length; i++) {
    phoneInput = phoneInputList[i];
    phoneInput.addEventListener('click', addPhone);
    phoneInput.addEventListener('keydown', checkPhone);
  }

  function addPhone(evt) {
    var inp = evt.target;
    if (!inp.value.length) {
      inp.value = '+7(';
    }
  }

  function checkPhone(evt) {
    var inp = evt.target;
    var curLen = inp.value.length;
    if (!/\d/.test(evt.key)) {
      if (evt.keyCode === 8 || evt.keyCode === 9) {
        return;
      } else {
        evt.preventDefault();
      }
    }
    if (curLen === 0) {
      inp.value = inp.value + '+7(';
    }
    if (curLen === 2) {
      inp.value = inp.value + '(';
    }
    if (curLen === 6) {
      inp.value = inp.value + ') ';
    }
    if (curLen === 10 || curLen === 13) {
      inp.value = inp.value + '-';
    }
    if (curLen > 16) {
      inp.value = inp.value.substring(0, inp.value.length - 1);
    }
  }
}());


/*  CROP TEXT */

(function () {

  var cropElement = Array.prototype.slice.call(document.querySelectorAll('.crop-text'));
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
    document.body.style.overflow = 'hidden';
    nameInput.focus();

    if (isStorageSupport) {
      if (storageName) {
        nameInput.value = storageName;
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
    document.body.style.overflow = 'visible';
  });

  popup.addEventListener('click', function (evt) {
    if (evt.target.closest('.modal__content') === null) {
      popup.classList.remove('modal--show');
      document.body.style.overflow = 'visible';
    }
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.code === 'Escape') {
      popup.classList.remove('modal--show');
      document.body.style.overflow = 'visible';
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
    document.body.style.overflow = 'visible';
  });
}());


/* ACCORDION */

(function () {

  var accTitles = document.querySelectorAll('.accordion__title');

  for (var i = 0; i < accTitles.length; i++) {
    var acc = accTitles[i];
    acc.addEventListener('click', function (evt) {
      if (evt.target.checked) {
        for (var j = 0; j < accTitles.length; j++) {
          accTitles[j].checked = accTitles[j] === evt.target ? true : false;
        }
      }
    });
  }
}());

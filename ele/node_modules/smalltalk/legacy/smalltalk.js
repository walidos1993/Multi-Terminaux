'use strict';

require('../css/smalltalk.css');

var currify = require('currify/legacy');

var store = require('fullstore/legacy');

var createElement = require('@cloudcmd/create-element');

var keyDown = currify(keyDown_);
var remove = bind(removeEl, '.smalltalk');
var BUTTON_OK = {
  ok: 'OK'
};
var BUTTON_OK_CANCEL = {
  ok: 'OK',
  cancel: 'Cancel'
};

exports.alert = function (title, msg, options) {
  var buttons = getButtons(options) || BUTTON_OK;
  return showDialog(title, msg, '', buttons, options);
};

exports.prompt = function (title, msg) {
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var options = arguments.length > 3 ? arguments[3] : undefined;
  var type = getType(options);
  var val = String(value).replace(/"/g, '&quot;');
  var valueStr = "<input type=\"".concat(type, "\" value=\"").concat(val, "\" data-name=\"js-input\">");
  var buttons = getButtons(options) || BUTTON_OK_CANCEL;
  return showDialog(title, msg, valueStr, buttons, options);
};

exports.confirm = function (title, msg, options) {
  var buttons = getButtons(options) || BUTTON_OK_CANCEL;
  return showDialog(title, msg, '', buttons, options);
};

function getButtons() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var buttons = options.buttons;
  if (!buttons) return null;
  return buttons;
}

function getType() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var type = options.type;
  if (type === 'password') return 'password';
  return 'text';
}

function getTemplate(title, msg, value, buttons) {
  var encodedMsg = msg.replace(/\n/g, '<br>');
  return "<div class=\"page\">\n        <div data-name=\"js-close\" class=\"close-button\"></div>\n        <header>".concat(title, "</header>\n        <div class=\"content-area\">").concat(encodedMsg).concat(value, "</div>\n        <div class=\"action-area\">\n            <div class=\"button-strip\">\n                ").concat(parseButtons(buttons), "\n            </div>\n        </div>\n    </div>");
}

function parseButtons(buttons) {
  var names = Object.keys(buttons);
  var parse = currify(function (buttons, name, i) {
    return "<button\n            tabindex=".concat(i, "\n            data-name=\"js-").concat(name.toLowerCase(), "\">\n            ").concat(buttons[name], "\n        </button>");
  });
  return names.map(parse(buttons)).join('');
}

function showDialog(title, msg, value, buttons, options) {
  var ok = store();
  var cancel = store();
  var closeButtons = ['cancel', 'close', 'ok'];
  var promise = new Promise(function (resolve, reject) {
    var noCancel = options && options.cancel === false;

    var empty = function empty() {};

    ok(resolve);
    cancel(noCancel ? empty : reject);
  });
  var innerHTML = getTemplate(title, msg, value, buttons);
  var dialog = createElement('div', {
    innerHTML: innerHTML,
    className: 'smalltalk'
  });
  find(dialog, ['ok', 'input']).forEach(function (el) {
    return el.focus();
  });
  find(dialog, ['input']).forEach(function (el) {
    el.setSelectionRange(0, value.length);
  });
  addListenerAll('click', dialog, closeButtons, function (event) {
    closeDialog(event.target, dialog, ok(), cancel());
  });
  ['click', 'contextmenu'].forEach(function (event) {
    return dialog.addEventListener(event, function (e) {
      e.stopPropagation();
      find(dialog, ['ok', 'input']).forEach(function (el) {
        return el.focus();
      });
    });
  });
  dialog.addEventListener('keydown', keyDown(dialog, ok(), cancel()));
  return promise;
}

function keyDown_(dialog, ok, cancel, event) {
  var KEY = {
    ENTER: 13,
    ESC: 27,
    TAB: 9,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
  };
  var keyCode = event.keyCode;
  var el = event.target;
  var namesAll = ['ok', 'cancel', 'input'];
  var names = find(dialog, namesAll).map(getDataName);

  switch (keyCode) {
    case KEY.ENTER:
      closeDialog(el, dialog, ok, cancel);
      event.preventDefault();
      break;

    case KEY.ESC:
      remove();
      cancel();
      break;

    case KEY.TAB:
      if (event.shiftKey) tab(dialog, names);
      tab(dialog, names);
      event.preventDefault();
      break;

    default:
      ['left', 'right', 'up', 'down'].filter(function (name) {
        return keyCode === KEY[name.toUpperCase()];
      }).forEach(function () {
        changeButtonFocus(dialog, names);
      });
      break;
  }

  event.stopPropagation();
}

function getDataName(el) {
  return el.getAttribute('data-name').replace('js-', '');
}

function changeButtonFocus(dialog, names) {
  var active = document.activeElement;
  var activeName = getDataName(active);
  var isButton = /ok|cancel/.test(activeName);
  var count = names.length - 1;

  var getName = function getName(activeName) {
    if (activeName === 'cancel') return 'ok';
    return 'cancel';
  };

  if (activeName === 'input' || !count || !isButton) return;
  var name = getName(activeName);
  find(dialog, [name]).forEach(function (el) {
    el.focus();
  });
}

var getIndex = function getIndex(count, index) {
  if (index === count) return 0;
  return index + 1;
};

function tab(dialog, names) {
  var active = document.activeElement;
  var activeName = getDataName(active);
  var count = names.length - 1;
  var activeIndex = names.indexOf(activeName);
  var index = getIndex(count, activeIndex);
  var name = names[index];
  find(dialog, [name]).forEach(function (el) {
    return el.focus();
  });
}

function closeDialog(el, dialog, ok, cancel) {
  var name = el.getAttribute('data-name').replace('js-', '');

  if (/close|cancel/.test(name)) {
    cancel();
    remove();
    return;
  }

  var value = find(dialog, ['input']).reduce(function (value, el) {
    return el.value;
  }, null);
  ok(value);
  remove();
}

function find(element, names) {
  var notEmpty = function notEmpty(a) {
    return a;
  };

  var elements = names.map(function (name) {
    return element.querySelector("[data-name=\"js-".concat(name, "\"]"));
  }).filter(notEmpty);
  return elements;
}

function addListenerAll(event, parent, elements, fn) {
  find(parent, elements).forEach(function (el) {
    return el.addEventListener(event, fn);
  });
}

function removeEl(name) {
  var el = document.querySelector(name);
  el.parentElement.removeChild(el);
}

function bind(fn) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return function () {
    return fn.apply(void 0, args);
  };
}
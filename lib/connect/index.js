'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _store = require('../store');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var connect = function connect(states, actions) {
  return function (Component) {
    var onStateChange = function onStateChange() {
      var _this = this;

      var store = (0, _store.getStore)();
      var state = states(store.getState());
      var isUpdate = Object.keys(state).findIndex(function (k) {
        return _this[k] !== state[k];
      }) != -1;
      if (isUpdate) {
        setData.call(this);
        this.$apply();
      }
    };

    var setData = function setData() {
      //设置data
      var store = (0, _store.getStore)();
      var state = states(store.getState(), this);
      var newData = {};
      Object.keys(state).map(function (k) {
        newData[k] = function () {
          return state[k];
        };
      });
      this.computed = Object.assign(this.computed || {}, newData);
    };
    var setActions = function setActions() {
      //设置data
      var store = (0, _store.getStore)();
      var actionsFun = actions(store.dispatch);
      var newData = {};
      Object.keys(actionsFun).map(function (k) {
        newData[k] = actionsFun[k];
      });
      this.methods = Object.assign(this.methods || {}, newData);
    };
    return function (_Component) {
      _inherits(_class, _Component);

      function _class() {
        _classCallCheck(this, _class);

        var _this2 = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        setData.call(_this2);
        setActions.call(_this2);
        return _this2;
      }

      _createClass(_class, [{
        key: 'onLoad',
        value: function onLoad() {
          var store = (0, _store.getStore)();
          var state = store.getState();
          store.subscribe(onStateChange.bind(this));
          _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'onLoad', this).call(this, arguments);
        }
      }]);

      return _class;
    }(Component);
  };
};

exports.default = connect;
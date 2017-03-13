define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.title = 'Riskmap.in';
      config.options.pushState = true;
      config.options.root = '/riskmap.in/';
      config.map([{ route: ['', 'map', 'map/:city', 'map/:city/'], name: 'map', moduleId: 'routes/landing/landing' }, { route: 'map/:city/:report', moduleId: 'routes/landing/landing' }, { route: 'cards/:disaster/:id', moduleId: 'routes/cards/cards' }]);
      config.mapUnknownRoutes({ moduleId: 'routes/landing/landing' });
      this.router = router;
    };

    return App;
  }();
});
define('environment',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true,
    tile_layer: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}',
    data_server: 'http://localhost:8001/',
    app: 'http://localhost:9000',
    default_language: 'en',
    supported_languages: ['en', 'id'],
    enable_test_cardid: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    longStackTraces: _environment2.default.debug,
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration();

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function (a) {
      return a.setRoot();
    });
  }
});
define('resources/config',['exports', '../environment', 'aurelia-framework'], function (exports, _environment, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Config = undefined;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class;

  var Config = exports.Config = (0, _aureliaFramework.noView)(_class = function Config() {
    _classCallCheck(this, Config);

    this.cards = {
      "data_server": _environment2.default.data_server,
      "tile_layer": _environment2.default.tile_layer,
      "enable_test_cardid": _environment2.default.enable_test_cardid
    };

    this.map = {
      "instance_regions": {
        "chennai": {
          "region": "chn",
          "bounds": {
            "sw": [12.6884, 79.9248],
            "ne": [13.3766, 80.5413]
          }
        }
      },
      "default_region": {
        "region": "chn",
        "bounds": {
          "sw": [12.6884, 79.9248],
          "ne": [13.3766, 80.5413]
        }
      },
      "data_server": _environment2.default.data_server,
      "tile_layer": _environment2.default.tile_layer,
      "app": _environment2.default.app
    };
  }) || _class;
});
define('resources/report-card',['exports', '../environment', 'aurelia-framework'], function (exports, _environment, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ReportCard = undefined;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class;

  var ReportCard = exports.ReportCard = (0, _aureliaFramework.noView)(_class = function () {
    ReportCard.metadata = function metadata() {
      return Metadata.singleton(true);
    };

    ReportCard.prototype.changeLanguage = function changeLanguage(lang) {
      var _this = this;

      $.getJSON("../../../locales/" + lang + "/translation.json", function (data) {
        $.each(data, function (key, val) {
          _this.locale[key] = val;
        });
      });
    };

    function ReportCard() {
      _classCallCheck(this, ReportCard);

      var self = this;

      self.selLanguage = _environment2.default.default_language;
      self.languages = _environment2.default.supported_languages;
      self.location = { markerLocation: null, gpsLocation: null, accuracy: null, supported: false };
      self.depth = null;
      self.photo = { file: null, rotation: 0 };
      self.description = { value: null };
      self.network = null;
      self.errors = { code: null, text: null };
      self.locale = {};
      self.changeLanguage(this.selLanguage);
    }

    return ReportCard;
  }()) || _class;
});
define('components/card-notification/card-notification',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CardNotification = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

  var CardNotification = exports.CardNotification = (_dec = (0, _aureliaFramework.customElement)('card-notification'), _dec(_class = (_class2 = function () {
    function CardNotification() {
      _classCallCheck(this, CardNotification);

      _initDefineProp(this, 'locale', _descriptor, this);

      _initDefineProp(this, 'type', _descriptor2, this);

      _initDefineProp(this, 'header', _descriptor3, this);

      _initDefineProp(this, 'message', _descriptor4, this);

      _initDefineProp(this, 'bespoke', _descriptor5, this);

      _initDefineProp(this, 'closeNotification', _descriptor6, this);
    }

    CardNotification.prototype.callClose = function callClose() {
      this.closeNotification();
    };

    return CardNotification;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'locale', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'type', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'header', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'message', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'bespoke', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'closeNotification', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('components/component-template/component-template',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ComponentTemplate = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor;

  var ComponentTemplate = exports.ComponentTemplate = (_dec = (0, _aureliaFramework.customElement)('component-template'), _dec(_class = (_class2 = function () {
    function ComponentTemplate() {
      _classCallCheck(this, ComponentTemplate);

      _initDefineProp(this, 'locale', _descriptor, this);
    }

    ComponentTemplate.prototype.attached = function attached() {
      var self = this;
    };

    _createClass(ComponentTemplate, [{
      key: 'x',
      get: function get() {
        return this.y;
      }
    }]);

    return ComponentTemplate;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'locale', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('components/depth-bg/depth-bg',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DepthBg = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var DepthBg = exports.DepthBg = (_dec = (0, _aureliaFramework.containerless)(), _dec(_class = function DepthBg() {
    _classCallCheck(this, DepthBg);
  }) || _class);
});
define('components/disaster-map/disaster-map',['exports', 'aurelia-framework', 'leaflet', 'jquery', './map-layers', './map-utility'], function (exports, _aureliaFramework, _leaflet, _jquery, _mapLayers, _mapUtility) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DisasterMap = undefined;

  var L = _interopRequireWildcard(_leaflet);

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

  var DisasterMap = exports.DisasterMap = (_dec = (0, _aureliaFramework.customElement)('disaster-map'), _dec2 = (0, _aureliaFramework.inject)(_mapLayers.MapLayers, _mapUtility.MapUtility), _dec(_class = _dec2(_class = (_class2 = function () {
    function DisasterMap(MapLayers, MapUtility) {
      _classCallCheck(this, DisasterMap);

      _initDefineProp(this, 'querycity', _descriptor, this);

      _initDefineProp(this, 'reportid', _descriptor2, this);

      _initDefineProp(this, 'resetTab', _descriptor3, this);

      this.layers = MapLayers;
      this.utility = MapUtility;
      this.cities = [];
      for (var city in this.utility.config.instance_regions) {
        this.cities.push(city);
      }
      this.selected_city = null;
    }

    DisasterMap.prototype.togglePane = function togglePane(ref, action, clear_selection) {
      var self = this;
      if (action === 'hide') {
        (0, _jquery2.default)(ref).fadeOut(200);
        if (ref === '#infoPane') {
          if (clear_selection) {
            if (self.layers.selected_report) {
              self.reportid = null;
              history.pushState({ city: self.selected_city, report_id: null }, "city", "map/" + self.selected_city);
              self.layers.selected_report.target.setIcon(self.layers.mapIcons.report_normal);
              self.layers.selected_report = null;
            }
            if (self.layers.selected_extent) {
              self.layers.selected_extent.target.setStyle(self.layers.mapPolygons.normal);
              self.layers.selected_extent = null;
            }
            if (self.layers.selected_gauge) {
              self.layers.selected_gauge.target.setIcon(self.layers.mapIcons.gauge_normal(self.layers.gaugeIconUrl(self.layers.selected_gauge.target.feature.properties.observations[self.layers.selected_gauge.target.feature.properties.observations.length - 1].f3)));
              self.layers.selected_gauge = null;
            }
            self.layers.popupContent = null;
          }
        } else if (ref === '#sidePane') {
          (0, _jquery2.default)('.menuBtn').toggleClass("active");
        }
      } else if (action === 'show') {
        if (ref === '#infoPane') {
          if ((0, _jquery2.default)('#closeSidePane').hasClass("active")) {
            (0, _jquery2.default)('.menuBtn').toggleClass("active");
            (0, _jquery2.default)('#sidePane').fadeOut(200);
          }
          if (clear_selection && (0, _jquery2.default)('#modalChart').get(0)) {
            (0, _jquery2.default)('#chart-pane').empty();
          }
        } else if (ref === '#sidePane') {
          self.resetTab('report');
          (0, _jquery2.default)('.menuBtn').toggleClass("active");
          self.togglePane('#infoPane', 'hide', true);
        }
        (0, _jquery2.default)(ref).fadeIn(200);
      }
    };

    DisasterMap.prototype.viewReports = function viewReports(city_name, push_state) {
      var self = this;
      self.utility.changeCity(city_name, self.reportid, self.map, self.layers, self.togglePane).then(function () {
        if (self.reportid && self.layers.activeReports.hasOwnProperty(self.reportid)) {
          if (self.layers.activeReports[self.reportid].feature.properties.tags.instance_region_code === self.utility.parseCityObj(city_name).region) {
            self.layers.activeReports[self.reportid].fire('click');
            self.selected_city = city_name;
            if (push_state) {
              history.pushState({ city: city_name, report_id: self.reportid }, 'city', "map/" + city_name + "/" + self.reportid);
            }
          }
        } else if (self.reportid && !self.layers.activeReports.hasOwnProperty(self.reportid)) {
          self.layers.addSingleReport(self.reportid).then(function (report) {
            var reportRegion = self.layers.activeReports[self.reportid].feature.properties.tags.instance_region_code;
            if (reportRegion === self.utility.parseCityObj(city_name).region) {
              report.fire('click');
              self.selected_city = city_name;
              if (push_state) {
                history.pushState({ city: city_name, report_id: self.reportid }, 'city', "map/" + city_name + "/" + self.reportid);
              }
            } else {
              var queryReportCity = self.utility.parseCityName(reportRegion, self.cities);
              self.utility.changeCity(queryReportCity, self.reportid, self.map, self.layers, self.togglePane).then(function () {
                self.layers.addSingleReport(self.reportid).then(function (queriedReport) {
                  queriedReport.fire('click');
                  self.selected_city = queryReportCity;
                  if (push_state) {
                    history.pushState({ city: queryReportCity, report_id: self.reportid }, 'city', "map/" + queryReportCity + "/" + self.reportid);
                  }
                });
              });
            }
          }).catch(function () {
            self.utility.noReportNotification(city_name, self.reportid);
            self.selected_city = city_name;
            self.reportid = null;
            if (push_state) {
              history.pushState({ city: city_name, report_id: null }, 'city', "map/" + city_name);
            }
          });
        } else if (!self.reportid) {
          if (self.utility.parseCityObj(city_name).region === 'java') {
            self.utility.noReportNotification(null, null);
            self.selected_city = null;
            if (push_state) {
              history.pushState({ city: null, report_id: null }, 'city', "map");
            }
          } else {
            self.selected_city = city_name;
            if (push_state) {
              history.pushState({ city: city_name, report_id: null }, 'city', "map/" + city_name);
            }
          }
        }
      }).catch(function () {
        self.utility.noReportNotification(city_name, null);
        self.reportid = null;
      });
    };

    DisasterMap.prototype.attached = function attached() {
      var _this = this;

      var self = this;

      self.map = L.map('mapContainer', {
        attributionControl: false,
        center: [13.017163, 80.185031],
        zoom: 8,
        minZoom: 8
      });

      L.tileLayer(self.utility.config.tile_layer, {
        detectRetina: true,
        subdomains: 'abc',
        ext: 'png'
      }).addTo(self.map);

      L.control.scale({
        position: 'bottomleft',
        metric: true,
        imperial: false
      }).addTo(self.map);

      L.Control.GeoLocate = L.Control.extend({
        onAdd: function onAdd() {
          return self.utility.geolocateContainer(self.map, self.layers, self.togglePane);
        }
      });
      L.control.geoLocate = function (opts) {
        return new L.Control.GeoLocate(opts);
      };
      L.control.geoLocate({
        position: 'topleft'
      }).addTo(self.map);

      self.map.locate({
        setView: false
      });
      self.map.on('locationfound', function (e) {
        self.utility.onLocationFound(e);
      });
      self.map.on('locationerror', function () {
        self.utility.clientLocation = null;
      });

      if (self.querycity) {
        self.viewReports(self.querycity, true);
      }

      window.onpopstate = function (e) {
        if (e.state.city !== null) {
          _this.viewReports(e.state.city, false);
        } else {
          _this.viewReports(null, false);
        }
      };
    };

    return DisasterMap;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'querycity', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'reportid', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'resetTab', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class) || _class);
});
define('components/disaster-map/map-layers',['exports', 'aurelia-framework', 'leaflet', 'chart', 'resources/config', 'aurelia-http-client', 'topojson-client'], function (exports, _aureliaFramework, _leaflet, _chart, _config, _aureliaHttpClient, _topojsonClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MapLayers = undefined;

  var L = _interopRequireWildcard(_leaflet);

  var _chart2 = _interopRequireDefault(_chart);

  var topojson = _interopRequireWildcard(_topojsonClient);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var MapLayers = exports.MapLayers = (_dec = (0, _aureliaFramework.inject)(_config.Config), (0, _aureliaFramework.noView)(_class = _dec(_class = function () {
    function MapLayers(Config) {
      _classCallCheck(this, MapLayers);

      this.activeReports = {};
      this.config = Config.map;
      this.mapIcons = {
        report_normal: L.icon({
          iconUrl: 'assets/icons/floodIcon.svg',
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        }),
        report_selected: L.icon({
          iconUrl: 'assets/icons/floodSelectedIcon.svg',
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        }),
        gauge_normal: function gauge_normal(url) {
          return L.icon({
            iconUrl: url,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          });
        },
        gauge_selected: L.icon({
          iconUrl: 'assets/icons/floodgauge_selected.svg',
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        })
      };
      this.mapPolygons = {
        normal: {
          weight: 0,
          opacity: 0
        },
        selected: {
          weight: 1,
          opacity: 1
        }
      };
    }

    MapLayers.prototype.gaugeIconUrl = function gaugeIconUrl(level) {
      switch (level) {
        case 1:
          return 'assets/icons/floodgauge_1.svg';
        case 2:
          return 'assets/icons/floodgauge_2.svg';
        case 3:
          return 'assets/icons/floodgauge_3.svg';
        default:
          return 'assets/icons/floodgauge_4.svg';
      }
    };

    MapLayers.prototype.formatTime = function formatTime(timestamp_ISO8601) {
      var timeZoneDifference = -5;
      var utc = new Date(timestamp_ISO8601).getTime();
      var localTime = utc + 3600 * timeZoneDifference * 1000;
      var timestring = new Date(localTime).toISOString();
      timestring = timestring.split('T');
      var t1 = timestring[1].slice(0, 5);
      var d1 = timestring[0].split('-');
      var d2 = d1[2] + '-' + d1[1] + '-' + d1[0];
      return t1 + ' ' + d2;
    };

    MapLayers.prototype.getData = function getData(end_point) {
      var self = this,
          url = self.config.data_server + end_point;
      var client = new _aureliaHttpClient.HttpClient();
      return new Promise(function (resolve, reject) {
        client.get(url).then(function (data) {
          var topology = JSON.parse(data.response);
          if (topology.statusCode === 200) {
            var result = topology.result;
            if (result && result.objects) {
              resolve(topojson.feature(result, result.objects.output));
            } else {
              resolve(null);
            }
          } else {
            resolve(null);
          }
        }).catch(function (err) {
          return reject(err);
        });
      });
    };

    MapLayers.prototype.reportInteraction = function reportInteraction(feature, layer, city_name, map, togglePane) {
      var self = this;
      self.activeReports[feature.properties.pkey] = layer;
      layer.on({
        click: function click(e) {
          map.flyTo(layer._latlng, 15);
          if (self.selected_extent) {
            self.selected_extent.target.setStyle(self.mapPolygons.normal);
            self.selected_extent = null;
          }
          if (self.selected_gauge) {
            self.selected_gauge.target.setIcon(self.mapIcons.gauge_normal(self.gaugeIconUrl(self.selected_gauge.target.feature.properties.observations[self.selected_gauge.target.feature.properties.observations.length - 1].f3)));
            self.selected_gauge = null;
          }
          if (!self.selected_report) {
            e.target.setIcon(self.mapIcons.report_selected);
            self.popupContent = {};
            for (var prop in feature.properties) {
              self.popupContent[prop] = feature.properties[prop];
            }
            self.popupContent.timestamp = self.formatTime(feature.properties.created_at);
            history.pushState({ city: city_name, report_id: feature.properties.pkey }, "city", "map/" + city_name + "/" + feature.properties.pkey);
            togglePane('#infoPane', 'show', true);
            self.selected_report = e;
          } else if (e.target === self.selected_report.target) {
            e.target.setIcon(self.mapIcons.report_normal);
            history.pushState({ city: city_name, report_id: null }, "city", "map/" + city_name);
            togglePane('#infoPane', 'hide', false);
            self.selected_report = null;
          } else if (e.target !== self.selected_report.target) {
            self.selected_report.target.setIcon(self.mapIcons.report_normal);
            e.target.setIcon(self.mapIcons.report_selected);
            self.popupContent = {};
            for (var _prop in feature.properties) {
              self.popupContent[_prop] = feature.properties[_prop];
            }
            self.popupContent.timestamp = self.formatTime(feature.properties.created_at);
            history.pushState({ city: city_name, report_id: feature.properties.pkey }, "city", "map/" + city_name + "/" + feature.properties.pkey);
            togglePane('#infoPane', 'show', true);
            self.selected_report = e;
          }
        }
      });
    };

    MapLayers.prototype.floodExtentInteraction = function floodExtentInteraction(feature, layer, city_name, map, togglePane) {
      var self = this;
      layer.on({
        click: function click(e) {
          map.panTo(layer.getCenter());

          if (self.selected_report) {
            self.selected_report.target.setIcon(self.mapIcons.report_normal);
            self.selected_report = null;
            history.pushState({ city: city_name, report_id: null }, "city", "map/" + city_name);
          }
          if (self.selected_gauge) {
            self.selected_gauge.target.setIcon(self.mapIcons.gauge_normal(self.gaugeIconUrl(self.selected_gauge.target.feature.properties.observations[self.selected_gauge.target.feature.properties.observations.length - 1].f3)));
            self.selected_gauge = null;
          }
          if (!self.selected_extent) {
            e.target.setStyle(self.mapPolygons.selected);

            self.popupContent = {};
            for (var prop in feature.properties) {
              self.popupContent[prop] = feature.properties[prop];
            }

            togglePane('#infoPane', 'show', true);

            self.selected_extent = e;
          } else if (e.target === self.selected_extent.target) {
            e.target.setStyle(self.mapPolygons.normal);
            self.popupContent = {};
            togglePane('#infoPane', 'hide', false);
            self.selected_extent = null;
          } else if (e.target !== self.selected_extent.target) {
            self.selected_extent.target.setStyle(self.mapPolygons.normal);
            e.target.setStyle(self.mapPolygons.selected);
            self.popupContent = {};
            for (var _prop2 in feature.properties) {
              self.popupContent[_prop2] = feature.properties[_prop2];
            }
            togglePane('#infoPane', 'show', true);
            self.selected_extent = e;
          }
        }
      });
    };

    MapLayers.prototype.drawGaugeChart = function drawGaugeChart(feature) {
      $('#chart-pane').html('<canvas id="modalChart"></canvas>');
      var ctx = $('#modalChart').get(0).getContext('2d');
      var data = {
        labels: [],
        datasets: [{
          label: "Tinggi Muka Air / Water Depth (cm)",
          backgroundColor: "rgba(151,187,205,0.2)",
          borderColor: "rgba(151,187,205,1)",
          pointBackgroundColor: "rgba(151,187,205,1)",
          pointBorderColor: "#fff",
          pointRadius: 4,
          data: []
        }]
      };
      for (var i = 0; i < feature.properties.observations.length; i += 1) {
        data.labels.push(feature.properties.observations[i].f1);
        data.datasets[0].data.push(feature.properties.observations[i].f2);
      }
      var gaugeChart = new _chart2.default(ctx, {
        type: 'line',
        data: data,
        options: {
          bezierCurve: true,
          legend: { display: true },
          scaleLabel: "<%= ' ' + value%>",
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                unit: 'hour',
                unitStepSize: 1,
                displayFormats: {
                  'millisecond': 'HH:mm',
                  'second': 'HH:mm',
                  'minute': 'HH:mm',
                  'hour': 'HH:mm',
                  'day': 'HH:mm',
                  'week': 'HH:mm',
                  'month': 'HH:mm',
                  'quarter': 'HH:mm',
                  'year': 'HH:mm'
                }
              }
            }]
          },
          tooltips: {
            enabled: false
          }
        }
      });
    };

    MapLayers.prototype.gaugeInteraction = function gaugeInteraction(feature, layer, city_name, map, togglePane) {
      var self = this;
      layer.on({
        click: function click(e) {
          console.log(e.target);
          map.panTo(layer._latlng);
          $('#chart-pane').empty();
          if (self.selected_report) {
            self.selected_report.target.setIcon(self.mapIcons.report_normal);
            self.selected_report = null;
            history.pushState({ city: city_name, report_id: null }, "city", "map/" + city_name);
          }
          if (self.selected_extent) {
            self.selected_extent.target.setStyle(self.mapPolygons.normal);
            self.selected_extent = null;
          }
          if (!self.selected_gauge) {
            e.target.setIcon(self.mapIcons.gauge_selected);
            self.popupContent = {};
            self.popupContent.gauge_name = feature.properties.gaugenameid;
            self.drawGaugeChart(feature);
            togglePane('#infoPane', 'show', false);
            self.selected_gauge = e;
          } else if (e.target === self.selected_gauge.target) {
            e.target.setIcon(self.mapIcons.gauge_normal(self.gaugeIconUrl(e.target.feature.properties.observations[e.target.feature.properties.observations.length - 1].f3)));
            togglePane('#infoPane', 'hide', false);
            self.selected_gauge = null;
          } else if (e.target !== self.selected_gauge.target) {
            self.selected_gauge.target.setIcon(self.mapIcons.gauge_normal(self.gaugeIconUrl(self.selected_gauge.target.feature.properties.observations[self.selected_gauge.target.feature.properties.observations.length - 1].f3)));
            e.target.setIcon(self.mapIcons.gauge_selected);
            self.popupContent = {};
            self.popupContent.gauge_name = feature.properties.gaugenameid;
            self.drawGaugeChart(feature);
            togglePane('#infoPane', 'show', false);
            self.selected_gauge = e;
          }
        }
      });
    };

    MapLayers.prototype.appendData = function appendData(end_point, localObj, map) {
      var self = this;
      return new Promise(function (resolve, reject) {
        self.getData(end_point).then(function (data) {
          if (!data) {
            console.log('Could not load map layer');
            resolve(data);
          } else {
            localObj.addData(data);
            localObj.addTo(map);
            resolve(data);
          }
        }).catch(function () {
          return reject(null);
        });
      });
    };

    MapLayers.prototype.addSingleReport = function addSingleReport(report_id) {
      var self = this;
      return new Promise(function (resolve, reject) {
        self.getData('reports/' + report_id).then(function (data) {
          self.reports.addData(data);
          resolve(self.activeReports[data.features[0].properties.pkey]);
        }).catch(function () {
          return reject(null);
        });
      });
    };

    MapLayers.prototype.addReports = function addReports(city_name, city_region, map, togglePane) {
      var self = this;
      map.createPane('reports');
      map.getPane('reports').style.zIndex = 700;

      if (self.reports) {
        map.removeLayer(self.reports);
        self.reports = null;
      }

      self.reports = L.geoJSON(null, {
        onEachFeature: function onEachFeature(feature, layer) {
          self.reportInteraction(feature, layer, city_name, map, togglePane);
        },
        pointToLayer: function pointToLayer(feature, latlng) {
          return L.marker(latlng, {
            icon: self.mapIcons.report_normal,
            pane: 'reports'
          });
        }
      });

      return self.appendData('reports/?city=' + city_region + '&timeperiod=604800', self.reports, map);
    };

    MapLayers.prototype.addFloodExtents = function addFloodExtents(city_name, city_region, map, togglePane) {
      var self = this;
      self.flood_extents = L.geoJSON(null, {
        style: function style(feature, layer) {
          switch (feature.properties.state) {
            case 4:
              return { cursor: "pointer", fillColor: "#CC2A41", weight: 0, color: "#000000", opacity: 0, fillOpacity: 0.7 };
            case 3:
              return { cursor: "pointer", fillColor: "#FF8300", weight: 0, color: "#000000", opacity: 0, fillOpacity: 0.7 };
            case 2:
              return { cursor: "pointer", fillColor: "#FFFF00", weight: 0, color: "#000000", opacity: 0, fillOpacity: 0.7 };
            case 1:
              return { cursor: "pointer", fillColor: "#A0A9F7", weight: 0, color: "#000000", opacity: 0, fillOpacity: 0.7 };
            default:
              return { weight: 0, opacity: 0, fillOpacity: 0 };
          }
        },
        onEachFeature: function onEachFeature(feature, layer) {
          self.floodExtentInteraction(feature, layer, city_name, map, togglePane);
        }
      });
      return self.appendData('floods?city=' + city_region + '&minimum_state=1', self.flood_extents, map);
    };

    MapLayers.prototype.removeFloodExtents = function removeFloodExtents(map) {
      var self = this;
      if (self.flood_extents) {
        map.removeLayer(self.flood_extents);
        self.flood_extents = null;
      }
    };

    MapLayers.prototype.addFloodGauges = function addFloodGauges(city_name, city_region, map, togglePane) {
      var self = this;
      map.createPane('gauges');
      map.getPane('gauges').style.zIndex = 650;
      if (city_region === 'jbd') {
        self.gaugeLayer = L.geoJSON(null, {
          pointToLayer: function pointToLayer(feature, latlng) {
            return L.marker(latlng, {
              icon: self.mapIcons.gauge_normal(self.gaugeIconUrl(feature.properties.observations[feature.properties.observations.length - 1].f3)),
              pane: 'gauges'
            });
          },
          onEachFeature: function onEachFeature(feature, layer) {
            self.gaugeInteraction(feature, layer, city_name, map, togglePane);
          }
        });
      }
      return self.appendData('floodgauges?city=' + city_region, self.gaugeLayer, map);
    };

    MapLayers.prototype.removeFloodGauges = function removeFloodGauges(map) {
      var self = this;
      if (self.gaugeLayer) {
        map.removeLayer(self.gaugeLayer);
        self.gaugeLayer = null;
      }
    };

    return MapLayers;
  }()) || _class) || _class);
});
define('components/disaster-map/map-utility',['exports', 'aurelia-framework', 'leaflet', 'resources/config', 'notifyjs-browser'], function (exports, _aureliaFramework, _leaflet, _config, _notifyjsBrowser) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MapUtility = undefined;

  var L = _interopRequireWildcard(_leaflet);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  $.notify.addStyle('mapInfo', {
    html: "<div id=notification><span data-notify-text/></div>",
    classes: {
      info: {
        "background-color": "rgba(0, 0, 0, 0.5)"
      },
      error: {
        "background-color": "rgba(255, 0, 0, 0.4)"
      }
    }
  });

  var MapUtility = exports.MapUtility = (_dec = (0, _aureliaFramework.inject)(_config.Config), (0, _aureliaFramework.noView)(_class = _dec(_class = function () {
    function MapUtility(Config) {
      _classCallCheck(this, MapUtility);

      this.config = Config.map;
    }

    MapUtility.prototype.parseCityName = function parseCityName(region_code, cities) {
      var self = this;
      for (var i = 0; i < cities.length; i += 1) {
        if (self.parseCityObj(cities[i]).region === region_code) {
          return cities[i];
        } else {
          return null;
        }
      }
    };

    MapUtility.prototype.parseCityObj = function parseCityObj(city_name) {
      var self = this;
      if (!city_name) {
        $('#screen').show();
        return self.config.default_region;
      } else if (city_name in self.config.instance_regions) {
        $('#screen').hide();
        return self.config.instance_regions[city_name];
      } else {
        $('#screen').show();
        return self.config.default_region;
      }
    };

    MapUtility.prototype.changeCity = function changeCity(city_name, report_id, map, layers, togglePane) {
      var self = this,
          cityObj = self.parseCityObj(city_name);

      layers.removeFloodExtents(map);
      layers.removeFloodGauges(map);

      map.flyToBounds([cityObj.bounds.sw, cityObj.bounds.ne]).once('moveend zoomend', function (e) {
        map.setMaxBounds([cityObj.bounds.sw, cityObj.bounds.ne]);
      });

      if (cityObj.region !== 'java') {
        layers.addFloodExtents(city_name, self.parseCityObj(city_name).region, map, togglePane);
        layers.addFloodGauges(city_name, self.parseCityObj(city_name).region, map, togglePane);
        return layers.addReports(city_name, self.parseCityObj(city_name).region, map, togglePane);
      } else {
        return new Promise(function (resolve, reject) {
          resolve();
        });
      }
    };

    MapUtility.prototype.noReportNotification = function noReportNotification(city_name, report_id) {
      if (report_id && city_name) {
        $.notify("Report id: " + report_id + " not found in " + city_name, { style: "mapInfo", className: "info" });
      } else if (city_name) {
        $.notify("No reports found for " + city_name, { style: "mapInfo", className: "info" });
      } else if (!city_name) {
        $.notify('Unsupported city', { style: "mapInfo", className: "error" });
      }
    };

    MapUtility.prototype.onLocationFound = function onLocationFound(e) {
      var self = this,
          regions = self.config.instance_regions;
      self.clientLocation = e;
      for (var city in regions) {
        self.clientCityIsValid = false;
        if (e.latitude > regions[city].bounds.sw[0] && e.longitude > regions[city].bounds.sw[1] && e.latitude < regions[city].bounds.ne[0] && e.longitude < regions[city].bounds.ne[1]) {
          self.clientCity = city;
          self.clientCityIsValid = true;
          break;
        }
      }
    };

    MapUtility.prototype.drawGpsMarkers = function drawGpsMarkers(center, accuracy, map) {
      this.gpsAccuracy = L.circle(center, {
        weight: 0,
        fillColor: '#31aade',
        fillOpacity: 0.15,
        radius: accuracy / 2
      });
      this.gpsMarker = L.circleMarker(center, {
        color: 'white',
        weight: 1,
        fillColor: '#31aade',
        fillOpacity: 1,
        radius: 8
      });
      this.gpsAccuracy.addTo(map);
      this.gpsMarker.addTo(map);
    };

    MapUtility.prototype.viewClientLocation = function viewClientLocation(map, layers, togglePane) {
      var self = this;
      if (self.clientLocation) {
        if (self.clientCityIsValid) {
          self.changeCity(self.clientCity, null, map, layers, true, togglePane);
          map.flyTo(self.clientLocation.latlng, 15);
          if (self.gpsMarker) {
            self.gpsMarker.removeFrom(map);
            self.gpsAccuracy.removeFrom(map);
          }
          map.once('moveend', function () {
            self.drawGpsMarkers(self.clientLocation.latlng, self.clientLocation.accuracy, map);
          });
        } else {
          $.notify("Location out of bounds", { style: "mapInfo", className: "info" });
        }
      } else {
        $.notify("GPS location not found", { style: "mapInfo", className: "error" });
      }
    };

    MapUtility.prototype.geolocateContainer = function geolocateContainer(map, layers, togglePane) {
      var self = this;
      var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
      container.innerHTML = '<i class="icon-geolocate"></i>';
      container.style.fontSize = '22px';
      container.style.textAlign = 'center';
      container.style.lineHeight = '30px';
      container.style.backgroundColor = 'white';
      container.style.width = '30px';
      container.style.height = '30px';
      container.style.cursor = 'pointer';
      container.onclick = function () {
        self.viewClientLocation(map, layers, togglePane);
      };
      return container;
    };

    return MapUtility;
  }()) || _class) || _class);
});
define('components/flood-info/flood-info',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FloodInfo = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

  var FloodInfo = exports.FloodInfo = (_dec = (0, _aureliaFramework.customElement)('flood-info'), _dec(_class = (_class2 = function FloodInfo() {
    _classCallCheck(this, FloodInfo);

    _initDefineProp(this, 'locale', _descriptor, this);

    _initDefineProp(this, 'areaname', _descriptor2, this);

    _initDefineProp(this, 'districtname', _descriptor3, this);

    _initDefineProp(this, 'state', _descriptor4, this);

    _initDefineProp(this, 'updated', _descriptor5, this);
  }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'locale', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'areaname', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'districtname', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'state', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'updated', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('components/gauge-info/gauge-info',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GaugeInfo = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor;

  var GaugeInfo = exports.GaugeInfo = (_dec = (0, _aureliaFramework.customElement)('gauge-info'), _dec(_class = (_class2 = function GaugeInfo() {
    _classCallCheck(this, GaugeInfo);

    _initDefineProp(this, 'name', _descriptor, this);
  }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'name', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('components/report-info/report-info',['exports', 'aurelia-framework', '../../environment'], function (exports, _aureliaFramework, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ReportInfo = undefined;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;

  var ReportInfo = exports.ReportInfo = (_dec = (0, _aureliaFramework.customElement)('report-info'), _dec(_class = (_class2 = function () {
    function ReportInfo() {
      _classCallCheck(this, ReportInfo);

      _initDefineProp(this, 'locale', _descriptor, this);

      _initDefineProp(this, 'imageurl', _descriptor2, this);

      _initDefineProp(this, 'height', _descriptor3, this);

      _initDefineProp(this, 'title', _descriptor4, this);

      _initDefineProp(this, 'text', _descriptor5, this);

      _initDefineProp(this, 'pkey', _descriptor6, this);

      _initDefineProp(this, 'city', _descriptor7, this);

      _initDefineProp(this, 'timestamp', _descriptor8, this);

      _initDefineProp(this, 'source', _descriptor9, this);

      this.links = {
        qlue: 'https://play.google.com/store/apps/details?id=org.qluein.android&hl=en',
        detik: 'http://pasangmata.detik.com/',

        grasp: 'javascript:void(0)'
      };
    }

    ReportInfo.prototype.attached = function attached() {
      var self = this;
      self.shareButtons = [{
        name: "twitter",
        intent: "https://twitter.com/intent/tweet?text=" + self.msgText + "%20" + self.reportUrl
      }, {
        name: "telegram",
        intent: "https://telegram.me/share/url?url={" + self.reportUrl + "}&text={" + self.msgText + "}"
      }, {
        name: "whatsapp",
        intent: "whatsapp://send?text=" + self.msgText + "%20" + self.reportUrl
      }, {
        name: "facebook",
        intent: "http://www.facebook.com/sharer/sharer.php?u=" + self.reportUrl
      }];
    };

    _createClass(ReportInfo, [{
      key: 'msgText',
      get: function get() {
        return this.locale.report_info.share_msg;
      }
    }, {
      key: 'reportUrl',
      get: function get() {
        return _environment2.default.app + "map/" + this.city + "/" + this.pkey;
      }
    }]);

    return ReportInfo;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'locale', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'imageurl', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'height', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'title', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'text', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'pkey', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'city', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'timestamp', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, 'source', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('components/side-pane/side-pane',['exports', 'aurelia-framework', 'jquery'], function (exports, _aureliaFramework, _jquery) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SidePane = undefined;

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

  var SidePane = exports.SidePane = (_dec = (0, _aureliaFramework.customElement)('side-pane'), _dec(_class = (_class2 = function () {
    function SidePane() {
      _classCallCheck(this, SidePane);

      _initDefineProp(this, 'cities', _descriptor, this);

      _initDefineProp(this, 'selected', _descriptor2, this);

      _initDefineProp(this, 'changeCity', _descriptor3, this);

      _initDefineProp(this, 'closePane', _descriptor4, this);

      _initDefineProp(this, 'reportId', _descriptor5, this);

      this.tabList = ["report", "map", "info"];
      this.tab = "report";
      this.languages = ["en", "tm", "id"];
      this.selLanguage = "en";
      this.locale = {};
      this.videos = [{
        platform: "twitter",
        source: {
          "id": "https://vimeo.com/179334464",
          "en": "https://vimeo.com/179334464"
        }
      }, {
        platform: "telegram",
        source: {
          "id": "https://vimeo.com/179334464",
          "en": "https://vimeo.com/179334464"
        }
      }, {
        platform: "otherapps",
        source: {
          "id": "https://vimeo.com/179334464",
          "en": "https://vimeo.com/179334464"
        }
      }];
      this.gauge_levels = [{ text: { "en": "Alert Level 1", "id": "Siaga 1" }, icon: 'assets/icons/floodgauge_1.svg' }, { text: { "en": "Alert Level 2", "id": "Siaga 2" }, icon: 'assets/icons/floodgauge_2.svg' }, { text: { "en": "Alert Level 3", "id": "Siaga 3" }, icon: 'assets/icons/floodgauge_3.svg' }, { text: { "en": "Alert Level 4", "id": "Siaga 4" }, icon: 'assets/icons/floodgauge_4.svg' }];
      this.flood_depth = [{ text: { "en": "> 150", "id": "> 150" }, color: '#CC2A41' }, { text: { "en": "71 - 150", "id": "71 - 150" }, color: '#FF8300' }, { text: { "en": "10 - 70", "id": "10 - 70" }, color: '#FFFF00' }, { text: { "en": "Use Caution", "id": "Hati-hati" }, color: '#A0A9F7' }];
    }

    SidePane.prototype.changeLanguage = function changeLanguage(lang) {
      var _this = this;

      _jquery2.default.getJSON("../../../locales/" + lang + "/translation.json", function (data) {
        _jquery2.default.each(data, function (key, val) {
          _this.locale[key] = val;
        });
      });
    };

    SidePane.prototype.attached = function attached() {
      this.changeLanguage(this.selLanguage);
      (0, _jquery2.default)('#' + this.selLanguage).addClass("active");
      (0, _jquery2.default)('#button-' + this.tab).addClass("active");
    };

    SidePane.prototype.switchTab = function switchTab(tab) {
      (0, _jquery2.default)('.tabLinks').removeClass("active");
      (0, _jquery2.default)('#button-' + tab).addClass("active");
      this.tab = tab;
    };

    SidePane.prototype.switchLang = function switchLang(lang) {
      this.changeLanguage(lang);
      (0, _jquery2.default)('.langLabels').removeClass("active");
      (0, _jquery2.default)('#' + lang).addClass("active");
    };

    SidePane.prototype.switchCity = function switchCity(city) {
      this.changeCity(city, true);
      this.reportId = null;
      this.closePane();
    };

    SidePane.prototype.showVideo = function showVideo(video) {
      (0, _jquery2.default)('.videoWrapper:not(#vid_' + video + ')').slideUp("fast");
      (0, _jquery2.default)('#vid_' + video).slideToggle("fast");
      (0, _jquery2.default)('.labelRow:not(#label_' + video + ')').removeClass("active");
      (0, _jquery2.default)('#label_' + video).toggleClass("active");
      (0, _jquery2.default)('#down_' + video + ', #up_' + video).toggle();
      (0, _jquery2.default)('.up:not(#up_' + video + ')').hide();
      (0, _jquery2.default)('.down:not(#down_' + video + ')').show();
    };

    return SidePane;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'cities', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'selected', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'changeCity', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'closePane', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'reportId', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('routes/cards/cards',['exports', 'aurelia-framework', 'jquery', 'aurelia-event-aggregator', 'aurelia-http-client', 'resources/config', 'resources/report-card'], function (exports, _aureliaFramework, _jquery, _aureliaEventAggregator, _aureliaHttpClient, _config, _reportCard) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Cards = undefined;

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _dec, _class;

  var Cards = exports.Cards = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _reportCard.ReportCard, _config.Config), _dec(_class = function () {
    function Cards(ea, ReportCard, Config) {
      _classCallCheck(this, Cards);

      this.ea = ea;
      this.data_src = Config.cards.data_server;
      this.test_card = Config.cards.enable_test_cardid;
      this.reportcard = ReportCard;
      this.locale = this.reportcard.locale;
      this.region_bounds = {};
      for (var city in Config.map.instance_regions) {
        this.region_bounds[city] = Config.map.instance_regions[city].bounds;
      }
    }

    Cards.prototype.configureRouter = function configureRouter(config, router) {
      var self = this;
      config.title = this.locale.page_title;

      config.map([{ route: '*foo', moduleId: './card-landing/card-landing' }]);
      config.mapUnknownRoutes({ route: '/map' });
      self.router = router;
    };

    Cards.prototype.activate = function activate(params) {
      var self = this;
      self.id = params.id;
      if (params.disaster === 'flood' || params.disaster === 'hurricane') {
        _jquery2.default.getJSON("./src/routes/card-decks/" + params.disaster + ".json", function (data) {
          for (var _iterator = data, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var obj = _ref;

            self.router.addRoute(obj);
          }
        }).then(function () {
          _jquery2.default.getJSON("./src/routes/card-decks/staple.json", function (data) {
            for (var _iterator2 = data, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
              var _ref2;

              if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
              } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
              }

              var obj = _ref2;

              self.router.addRoute(obj);
            }
          }).then(function () {
            for (var route in self.router.routes) {
              self.router.routes[route].settings = { cardNo: parseInt(route) };
            }
            self.router.refreshNavigation();
          });
        });
      }
    };

    Cards.prototype.switchLang = function switchLang(lang) {
      this.reportcard.changeLanguage(lang);
      (0, _jquery2.default)('.langLabels').removeClass("active");
      (0, _jquery2.default)('#' + lang).addClass("active");
    };

    Cards.prototype.resizeCardHt = function resizeCardHt(factor) {
      var glitchHeight = 106;
      (0, _jquery2.default)('#cardContent').css({
        'height': (0, _jquery2.default)('#cardWrapper').height() - ((0, _jquery2.default)('#cardTitle').height() + (0, _jquery2.default)('#cardNavigation').height() + factor * glitchHeight) + 'px'
      });
      (0, _jquery2.default)('#cardNavigation').css({
        'bottom': factor * glitchHeight + 'px'
      });
    };

    Cards.prototype.attached = function attached() {
      var _this = this;

      var self = this;

      (0, _jquery2.default)('#depthBG').attr('fill', '#ff0000');
      var nua = navigator.userAgent.toLowerCase();

      if (/Mobi/.test(navigator.userAgent) && nua.indexOf('iphone') > -1 && nua.indexOf('safari') === -1 && (nua.indexOf('twitter') > -1 || nua.indexOf('fban') > -1 && nua.indexOf('messenger') === -1)) {
        self.resizeCardHt(1);
      } else {
        self.resizeCardHt(0);

        (0, _jquery2.default)(window).resize(function () {
          self.resizeCardHt(0);
        });
      }

      self.totalCards = self.router.routes.length - 1;
      (0, _jquery2.default)('#' + self.reportcard.selLanguage).addClass("active");
      (0, _jquery2.default)(document).ready(function () {
        (0, _jquery2.default)('.tabButtons').width(100 / (self.totalCards - 3) + '%');
      });

      var client = new _aureliaHttpClient.HttpClient();

      if (!self.test_card || self.id !== 'test123') {
        client.get(self.data_src + 'cards/' + self.id).then(function (response) {
          var msg = JSON.parse(response.response);
          if (msg.result.received === true) {
            self.reportcard.errors.text = self.locale.card_error_messages.already_received;
            self.router.navigate('error', { replace: true });
          } else {
            self.reportcard.network = msg.result.network;

            self.router.navigate(self.router.routes[1].route, { replace: true });
          }
        }).catch(function (response) {
          if (response.statusCode === 404) {
            self.reportcard.errors.code = response.statusCode;
            self.reportcard.errors.text = self.locale.card_error_messages.unknown_link;
            self.router.navigate('error', { replace: true });
          } else {
            self.reportcard.errors.code = response.statusCode;
            self.reportcard.errors.text = self.locale.card_error_messages.unknown_error + " (" + response.statusText + ")";
            self.router.navigate('error', { replace: true });
          }
        });
      } else {
        self.router.navigate(self.router.routes[1].route, { replace: true });
      }

      self.ea.subscribe('readTerms', function (msg) {
        self.router.navigate('terms');
      });

      self.ea.subscribe('image', function (fileList) {
        self.photoToUpload = fileList[0];
      });

      self.ea.subscribe('submit', function (report) {
        client.put(self.data_src + 'cards/' + self.id, report).then(function (response) {
          if (self.photoToUpload) {
            console.log(self.photoToUpload);

            var _client = new _aureliaHttpClient.HttpClient().configure(function (x) {
              x.withBaseUrl(self.data_src);
              x.withHeader('Content-Type', self.photoToUpload.type);
            });

            _client.get(self.data_src + 'cards/' + _this.id + '/images').then(function (response) {
              console.log(response);
              var msg = JSON.parse(response.response);
              var signedURL = msg.signedRequest;
              console.log('signedURL');
              console.log(signedURL);

              _jquery2.default.ajax({
                url: signedURL,
                type: 'PUT',
                data: self.photoToUpload,
                contentType: false,
                processData: false,
                cache: false,
                error: function error(data) {
                  console.log("Error uploading image to AWS");
                },
                success: function success() {
                  console.log("Uploaded image to AWS successfully!");

                  self.router.navigate('thanks');
                }
              });
            }).catch(function (response) {});
          } else {
            self.router.navigate('thanks');
          }
        }).catch(function (response) {
          console.log(response);
          self.reportcard.errors.code = response.statusCode;
          self.reportcard.errors.text = response.statusText;
          self.router.navigate('error');
        });
      });

      self.ea.subscribe('geolocate', function (error) {
        self.showNotification(error, 'location_1', 'location_1', false);
      });
      self.ea.subscribe('upload', function (error) {
        self.showNotification(error, 'photo_2', 'photo_2', false);
      });
      self.ea.subscribe('size', function (error) {
        self.showNotification(error, 'photo_1', 'photo_1', false);
      });
    };

    Cards.prototype.showNotification = function showNotification(type, header, message, bespoke) {
      var self = this;
      self.notify_type = type;
      self.notify_header = header;
      self.notify_message = message;
      if (bespoke) {
        self.notify_custom = true;
      } else {
        self.notify_custom = false;
      }
      if ((0, _jquery2.default)('#notifyWrapper').hasClass('active')) {
        (0, _jquery2.default)('#notifyWrapper').finish();
      }
      (0, _jquery2.default)('#notifyWrapper').slideDown(300, function () {
        (0, _jquery2.default)('#notifyWrapper').addClass('active');
      }).delay(5000).slideUp(300, function () {
        (0, _jquery2.default)('#notifyWrapper').removeClass('active');
      });
    };

    Cards.prototype.closeNotification = function closeNotification() {
      if ((0, _jquery2.default)('#notifyWrapper').hasClass('active')) {
        (0, _jquery2.default)('#notifyWrapper').dequeue();
      }
    };

    Cards.prototype.logUserAgent = function logUserAgent() {
      var nua = navigator.userAgent.toLowerCase();
      this.showNotification('warning', 'User agent', nua, true);
    };

    Cards.prototype.isLocationSupported = function isLocationSupported() {
      var self = this,
          l = self.reportcard.location.markerLocation;
      self.reportcard.location.supported = false;
      for (var city in self.region_bounds) {
        if (l.lat > self.region_bounds[city].sw[0] && l.lng > self.region_bounds[city].sw[1] && l.lat < self.region_bounds[city].ne[0] && l.lng < self.region_bounds[city].ne[1]) {
          self.reportcard.location.supported = true;
          break;
        }
      }
      return self.reportcard.location.supported;
    };

    Cards.prototype.nextCard = function nextCard() {
      var self = this;
      if (self.router.currentInstruction.fragment === 'location') {
        if (self.isLocationSupported() || self.location_check) {
          self.count = 1;
          self.router.navigate(self.router.routes[self.cardNo].route);
          self.closeNotification();
        }
        if (!self.location_check && !self.isLocationSupported()) {
          self.showNotification('warning', 'location_2', 'location_2', false);
          self.location_check = true;
        }
      } else if (self.router.currentInstruction.fragment !== 'location' && self.cardNo < self.totalCards) {
        self.count = 1;
        self.router.navigate(self.router.routes[self.cardNo].route);
        self.closeNotification();
      }
    };

    Cards.prototype.prevCard = function prevCard() {
      if (this.cardNo > 1) {
        this.count = -1;
        this.router.navigate(this.router.routes[this.cardNo].route);
      }
    };

    _createClass(Cards, [{
      key: 'count',
      get: function get() {
        this.cardNo = this.router.currentInstruction.config.settings.cardNo;
        return this.cardNo;
      },
      set: function set(val) {
        this.cardNo = this.count + val;
      }
    }, {
      key: 'nextDisabled',
      get: function get() {
        if (this.router.currentInstruction.fragment === 'location') {
          return !this.reportcard.location.markerLocation;
        } else {
          return this.cardNo >= this.totalCards - 3;
        }
      }
    }, {
      key: 'prevDisabled',
      get: function get() {
        return this.cardNo === 1;
      }
    }]);

    return Cards;
  }()) || _class);
});
define('routes/landing/landing',['exports', 'jquery'], function (exports, _jquery) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Landing = undefined;

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Landing = exports.Landing = function () {
    function Landing() {
      _classCallCheck(this, Landing);
    }

    Landing.prototype.activate = function activate(params, routerConfig) {
      if (params.city) {
        this.queried_city = params.city;
      }
      this.report_id = params.report;
    };

    Landing.prototype.resizeSidePane = function resizeSidePane() {
      (0, _jquery2.default)('#sidePane').css({
        'height': (0, _jquery2.default)(window).height() - (0, _jquery2.default)('#topBar').height() + 'px'
      });
    };

    Landing.prototype.attached = function attached() {
      var _this = this;

      this.resizeSidePane();
      (0, _jquery2.default)(window).resize(function () {
        _this.resizeSidePane();
      });
    };

    return Landing;
  }();
});
define('routes/cards/card-landing/card-landing',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var CardLanding = exports.CardLanding = function CardLanding() {
    _classCallCheck(this, CardLanding);
  };
});
define('routes/cards/card-template/card-template',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var CardTemplate = exports.CardTemplate = function () {
    function CardTemplate() {
      _classCallCheck(this, CardTemplate);
    }

    CardTemplate.prototype.activate = function activate(params, routerConfig) {};

    CardTemplate.prototype.attached = function attached() {};

    return CardTemplate;
  }();
});
define('routes/cards/depth/depth',['exports', 'aurelia-framework', 'jquery', 'resources/report-card'], function (exports, _aureliaFramework, _jquery, _reportCard) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Depth = undefined;

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Depth = exports.Depth = (_dec = (0, _aureliaFramework.inject)(_reportCard.ReportCard), _dec(_class = function () {
    function Depth(ReportCard) {
      _classCallCheck(this, Depth);

      this.reportcard = ReportCard;
      this.sliderActive = false;

      if (/Mobi/.test(navigator.userAgent)) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    }

    Depth.prototype.attached = function attached() {
      var _this = this;

      (0, _jquery2.default)(document).ready(function () {
        var self = _this,
            imgHeightCm = 220,
            maxHtLimitCm = 195,
            minHtLimitCm = 1,
            refHeightPx = (0, _jquery2.default)('#bgImage').height(),
            fillHeightPx,
            reportHeightCm;
        if (self.reportcard.depth) {
          if (self.reportcard.depth > maxHtLimitCm) {
            reportHeightCm = maxHtLimitCm;
          } else if (self.reportcard.depth < minHtLimitCm) {
            reportHeightCm = minHtLimitCm;
          }
          (0, _jquery2.default)('#floodZone').css({
            'height': self.reportcard.depth * refHeightPx / imgHeightCm + 'px'
          });
        }
        fillHeightPx = (0, _jquery2.default)('#floodZone').height();
        (0, _jquery2.default)('#sliderZone').css({
          'bottom': fillHeightPx + 'px'
        });
        reportHeightCm = fillHeightPx * imgHeightCm / refHeightPx;
        self.reportcard.depth = Math.round(reportHeightCm);

        (0, _jquery2.default)('#sliderZone').on('touchstart mousedown', function (e) {
          self.sliderActive = true;
          (0, _jquery2.default)('.knobHelper').fadeOut(100);
          (0, _jquery2.default)('#knob').css({
            'box-shadow': '0px 0px 12px 8px rgba(179, 214, 239, 0.5)'
          });
          var startPos;
          if (self.isMobile) {
            startPos = e.originalEvent.touches[0].pageY;
          } else {
            startPos = e.clientY;
          }

          (0, _jquery2.default)('#depthWrapper').on('touchmove mousemove', function (e) {
            var dragPos;
            if (self.isMobile) {
              e.preventDefault();
              dragPos = e.originalEvent.touches[0].pageY;
            } else {
              dragPos = e.clientY;
            }
            reportHeightCm = (fillHeightPx + startPos - dragPos) * imgHeightCm / refHeightPx;
            if (self.sliderActive) {
              if (reportHeightCm > minHtLimitCm && reportHeightCm < maxHtLimitCm) {
                (0, _jquery2.default)('#floodZone').css({
                  'height': fillHeightPx + startPos - dragPos + 'px'
                });
                (0, _jquery2.default)('#sliderZone').css({
                  'bottom': fillHeightPx + startPos - dragPos + 'px'
                });
                self.reportcard.depth = Math.round(reportHeightCm);
              } else if (reportHeightCm >= maxHtLimitCm) {
                (0, _jquery2.default)('#floodZone').css({
                  'height': refHeightPx * maxHtLimitCm / imgHeightCm + 'px'
                });
                (0, _jquery2.default)('#sliderZone').css({
                  'bottom': refHeightPx * maxHtLimitCm / imgHeightCm + 'px'
                });
                self.reportcard.depth = maxHtLimitCm;
              } else if (reportHeightCm <= minHtLimitCm) {
                (0, _jquery2.default)('#floodZone').css({
                  'height': minHtLimitCm + 'px'
                });
                (0, _jquery2.default)('#sliderZone').css({
                  'bottom': minHtLimitCm + 'px'
                });
                self.reportcard.depth = minHtLimitCm;
              }
            }
          });
        });

        (0, _jquery2.default)(document).on('touchend mouseup', function () {
          if (self.sliderActive) {
            self.sliderActive = false;
            (0, _jquery2.default)('#knob').css({
              'box-shadow': '0px 0px 12px 8px rgba(49, 170, 222, 0.4)'
            });
            (0, _jquery2.default)('.knobHelper').fadeIn(200);
            fillHeightPx = (0, _jquery2.default)('#floodZone').height();
          }
        });
      });
    };

    return Depth;
  }()) || _class);
});
define('routes/cards/description/description',['exports', 'aurelia-framework', 'resources/report-card'], function (exports, _aureliaFramework, _reportCard) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Description = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Description = exports.Description = (_dec = (0, _aureliaFramework.inject)(_reportCard.ReportCard), _dec(_class = function () {
    function Description(ReportCard) {
      _classCallCheck(this, Description);

      this.reportcard = ReportCard;
      if (/Mobi/.test(navigator.userAgent)) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    }

    Description.prototype.clearText = function clearText() {
      this.reportcard.description.value = null;
    };

    Description.prototype.onBlur = function onBlur() {
      if (this.isMobile) {
        this.focussed = false;
        $('#textarea').css({
          'height': 192 + 'px'
        });
      }
    };

    Description.prototype.onFocus = function onFocus() {
      if (this.isMobile) {
        this.focussed = true;
        $('#textarea').css({
          'height': 80 + 'px'
        });
      }
    };

    Description.prototype.setFocus = function setFocus() {
      $('#textarea').focus();
      this.onFocus();
    };

    return Description;
  }()) || _class);
});
define('routes/cards/error/error',['exports', 'resources/report-card', 'aurelia-framework'], function (exports, _reportCard, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Error = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Error = exports.Error = (_dec = (0, _aureliaFramework.inject)(_reportCard.ReportCard), _dec(_class = function () {
    function Error(ReportCard) {
      _classCallCheck(this, Error);

      this.reportcard = ReportCard;
      this.errorCode = this.reportcard.errors.code;
      this.errorText = this.reportcard.errors.text;
      this.locale = this.reportcard.locale;
    }

    Error.prototype.attached = function attached() {};

    return Error;
  }()) || _class);
});
define('routes/cards/photo/photo',['exports', 'aurelia-framework', 'jquery', 'resources/report-card', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _jquery, _reportCard, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Photo = undefined;

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var wrapper;
  var cntxt;

  var Photo = exports.Photo = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _reportCard.ReportCard), _dec(_class = function () {
    function Photo(ea, ReportCard) {
      _classCallCheck(this, Photo);

      this.ea = ea;
      this.reportcard = ReportCard;
      this.locale = this.reportcard.locale;
      if (this.reportcard.photo.file) {
        this.haveImg = true;
      }
      this.enableUpload = true;
    }

    Photo.prototype.uploadSupported = function uploadSupported() {
      var nua = navigator.userAgent.toLowerCase();
      var version;
      if (nua.indexOf('android') >= 0 && nua.indexOf('chrome') === -1) {
        var rest = nua.substring(nua.indexOf('android') + 8, nua.length);
        version = rest.substring(0, 3);
        return parseFloat(version) >= 4.4;
      } else {
        return true;
      }
    };

    Photo.prototype.attached = function attached() {
      if (this.uploadSupported()) {
        wrapper = this.preview;
        cntxt = wrapper.getContext('2d');
        (0, _jquery2.default)('#previewWrapper').addClass('enabled');
      } else {
        this.ea.publish('upload', 'error');
        this.enableUpload = false;
      }
      if (this.haveImg) {
        this.drawImage(this.reportcard.photo.rotation);
        (0, _jquery2.default)('#rotateButton').prop("disabled", false);
        (0, _jquery2.default)('#deleteButton').prop("disabled", false);
      }
    };

    Photo.prototype.sendClick = function sendClick() {
      (0, _jquery2.default)('#ghostButton').trigger('click');
      this.notify = false;
    };

    Photo.prototype.drawImage = function drawImage(deg) {
      wrapper.width = (0, _jquery2.default)('#canvas').width();
      wrapper.height = (0, _jquery2.default)('#canvas').height();
      var reader = new FileReader();
      reader.onload = function (e) {
        var reviewImg = new Image();
        reviewImg.onload = function () {
          var imgW = void 0;
          var imgH = void 0;
          var trlX = -wrapper.width / 2;
          var trlY = -wrapper.height / 2;
          if (reviewImg.width >= reviewImg.height) {
            imgH = wrapper.height;
            imgW = Math.round(reviewImg.width * imgH / reviewImg.height);
            trlX = trlX + Math.round((wrapper.width - imgW) / 2);
          } else {
            imgW = wrapper.width;
            imgH = Math.round(reviewImg.height * imgW / reviewImg.width);
            trlY = trlY + Math.round((wrapper.height - imgH) / 2);
          }
          cntxt.translate(wrapper.width / 2, wrapper.height / 2);
          cntxt.rotate(deg * Math.PI / 180);
          cntxt.drawImage(reviewImg, trlX, trlY, imgW, imgH);
        };
        reviewImg.src = e.target.result;
      };
      reader.readAsDataURL(this.reportcard.photo.file[0]);
      (0, _jquery2.default)('#rotateButton').prop("disabled", false);
      (0, _jquery2.default)('#deleteButton').prop("disabled", false);
    };

    Photo.prototype.sizeCheck = function sizeCheck() {
      if (this.reportcard.photo.file[0]) {
        if (this.reportcard.photo.file[0].size < 4404019) {
          this.drawImage(0);
        } else {
          this.ea.publish('size', 'error');
          this.reportcard.photo.file = null;
        }
      }
    };

    Photo.prototype.rotatePhoto = function rotatePhoto() {
      this.reportcard.photo.rotation += 90;
      this.drawImage(this.reportcard.photo.rotation);
    };

    Photo.prototype.deletePhoto = function deletePhoto() {
      cntxt.translate(-wrapper.width / 2, -wrapper.height / 2);
      cntxt.clearRect(0, 0, wrapper.width, wrapper.height);
      this.reportcard.photo.file = null;
      (0, _jquery2.default)('#rotateButton').prop("disabled", true);
      (0, _jquery2.default)('#deleteButton').prop("disabled", true);
      this.reportcard.photo.rotation = 0;
    };

    return Photo;
  }()) || _class);
});
define('routes/cards/location/location',['exports', 'resources/config', 'leaflet', 'aurelia-framework', 'resources/report-card', 'aurelia-event-aggregator'], function (exports, _config, _leaflet, _aureliaFramework, _reportCard, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Location = undefined;

  var L = _interopRequireWildcard(_leaflet);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Location = exports.Location = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _reportCard.ReportCard, _config.Config), _dec(_class = function () {
    function Location(EventAggregator, ReportCard, Config) {
      _classCallCheck(this, Location);

      this.ea = EventAggregator;
      this.reportcard = ReportCard;
      this.tileLayer = Config.cards.tile_layer;
    }

    Location.prototype.drawGpsMarkers = function drawGpsMarkers(center, accuracy, map) {
      L.circle(center, {
        weight: 0,
        fillColor: '#31aade',
        fillOpacity: 0.15,
        radius: accuracy / 2
      }).addTo(map);
      L.circleMarker(center, {
        color: 'white',
        weight: 1,
        fillColor: '#31aade',
        fillOpacity: 1,
        radius: 8
      }).addTo(map);
    };

    Location.prototype.attached = function attached() {
      var _this = this;

      $(document).ready(function () {

        var self = _this;

        self.map = L.map('mapWrapper', {
          attributionControl: false,
          center: [13.017163, 80.185031],
          zoom: 15
        });
        L.tileLayer(self.tileLayer, {
          detectRetina: true,
          ext: 'png'
        }).addTo(self.map);

        L.Control.GeoLocate = L.Control.extend({
          onAdd: function onAdd(map) {
            var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
            container.innerHTML = '<i class="icon-geolocate"></i>';
            container.style.fontSize = '21px';
            container.style.textAlign = 'center';
            container.style.lineHeight = '30px';
            container.style.color = 'black';
            container.style.backgroundColor = 'white';
            container.style.width = '30px';
            container.style.height = '30px';
            container.onclick = function () {
              if (self.reportcard.location.gpsLocation) {
                self.map.flyTo(self.reportcard.location.gpsLocation, 16);
              }
            };
            return container;
          }
        });
        L.control.geoLocate = function (opts) {
          return new L.Control.GeoLocate(opts);
        };

        if (self.reportcard.location.markerLocation) {
          self.map.setView(self.reportcard.location.markerLocation, 15);

          if (self.reportcard.location.gpsLocation) {
            L.control.geoLocate({ position: 'bottomright' }).addTo(self.map);
            self.drawGpsMarkers(self.reportcard.location.gpsLocation, self.reportcard.location.accuracy, self.map);
          }
        } else if (!!navigator.geolocation) {
          self.map.locate({
            setView: true
          });
          self.map.on('locationfound', function (e) {
            L.control.geoLocate({ position: 'bottomright' }).addTo(self.map);
            self.drawGpsMarkers(e.latlng, e.accuracy, self.map);
            self.reportcard.location = { markerLocation: e.latlng, gpsLocation: e.latlng, accuracy: e.accuracy };
          });

          self.map.on('locationerror', function () {
            self.reportcard.location.markerLocation = self.map.getCenter();
            self.ea.publish('geolocate', 'error');
          });
        } else {
          self.reportcard.location.markerLocation = self.map.getCenter();
        }

        self.map.on('moveend', function () {
          if (self.map) {
            self.reportcard.location.markerLocation = self.map.getCenter();
          }
        });
      });
    };

    return Location;
  }()) || _class);
});
define('routes/cards/review/review',['exports', 'resources/report-card', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _reportCard, _aureliaFramework, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Review = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _dec, _class;

  var Review = exports.Review = (_dec = (0, _aureliaFramework.inject)(_reportCard.ReportCard, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Review(ReportCard, ea) {
      _classCallCheck(this, Review);

      this.reportcard = ReportCard;
      this.ea = ea;
      var description = "";
      if (this.reportcard.description.value) {
        description = this.reportcard.description.value;
      }
      this.report = {
        text: description,
        water_depth: Math.round(this.reportcard.depth),
        created_at: new Date().toISOString(),
        image_url: '',
        location: this.reportcard.location.markerLocation
      };
      this.imageObject = this.reportcard.photo.file;

      if (/Mobi/.test(navigator.userAgent)) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    }

    Review.prototype.attached = function attached() {
      var _this = this;

      $(document).ready(function () {
        if (_this.imageObject) {
          _this.drawImage(_this.reportcard.photo.rotation);
        }

        var self = _this;

        if (_this.checkRequiredInputs) {
          var slideRange = $('#submitSlider').width() - $('#submitKnob').width(),
              slideThreshold = 0.9,
              slideTranslate = 0,
              slidePressed = false;
          self.swiped = false;

          $('#submitKnob').on('touchstart mousedown', function (e) {
            var slideStartPos;
            if (self.isMobile) {
              slideStartPos = e.originalEvent.touches[0].pageX;
            } else {
              slideStartPos = e.clientX;
            }
            slidePressed = true;

            $('#reviewWrapper').on('touchmove mousemove', function (e) {
              var slideDragPos;
              if (self.isMobile) {
                e.preventDefault();
                slideDragPos = e.originalEvent.touches[0].pageX;
              } else {
                slideDragPos = e.clientX;
              }
              slideTranslate = slideDragPos - slideStartPos;
              if (slidePressed && slideTranslate >= 0 && slideTranslate < slideRange) {
                $('#submitKnob').css({
                  'left': slideTranslate + 'px'
                });
                $('#submitSlider').css({
                  'background-color': 'rgba(31, 73, 99, ' + slideTranslate / (slideThreshold * slideRange) + ')'
                });

                if (slideTranslate >= slideThreshold * slideRange && !self.swiped) {
                  self.swiped = true;
                  slidePressed = false;
                  self.ea.publish('submit', self.report);
                  self.ea.publish('image', self.imageObject);
                }
              }
            });

            $(window).on('touchend mouseup', function () {
              if (slidePressed && slideTranslate < slideThreshold * slideRange && !self.swiped) {
                slidePressed = false;
                $('#submitKnob').animate({
                  'left': 0 + 'px'
                }, 50);
                $('#submitSlider').css({
                  'background-color': 'transparent'
                });
              }
            });
          });
        } else {
          $('#submitKnob').css({
            'background-color': '#a0a0a0'
          });
        }
      });
    };

    Review.prototype.readTerms = function readTerms() {
      this.ea.publish('readTerms', 'click');
    };

    Review.prototype.drawImage = function drawImage(deg) {
      var wrapper = this.preview;
      wrapper.width = $('#photo').width();
      wrapper.height = $('#photo').height();
      var reader = new FileReader();
      reader.onload = function (e) {
        var reviewImg = new Image();
        reviewImg.onload = function () {
          var imgW = void 0;
          var imgH = void 0;
          var trlX = -wrapper.width / 2;
          var trlY = -wrapper.height / 2;
          if (reviewImg.width >= reviewImg.height) {
            imgH = wrapper.height;
            imgW = Math.round(reviewImg.width * imgH / reviewImg.height);
            trlX = trlX + Math.round((wrapper.width - imgW) / 2);
          } else {
            imgW = wrapper.width;
            imgH = Math.round(reviewImg.height * imgW / reviewImg.width);
            trlY = trlY + Math.round((wrapper.height - imgH) / 2);
          }
          var cntxt = wrapper.getContext('2d');
          cntxt.translate(wrapper.width / 2, wrapper.height / 2);
          cntxt.rotate(deg * Math.PI / 180);
          cntxt.drawImage(reviewImg, trlX, trlY, imgW, imgH);
        };
        reviewImg.src = e.target.result;
      };
      reader.readAsDataURL(this.reportcard.photo.file[0]);
    };

    _createClass(Review, [{
      key: 'checkRequiredInputs',
      get: function get() {
        if (this.report.location && this.report.water_depth && (this.imageObject || this.report.text)) {
          return true;
        } else {
          return false;
        }
      }
    }]);

    return Review;
  }()) || _class);
});
define('routes/cards/terms/terms',['exports', 'jquery', 'resources/report-card', 'aurelia-framework'], function (exports, _jquery, _reportCard, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Terms = undefined;

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Terms = exports.Terms = (_dec = (0, _aureliaFramework.inject)(_reportCard.ReportCard), _dec(_class = function Terms(ReportCard) {
    _classCallCheck(this, Terms);

    this.locale = ReportCard.locale;
  }) || _class);
});
define('routes/cards/thanks/thanks',['exports', 'resources/report-card', 'aurelia-framework'], function (exports, _reportCard, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Thanks = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Thanks = exports.Thanks = (_dec = (0, _aureliaFramework.inject)(_reportCard.ReportCard), _dec(_class = function () {
    function Thanks(ReportCard) {
      _classCallCheck(this, Thanks);

      this.reportcard = ReportCard;
    }

    Thanks.prototype.attached = function attached() {
      var self = this;
      self.network_name = this.reportcard.network.charAt(0).toUpperCase() + this.reportcard.network.slice(1);
      window.setTimeout(function () {
        window.location.replace('/map');
      }, 3000);
    };

    return Thanks;
  }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./app.css\"></require>\n  <require from=\"./styleSheets/themeGuide.css\"></require>\n  <router-view></router-view>\n</template>\n"; });
define('text!components/card-notification/card-notification.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./card-notification.css\"></require>\n  <div id=\"notifyWrapper\">\n    <div id=\"symbol\">\n      <i class=\"icon-attention-circled\" if.bind=\"type === 'warning'\"></i>\n      <i class=\"icon-error-alt\" if.bind=\"type === 'error'\"></i>\n    </div>\n    <div id=\"msg\">\n      <h3 if.bind=\"!bespoke\">${locale.notification.header[header]}</h3>\n      <h3 if.bind=\"bespoke\">${header}</h3>\n      <p if.bind=\"!bespoke\" innerhtml.bind=\"locale.notification.message[message]\"></p>\n      <p if.bind=\"bespoke\">${message}</p>\n    </div>\n    <div id=\"closeNotification\" click.delegate=\"callClose()\">\n      <i class=\"icon-cancel-circled-outline\"></i>\n    </div>\n  </div>\n</template>\n"; });
define('text!components/component-template/component-template.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./component-template.css\"></require>\n</template>\n"; });
define('text!app.css', ['module'], function(module) { module.exports = "::-webkit-scrollbar {\n  display: none;\n}\nbody,\nhtml {\n  background-color: #808080;\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n  overflow: hidden;\n}\n"; });
define('text!components/depth-bg/depth-bg.html', ['module'], function(module) { module.exports = "<template>\n  <svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n  \t viewBox=\"246.6 0 595.3 595.3\" enable-background=\"new 246.6 0 595.3 595.3\" xml:space=\"preserve\">\n  <path opacity=\"0.4\" fill=\"#FFFFFF\" enable-background=\"new    \" d=\"M696,528.1L696,528.1c-1,0-1.5,0.5-1.5,1.4\n  \tc0,0.9,0.6,1.4,1.4,1.4s1.5-0.5,1.5-1.4C697.4,528.6,696.8,528.1,696,528.1z M639.6,528.1L639.6,528.1c-1,0-1.5,0.5-1.5,1.4\n  \tc0,0.9,0.6,1.4,1.4,1.4c0.9,0,1.5-0.5,1.5-1.4C641,528.6,640.4,528.1,639.6,528.1z M687.9,528.1L687.9,528.1c-1,0-1.5,0.5-1.5,1.4\n  \tc0,0.9,0.6,1.4,1.4,1.4h0.1c0.7,0,1.4-0.5,1.4-1.4C689.3,528.6,688.6,528.1,687.9,528.1z M671.7,528.1L671.7,528.1\n  \tc-1,0-1.5,0.5-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1c0.7,0,1.4-0.5,1.4-1.4C673.1,528.6,672.5,528.1,671.7,528.1z M663.8,528.1\n  \tL663.8,528.1c-1,0-1.5,0.5-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4c0.7,0,1.5-0.5,1.5-1.4C665.2,528.6,664.5,528.1,663.8,528.1z M647.5,528.1\n  \tL647.5,528.1c-1,0-1.5,0.5-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1c0.9,0,1.4-0.5,1.4-1.4C648.9,528.6,648.3,528.1,647.5,528.1z\n  \t M752.3,528.1L752.3,528.1c-1,0-1.5,0.5-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4c0.7,0,1.5-0.5,1.5-1.4C753.7,528.6,753.1,528.1,752.3,528.1z\n  \t M679.9,528.1L679.9,528.1c-1,0-1.5,0.5-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4c0.7,0,1.5-0.5,1.5-1.4C681.3,528.6,680.7,528.1,679.9,528.1z\n  \t M736.2,528.1L736.2,528.1c-1,0-1.5,0.5-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4c0.7,0,1.5-0.5,1.5-1.4C737.6,528.6,737,528.1,736.2,528.1z\n  \t M744.2,528.1L744.2,528.1c-1,0-1.5,0.5-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1c0.7,0,1.4-0.5,1.4-1.4\n  \tC745.6,528.6,744.9,528.1,744.2,528.1z M703.8,528.1L703.8,528.1c-1,0-1.5,0.5-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1\n  \tc0.9,0,1.4-0.5,1.4-1.4C705.2,528.6,704.6,528.1,703.8,528.1z M728,528.1L728,528.1c-1,0-1.5,0.5-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1\n  \tc0.7,0,1.4-0.5,1.4-1.4C729.4,528.6,728.8,528.1,728,528.1z M720.1,528.1L720.1,528.1c-1,0-1.5,0.5-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.9,0,1.5-0.5,1.5-1.4C721.5,528.6,720.8,528.1,720.1,528.1z M712,528.1L712,528.1c-1,0-1.5,0.5-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.9,0,1.5-0.5,1.5-1.4C713.4,528.6,712.8,528.1,712,528.1z M655.7,528.1L655.7,528.1c-1,0-1.5,0.5-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.9,0,1.5-0.5,1.5-1.4C657.1,528.6,656.5,528.1,655.7,528.1z M543,530.8c0.7,0,1.5-0.5,1.5-1.4c0-0.9-0.6-1.4-1.4-1.4H543\n  \tc-0.9,0-1.4,0.5-1.4,1.4C541.6,530.3,542.3,530.8,543,530.8z M526.9,530.8L526.9,530.8c0.7,0,1.5-0.5,1.5-1.4c0-0.9-0.6-1.4-1.4-1.4\n  \th-0.1c-0.9,0-1.4,0.5-1.4,1.4C525.5,530.3,526.1,530.8,526.9,530.8z M631.5,528.1h-0.1c-0.9,0-1.4,0.5-1.4,1.4\n  \tc0,0.9,0.6,1.4,1.4,1.4h0.1c0.7,0,1.4-0.5,1.4-1.4C632.9,528.6,632.3,528.1,631.5,528.1z M551.1,530.8c0.7,0,1.5-0.5,1.5-1.4\n  \tc0-0.9-0.6-1.4-1.4-1.4h-0.1c-0.9,0-1.4,0.5-1.4,1.4C549.7,530.3,550.3,530.8,551.1,530.8z M575,530.8L575,530.8\n  \tc1,0,1.5-0.5,1.5-1.4c0-0.9-0.6-1.4-1.4-1.4H575c-0.9,0-1.4,0.5-1.4,1.4C573.6,530.3,574.3,530.8,575,530.8z M486.8,528.1h-0.1\n  \tc-0.9,0-1.4,0.5-1.4,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1c0.6,0,1.4-0.5,1.4-1.4C488.2,528.6,487.6,528.1,486.8,528.1z M478.8,528.1h-0.2\n  \tc-0.9,0-1.4,0.5-1.4,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1c0.6,0,1.4-0.5,1.4-1.4C480.1,528.6,479.5,528.1,478.8,528.1z M534.9,530.8\n  \tL534.9,530.8c0.7,0,1.5-0.5,1.5-1.4c0-0.9-0.6-1.4-1.4-1.4h-0.1c-0.9,0-1.4,0.5-1.4,1.4C533.5,530.3,534.2,530.8,534.9,530.8z\n  \t M615.4,528.1L615.4,528.1c-1,0-1.5,0.5-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1c0.7,0,1.4-0.5,1.4-1.4\n  \tC616.8,528.6,616.2,528.1,615.4,528.1z M607.5,528.1h-0.1c-0.9,0-1.4,0.5-1.4,1.4c0,0.9,0.6,1.4,1.4,1.4c0.8,0,1.5-0.5,1.5-1.4\n  \tC608.9,528.6,608.2,528.1,607.5,528.1z M518.9,530.8c0.7,0,1.5-0.5,1.5-1.4c0-0.9-0.6-1.4-1.4-1.4h-0.1c-0.9,0-1.4,0.5-1.4,1.4\n  \tC517.5,530.3,518.2,530.8,518.9,530.8z M623.6,528.1L623.6,528.1c-1,0-1.5,0.5-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4c0.7,0,1.5-0.5,1.5-1.4\n  \tC625,528.6,624.4,528.1,623.6,528.1z M510.9,530.8c0.7,0,1.5-0.5,1.5-1.4c0-0.9-0.6-1.4-1.4-1.4h-0.1c-0.9,0-1.4,0.5-1.4,1.4\n  \tC509.5,530.3,510.1,530.8,510.9,530.8z M494.8,530.8L494.8,530.8c0.7,0,1.5-0.5,1.5-1.4c0-0.9-0.6-1.4-1.4-1.4h-0.1\n  \tc-0.9,0-1.4,0.5-1.4,1.4C493.4,530.3,494,530.8,494.8,530.8z M502.7,530.8h0.1c0.7,0,1.4-0.5,1.4-1.4c0-0.9-0.6-1.4-1.4-1.4h-0.1\n  \tc-0.9,0-1.4,0.5-1.4,1.4C501.3,530.3,502,530.8,502.7,530.8z M768.3,528.1L768.3,528.1c-1,0-1.5,0.5-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.9,0,1.5-0.5,1.5-1.4C769.7,528.6,769.1,528.1,768.3,528.1z M800.5,528.1L800.5,528.1c-1,0-1.5,0.5-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \th0.1c0.7,0,1.4-0.5,1.4-1.4C801.9,528.6,801.2,528.1,800.5,528.1z M808.6,528.1L808.6,528.1c-1,0-1.5,0.5-1.5,1.4\n  \tc0,0.9,0.6,1.4,1.4,1.4c0.7,0,1.5-0.5,1.5-1.4C810,528.6,809.4,528.1,808.6,528.1z M792.5,528.1L792.5,528.1c-1,0-1.5,0.5-1.5,1.4\n  \tc0,0.9,0.6,1.4,1.4,1.4c0.7,0,1.5-0.5,1.5-1.4C793.9,528.6,793.3,528.1,792.5,528.1z M784.5,528.1L784.5,528.1c-1,0-1.5,0.5-1.5,1.4\n  \tc0,0.9,0.6,1.4,1.4,1.4c0.9,0,1.5-0.5,1.5-1.4C785.9,528.6,785.2,528.1,784.5,528.1z M832.7,528.1L832.7,528.1c-1,0-1.5,0.5-1.5,1.4\n  \tc0,0.9,0.6,1.4,1.4,1.4c0.9,0,1.5-0.5,1.5-1.4C834.1,528.6,833.4,528.1,832.7,528.1z M776.4,528.1L776.4,528.1c-1,0-1.5,0.5-1.5,1.4\n  \tc0,0.9,0.6,1.4,1.4,1.4c0.9,0,1.5-0.5,1.5-1.4C777.8,528.6,777.1,528.1,776.4,528.1z M816.6,528.1L816.6,528.1c-1,0-1.5,0.5-1.5,1.4\n  \tc0,0.9,0.6,1.4,1.4,1.4h0.1c0.7,0,1.4-0.5,1.4-1.4C818,528.6,817.3,528.1,816.6,528.1z M824.8,528.1h-0.2c-0.9,0-1.4,0.5-1.4,1.4\n  \tc0,0.9,0.6,1.4,1.4,1.4c0.7,0,1.5-0.5,1.5-1.4C826.1,528.6,825.5,528.1,824.8,528.1z M760.3,528.1L760.3,528.1c-1,0-1.5,0.5-1.5,1.4\n  \tc0,0.9,0.6,1.4,1.4,1.4h0.1c0.7,0,1.4-0.5,1.4-1.4C761.7,528.6,761,528.1,760.3,528.1z M631.5,462.1h-0.1c-0.9,0-1.4,0.6-1.4,1.4\n  \tc0,0.9,0.6,1.4,1.4,1.4h0.1c0.7,0,1.2-0.5,1.4-1.4C632.9,462.6,632.3,462.1,631.5,462.1z M671.7,462.1L671.7,462.1\n  \tc-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1c0.7,0,1.4-0.5,1.4-1.4S672.5,462.1,671.7,462.1z M502.7,464.8h0.1\n  \tc0.7,0,1.4-0.5,1.4-1.4s-0.6-1.4-1.4-1.4h-0.1c-0.9,0-1.4,0.6-1.4,1.4C501.3,464.3,502,464.8,502.7,464.8z M687.9,462.1L687.9,462.1\n  \tc-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1c0.7,0,1.2-0.5,1.4-1.4C689.2,462.6,688.6,462.1,687.9,462.1z M808.6,462.1\n  \tL808.6,462.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4c0.7,0,1.5-0.5,1.5-1.4S809.4,462.1,808.6,462.1z M679.9,462.1L679.9,462.1\n  \tc-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4c0.7,0,1.4-0.5,1.5-1.4C681.3,462.6,680.7,462.1,679.9,462.1z M510.9,464.8\n  \tc0.7,0,1.5-0.5,1.5-1.4s-0.6-1.4-1.4-1.4h-0.1c-0.9,0-1.4,0.6-1.4,1.4C509.5,464.3,510.1,464.8,510.9,464.8z M518.9,464.8\n  \tc0.7,0,1.5-0.5,1.5-1.4s-0.6-1.4-1.4-1.4h-0.1c-0.9,0-1.4,0.6-1.4,1.4C517.6,464.3,518.2,464.8,518.9,464.8z M647.5,462.1\n  \tL647.5,462.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1c0.9,0,1.4-0.5,1.4-1.4S648.3,462.1,647.5,462.1z M623.6,462.1\n  \tL623.6,462.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4c0.7,0,1.4-0.5,1.5-1.4C625,462.6,624.4,462.1,623.6,462.1z M663.8,462.1\n  \tL663.8,462.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4c0.7,0,1.5-0.5,1.5-1.4S664.5,462.1,663.8,462.1z M792.5,462.1L792.5,462.1\n  \tc-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4c0.7,0,1.5-0.5,1.5-1.4S793.3,462.1,792.5,462.1z M639.6,462.1L639.6,462.1\n  \tc-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4c0.9,0,1.5-0.5,1.5-1.4S640.4,462.1,639.6,462.1z M615.4,462.1L615.4,462.1\n  \tc-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1c0.7,0,1.2-0.5,1.4-1.4C616.8,462.6,616.2,462.1,615.4,462.1z M494.8,464.8\n  \tL494.8,464.8c0.7,0,1.3-0.5,1.5-1.4c0-0.9-0.6-1.4-1.4-1.4h-0.1c-0.9,0-1.4,0.6-1.4,1.4C493.4,464.3,494,464.8,494.8,464.8z\n  \t M800.5,462.1L800.5,462.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1c0.7,0,1.4-0.5,1.4-1.4\n  \tC801.8,462.6,801.2,462.1,800.5,462.1z M655.7,462.1L655.7,462.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4c0.9,0,1.5-0.5,1.5-1.4\n  \tS656.5,462.1,655.7,462.1z M607.5,462.1h-0.1c-0.9,0-1.4,0.6-1.4,1.4c0,0.9,0.6,1.4,1.4,1.4c0.8,0,1.5-0.5,1.5-1.4\n  \tS608.2,462.1,607.5,462.1z M784.5,462.1L784.5,462.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4c0.9,0,1.5-0.5,1.5-1.4\n  \tC785.8,462.6,785.2,462.1,784.5,462.1z M728,462.1L728,462.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1c0.7,0,1.4-0.5,1.4-1.4\n  \tS728.8,462.1,728,462.1z M832.7,462.1L832.7,462.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4c0.9,0,1.5-0.5,1.5-1.4\n  \tS833.4,462.1,832.7,462.1z M768.3,462.1L768.3,462.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4c0.9,0,1.5-0.5,1.5-1.4\n  \tS769.1,462.1,768.3,462.1z M824.8,462.1h-0.2c-0.9,0-1.4,0.6-1.4,1.4c0,0.9,0.6,1.4,1.4,1.4c0.7,0,1.4-0.5,1.5-1.4\n  \tC826.1,462.6,825.5,462.1,824.8,462.1z M720.1,462.1L720.1,462.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4c0.9,0,1.5-0.5,1.5-1.4\n  \tS720.8,462.1,720.1,462.1z M478.8,462.1h-0.2c-0.9,0-1.4,0.6-1.4,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1c0.6,0,1.2-0.5,1.4-1.4\n  \tC480.1,462.6,479.5,462.1,478.8,462.1z M744.2,462.1L744.2,462.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1\n  \tc0.7,0,1.2-0.5,1.4-1.4C745.5,462.6,744.9,462.1,744.2,462.1z M752.3,462.1L752.3,462.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.7,0,1.4-0.5,1.5-1.4C753.7,462.6,753.1,462.1,752.3,462.1z M736.2,462.1L736.2,462.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.7,0,1.5-0.5,1.5-1.4S737,462.1,736.2,462.1z M567.2,462.1h-0.1c-0.9,0-1.4,0.6-1.4,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.9,0,1.5-0.5,1.5-1.4C568.5,462.6,567.9,462.1,567.2,462.1z M760.3,462.1L760.3,462.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \th0.1c0.7,0,1.2-0.5,1.4-1.4C761.6,462.6,761,462.1,760.3,462.1z M696,462.1L696,462.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \ts1.4-0.5,1.5-1.4C697.4,462.6,696.8,462.1,696,462.1z M486.8,462.1h-0.1c-0.9,0-1.4,0.6-1.4,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1\n  \tc0.6,0,1.2-0.5,1.4-1.4C488.2,462.6,487.6,462.1,486.8,462.1z M776.4,462.1L776.4,462.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.9,0,1.5-0.5,1.5-1.4S777.1,462.1,776.4,462.1z M703.8,462.1L703.8,462.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1\n  \tc0.9,0,1.4-0.5,1.4-1.4S704.6,462.1,703.8,462.1z M816.6,462.1L816.6,462.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1\n  \tc0.7,0,1.2-0.5,1.4-1.4C817.9,462.6,817.3,462.1,816.6,462.1z M526.9,464.8L526.9,464.8c0.7,0,1.5-0.5,1.5-1.4s-0.6-1.4-1.4-1.4\n  \th-0.1c-0.9,0-1.4,0.6-1.4,1.4C525.5,464.3,526.1,464.8,526.9,464.8z M712,462.1L712,462.1c-1,0-1.5,0.6-1.5,1.4\n  \tc0,0.9,0.6,1.4,1.4,1.4c0.9,0,1.5-0.5,1.5-1.4S712.8,462.1,712,462.1z M792.5,330.1L792.5,330.1c-1,0-1.5,0.6-1.5,1.4\n  \tc0,0.9,0.6,1.4,1.4,1.4c0.7,0,1.5-0.5,1.5-1.4S793.3,330.1,792.5,330.1z M824.8,330.1h-0.2c-0.9,0-1.4,0.6-1.4,1.4\n  \tc0,0.9,0.6,1.4,1.4,1.4c0.7,0,1.4-0.5,1.5-1.4C826.1,330.6,825.5,330.1,824.8,330.1z M494.8,332.9L494.8,332.9\n  \tc0.7,0,1.3-0.5,1.5-1.4c0-0.9-0.6-1.4-1.4-1.4h-0.1c-0.9,0-1.4,0.6-1.4,1.4C493.4,332.4,494,332.9,494.8,332.9z M816.6,330.1\n  \tL816.6,330.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1c0.7,0,1.2-0.5,1.4-1.4C817.9,330.6,817.3,330.1,816.6,330.1z\n  \t M832.7,330.1L832.7,330.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4c0.9,0,1.5-0.5,1.5-1.4S833.4,330.1,832.7,330.1z\n  \t M808.6,330.1L808.6,330.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4c0.7,0,1.5-0.5,1.5-1.4S809.4,330.1,808.6,330.1z\n  \t M800.5,330.1L800.5,330.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1c0.7,0,1.4-0.5,1.4-1.4S801.2,330.1,800.5,330.1z\n  \t M510.9,332.9c0.7,0,1.5-0.5,1.5-1.4s-0.6-1.4-1.4-1.4h-0.1c-0.9,0-1.4,0.6-1.4,1.4C509.5,332.4,510.1,332.9,510.9,332.9z\n  \t M486.8,330.1h-0.1c-0.9,0-1.4,0.6-1.4,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1c0.6,0,1.2-0.5,1.4-1.4C488.2,330.6,487.6,330.1,486.8,330.1z\n  \t M502.7,332.9h0.1c0.7,0,1.4-0.5,1.4-1.4s-0.6-1.4-1.4-1.4h-0.1c-0.9,0-1.4,0.6-1.4,1.4C501.3,332.4,502,332.9,502.7,332.9z\n  \t M631.5,330.1h-0.1c-0.9,0-1.4,0.6-1.4,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1c0.7,0,1.2-0.5,1.4-1.4C632.9,330.6,632.3,330.1,631.5,330.1z\n  \t M687.9,330.1L687.9,330.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1c0.7,0,1.2-0.5,1.4-1.4\n  \tC689.2,330.6,688.6,330.1,687.9,330.1z M703.8,330.1L703.8,330.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1\n  \tc0.9,0,1.4-0.5,1.4-1.4S704.6,330.1,703.8,330.1z M696,330.1L696,330.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4s1.4-0.5,1.5-1.4\n  \tC697.4,330.6,696.8,330.1,696,330.1z M776.4,330.1L776.4,330.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4c0.9,0,1.5-0.5,1.5-1.4\n  \tS777.1,330.1,776.4,330.1z M663.8,330.1L663.8,330.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4c0.7,0,1.5-0.5,1.5-1.4\n  \tS664.5,330.1,663.8,330.1z M679.9,330.1L679.9,330.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4c0.7,0,1.4-0.5,1.5-1.4\n  \tC681.3,330.6,680.7,330.1,679.9,330.1z M671.7,330.1L671.7,330.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1\n  \tc0.7,0,1.4-0.5,1.4-1.4S672.5,330.1,671.7,330.1z M784.5,330.1L784.5,330.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.9,0,1.5-0.5,1.5-1.4S785.2,330.1,784.5,330.1z M712,330.1L712,330.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.9,0,1.5-0.5,1.5-1.4S712.8,330.1,712,330.1z M744.2,330.1L744.2,330.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1\n  \tc0.7,0,1.2-0.5,1.4-1.4C745.5,330.6,744.9,330.1,744.2,330.1z M752.3,330.1L752.3,330.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.7,0,1.4-0.5,1.5-1.4C753.7,330.6,753.1,330.1,752.3,330.1z M736.2,330.1L736.2,330.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.7,0,1.5-0.5,1.5-1.4S737,330.1,736.2,330.1z M768.3,330.1L768.3,330.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.9,0,1.5-0.5,1.5-1.4S769.1,330.1,768.3,330.1z M728,330.1L728,330.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1\n  \tc0.7,0,1.4-0.5,1.4-1.4S728.8,330.1,728,330.1z M720.1,330.1L720.1,330.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.9,0,1.5-0.5,1.5-1.4S720.8,330.1,720.1,330.1z M760.3,330.1L760.3,330.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1\n  \tc0.7,0,1.2-0.5,1.4-1.4C761.6,330.6,761,330.1,760.3,330.1z M647.5,330.1L647.5,330.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \th0.1c0.9,0,1.4-0.5,1.4-1.4S648.3,330.1,647.5,330.1z M639.6,330.1L639.6,330.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.9,0,1.5-0.5,1.5-1.4S640.4,330.1,639.6,330.1z M655.7,330.1L655.7,330.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.9,0,1.5-0.5,1.5-1.4S656.5,330.1,655.7,330.1z M703.8,198.3L703.8,198.3c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1\n  \tc0.9,0,1.4-0.5,1.4-1.4S704.6,198.3,703.8,198.3z M422.5,198.3h-0.1c-0.9,0-1.4,0.6-1.4,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1\n  \tc0.6,0,1.2-0.5,1.4-1.4C423.8,198.8,423.2,198.3,422.5,198.3z M414.4,198.3h-0.1c-0.9,0-1.4,0.6-1.4,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1\n  \tc0.6,0,1.2-0.5,1.4-1.4C415.8,198.8,415.1,198.3,414.4,198.3z M406.5,198.3L406.5,198.3c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.6,0,1.5-0.5,1.5-1.4C407.8,198.8,407.2,198.3,406.5,198.3z M438.5,198.3h-0.1c-0.9,0-1.4,0.6-1.4,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1\n  \tc0.7,0,1.4-0.5,1.4-1.4C439.8,198.8,439.2,198.3,438.5,198.3z M816.6,198.3L816.6,198.3c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \th0.1c0.7,0,1.2-0.5,1.4-1.4C817.9,198.8,817.3,198.3,816.6,198.3z M712,198.3L712,198.3c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.9,0,1.5-0.5,1.5-1.4S712.8,198.3,712,198.3z M398.4,198.3L398.4,198.3c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.6,0,1.5-0.5,1.5-1.4S399.1,198.3,398.4,198.3z M430.5,198.3h-0.1c-0.9,0-1.4,0.6-1.4,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1\n  \tc0.6,0,1.2-0.5,1.4-1.4C431.9,198.8,431.3,198.3,430.5,198.3z M639.6,198.3L639.6,198.3c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.9,0,1.5-0.5,1.5-1.4S640.4,198.3,639.6,198.3z M792.5,198.3L792.5,198.3c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.7,0,1.5-0.5,1.5-1.4S793.3,198.3,792.5,198.3z M832.7,198.3L832.7,198.3c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.9,0,1.5-0.5,1.5-1.4S833.4,198.3,832.7,198.3z M840.5,528.1L840.5,528.1c-1,0-1.5,0.5-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.9,0,1.5-0.5,1.5-1.4C841.9,528.6,841.2,528.1,840.5,528.1z M840.5,462.1L840.5,462.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.9,0,1.5-0.5,1.5-1.4S841.2,462.1,840.5,462.1z M840.5,330.1L840.5,330.1c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.9,0,1.5-0.5,1.5-1.4S841.2,330.1,840.5,330.1z M840.5,198.3L840.5,198.3c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.9,0,1.5-0.5,1.5-1.4S841.2,198.3,840.5,198.3z M390.2,198.3L390.2,198.3c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.5,1.4\n  \tc0.7,0,1.4-0.5,1.4-1.4S391,198.3,390.2,198.3z M824.8,198.3h-0.2c-0.9,0-1.4,0.6-1.4,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.7,0,1.4-0.5,1.5-1.4C826.1,198.8,825.5,198.3,824.8,198.3z M382.2,198.3h-0.1c-0.9,0-1.4,0.6-1.4,1.4c0,0.9,0.6,1.4,1.5,1.4\n  \tc0.7,0,1.4-0.5,1.4-1.4C383.5,198.8,382.9,198.3,382.2,198.3z M784.5,198.3L784.5,198.3c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.9,0,1.5-0.5,1.5-1.4C785.8,198.8,785.2,198.3,784.5,198.3z M720.1,198.3L720.1,198.3c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.9,0,1.5-0.5,1.5-1.4S720.8,198.3,720.1,198.3z M647.5,198.3L647.5,198.3c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1\n  \tc0.9,0,1.4-0.5,1.4-1.4S648.3,198.3,647.5,198.3z M655.7,198.3L655.7,198.3c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.9,0,1.5-0.5,1.5-1.4S656.5,198.3,655.7,198.3z M663.8,198.3L663.8,198.3c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.7,0,1.5-0.5,1.5-1.4S664.5,198.3,663.8,198.3z M462.8,198.3h-0.2c-0.9,0-1.4,0.6-1.4,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.6,0,1.5-0.5,1.5-1.4S463.5,198.3,462.8,198.3z M502.7,201h0.1c0.7,0,1.4-0.5,1.4-1.4s-0.6-1.4-1.4-1.4h-0.1\n  \tc-0.9,0-1.4,0.6-1.4,1.4C501.3,200.5,502,201,502.7,201z M510.9,201c0.7,0,1.5-0.5,1.5-1.4s-0.6-1.4-1.4-1.4h-0.1\n  \tc-0.9,0-1.4,0.6-1.4,1.4C509.5,200.5,510.1,201,510.9,201z M800.5,198.3L800.5,198.3c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \th0.1c0.7,0,1.4-0.5,1.4-1.4C801.8,198.8,801.2,198.3,800.5,198.3z M486.7,201h0.1c0.6,0,1.2-0.5,1.4-1.4c0-0.9-0.6-1.4-1.4-1.4h-0.1\n  \tc-0.9,0-1.4,0.6-1.4,1.4C485.3,200.5,486,201,486.7,201z M494.8,201L494.8,201c0.7,0,1.3-0.5,1.5-1.4c0-0.9-0.6-1.4-1.4-1.4h-0.1\n  \tc-0.9,0-1.4,0.6-1.4,1.4C493.4,200.5,494,201,494.8,201z M446.5,198.3h-0.1c-0.9,0-1.4,0.6-1.4,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1\n  \tc0.7,0,1.4-0.5,1.4-1.4S447.3,198.3,446.5,198.3z M631.5,198.3h-0.1c-0.9,0-1.4,0.6-1.4,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1\n  \tc0.7,0,1.2-0.5,1.4-1.4C632.9,198.8,632.3,198.3,631.5,198.3z M454.7,198.3h-0.1c-0.9,0-1.4,0.6-1.4,1.4c0,0.9,0.6,1.4,1.4,1.4\n  \tc0.7,0,1.5-0.5,1.5-1.4S455.4,198.3,454.7,198.3z M518.9,201c0.7,0,1.5-0.5,1.5-1.4s-0.6-1.4-1.4-1.4h-0.1c-0.9,0-1.4,0.6-1.4,1.4\n  \tC517.6,200.5,518.2,201,518.9,201z M687.9,198.3L687.9,198.3c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1c0.7,0,1.2-0.5,1.4-1.4\n  \tC689.2,198.8,688.6,198.3,687.9,198.3z M808.6,198.3L808.6,198.3c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4c0.7,0,1.5-0.5,1.5-1.4\n  \tS809.4,198.3,808.6,198.3z M768.3,198.3L768.3,198.3c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4c0.9,0,1.5-0.5,1.5-1.4\n  \tS769.1,198.3,768.3,198.3z M623.6,198.3L623.6,198.3c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4c0.7,0,1.4-0.5,1.5-1.4\n  \tC625,198.8,624.4,198.3,623.6,198.3z M696,198.3L696,198.3c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4s1.4-0.5,1.5-1.4\n  \tC697.4,198.8,696.8,198.3,696,198.3z M679.9,198.3L679.9,198.3c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4c0.7,0,1.4-0.5,1.5-1.4\n  \tC681.3,198.8,680.7,198.3,679.9,198.3z M478.6,201h0.1c0.6,0,1.2-0.5,1.4-1.4c0-0.9-0.6-1.4-1.4-1.4h-0.1c-0.9,0-1.4,0.6-1.4,1.4\n  \tC477.3,200.5,477.9,201,478.6,201z M671.7,198.3L671.7,198.3c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1c0.7,0,1.4-0.5,1.4-1.4\n  \tS672.5,198.3,671.7,198.3z M776.4,198.3L776.4,198.3c-1,0-1.5,0.6-1.5,1.4c0,0.9,0.6,1.4,1.4,1.4c0.9,0,1.5-0.5,1.5-1.4\n  \tS777.1,198.3,776.4,198.3z M469.2,199.7c0,0.9,0.6,1.4,1.4,1.4h0.1c0.6,0,1.4-0.5,1.4-1.4s-0.6-1.4-1.4-1.4h-0.1\n  \tC469.7,198.3,469.2,198.9,469.2,199.7z M246.6,546.3l164.1-0.9v0.4l1.5,36.7c0,0,0.4,0.5,0.7,1.5H246.6l0,11.3h595.3v-11.4H597.6\n  \tc-1.9-4.3-4.2-8.7-3-15.8c3.7-22.8,8.7-42.9,12.5-66.3c2-11.9-0.6-26.5-2.5-36.6c-0.7-4.1-2-12.2-0.6-17.1c6,0,13.8-1.6,16-5.3\n  \tc3-4.8,1.1-21.6,2.2-28.4c3.7-22,7.4-54.1,3-77.6c-0.2-1.4-0.6-2.7-0.9-4.1c0.3-0.2,0.6-0.6,0.7-1.1c0-0.9-0.6-1.4-1.4-1.4\n  \tc-1.2-3.9-2.5-7.7-3.1-11.4c-0.7-4.8,1.6-11.5,0.6-17.9c-1.1-4.6-1.9-9.4-2.9-13.9c2.2-4.2,4.3-8.4,6.6-12.6\n  \tc4-8.9,7.1-18.5,8.9-29.4c0.2-4.5,0.4-8.9,0.6-13.4c0.6-3.8,1.5-10,0.2-14.3c-2.2-8.9-7.4-13.3-15.3-16.4c-0.8-0.3-1.7-0.7-2.7-1\n  \tc0-0.1,0.1-0.1,0.1-0.2c0-0.9-0.6-1.4-1.4-1.4h-0.1c-0.6,0-1,0.3-1.2,0.7c-1.5-0.5-3-1.1-4.5-1.8l14.3-36.2l37.6,15.3l59.3,20.7\n  \tc0,0,2.4,0.7,6.1,1.9c-0.2,0.2-0.3,0.5-0.3,0.8c0,0.9,0.6,1.4,1.4,1.4h0.1c0.7,0,1.4-0.5,1.4-1.4v-0.1c15.4,4.7,45.8,13.8,42.4,11.1\n  \tc-4.5-3.7-41.9-78.6-47.3-79.4c-5.3-0.7-67.7-48.5-67.7-48.5l0.4-6.2l-4-2l-3,3.8l-3.3,0.6c-3.3,0.6-58.8-6.9-110.5-11.5\n  \tc-5.6-0.5-66.8,27.3-66.8,27.3l19.5,8.9l48.4,20.5l31.7,13.8c-0.1,2.1-0.1,4.2-0.2,6.3c-1.2,5.6-3.3,13-1.9,20.8\n  \tc1.2,7.4,6.3,11.7,5.1,19.6c-10,10.3-28.6,3.3-40.7,10.4c-1.4,0.9-2.6,2-3.7,3.3c-0.2-0.2-0.5-0.2-0.8-0.2h-0.1\n  \tc-0.9,0-1.4,0.6-1.4,1.4c0,0.6,0.3,1,0.8,1.2c-2.5,4.5-3.8,10.2-5.5,15.5c-4.8,15-21.2,51.2-10.4,68.5c4.8,1.6,15-1.1,15.1-1.1\n  \tc-0.7,2.5-1.5,5.1-2.2,7.6c-1.6,1.9-3,3.8-4.7,5.7c-1.5,8.9-2.6,18.2-4.1,27.2c-1.7,9.2-6.6,22.7-3.7,34c0.2,0.1,0.4,0.2,0.6,0.2\n  \tc4.8-0.5,8.8-3.8,14.8-2.9c-0.1,20.5-3.3,44,0.4,64.4c0.2,4,0.4,7.9,0.6,12c1.5,2.4,3,4.8,4.3,7.1c0.1,4.5,0.2,8.8,0.2,13.3\n  \tc1.9,11.2,2.4,22.1,5.3,31.6c5.1,16.5,11.7,31.7,18.2,47c2.4,5.7,6.2,11.2,7.8,17.5c3.7,14.4-5.7,21.6-9.8,29\n  \tc-0.2,1.9-0.5,3.8-0.7,5.7h-83c0.5-1.5,0.6-3,0.5-4.8l0.7-47.5c0.6-0.1,1.2-0.5,1.2-1.4c0-0.8-0.5-1.3-1.2-1.3l1-63.9\n  \tc0.1-0.2,0.2-0.4,0.2-0.7c0-0.3-0.1-0.5-0.2-0.7l1.3-64.3c0-0.1,0.1-0.2,0.1-0.2v-14.6c0,0-1.7-2.6-4.2-6.4\n  \tc-2.5-17.4-5.3-28.4-7.6-34.8c-2.1-6.2-3.7-8.4-3.8-8.8l11.8-1.2c0.2,0.4,0.7,0.6,1.1,0.6h0.1c0.5,0,1-0.3,1.2-0.8l5.3-0.5\n  \tc0,0.9,0.6,1.3,1.4,1.3h0.1c0.6,0,1.2-0.5,1.4-1.4c0-0.2,0-0.3-0.1-0.5c11.4-2.7,8.4-11.2,8.4-11.2c-1.5-23.6-26.8-23.6-26.8-23.6\n  \tl-14.8-0.5c-5.6-1.1-4,5.3-4,5.3l-1.6,12.3c-4.1-1.9-34.5-82.2-34.5-82.2c-4.1-9.7-8.6-16.4-12.2-20.7c-4.7-5.7-8.2-7.9-8.2-7.9\n  \tc-2.4-0.6-6.6-1.1-11.9-1.6c0.5-0.2,0.8-0.6,0.8-1.3c0-0.9-0.6-1.4-1.4-1.4h-0.1c-0.9,0-1.4,0.6-1.4,1.4c0,0.9,0.6,1.4,1.5,1.4h0.2\n  \th-0.2h-0.1c-2.1-0.2-4.4-0.3-6.8-0.5c0.2-0.2,0.3-0.5,0.4-0.8c0-0.9-0.6-1.4-1.4-1.4h-0.1c-0.9,0-1.4,0.6-1.4,1.4\n  \tc0,0.3,0.1,0.5,0.2,0.7c-1.8-0.1-3.6-0.2-5.5-0.3c0-0.1,0.1-0.2,0.1-0.3c0-0.9-0.6-1.4-1.4-1.4h-0.1c-0.9,0-1.4,0.6-1.4,1.4v0.2\n  \tl-5.1-0.3c0-0.8-0.6-1.3-1.4-1.3h-0.1c-0.8,0-1.2,0.5-1.3,1.1c-1.7-0.1-3.5-0.2-5.3-0.3c-0.2-0.5-0.7-0.8-1.3-0.8h-0.1\n  \tc-0.6,0-1,0.3-1.2,0.7c-1.9-0.1-3.9-0.2-5.8-0.3c-0.3-0.3-0.6-0.4-1-0.4h-0.1c-0.4,0-0.7,0.1-0.9,0.3c-2.2-0.1-42.2-1.5-85.8-2.1\n  \tV230c0,0,127.7,3.4,127.7,3.4c12.7,0.4,14.3,7.6,14.3,7.6l24.3,69.1c1.5,4.7,0.7,7.4-0.5,8.9c-0.4,0.5-0.7,0.7-1.2,1.1\n  \tc-2.1,1.5-4.7,1.1-4.7,1.1l-10-0.2l-149.9-2.1v63.1l83.2,0c22.4,0,17.8,11.6,17.8,11.6l-7.9,29.4c-1,3.8-4.5,6.4-8.4,6.5l-84.7,0.1\n  \tl0,50.2l92,0l-2,25.2c-1.4,12.3-10.9,12.5-10.9,12.5l-79.1,0.1V546.3z M428.3,384.8v0.2l3.3-0.1c12.4,1.1,14.8,5.8,14.8,5.8v0.1\n  \tl0.4,34l-50.8,0.5v-0.1l-7.8,0.1h-0.1l-10.2,0.1c-1.2,0-2.5-0.1-3.7-0.4c-0.2,0-0.6-0.1-0.7-0.2c-1.1-0.2-2.1-0.6-3-1.1\n  \tc-0.7-0.4-1.5-0.7-2.1-1.2c-1.5-0.7-2.6-2-3.7-3.3c-2.4-3-3.8-6.7-3.8-10.8v-12.2c-0.1-0.6-0.1-1.2-0.1-1.9c0.2-2,2-4,3.7-5.6\n  \tc1.9-1.6,3.7-2.6,3.7-2.6l19.6-0.2L428.3,384.8L428.3,384.8z M560.2,464.2c0.1-0.2,0.3-0.5,0.3-0.8c0-0.6-0.3-1-0.7-1.2\n  \tc-0.3-3.5,2.4-5.9,3-8.4c0.4-4,0.7-8.1,1.2-12c4.1-1.5,8.2-2.6,12.3-4.1c-0.4,7.1-0.6,14.1-1.1,21.2l0.9,3.6c-0.3-0.3-0.6-0.5-1-0.5\n  \tH575c-0.9,0-1.4,0.6-1.4,1.4c0,0.9,0.6,1.4,1.4,1.4h0.1c0.8,0,1.3-0.4,1.3-1.2c1.3,5,2.6,9.9,3.9,14.9c-0.1,7.4-0.2,14.5-0.2,22\n  \tl2.1,27.9c-0.2,0.2-0.3,0.6-0.3,1c0,0.5,0.2,0.9,0.5,1.1c0.5,6.6,1,13.3,1.5,19.9c-3.7-2.6-4.6-5.2-6.6-9.3\n  \tc-3-6.7-5.7-13.9-7.1-22.4c-1.7-10.2,0-21.2-1.9-30.6C566.6,479.6,562,472.1,560.2,464.2L560.2,464.2z M606.6,195.9\n  \tc-2.9-1.6-4.8-3.5-5.6-6.1c-2-8.2,3.1-19.8,6.6-22.3c1.9-1.5,4.3-1.2,5.7-3c1.2-1.9,2.4-4.1,3.3-6.4l4.1,1.7L606.6,195.9z\"/>\n  </svg>\n</template>\n"; });
define('text!styleSheets/themeGuide.css', ['module'], function(module) { module.exports = "::-webkit-scrollbar {\n  display: none;\n}\n"; });
define('text!components/disaster-map/disaster-map.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./disaster-map.css\"></require>\n  <div id=\"mapContainer\">\n  </div>\n</template>\n"; });
define('text!components/flood-info/flood-info.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./flood-info.css\"></require>\n  <div id=\"flood-title\">\n    <p>\n      ${locale.flood_info.title}\n      <br>\n      <b>${areaname}, ${districtname}</b>\n    </p>\n  </div>\n  <div id=\"flood-state\">\n    <p id=\"severity\">${locale.flood_info.state_codes[state].severity}</p>\n    <p>\n      ${locale.flood_info.level_hint}: ${state}\n      <br>\n      ${locale.flood_info.state_codes[state].description}\n    </p>\n    <p id=\"updated\">${locale.flood_info.time_hint}: ${updated}</p>\n  </div>\n</template>\n"; });
define('text!components/card-notification/card-notification.css', ['module'], function(module) { module.exports = "::-webkit-scrollbar {\n  display: none;\n}\n#notifyWrapper {\n  position: absolute;\n  top: 0px;\n  width: 100%;\n  padding: 18px 0 0 0;\n  display: none;\n  background-color: rgba(47, 47, 47, 0.8);\n  z-index: 1500;\n}\n#notifyWrapper #symbol {\n  position: relative;\n  width: 18%;\n  float: left;\n  text-align: right;\n  font-size: 48px;\n  color: #31aade;\n}\n#notifyWrapper #msg {\n  position: relative;\n  width: 76%;\n  float: right;\n  text-align: left;\n}\n#notifyWrapper #msg h3 {\n  width: 90%;\n  margin: 11px 0;\n  padding: 0;\n  font-family: \"Roboto-Medium\", \"Roboto\", Open Sans;\n  font-size: 21px;\n  color: #424242;\n  color: #31aade;\n}\n#notifyWrapper #msg p {\n  width: 90%;\n  margin: 0;\n  padding: 0 0 18px 0;\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  font-size: 14px;\n  color: #424242;\n  color: #ffffff;\n}\n#notifyWrapper #closeNotification {\n  position: absolute;\n  top: 6px;\n  right: 8px;\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  font-size: 18px;\n  color: #424242;\n  cursor: pointer;\n  color: rgba(255, 255, 255, 0.8);\n}\n@media (min-width: 420px) {\n  #notifyWrapper #closeNotification:hover {\n    color: #10b7ff;\n  }\n}\n#notifyWrapper #closeNotification:active {\n  color: #1f4963;\n}\n"; });
define('text!components/gauge-info/gauge-info.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./gauge-info.css\"></require>\n  <div id=\"chart-title\">\n    <p>${name}</p>\n  </div>\n  <div id=\"chart-pane\">\n  </div>\n</template>\n"; });
define('text!components/report-info/report-info.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./report-info.css\"></require>\n  <div  id=\"photoPreview\">\n    <img class=\"image\" id=\"hasPhoto\" if.bind=\"imageurl\" src.bind=\"imageurl\">\n    <div class=\"image\" id=\"noPhoto\" if.bind=\"!imageurl\">\n      <i class=\"icon-flood\"></i>\n    </div>\n  </div>\n\n  <div id=\"textPreview\">\n    <div id=\"bodyWrapper\">\n      <p if.bind=\"title\" class=\"textTitle\">${title}</p>\n      <p if.bind=\"height\" class=\"textTitle\">${locale.report_info.water_depth}:&nbsp;${height}cm</p>\n      <p id=\"source\">${locale.report_info.source}&nbsp;<a target=\"_blank\" href.bind=\"links[source]\"><img id=\"sourceImg\" src.bind=\"'assets/icons/img_' + source + '.svg'\" width=\"18\" height=\"18\"></img></a></p>\n      <p id=\"timeStamp\">${timestamp}</p>\n      <p id=\"textBody\">${text}</p>\n    </div>\n\n    <div id=\"socialIcons\">\n      <a repeat.for=\"button of shareButtons\" href.bind=\"button.intent\">\n        <i class.bind=\"'icon-' + button.name\"></i>\n      </a>\n    </div>\n  </div>\n</template>\n"; });
define('text!components/component-template/component-template.css', ['module'], function(module) { module.exports = "::-webkit-scrollbar {\n  display: none;\n}\n"; });
define('text!components/side-pane/side-pane.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./side-pane.css\"></require>\n  <div id=\"tabsBar\">\n    <ul class=\"tabs\">\n      <li class=\"paneTabs\" repeat.for=\"tabName of tabList\">\n        <div class=\"tabLinks\" id.bind=\"'button-' + tabName\" click.delegate=\"switchTab(tabName)\">\n          <i class.bind=\"'icon-' + tabName\"></i>\n          <p textcontent.bind=\"locale.web_menu.tab_names[tabName]\"></p>\n        </div>\n      </li>\n      <li class=\"langTab\">\n        <div repeat.for=\"language of languages\">\n          <label id.bind=\"language\" class=\"langLabels\" if.bind = \"language!=='id'\">\n            <input type=\"radio\" model.bind=\"language\" checked.bind=\"selLanguage\" change.delegate=\"switchLang(language)\">\n            ${language}\n          </label>\n        </div>\n      </li>\n    </ul>\n  </div>\n\n  <div id=\"paneContent\">\n    <div id=\"content-map\" if.bind=\"tab === 'map'\" class=\"contentWrapper\">\n      <p>${locale.map_helper}</p>\n      <label repeat.for=\"city of cities\">\n        <input type=\"radio\" model.bind=\"city\" checked.bind=\"selected\" change.delegate=\"switchCity(city)\">\n        ${city}\n      </label>\n\n      <table  width=\"300px\">\n        <tr>\n          <td>\n          <p id=\"legend\">${locale.legend.title}</p>\n          <td>\n        </tr>\n        <tr>\n          <td vertical-align=\"bottom\">\n            <p>${locale.legend.flood_gauges}</p>\n          </td>\n          <td vertical-align=\"bottom\">\n            <p>${locale.legend.flood_depth}</p>\n          </td>\n        </tr>\n        <tr>\n          <td>\n            <table >\n              <tr repeat.for=\"level of gauge_levels\">\n                <td>\n                  <img src.bind=\"level.icon\" height=\"30\">\n                </td>\n                <td>\n                  <p class=\"normal\">${level.text[selLanguage]}</p>\n                </td>\n              </tr>\n            </table>\n          </td>\n          <td>\n            <table>\n              <tr repeat.for=\"height of flood_depth\">\n                <td style.bind=\"'padding:0;font-size:30px;color: ' + height.color\">&#9632;\n                </td>\n                <td>\n                  <p class=\"normal\">${height.text[selLanguage]}</p>\n                </td>\n              </tr>\n            </table>\n          </td>\n        </tr>\n        </table>\n    </div>\n\n    <div id=\"content-report\" if.bind=\"tab === 'report'\" class=\"contentWrapper\">\n      <table id=\"reportTable\">\n        <tr repeat.for=\"video of videos\" class=\"vidRows\">\n          <td>\n            <table class=\"vidTable\">\n              <tr click.delegate=\"showVideo(video.platform)\">\n                <td class=\"labelRow\" id.bind=\"'label_' + video.platform\">\n                  <p class=\"labelText\">\n                    <i class.bind=\"'icon-' + video.platform\"></i>&nbsp;${locale.report_content[video.platform].title}\n                  </p>\n                  <p class=\"arrows down\" id.bind=\"'down_' + video.platform\">\n                    <i class=\"icon-down-open\"></i>\n                  </p>\n                  <p class=\"arrows up\" id.bind=\"'up_' + video.platform\">\n                    <i class=\"icon-up-open\"></i>\n                  </p>\n                </td>\n              </tr>\n              <tr class=\"wrapRow\">\n                <td>\n                  <div class=\"videoWrapper\" id.bind=\"'vid_' + video.platform\" ref.bind=\"'vid_' + video.platform\">\n                    <iframe width=\"300\" height=\"225\" allowfullscreen=\"allowfullscreen\" frameborder=\"0\" src.bind=\"video.source[selLanguage]\"></iframe>\n                    <br>\n                    <ul>\n                      <li repeat.for=\"step of locale.report_content[video.platform].steps\">\n                        <p>${step}</p>\n                      </li>\n                      <p if.bind=\"video.platform==='otherapps'\" innerhtml.bind=\"locale.report_content.otherapps.links\"></p>\n                    </ul>\n                  </div>\n                </td>\n              </tr>\n            </table>\n            <td>\n            </tr>\n          </table>\n        </div>\n\n        <div id=\"content-info\" if.bind=\"tab === 'info'\" class=\"contentWrapper\">\n          <table id=\"headLogos\">\n            <tr>\n              <td align=\"left\">\n                <a href=\"https://www.usaid.gov/\">\n                  <img id=\"usaidLogo\" src=\"assets/graphics/TataCenter_logo_web.png\">\n                </a>\n              </td>\n              <td align=\"right\">\n                <a href=\"http://urbanrisklab.org/\">\n                  <img id=\"urlLogo\" src=\"assets/graphics/URL_logo.svg\">\n                </a>\n              </td>\n            </tr>\n          </table>\n\n          <p id=\"intro\">${locale.info_content.intro}</p>\n\n          <table id=\"partners\">\n            <tr class=\"label\">\n              <td colspan=\"4\" cellpadding=\"0\" align=\"left\">\n                <p>${locale.info_content.partners.implementing}</p>\n              </td>\n            </tr>\n            <tr>\n              <td colspan=\"4\" align=\"center\">\n                <a href=\"http://www.bnpb.go.id/\">\n                  <img class=\"bnpbLogo\" src=\"assets/graphics/ChennaiCMC_logo.jpg\">\n                </a>\n              </td>\n            </tr>\n            <tr class=\"label\">\n              <td colspan=\"4\" cellpadding=\"0\" align=\"left\">\n                <p>${locale.info_content.partners.project}</p>\n              </td>\n            </tr>\n            <tr class=\"logos\">\n              <td colspan=\"2\" align=\"center\">\n                <a href=\"http://www.pdc.org/\">\n                  <img class=\"partnerLogo\" src=\"assets/graphics/pcd_logo.png\">\n                </a>\n              </td>\n              <td colspan=\"2\" align=\"center\">\n                <a href=\"https://hotosm.org/\">\n                  <img class=\"partnerLogo\" src=\"assets/graphics/Hot_logo.png\">\n                </a>\n              </td>\n            </tr>\n            <tr class=\"label\">\n              <td colspan=\"4\" cellpadding=\"0\" align=\"left\">\n                <p>${locale.info_content.partners.data}</p>\n              </td>\n            </tr>\n            <tr class=\"logos\">\n              <td colspan=\"2\" align=\"center\">\n                <a href=\"http://www.qlue.co.id/\">\n                  <img class=\"partnerLogo\" src=\"assets/graphics/qlue_logo.png\">\n                </a>\n              </td>\n              <td colspan=\"2\" align=\"center\">\n                <a href=\"http://pasangmata.detik.com/\">\n                  <img class=\"partnerLogo\" src=\"assets/graphics/pasang_logo.png\">\n                </a>\n              </td>\n            </tr>\n              <tr class=\"logos\">\n                <td colspan=\"2\" align=\"center\">\n                  <a href=\"https://www.zurich.co.id/id-id/kampanye-kami/zurich-alert-the-alert-you-really-need\">\n                    <img class=\"partnerLogo\" src=\"assets/graphics/zAlert_logo.png\">\n                  </a>\n                </td>\n              <td colspan=\"2\" align=\"center\">\n                <a href=\"https://twitter.com\">\n                  <img class=\"partnerLogo\" src=\"assets/graphics/twitter-logo.png\">\n                </a>\n              </td>\n            </tr>\n          </table>\n\n          <p innerhtml.bind=\"locale.info_content.p1\"></p>\n          <p innerhtml.bind=\"locale.info_content.p2\"></p>\n          <p innerhtml.bind=\"locale.info_content.p3\"></p>\n          <p id=\"disclaimer\">\n            ${locale.info_content.privacy}<br>\n            <i>${locale.info_content.disclaimer}</i>\n          </p>\n          <p>${locale.info_content.mapCredits} © <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a></p>\n          <p id=\"usaid\">\n            ${locale.info_content.USAID}\n          </p>\n          <div id=\"pbLogo\">\n            <img src=\"assets/graphics/Riskmap_logo_noSub.svg\">\n          </div>\n        </div>\n      </div>\n    </template>\n"; });
define('text!components/disaster-map/disaster-map.css', ['module'], function(module) { module.exports = "::-webkit-scrollbar {\n  display: none;\n}\n#mapContainer {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n}\n#notification {\n  font-family: Roboto-Light, Roboto, sans-serif;\n  font-size: 12px;\n  white-space: nowrap;\n  padding: 5px;\n  border-radius: 5px;\n  color: #ffffff;\n  position: relative;\n  top: 45px;\n}\n"; });
define('text!routes/cards/cards.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./cards.css\"></require>\n  <require from=\"../../components/card-notification/card-notification\"></require>\n  <div id=\"cardWrapper\">\n    <div id=\"cardTitle\" if.bind=\"(count < 7)\">\n      <div id=\"alert\" if.bind=\"test_card\" click.trigger=\"logUserAgent()\">\n        <p><i class=\"icon-attention-circled\"></i></p>\n      </div>\n      <p id=\"titleText\">${locale.card_titles[router.routes[cardNo].route]}</p>\n      <div id=\"langSwitch\">\n        <label repeat.for=\"language of reportcard.languages\" id.bind=\"language\" class=\"langLabels\">\n          <input type=\"radio\" model.bind=\"language\" checked.bind=\"reportcard.selLanguage\" change.delegate=\"switchLang(language)\">\n          &nbsp;&nbsp;${language}&nbsp;\n        </label>\n      </div>\n      <div id=\"tabRow\">\n        <button repeat.for=\"i of (totalCards - 3)\" class=\"tabButtons\" disabled.bind=\"!(i < count)\"></button>\n      </div>\n    </div>\n    <div id=\"cardContent\">\n      <router-view></router-view>\n      <card-notification locale.bind=\"locale\" type.bind=\"notify_type\" header.bind=\"notify_header\" message.bind=\"notify_message\" bespoke.bind=\"notify_custom\" close-notification.call=\"closeNotification()\"></card-notification>\n    </div>\n    <div id=\"cardNavigation\" if.bind=\"(count < 7)\">\n      <button id=\"prv\" click.trigger=\"prevCard()\" disabled.bind=\"prevDisabled\" class=\"navBtn\"><i class=\"icon-left-open\"></i>${locale.card_hints.previous}</button>\n      <button id=\"nxt\" click.trigger=\"nextCard()\" disabled.bind=\"nextDisabled\" class=\"navBtn\">${locale.card_hints.next}<i class=\"icon-right-open\"></i></button>\n    </div>\n  </div>\n</template>\n"; });
define('text!components/flood-info/flood-info.css', ['module'], function(module) { module.exports = "::-webkit-scrollbar {\n  display: none;\n}\n#flood-title {\n  position: relative;\n  width: 92%;\n}\n#flood-title p {\n  margin: 0;\n  padding: 10px;\n  font-family: \"Roboto-Medium\", \"Roboto\", Open Sans;\n  font-size: 14px;\n  color: #424242;\n  color: #31aade;\n  text-align: center;\n}\n#flood-title p b {\n  color: #2f2f2f;\n}\n#flood-state {\n  position: relative;\n  width: 92%;\n}\n#flood-state p {\n  margin: 0;\n  padding: 5px;\n  font-family: \"Roboto-Medium\", \"Roboto\", Open Sans;\n  font-size: 14px;\n  color: #424242;\n  color: #2f2f2f;\n  text-align: center;\n}\n#flood-state #severity {\n  color: #31aade;\n  text-transform: uppercase;\n}\n#flood-state #updated {\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  font-size: 12px;\n  color: #424242;\n}\n"; });
define('text!routes/landing/landing.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./landing.css\"></require>\n  <require from=\"leaflet/leaflet.css\"></require>\n  <require from=\"../../components/disaster-map/disaster-map\"></require>\n  <require from=\"../../components/report-info/report-info\"></require>\n  <require from=\"../../components/gauge-info/gauge-info\"></require>\n  <require from=\"../../components/flood-info/flood-info\"></require>\n  <require from=\"../../components/side-pane/side-pane\"></require>\n\n  <div id=\"pageWrapper\">\n    <div id=\"screen\">\n      <div id=\"cityPopup\">\n        <p>${webMenu.locale.map_helper}</p>\n        <label repeat.for=\"city of mapModel.cities\">\n          <input type=\"radio\" model.bind=\"city\" selected.two-way=\"mapModel.selected_city\" change.delegate=\"mapModel.viewReports(city, true)\">\n          ${city}\n          <br>\n        </label>\n      </div>\n    </div>\n\n    <disaster-map id=\"map\" view-model.ref=\"mapModel\" querycity.bind=\"queried_city\" reportid.two-way=\"report_id\" reset-tab.call=\"webMenu.switchTab($event)\">\n    </disaster-map>\n\n    <div id=\"topBar\">\n      <div id=\"logo_top\">\n        <a href=\"map\">\n          <img id=\"pbLogo\" src=\"assets/graphics/Riskmap_logo_noSub.svg\" width=\"180\">\n        </a>\n      </div>\n      <div class=\"menuBtn active\" click.delegate=\"mapModel.togglePane('#sidePane', 'show', true)\">\n        <i class=\"icon-add-report\"></i>\n      </div>\n      <div class=\"menuBtn\" id=\"closeSidePane\" click.delegate=\"mapModel.togglePane('#sidePane', 'hide', false)\">\n        <i class=\"icon-cancel-circled-outline\"></i>\n      </div>\n    </div>\n\n    <div id=\"infoPane\">\n      <div class=\"closeBtn\" click.delegate=\"mapModel.togglePane('#infoPane', 'hide', true)\">\n        <i class=\"icon-cancel-circled-outline\" aria-hidden=\"true\"></i>\n      </div>\n      <gauge-info class=\"infoWrapper\" name.bind=\"mapModel.layers.popupContent.gauge_name\">\n      </gauge-info>\n      <flood-info class=\"infoWrapper\" if.bind=\"mapModel.layers.popupContent.state\" locale.bind=\"webMenu.locale\" areaname.bind=\"mapModel.layers.popupContent.area_name\" districtname.bind=\"mapModel.layers.popupContent.parent_name\" state.bind=\"mapModel.layers.popupContent.state\" updated.bind=\"mapModel.layers.formatTime(mapModel.layers.popupContent.last_updated)\">\n      </flood-info>\n      <report-info class=\"infoWrapper\" if.bind=\"mapModel.layers.popupContent.pkey\" locale.two-way=\"webMenu.locale\" pkey.bind=\"mapModel.layers.popupContent.pkey\" city.bind=\"mapModel.utility.parseCityName(mapModel.layers.popupContent.tags.instance_region_code, mapModel.cities)\" imageurl.bind=\"mapModel.layers.popupContent.image_url\" height.bind=\"mapModel.layers.popupContent.report_data.flood_depth\" title.bind=\"mapModel.layers.popupContent.title\" text.bind=\"mapModel.layers.popupContent.text\" timestamp.bind=\"mapModel.layers.popupContent.timestamp\" source.bind=\"mapModel.layers.popupContent.source\">\n      </report-info>\n    </div>\n\n    <div id=\"sidePane\">\n      <side-pane cities.bind=\"mapModel.cities\" selected.two-way=\"mapModel.selected_city\" change-city.call=\"mapModel.viewReports($event, $event)\" close-pane.call=\"mapModel.togglePane('#sidePane', 'hide', false)\" reportId.two-way=\"report_id\" view-model.ref=\"webMenu\">\n      </side-pane>\n    </div>\n  </div>\n</template>\n"; });
define('text!routes/cards/card-template/card-template.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./card-template.css\"></require>\n  <div id=\"cardTemplateWrapper\">\n    <!-- html content of card goes here -->\n  </div>\n</template>\n"; });
define('text!components/gauge-info/gauge-info.css', ['module'], function(module) { module.exports = "::-webkit-scrollbar {\n  display: none;\n}\n#chart-title {\n  position: relative;\n  width: 92%;\n}\n#chart-title p {\n  margin: 0;\n  padding: 0;\n  font-family: \"Roboto-Medium\", \"Roboto\", Open Sans;\n  font-size: 13px;\n  color: #424242;\n  color: #31aade;\n  text-align: center;\n}\n#chart-pane {\n  position: relative;\n  width: 92%;\n}\n#chart-pane canvas {\n  width: 80%!important;\n  height: 80%!important;\n  margin: 0 auto;\n  padding: 0;\n}\n"; });
define('text!routes/cards/card-landing/card-landing.html', ['module'], function(module) { module.exports = "<template>\n  <div style=\"width: 100%; height: 100%;\">\n  </div>\n</template>\n"; });
define('text!routes/cards/description/description.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./description.css\"></require>\n  <div id=\"descriptionWrapper\">\n    <textarea id=\"textarea\" maxlength=\"140\" placeholder.bind=\"reportcard.locale.card_hints.description\" value.bind=\"reportcard.description.value\" click.delegate=\"onFocus()\" focus.delegate=\"onFocus()\" focusout.delegate=\"onBlur()\"></textarea>\n    <div id=\"modBtnWrapper\">\n      <button id=\"clearButton\" class=\"modBtn\" click.delegate=\"clearText()\" disabled.bind=\"!reportcard.description.value || focussed\"><i class=\"icon-block\"></i></button>\n      <button id=\"closeButton\" class=\"modBtn\" if.bind=\"isMobile && focussed\" click.delegate=\"onBlur()\"><i class=\"icon-keyboard\" id=\"#keyClose\"></i><i class=\"icon-down-open\"></i></button>\n      <button id=\"openButton\" class=\"modBtn\" if.bind=\"isMobile && !focussed\" click.delegate=\"setFocus()\"><i class=\"icon-up-open\"></i><i class=\"icon-keyboard\" id=\"#keyOpen\"></i></button>\n      <p if.bind=\"reportcard.description.value\">${reportcard.description.value.length}/140</p>\n    </div>\n  </div>\n</template>\n"; });
define('text!components/report-info/report-info.css', ['module'], function(module) { module.exports = "::-webkit-scrollbar {\n  display: none;\n}\n#photoPreview {\n  position: relative;\n  width: 40%;\n  height: 90%;\n  float: left;\n  background-color: #000000;\n}\n#photoPreview .image {\n  position: absolute;\n  top: 50%;\n  -ms-transform: translate(-50%, -50%);\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  z-index: 2;\n}\n#photoPreview .image#hasPhoto {\n  left: 50%;\n  max-width: 100%;\n  max-height: 100%;\n}\n#photoPreview .image#noPhoto {\n  left: 40%;\n  font-size: 80px;\n  color: white;\n}\n#textPreview {\n  position: relative;\n  width: 55%;\n  height: 90%;\n  float: right;\n  overflow: hidden;\n}\n#textPreview #bodyWrapper {\n  width: 85%;\n  height: 75%;\n  border-bottom: 1px solid #31aade;\n  overflow-y: scroll;\n}\n#textPreview #bodyWrapper .textTitle {\n  font-family: \"Roboto-Bold\", \"Roboto\", Open Sans;\n  font-size: 14px;\n  color: #424242;\n  padding: 0;\n  margin: 0 6px 6px 0;\n  color: #31aade;\n}\n#textPreview #bodyWrapper #timeStamp,\n#textPreview #bodyWrapper #source {\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  font-size: 12px;\n  color: #424242;\n  color: #808080;\n  width: 60%;\n  line-height: 18px;\n  margin: 0;\n  padding: 0;\n}\n#textPreview #bodyWrapper #timeStamp #sourceImg,\n#textPreview #bodyWrapper #source #sourceImg {\n  margin: 0;\n  padding: 0;\n}\n#textPreview #bodyWrapper #textBody {\n  font-family: \"Roboto\", \"Roboto\", Open Sans;\n  font-size: 14px;\n  color: #424242;\n  word-wrap: break-word;\n  padding: 0;\n  margin-top: 6px;\n}\n#textPreview #sourcelogo {\n  position: relative;\n  color: #808080;\n  width: 40%;\n  height: 20%;\n  float: right;\n  overflow: none;\n  border: solid 1px blue;\n  margin: 0 10px 0 0;\n}\n#textPreview #socialIcons {\n  position: absolute;\n  height: 18%;\n  bottom: 0px;\n}\n#textPreview #socialIcons a {\n  position: relative;\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  font-size: 20px;\n  color: #424242;\n  cursor: pointer;\n  text-decoration: none;\n  padding: 0 12px 0 0;\n}\n@media (min-width: 420px) {\n  #textPreview #socialIcons a:hover {\n    color: #10b7ff;\n  }\n}\n#textPreview #socialIcons a:active {\n  color: #1f4963;\n}\n"; });
define('text!routes/cards/depth/depth.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./depth.css\"></require>\n  <require from=\"../../../components/depth-bg/depth-bg\"></require>\n\n  <div id=\"depthWrapper\">\n    <svg id=\"bgImage\">\n      <depth-bg></depth-bg>\n    </svg>\n    <div id=\"floodZone\">\n    </div>\n    <div id=\"sliderZone\">\n      <div id=\"knob\">\n      </div>\n      <div id=\"hTop\" class=\"knobHelper\">\n        <i class=\"icon-up-open\"></i>\n      </div>\n      <div id=\"hBottom\" class=\"knobHelper\">\n        <i class=\"icon-down-open\"></i>\n      </div>\n      <div id=\"depthText\" textcontent.bind=\"reportcard.depth + '&nbsp;cm'\">\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('text!routes/cards/error/error.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./error.css\"></require>\n\n  <div id=\"petalogo\">\n    <img src=\"assets/graphics/Riskmap_logo_noSub.svg\">\n  </div>\n  <div id=\"errorlogo\">\n    <i class=\"icon-block\"></i>\n  </div>\n\n  <div id=\"msgWrapper\">\n    <h2 if.bind=\"errorCode\">Error : ${errorCode}</h2>\n    <h2 if.bind=\"!errorCode\">Error</h2>\n    <br>\n    <p>${errorText}</p>\n    <br>\n    <a href=\"map/\">${locale.card_error_messages.link}</a>\n  </div>\n\n\n</template>\n"; });
define('text!components/side-pane/side-pane.css', ['module'], function(module) { module.exports = "::-webkit-scrollbar {\n  display: none;\n}\n#tabsBar {\n  position: relative;\n  width: 100%;\n  height: 45px;\n  border: none;\n  border-bottom: 1px solid #31aade;\n}\n#tabsBar ul.tabs {\n  position: absolute;\n  bottom: -4px;\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n  width: 100%;\n}\n#tabsBar ul.tabs li {\n  float: left;\n  height: 100%;\n  text-align: center;\n}\n#tabsBar ul.tabs li.paneTabs {\n  width: 24%;\n}\n#tabsBar ul.tabs li.paneTabs div.tabLinks {\n  width: 100%;\n  cursor: pointer;\n  line-height: 40px;\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  font-size: 21px;\n  color: #424242;\n}\n#tabsBar ul.tabs li.paneTabs div.tabLinks p {\n  display: none;\n  position: absolute;\n  bottom: -75%;\n  width: 24%;\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  font-size: 14px;\n  color: #424242;\n  color: #31aade;\n  line-height: 14px;\n  text-transform: capitalize;\n}\n#tabsBar ul.tabs li.paneTabs div.tabLinks.active {\n  color: #31aade;\n  border-bottom: 4px solid #31aade;\n}\n#tabsBar ul.tabs li.paneTabs div.tabLinks.active p {\n  display: block;\n}\n#tabsBar ul.tabs li.paneTabs div.tabLinks:hover {\n  color: #10b7ff;\n}\n#tabsBar ul.tabs li.paneTabs div.tabLinks:hover p {\n  display: block;\n  color: #10b7ff;\n}\n#tabsBar ul.tabs li.langTab {\n  position: absolute;\n  right: 0;\n  width: 24%;\n  margin-top: 6px;\n  padding: 0;\n}\n#tabsBar ul.tabs li.langTab div {\n  position: relative;\n  float: left;\n  width: 30%;\n  height: 60%;\n}\n#tabsBar ul.tabs li.langTab div:first-child {\n  border-right: 1px solid #31aade;\n}\n#tabsBar ul.tabs li.langTab div label {\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  font-size: 16px;\n  color: #424242;\n  line-height: 28px;\n  cursor: pointer;\n}\n#tabsBar ul.tabs li.langTab div label.active {\n  color: #31aade;\n}\n#tabsBar ul.tabs li.langTab div label:hover {\n  color: #10b7ff;\n}\n#tabsBar ul.tabs li.langTab div label input {\n  display: none;\n}\n#paneContent {\n  position: relative;\n  width: 100%;\n}\n#paneContent div.contentWrapper {\n  padding: 30px 12px 0 12px;\n}\n#paneContent div.contentWrapper#content-map {\n  overflow: hidden;\n}\n#paneContent div.contentWrapper#content-map p {\n  font-family: \"Roboto-Medium\", \"Roboto\", Open Sans;\n  font-size: 14px;\n  color: #424242;\n  margin-bottom: 8px;\n}\n#paneContent div.contentWrapper#content-map label {\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  font-size: 14px;\n  color: #424242;\n  cursor: pointer;\n  text-transform: capitalize;\n  padding-right: 10px;\n}\n@media (min-width: 420px) {\n  #paneContent div.contentWrapper#content-map label:hover {\n    color: #10b7ff;\n  }\n}\n#paneContent div.contentWrapper#content-map label:active {\n  color: #1f4963;\n}\n#paneContent div.contentWrapper#content-map .normal {\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  font-size: 14px;\n  color: #424242;\n  text-transform: capitalize;\n  padding-right: 10px;\n  margin: 0;\n}\n#paneContent div.contentWrapper#content-map #legend {\n  margin-top: 20px;\n  border-bottom: 1px solid #31aade;\n}\n#paneContent div.contentWrapper#content-info {\n  overflow: hidden;\n}\n#paneContent div.contentWrapper#content-info #headLogos {\n  width: 90%;\n  margin: auto;\n  table-layout: fixed;\n}\n#paneContent div.contentWrapper#content-info #headLogos #usaidLogo {\n  width: 75%;\n}\n#paneContent div.contentWrapper#content-info #headLogos #urlLogo {\n  width: 100%;\n}\n#paneContent div.contentWrapper#content-info p {\n  font-family: \"Roboto\", \"Roboto\", Open Sans;\n  font-size: 14px;\n  color: #424242;\n  width: 90%;\n  margin: 15px auto;\n}\n#paneContent div.contentWrapper#content-info p a {\n  font-family: \"Roboto-Medium\", \"Roboto\", Open Sans;\n  font-size: 14px;\n  color: #424242;\n  cursor: pointer;\n}\n@media (min-width: 420px) {\n  #paneContent div.contentWrapper#content-info p a:hover {\n    color: #10b7ff;\n  }\n}\n#paneContent div.contentWrapper#content-info p a:active {\n  color: #1f4963;\n}\n#paneContent div.contentWrapper#content-info p b {\n  font-family: \"Roboto-Medium\", \"Roboto\", Open Sans;\n  font-size: 14px;\n  color: #424242;\n  color: #31aade;\n}\n#paneContent div.contentWrapper#content-info p#intro {\n  font-family: \"Roboto\", \"Roboto\", Open Sans;\n  font-size: 20px;\n  color: #424242;\n  text-align: center;\n  margin: 12px auto;\n  width: 90%;\n}\n#paneContent div.contentWrapper#content-info p#disclaimer i {\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  font-size: 14px;\n  color: #424242;\n}\n#paneContent div.contentWrapper#content-info p#usaid {\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  font-size: 12px;\n  color: #424242;\n}\n#paneContent div.contentWrapper#content-info #partners {\n  width: 90%;\n  margin: auto;\n  table-layout: fixed;\n  border-bottom: 1px solid #31aade;\n  padding-bottom: 10px;\n}\n#paneContent div.contentWrapper#content-info #partners tr.label {\n  height: 18px;\n}\n#paneContent div.contentWrapper#content-info #partners tr.label p {\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  font-size: 12px;\n  color: #424242;\n  margin: 10px 0 4px 0;\n  padding: 0;\n}\n#paneContent div.contentWrapper#content-info #partners .bnpbLogo {\n  width: 340px;\n}\n#paneContent div.contentWrapper#content-info #partners .partnerLogo {\n  height: 35px;\n  width: auto;\n  padding: 5px;\n}\n#paneContent div.contentWrapper#content-info #pbLogo {\n  width: 90%;\n  margin: 8px auto;\n  text-align: center;\n}\n#paneContent div.contentWrapper#content-info #pbLogo img {\n  width: 180px;\n}\n#paneContent div.contentWrapper#content-report {\n  overflow: hidden;\n}\n#paneContent div.contentWrapper#content-report table,\n#paneContent div.contentWrapper#content-report tr,\n#paneContent div.contentWrapper#content-report td {\n  padding: 0;\n  width: 100%;\n}\n#paneContent div.contentWrapper#content-report table#reportTable tr.vidRows table.vidTable {\n  margin: 0;\n}\n#paneContent div.contentWrapper#content-report table#reportTable tr.vidRows table.vidTable tr td {\n  border-bottom: 1px solid #31aade;\n}\n#paneContent div.contentWrapper#content-report table#reportTable tr.vidRows table.vidTable tr td.labelRow {\n  cursor: pointer;\n  border: none;\n  font-family: \"Roboto\", \"Roboto\", Open Sans;\n  font-size: 14px;\n  color: #424242;\n}\n#paneContent div.contentWrapper#content-report table#reportTable tr.vidRows table.vidTable tr td.labelRow.active {\n  color: #31aade;\n}\n#paneContent div.contentWrapper#content-report table#reportTable tr.vidRows table.vidTable tr td.labelRow:hover {\n  color: #10b7ff;\n}\n#paneContent div.contentWrapper#content-report table#reportTable tr.vidRows table.vidTable tr td.labelRow p {\n  margin: 0;\n  padding: 0;\n}\n#paneContent div.contentWrapper#content-report table#reportTable tr.vidRows table.vidTable tr td.labelRow p.labelText {\n  float: left;\n}\n#paneContent div.contentWrapper#content-report table#reportTable tr.vidRows table.vidTable tr td.labelRow p.arrows {\n  float: right;\n  display: block;\n}\n#paneContent div.contentWrapper#content-report table#reportTable tr.vidRows table.vidTable tr td.labelRow p.up {\n  display: none;\n}\n#paneContent div.contentWrapper#content-report table#reportTable tr.vidRows table.vidTable tr.wrapRow .videoWrapper {\n  display: none;\n  width: 100%;\n  height: auto;\n  font-family: \"Roboto\", \"Roboto\", Open Sans;\n  font-size: 14px;\n  color: #424242;\n}\n#paneContent div.contentWrapper#content-report table#reportTable tr.vidRows table.vidTable tr.wrapRow .videoWrapper iframe {\n  width: 100%;\n  border: none;\n}\n#paneContent div.contentWrapper#content-report table#reportTable tr.vidRows table.vidTable tr.wrapRow .videoWrapper p {\n  margin: 0;\n  padding: 0;\n}\n#paneContent div.contentWrapper#content-report table#reportTable tr.vidRows table.vidTable tr.wrapRow .videoWrapper p ul {\n  list-style: none;\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  font-size: 14px;\n  color: #424242;\n  line-height: 21px;\n  padding: 0;\n}\n#paneContent div.contentWrapper#content-report table#reportTable tr.vidRows table.vidTable tr.wrapRow .videoWrapper p a {\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  font-size: 14px;\n  color: #424242;\n  cursor: pointer;\n  line-height: 21px;\n}\n@media (min-width: 420px) {\n  #paneContent div.contentWrapper#content-report table#reportTable tr.vidRows table.vidTable tr.wrapRow .videoWrapper p a:hover {\n    color: #10b7ff;\n  }\n}\n#paneContent div.contentWrapper#content-report table#reportTable tr.vidRows table.vidTable tr.wrapRow .videoWrapper p a:active {\n  color: #1f4963;\n}\n#paneContent div.contentWrapper#content-report table#reportTable tr.vidRows table.vidTable tr.wrapRow .videoWrapper p a i {\n  font-size: 18px;\n}\n"; });
define('text!routes/cards/location/location.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"leaflet/leaflet.css\"></require>\n  <require from=\"./location.css\"></require><!--place / access as per appropriate file structure-->\n  <div id=\"locationWrapper\">\n    <div id=\"mapWrapper\">\n    </div>\n    <div id=\"mapMarker\">\n      <i class=\"icon-banjir-pin\"></i>\n    </div>\n  </div>\n</template>\n"; });
define('text!routes/cards/photo/photo.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./photo.css\"></require>\n  <div id=\"photoWrapper\">\n    <div id=\"previewWrapper\" click.trigger=\"sendClick()\">\n      <i class=\"icon-camera\"></i>\n      <canvas ref=\"preview\" id=\"canvas\">\n      </canvas>\n    </div>\n    <div id=\"modBtnWrapper\">\n      <button id=\"changeButton\" class=\"modBtn\" click.delegate=\"sendClick()\" disabled.bind=\"!enableUpload\"><i class=\"icon-camera-1\"></i></button>\n      <button id=\"rotateButton\" class=\"modBtn\" click.delegate=\"rotatePhoto()\" disabled=\"true\"><i class=\"icon-cw-1\"></i></button>\n      <button id=\"deleteButton\" class=\"modBtn\" click.delegate=\"deletePhoto()\" disabled=\"true\"><i class=\"icon-trash-empty\"></i></button>\n    </div>\n  </div>\n\n  <input id=\"ghostButton\" style=\"display: none\" type=\"file\" accept=\"image/*\" files.bind=\"reportcard.photo.file\" change.delegate=\"sizeCheck()\">\n</template>\n"; });
define('text!routes/cards/cards.css', ['module'], function(module) { module.exports = "::-webkit-scrollbar {\n  display: none;\n}\n@media screen {\n  #cardWrapper {\n    position: relative;\n  }\n}\n@media screen and (min-width: 240px) {\n  #cardWrapper {\n    width: 100%;\n  }\n}\n@media screen and (min-width: 240px) and (min-height: 200px) {\n  #cardWrapper {\n    height: 100%;\n  }\n}\n@media screen and (min-width: 240px) and (min-height: 720px) {\n  #cardWrapper {\n    height: 720px;\n    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4);\n  }\n}\n@media screen and (min-width: 420px) {\n  #cardWrapper {\n    width: 420px;\n    margin: auto;\n    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4);\n  }\n}\n@media screen and (min-width: 420px) and (min-height: 200px) {\n  #cardWrapper {\n    height: 100%;\n  }\n}\n@media screen and (min-width: 420px) and (min-height: 720px) {\n  #cardWrapper {\n    height: 720px;\n  }\n}\n#cardTitle {\n  position: relative;\n  margin: 0px;\n  padding: 0px;\n  width: 100%;\n  height: 50px;\n  /* height + padding-top + padding-bottom = 50px */\n  background-color: #424242;\n}\n#cardTitle #alert {\n  position: absolute;\n  top: 8px;\n  left: 6px;\n  cursor: pointer;\n  z-index: 10;\n}\n#cardTitle #alert p {\n  padding: 0;\n  margin: 0;\n  font-size: 26px;\n  color: #ffffff;\n}\n#cardTitle #alert p i {\n  z-index: 5;\n}\n#cardTitle #titleText {\n  position: absolute;\n  width: 100%;\n  font-family: \"Roboto Medium\", \"Roboto\", Open Sans;\n  color: #ffffff;\n  font-size: 16px;\n  text-align: center;\n}\n#cardTitle #langSwitch {\n  position: absolute;\n  top: 18px;\n  right: 15px;\n}\n#cardTitle #langSwitch label {\n  font-size: 14px;\n  font-family: \"Roboto Medium\", \"Roboto\", Open Sans;\n  color: #ffffff;\n  cursor: pointer;\n}\n#cardTitle #langSwitch label input {\n  display: none;\n}\n#cardTitle #langSwitch label:first-child {\n  border-right: 1px solid #ffffff;\n}\n#cardTitle #langSwitch label.active {\n  color: #31aade;\n}\n#tabRow {\n  position: absolute;\n  width: 100%;\n  bottom: 0px;\n}\n.tabButtons {\n  position: relative;\n  margin: 0px;\n  padding: 0px;\n  width: 20%;\n  height: 5px;\n  border: none;\n  background-color: #31aade;\n  float: left;\n  outline: none;\n}\n.tabButtons:disabled {\n  opacity: 0.25;\n}\n#cardContent {\n  position: relative;\n  width: 100%;\n  height: 50%;\n  /*Change on the fly*/\n  text-align: center;\n  z-index: 3;\n  background-color: #808080;\n  overflow: hidden;\n}\n#cardNavigation {\n  position: absolute;\n  align-content: center;\n  margin: 0px;\n  padding: 0px;\n  background-color: #808080;\n  bottom: 0px;\n  width: 100%;\n  height: 50px;\n  overflow: hidden;\n}\n#cardNavigation .navBtn {\n  position: relative;\n  color: #ffffff;\n  width: 50%;\n  height: 50px;\n  font-family: \"Roboto-Medium\", \"Roboto\", Open Sans;\n  font-size: 16px;\n  line-height: 50px;\n  background: #424242;\n  border: none;\n  outline: none;\n  z-index: 4;\n  margin: 0px;\n  padding: 0px;\n  float: left;\n}\n#cardNavigation .navBtn#prv {\n  border-right: 1px solid #808080;\n}\n#cardNavigation .navBtn:disabled {\n  color: #5e5e5e;\n}\n#cardNavigation .navBtn:active {\n  background: #5e5e5e;\n  transform: translateY(1px);\n}\n"; });
define('text!routes/cards/review/review.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./review.css\"></require>\n  <div id=\"reviewWrapper\">\n    <div id=\"summaryCard\">\n      <div id=\"summaryPhoto\">\n        <canvas id=\"photo\" ref=\"preview\">\n        </canvas>\n        <i class=\"icon-flood\"></i>\n      </div>\n      <div id=\"summaryTextWrapper\">\n        <p id=\"floodH\">${locale.card_hints.water_depth}: ${report.water_depth} cm</p>\n        <p id=\"comment\" if.bind=\"report.text\">${report.text}</p>\n      </div>\n    </div>\n    <div id=\"reviewSubmit\">\n      <div id=\"termsConditions\" if.bind=\"!swiped\">\n        <p if.bind=\"!reportcard.location.supported\"><i class=\"icon-attention-circled\"></i>&nbsp;${locale.card_hints.location_check}</p>\n        <p if.bind=\"!report.text && !reportcard.photo.file\"><i class=\"icon-cancel-circled\"></i>${locale.card_hints.more_details_required}</p>\n        <p if.bind=\"report.text || reportcard.photo.file\">${locale.card_hints.agreement_text}<br><a click.delegate=\"readTerms()\"><u>${locale.card_hints.agreement_title}</u></a></p>\n      </div>\n      <div id=\"submitSlider\" if.bind=\"!swiped\">\n        <button id=\"submitKnob\"></button>\n        <p id=\"ref1\" class=\"refText\"><i class=\"icon-angle-double-right\"></i></p>\n        <p id=\"ref2\" class=\"refText\">${locale.card_hints.swipe}</p>\n      </div>\n      <div id=\"spinWheel\" if.bind=\"swiped\">\n        <i class=\"icon-spin4 animate-spin\"></i>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('text!routes/cards/thanks/thanks.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./thanks.css\"></require>\n\n  <div id=\"petalogo\" class=\"cardInner\">\n    <img src=\"assets/graphics/Riskmap_logo_noSub.svg\">\n  </div>\n  <div id=\"thankslogo\">\n    <i class=\"icon-add-report\"></i>\n  </div>\n\n\n  <div id=\"thanksText\">\n    <p id=\"thanksBold\">${locale.card_hints.thanks}</p>\n    <br>\n    <p>${locale.card_hints.confirmation} ${network_name}</p>\n      <br>\n      <p>${locale.card_hints.redirect}</p>\n  </div>\n\n\n\n</template>\n"; });
define('text!routes/landing/landing.css', ['module'], function(module) { module.exports = "::-webkit-scrollbar {\n  display: none;\n}\n#pageWrapper {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n}\n#pageWrapper #screen {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n  background-color: rgba(128, 128, 128, 0.25);\n  z-index: 1025;\n}\n#pageWrapper #screen #cityPopup {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  width: 200px;\n  -ms-transform: translate(-50%, -50%);\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  padding: 12px;\n  border: none;\n  border-radius: 6px;\n  box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.4);\n  z-index: 1030;\n  background: rgba(255, 255, 255, 0.85);\n}\n#pageWrapper #screen #cityPopup p {\n  font-family: \"Roboto-Medium\", \"Roboto\", Open Sans;\n  font-size: 14px;\n  color: #424242;\n  margin: 0 0 6px 0;\n}\n#pageWrapper #screen #cityPopup label {\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  font-size: 14px;\n  color: #424242;\n  cursor: pointer;\n  text-transform: capitalize;\n  text-decoration: none;\n}\n@media (min-width: 420px) {\n  #pageWrapper #screen #cityPopup label:hover {\n    color: #10b7ff;\n  }\n}\n#pageWrapper #screen #cityPopup label:active {\n  color: #1f4963;\n}\n#pageWrapper #map {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n}\n#pageWrapper #map .leaflet-top {\n  top: 45px;\n}\n#pageWrapper #map .leaflet-control-zoom a {\n  background-color: #ffffff;\n}\n#pageWrapper #map .leaflet-control-zoom-in,\n#pageWrapper #map .leaflet-control-zoom-out {\n  width: 30px;\n  height: 28px;\n}\n#pageWrapper #map .leaflet-bottom {\n  bottom: 10px;\n  left: 10px;\n}\n#pageWrapper #topBar {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 45px;\n  background-color: rgba(255, 255, 255, 0.85);\n  z-index: 1020;\n  border-bottom: 1px solid #808080;\n}\n#pageWrapper #topBar #logo_top {\n  position: absolute;\n  left: 12px;\n  bottom: 2px;\n  width: 125px;\n  top: 2px;\n}\n#pageWrapper #topBar #logo_top #pbLogo {\n  width: 100%;\n}\n#pageWrapper #topBar div.menuBtn {\n  display: none;\n  position: absolute;\n  background: transparent;\n  top: 8px;\n  right: 10px;\n  line-height: 30px;\n}\n#pageWrapper #topBar div.menuBtn i {\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  font-size: 30px;\n  color: #424242;\n  cursor: pointer;\n}\n@media (min-width: 420px) {\n  #pageWrapper #topBar div.menuBtn i:hover {\n    color: #10b7ff;\n  }\n}\n#pageWrapper #topBar div.menuBtn i:active {\n  color: #1f4963;\n}\n#pageWrapper #topBar div.active {\n  display: block;\n}\n#pageWrapper #logo_bottom {\n  position: absolute;\n  left: 10px;\n  bottom: 4.5px;\n  width: 180px;\n  padding: 0px;\n  margin: 0px;\n  z-index: 999;\n}\n#pageWrapper #logo_bottom #mitLogo {\n  width: 100%;\n}\n#pageWrapper #infoPane {\n  display: none;\n  position: absolute;\n  height: 200px;\n  bottom: 0px;\n  padding: 0px;\n  margin: 0px;\n  z-index: 1000;\n  background-color: rgba(255, 255, 255, 0.85);\n  box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.4);\n  background-color: #ffffff;\n}\n@media screen and (min-width: 320px) {\n  #pageWrapper #infoPane {\n    width: 100%;\n  }\n}\n@media screen and (min-width: 420px) {\n  #pageWrapper #infoPane {\n    width: 420px;\n    right: 0px;\n  }\n}\n#pageWrapper #infoPane .closeBtn {\n  position: absolute;\n  background: transparent;\n  margin: 0px;\n  padding: 0px;\n  top: 6px;\n  right: 6px;\n  text-align: right;\n  z-index: 1015;\n  font-family: \"Roboto-Medium\", \"Roboto\", Open Sans;\n  font-size: 18px;\n  color: #424242;\n  cursor: pointer;\n}\n@media (min-width: 420px) {\n  #pageWrapper #infoPane .closeBtn:hover {\n    color: #10b7ff;\n  }\n}\n#pageWrapper #infoPane .closeBtn:active {\n  color: #1f4963;\n}\n#pageWrapper #infoPane .infoWrapper {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  padding: 12px 12px 0px 12px;\n  z-index: 1002;\n}\n#pageWrapper #sidePane {\n  display: none;\n  position: absolute;\n  height: 320px;\n  bottom: 0px;\n  padding: 0px;\n  margin: 0px;\n  z-index: 1000;\n  background-color: rgba(255, 255, 255, 0.85);\n  box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.4);\n  overflow: scroll;\n  background-color: #ffffff;\n}\n@media screen and (min-width: 320px) {\n  #pageWrapper #sidePane {\n    width: 100%;\n  }\n}\n@media screen and (min-width: 420px) {\n  #pageWrapper #sidePane {\n    width: 420px;\n    right: 0px;\n  }\n}\n"; });
define('text!routes/cards/terms/terms.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./terms.css\"></require>\n\n    <div id=\"TandCWrapper\" innerhtml.bind=\"locale.termsContents\">\n    </div>\n\n</template>\n"; });
define('text!routes/cards/card-template/card-template.css', ['module'], function(module) { module.exports = "::-webkit-scrollbar {\n  display: none;\n}\n#cardTemplateWrapper {\n  position: absolute;\n  width: 300px;\n  height: 272px;\n  left: 50%;\n  top: 0px;\n  -ms-transform: translate(-50%, 0);\n  -webkit-transform: translate(-50%, 0);\n  transform: translate(-50%, 0);\n  overflow: visible;\n}\n@media screen and (min-height: 372px) {\n  #cardTemplateWrapper {\n    top: 50%;\n    -ms-transform: translate(-50%, -50%);\n    -webkit-transform: translate(-50%, -50%);\n    transform: translate(-50%, -50%);\n  }\n}\n"; });
define('text!routes/cards/description/description.css', ['module'], function(module) { module.exports = "::-webkit-scrollbar {\n  display: none;\n}\n#descriptionWrapper {\n  position: absolute;\n  width: 300px;\n  height: 272px;\n  left: 50%;\n  top: 0px;\n  -ms-transform: translate(-50%, 0);\n  -webkit-transform: translate(-50%, 0);\n  transform: translate(-50%, 0);\n  overflow: visible;\n}\n@media screen and (min-height: 372px) {\n  #descriptionWrapper {\n    top: 50%;\n    -ms-transform: translate(-50%, -50%);\n    -webkit-transform: translate(-50%, -50%);\n    transform: translate(-50%, -50%);\n  }\n}\n#descriptionWrapper #textarea {\n  position: relative;\n  width: 208px;\n  height: 192px;\n  margin: 8px 0 0 0;\n  padding: 6px;\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  color: #ffffff;\n  border: none;\n  font-size: 14px;\n  resize: none;\n  background-color: #808080;\n  outline: none;\n}\n#descriptionWrapper #textarea::-webkit-input-placeholder {\n  color: #2f2f2f;\n}\n#descriptionWrapper #textarea::-moz-placeholder {\n  color: #2f2f2f;\n}\n#descriptionWrapper #textarea:-moz-placeholder {\n  color: #2f2f2f;\n}\n#descriptionWrapper #textarea:-ms-input-placeholder {\n  color: #2f2f2f;\n}\n#descriptionWrapper #textarea:focus {\n  margin-top: 7px;\n  height: 191px;\n  border: 1px solid #31aade;\n}\n#descriptionWrapper #modBtnWrapper {\n  position: relative;\n  width: 226px;\n  height: 36px;\n  border-top: 3px solid #31aade;\n  margin: 12px auto;\n}\n#descriptionWrapper #modBtnWrapper .modBtn {\n  position: relative;\n  width: 36px;\n  height: 36px;\n  padding: 3px 0 0 0;\n  margin: 0px;\n  background-color: transparent;\n  border: none;\n  color: #ffffff;\n  text-shadow: 1px 1px 2px #424242;\n  outline: none;\n  float: left;\n}\n#descriptionWrapper #modBtnWrapper .modBtn:first-child {\n  margin-right: 6px;\n}\n#descriptionWrapper #modBtnWrapper .modBtn .icon-block {\n  line-height: 36px;\n  font-size: 20px;\n}\n#descriptionWrapper #modBtnWrapper .modBtn .icon-keyboard {\n  position: absolute;\n  font-size: 20px;\n  left: 3px;\n  bottom: 3.5px;\n}\n#descriptionWrapper #modBtnWrapper .modBtn .icon-down-open {\n  position: absolute;\n  font-size: 12px;\n  left: 8.5px;\n  bottom: -3px;\n}\n#descriptionWrapper #modBtnWrapper .modBtn .icon-up-open {\n  position: absolute;\n  font-size: 12px;\n  left: 8.5px;\n  bottom: 20px;\n}\n#descriptionWrapper #modBtnWrapper .modBtn:active {\n  border-bottom: 2px solid #31aade;\n  color: #31aade;\n}\n#descriptionWrapper #modBtnWrapper .modBtn:disabled {\n  border: none;\n  color: rgba(0, 0, 0, 0.15);\n  text-shadow: none;\n}\n#descriptionWrapper #modBtnWrapper p {\n  margin: 0px;\n  padding: 12px 0px 0px 0px;\n  float: right;\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  font-size: 14px;\n  color: #424242;\n}\n"; });
define('text!routes/cards/depth/depth.css', ['module'], function(module) { module.exports = "::-webkit-scrollbar {\n  display: none;\n}\n#depthWrapper {\n  position: absolute;\n  width: 300px;\n  height: 272px;\n  left: 50%;\n  top: 0px;\n  -ms-transform: translate(-50%, 0);\n  -webkit-transform: translate(-50%, 0);\n  transform: translate(-50%, 0);\n  overflow: visible;\n}\n@media screen and (min-height: 372px) {\n  #depthWrapper {\n    top: 50%;\n    -ms-transform: translate(-50%, -50%);\n    -webkit-transform: translate(-50%, -50%);\n    transform: translate(-50%, -50%);\n  }\n}\n#depthWrapper #bgImage {\n  width: 96%;\n  height: 96%;\n  z-index: 2;\n}\n#depthWrapper #floodZone {\n  position: absolute;\n  width: 87%;\n  height: 22%;\n  left: 6.5%;\n  bottom: 0px;\n  -ms-transform: translate(0, -12px);\n  -webkit-transform: translate(0, -12px);\n  transform: translate(0, -12px);\n  border: none;\n  border-top: 2px dashed white;\n  background: linear-gradient(rgba(49, 170, 222, 0.6), rgba(49, 170, 222, 0));\n  z-index: 3;\n}\n#depthWrapper #sliderZone {\n  position: absolute;\n  width: 100%;\n  height: 36px;\n  left: 0px;\n  bottom: 22%;\n  -ms-transform: translate(0, 20%);\n  -webkit-transform: translate(0, 20%);\n  transform: translate(0, 20%);\n  overflow: visible;\n  z-index: 10;\n}\n#depthWrapper #sliderZone #depthText {\n  position: absolute;\n  top: -4px;\n  left: 20px;\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  font-size: 14px;\n  color: #ffffff;\n  text-shadow: 1px 1px 3px #424242;\n}\n#depthWrapper #sliderZone .knobHelper {\n  position: absolute;\n  right: 10.5px;\n  color: rgba(255, 255, 255, 0.85);\n  font-size: 12px;\n  line-height: 12px;\n  z-index: 9;\n}\n#depthWrapper #sliderZone .knobHelper#hTop {\n  top: -10px;\n}\n#depthWrapper #sliderZone .knobHelper#hBottom {\n  bottom: -5px;\n}\n#depthWrapper #sliderZone #knob {\n  position: absolute;\n  width: 18px;\n  height: 18px;\n  top: 5px;\n  right: 8px;\n  background-color: #31aade;\n  border: 2px solid #ffffff;\n  border-radius: 11px;\n  /* add border to width/2 */\n  z-index: 8;\n  box-shadow: 0px 0px 12px 8px rgba(49, 170, 222, 0.4);\n}\n"; });
define('text!routes/cards/error/error.css', ['module'], function(module) { module.exports = "::-webkit-scrollbar {\n  display: none;\n}\n#petalogo {\n  position: relative;\n  width: 80%;\n  margin: 0 auto;\n  padding: 20px 0 10px 0;\n  border: none;\n  border-bottom: 1px solid #2f2f2f;\n}\n#petalogo img {\n  width: 60%;\n}\n#msgWrapper {\n  position: relative;\n  width: 60%;\n  margin: auto;\n}\n#msgWrapper h2 {\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  font-size: 21px;\n  color: #424242;\n  color: #ffffff;\n}\n#msgWrapper p {\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  font-size: 14px;\n  color: #424242;\n  color: #ffffff;\n}\n#msgWrapper a {\n  font-family: \"Roboto-Medium\", \"Roboto\", Open Sans;\n  font-size: 14px;\n  color: #424242;\n  cursor: pointer;\n  color: #ffffff;\n}\n@media (min-width: 420px) {\n  #msgWrapper a:hover {\n    color: #10b7ff;\n  }\n}\n#msgWrapper a:active {\n  color: #1f4963;\n}\n#errorlogo {\n  position: relative;\n  margin: 10px auto 0 auto;\n  padding: 8px 0 0 0;\n  font-size: 80px;\n  color: #ffffff;\n}\n"; });
define('text!routes/cards/location/location.css', ['module'], function(module) { module.exports = "::-webkit-scrollbar {\n  display: none;\n}\n#locationWrapper {\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n}\n#locationWrapper #mapWrapper {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n  z-index: 1;\n}\n#locationWrapper #mapMarker {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  -ms-transform: translate(-50%, -90%);\n  -webkit-transform: translate(-50%, -90%);\n  transform: translate(-50%, -90%);\n  font-size: 48px;\n  z-index: 100;\n}\n"; });
define('text!routes/cards/photo/photo.css', ['module'], function(module) { module.exports = "::-webkit-scrollbar {\n  display: none;\n}\n#photoWrapper {\n  position: absolute;\n  width: 300px;\n  height: 272px;\n  left: 50%;\n  top: 0px;\n  -ms-transform: translate(-50%, 0);\n  -webkit-transform: translate(-50%, 0);\n  transform: translate(-50%, 0);\n  overflow: visible;\n}\n@media screen and (min-height: 372px) {\n  #photoWrapper {\n    top: 50%;\n    -ms-transform: translate(-50%, -50%);\n    -webkit-transform: translate(-50%, -50%);\n    transform: translate(-50%, -50%);\n  }\n}\n#photoWrapper #modBtnWrapper {\n  position: relative;\n  margin: 12px auto;\n  width: 226px;\n  height: 36px;\n  border-top: 3px solid #31aade;\n}\n#photoWrapper #modBtnWrapper .modBtn {\n  position: relative;\n  width: 36px;\n  height: 36px;\n  padding: 3px 0 0 0;\n  background-color: transparent;\n  border: none;\n  font-size: 24px;\n  line-height: 36px;\n  color: #ffffff;\n  text-shadow: 1px 1px 2px #424242;\n  outline: none;\n}\n#photoWrapper #modBtnWrapper .modBtn:active {\n  border-bottom: 2px solid #31aade;\n  color: #31aade;\n}\n#photoWrapper #modBtnWrapper .modBtn:disabled {\n  border: none;\n  color: rgba(0, 0, 0, 0.15);\n  text-shadow: none;\n}\n#photoWrapper #modBtnWrapper #changeButton,\n#photoWrapper #modBtnWrapper #rotateButton {\n  float: left;\n  margin-right: 6px;\n}\n#photoWrapper #modBtnWrapper #deleteButton {\n  float: right;\n}\n#photoWrapper #previewWrapper {\n  position: relative;\n  width: 208px;\n  height: 208px;\n  margin: 4px auto;\n  color: rgba(0, 0, 0, 0.15);\n  border: 2px solid #808080;\n}\n#photoWrapper #previewWrapper.enabled {\n  color: rgba(255, 255, 255, 0.4);\n  border: 2px solid rgba(255, 255, 255, 0.4);\n}\n#photoWrapper #previewWrapper.enabled:active i {\n  color: #31aade;\n}\n#photoWrapper #previewWrapper i {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  padding: 0px;\n  -ms-transform: translate(-50%, -50%);\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  font-size: 120px;\n  z-index: 2;\n}\n#photoWrapper #previewWrapper canvas {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  z-index: 3;\n}\n#photoWrapper #previewWrapper p {\n  position: absolute;\n  width: 100%;\n  top: 70%;\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  font-size: 14px;\n  color: #424242;\n}\n"; });
define('text!routes/cards/review/review.css', ['module'], function(module) { module.exports = "::-webkit-scrollbar {\n  display: none;\n}\n#reviewWrapper {\n  position: absolute;\n  width: 300px;\n  height: 272px;\n  left: 50%;\n  top: 0px;\n  -ms-transform: translate(-50%, 0);\n  -webkit-transform: translate(-50%, 0);\n  transform: translate(-50%, 0);\n  overflow: visible;\n}\n@media screen and (min-height: 372px) {\n  #reviewWrapper {\n    top: 50%;\n    -ms-transform: translate(-50%, -50%);\n    -webkit-transform: translate(-50%, -50%);\n    transform: translate(-50%, -50%);\n  }\n}\n#reviewWrapper #summaryCard {\n  position: absolute;\n  width: 100%;\n  height: 140px;\n  left: 50%;\n  top: 12px;\n  -ms-transform: translate(-50%, 0);\n  -webkit-transform: translate(-50%, 0);\n  transform: translate(-50%, 0);\n  background-color: #424242;\n  box-shadow: 2px 5px 8px 0px rgba(0, 0, 0, 0.4);\n}\n#reviewWrapper #summaryCard #summaryPhoto {\n  position: relative;\n  width: 140px;\n  height: 100%;\n  overflow: hidden;\n  float: left;\n  text-align: left;\n}\n#reviewWrapper #summaryCard #summaryPhoto #photo {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n  z-index: 3;\n}\n#reviewWrapper #summaryCard #summaryPhoto i {\n  font-size: 80px;\n  line-height: 140px;\n  color: #ffffff;\n  z-index: 2;\n  opacity: 0.4;\n}\n#reviewWrapper #summaryCard #summaryTextWrapper {\n  position: relative;\n  width: 50%;\n  height: 100%;\n  margin: 0;\n  text-align: left;\n  line-height: 18px;\n  float: right;\n  overflow: auto;\n}\n#reviewWrapper #summaryCard #summaryTextWrapper #floodH {\n  color: #31aade;\n  font-family: 'Roboto-Medium', 'Roboto', sans-serif;\n  font-size: 14px;\n  margin: 4px 10px 0 0;\n}\n#reviewWrapper #summaryCard #summaryTextWrapper #comment {\n  color: #ffffff;\n  font-family: 'Roboto-Light', 'Roboto', sans-serif;\n  margin: 4px 10px 0 0;\n  font-size: 12px;\n}\n#reviewWrapper #reviewSubmit {\n  position: absolute;\n  left: 50%;\n  bottom: 12px;\n  width: 100%;\n  /* width of nav buttons + margin */\n  -ms-transform: translate(-50%, 0);\n  -webkit-transform: translate(-50%, 0);\n  transform: translate(-50%, 0);\n  padding: 0px;\n}\n#reviewWrapper #reviewSubmit #termsConditions {\n  width: 100%;\n  margin: 0 0 12px 0;\n}\n#reviewWrapper #reviewSubmit #termsConditions p {\n  margin: 0;\n  padding: 0;\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  font-size: 12px;\n  color: #424242;\n  color: #ffffff;\n}\n#reviewWrapper #reviewSubmit #termsConditions p a {\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  font-size: 12px;\n  color: #424242;\n  cursor: pointer;\n  color: #ffffff;\n}\n@media (min-width: 420px) {\n  #reviewWrapper #reviewSubmit #termsConditions p a:hover {\n    color: #10b7ff;\n  }\n}\n#reviewWrapper #reviewSubmit #termsConditions p a:active {\n  color: #1f4963;\n}\n#reviewWrapper #reviewSubmit #submitSlider {\n  position: relative;\n  width: 64%;\n  height: 36px;\n  margin: 0px auto;\n  padding: 3px;\n  border: 1px solid rgba(255, 255, 255, 0.4);\n  border-radius: 6px;\n  box-shadow: inset 2px 5px 8px 0px rgba(0, 0, 0, 0.4);\n  overflow: hidden;\n  z-index: 3;\n}\n#reviewWrapper #reviewSubmit #submitSlider #submitKnob {\n  position: relative;\n  width: 36px;\n  height: 36px;\n  border: none;\n  border-radius: 6px;\n  background-color: #31aade;\n  outline: none;\n  box-shadow: 2px 5px 8px 0px rgba(0, 0, 0, 0.4);\n  float: left;\n  z-index: 2;\n}\n#reviewWrapper #reviewSubmit #submitSlider #submitKnob:active {\n  background-color: #31aade;\n  box-shadow: 2px 5px 8px 0px rgba(0, 0, 0, 0.4);\n}\n#reviewWrapper #reviewSubmit #submitSlider .refText {\n  margin: 0px;\n  padding: 0px;\n  color: #ffffff;\n  opacity: 0.4;\n  z-index: 1;\n  float: left;\n}\n#reviewWrapper #reviewSubmit #submitSlider .refText#ref1 {\n  font-size: 30px;\n}\n#reviewWrapper #reviewSubmit #submitSlider .refText#ref2 {\n  font-size: 12px;\n  line-height: 36px;\n  font-family: 'Roboto-Light', 'Roboto', Open-sans;\n}\n#reviewWrapper #reviewSubmit #spinWheel {\n  position: relative;\n  margin: 0 auto 18px auto;\n  z-index: 3;\n  font-size: 42px;\n  color: #31aade;\n  text-shadow: 1px 1px 4px #424242;\n}\n"; });
define('text!routes/cards/thanks/thanks.css', ['module'], function(module) { module.exports = "::-webkit-scrollbar {\n  display: none;\n}\n#thanksText {\n  position: relative;\n  width: 75%;\n  top: 50%;\n  left: 50%;\n  -ms-transform: translate(-50%, 0%);\n  -webkit-transform: translate(-50%, 0%);\n  transform: translate(-50%, 0%);\n  color: #fff;\n  text-align: center;\n  font-size: 14px;\n  font-family: 'Roboto-Normal', 'Helvetica Neue', sans-serif;\n}\n#thanksBold {\n  color: white;\n  font-size: 21px;\n  font-family: 'Roboto-Medium', 'Helvetica Neue', sans-serif;\n}\n#petalogo {\n  position: relative;\n  padding: 5px 30px 5px 30px;\n  width: 60%;\n  top: 10px;\n  left: 50%;\n  -ms-transform: translate(-50%, 0);\n  -webkit-transform: translate(-50%, 0);\n  transform: translate(-50%, 0);\n  border: none;\n  border-bottom: 1px solid #2f2f2f;\n}\n#thankslogo {\n  position: relative;\n  margin: 30px auto 0 auto;\n  padding: 5px 30px 5px 30px;\n  width: 60%;\n  font-size: 80px;\n  color: #ffffff;\n}\n"; });
define('text!routes/cards/terms/terms.css', ['module'], function(module) { module.exports = "#TandCWrapper {\n  position: relative;\n  width: 80%;\n  height: 80%;\n  margin: auto;\n  padding: 9px;\n  overflow: scroll;\n  color: #fff;\n  text-align: justify;\n  font-size: 12px;\n  font-family: 'Roboto-Normal', 'Helvetica Neue', sans-serif;\n  border: none;\n  border-bottom: 2px solid #31aade;\n  top: 3%;\n  transform: translateY(5%);\n}\n#TandCWrapper .headers {\n  text-align: left;\n  font-family: 'Roboto-Medium', 'Helvetica Neue', sans-serif;\n}\n"; });
//# sourceMappingURL=app-bundle.js.map
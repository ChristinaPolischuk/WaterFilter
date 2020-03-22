$(function () {
  //menu
  var height = window.innerHeight,
    // var height = document.body.offsetHeight,
    x = 0,
    y = height / 2,
    curveX = 10,
    curveY = 0,
    targetX = 0,
    xitteration = 0,
    yitteration = 0,
    menuExpanded = false;

  (blob = $("#blob")),
  (blobPath = $("#blob-path")),
  (hamburger = $(".menu-hamburger"));

  $(this).on("mousemove", function (e) {
    // x = e.pageX;
    x = e.clientX;

    // y = e.pageY;
    y = e.clientY;
  });

  $(".menu-hamburger").on("click", function () {
    if ($(this).parent().hasClass('expanded')) {
      menuExpanded = false;
      $(this).parent().removeClass('expanded')
    } else {
      $(this)
        .parent()
        .addClass("expanded");
      menuExpanded = true;
    }

  });

  $(".menu").on("mouseleave", function () {
    menuExpanded = false;
    $(this)
      .removeClass("expanded");
  });

  function easeOutExpo(
    currentIteration,
    startValue,
    changeInValue,
    totalIterations
  ) {
    return (
      changeInValue *
      (-Math.pow(2, (-10 * currentIteration) / totalIterations) + 1) +
      startValue
    );
  }

  var hoverZone = 150;
  var expandAmount = 20;

  function svgCurve() {
    if (curveX > x - 1 && curveX < x + 1) {
      xitteration = 0;
    } else {
      if (menuExpanded) {
        targetX = 0;
      } else {
        xitteration = 0;
        if (x > hoverZone) {
          targetX = 0;
        } else {
          targetX = -(((60 + expandAmount) / 100) * (x - hoverZone));
        }
      }
      xitteration++;
    }

    if (curveY > y - 1 && curveY < y + 1) {
      yitteration = 0;
    } else {
      yitteration = 0;
      yitteration++;
    }

    curveX = easeOutExpo(xitteration, curveX, targetX - curveX, 100);
    curveY = easeOutExpo(yitteration, curveY, y - curveY, 100);

    var anchorDistance = 200;
    var curviness = anchorDistance - 40;

    var newCurve2 =
      "M60," +
      height +
      "H0V0h60v" +
      (curveY - anchorDistance) +
      "c0," +
      curviness +
      "," +
      curveX +
      "," +
      curviness +
      "," +
      curveX +
      "," +
      anchorDistance +
      "S60," +
      curveY +
      ",60," +
      (curveY + anchorDistance * 2) +
      "V" +
      height +
      "z";

    blobPath.attr("d", newCurve2);

    blob.width(curveX + 60);

    hamburger.css("transform", "translate(" + curveX + "px, " + curveY + "px)");

    // $('h2').css('transform', 'translateY(' + curveY + 'px)');
    window.requestAnimationFrame(svgCurve);
  }

  window.requestAnimationFrame(svgCurve);

  //liquid-button
  ("use strict");

  function _instanceof(left, right) {
    if (
      right != null &&
      typeof Symbol !== "undefined" &&
      right[Symbol.hasInstance]
    ) {
      return !!right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var LiquidButton = /*#__PURE__*/ (function () {
    function LiquidButton(svg) {
      _classCallCheck(this, LiquidButton);

      var options = svg.dataset;
      this.id = this.constructor.id || (this.constructor.id = 1);
      this.constructor.id++;
      this.xmlns = "http://www.w3.org/2000/svg";
      this.tension = options.tension * 1 || 0.4;
      this.width = options.width * 1 || 200;
      this.height = options.height * 1 || 50;
      this.margin = options.margin || 15;
      this.hoverFactor = options.hoverFactor || -0.1;
      this.gap = options.gap || 5;
      this.debug = options.debug || false;
      this.forceFactor = options.forceFactor || 0.2;
      this.color1 = options.color1 || "#36DFE7";
      this.color2 = options.color2 || "#03a9f4";
      this.color3 = options.color3 || "#BF09E6";
      this.textColor = options.textColor || "#FFFFFF";
      this.text = options.text || "Відправити";
      this.svg = svg;
      this.layers = [{
          points: [],
          viscosity: 0.5,
          mouseForce: 100,
          forceLimit: 2
        },
        {
          points: [],
          viscosity: 0.8,
          mouseForce: 150,
          forceLimit: 3
        }
      ];

      for (var layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
        var layer = this.layers[layerIndex];
        layer.viscosity =
          options["layer-" + (layerIndex + 1) + "Viscosity"] * 1 ||
          layer.viscosity;
        layer.mouseForce =
          options["layer-" + (layerIndex + 1) + "MouseForce"] * 1 ||
          layer.mouseForce;
        layer.forceLimit =
          options["layer-" + (layerIndex + 1) + "ForceLimit"] * 1 ||
          layer.forceLimit;
        layer.path = document.createElementNS(this.xmlns, "path");
        this.svg.appendChild(layer.path);
      }

      this.wrapperElement = options.wrapperElement || document.body;

      if (!this.svg.parentElement) {
        this.wrapperElement.append(this.svg);
      }

      this.svgText = document.createElementNS(this.xmlns, "text");
      this.svgText.setAttribute("x", "50%");
      this.svgText.setAttribute("y", "50%");
      this.svgText.setAttribute("dy", ~~(this.height / 8) + "px");
      this.svgText.setAttribute("font-size", ~~(this.height / 3));
      this.svgText.style.fontFamily = "sans-serif";
      this.svgText.setAttribute("text-anchor", "middle");
      this.svgText.setAttribute("pointer-events", "none");
      this.svg.appendChild(this.svgText);
      this.svgDefs = document.createElementNS(this.xmlns, "defs");
      this.svg.appendChild(this.svgDefs);
      this.touches = [];
      this.noise = options.noise || 0;
      document.body.addEventListener("touchstart", this.touchHandler);
      document.body.addEventListener("touchmove", this.touchHandler);
      document.body.addEventListener("touchend", this.clearHandler);
      document.body.addEventListener("touchcancel", this.clearHandler);
      this.svg.addEventListener("mousemove", this.mouseHandler);
      this.svg.addEventListener("mouseout", this.clearHandler);
      this.initOrigins();
      this.animate();
    }

    _createClass(LiquidButton, [{
        key: "distance",
        value: function distance(p1, p2) {
          return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
        }
      },
      {
        key: "update",
        value: function update() {
          for (
            var layerIndex = 0; layerIndex < this.layers.length; layerIndex++
          ) {
            var layer = this.layers[layerIndex];
            var points = layer.points;

            for (var pointIndex = 0; pointIndex < points.length; pointIndex++) {
              var point = points[pointIndex];
              var dx = point.ox - point.x + (Math.random() - 0.5) * this.noise;
              var dy = point.oy - point.y + (Math.random() - 0.5) * this.noise;
              var d = Math.sqrt(dx * dx + dy * dy);
              var f = d * this.forceFactor;
              point.vx += f * (dx / d || 0);
              point.vy += f * (dy / d || 0);

              for (
                var touchIndex = 0; touchIndex < this.touches.length; touchIndex++
              ) {
                var touch = this.touches[touchIndex];
                var mouseForce = layer.mouseForce;

                if (
                  touch.x > this.margin &&
                  touch.x < this.margin + this.width &&
                  touch.y > this.margin &&
                  touch.y < this.margin + this.height
                ) {
                  mouseForce *= -this.hoverFactor;
                }

                var mx = point.x - touch.x;
                var my = point.y - touch.y;
                var md = Math.sqrt(mx * mx + my * my);
                var mf = Math.max(
                  -layer.forceLimit,
                  Math.min(layer.forceLimit, (mouseForce * touch.force) / md)
                );
                point.vx += mf * (mx / md || 0);
                point.vy += mf * (my / md || 0);
              }

              point.vx *= layer.viscosity;
              point.vy *= layer.viscosity;
              point.x += point.vx;
              point.y += point.vy;
            }

            for (
              var _pointIndex = 0; _pointIndex < points.length; _pointIndex++
            ) {
              var prev =
                points[(_pointIndex + points.length - 1) % points.length];
              var _point = points[_pointIndex];
              var next =
                points[(_pointIndex + points.length + 1) % points.length];
              var dPrev = this.distance(_point, prev);
              var dNext = this.distance(_point, next);
              var line = {
                x: next.x - prev.x,
                y: next.y - prev.y
              };
              var dLine = Math.sqrt(line.x * line.x + line.y * line.y);
              _point.cPrev = {
                x: _point.x - (line.x / dLine) * dPrev * this.tension,
                y: _point.y - (line.y / dLine) * dPrev * this.tension
              };
              _point.cNext = {
                x: _point.x + (line.x / dLine) * dNext * this.tension,
                y: _point.y + (line.y / dLine) * dNext * this.tension
              };
            }
          }
        }
      },
      {
        key: "animate",
        value: function animate() {
          var _this = this;

          this.raf(function () {
            _this.update();

            _this.draw();

            _this.animate();
          });
        }
      },
      {
        key: "draw",
        value: function draw() {
          for (
            var layerIndex = 0; layerIndex < this.layers.length; layerIndex++
          ) {
            var layer = this.layers[layerIndex];

            if (layerIndex === 1) {
              if (this.touches.length > 0) {
                while (this.svgDefs.firstChild) {
                  this.svgDefs.removeChild(this.svgDefs.firstChild);
                }

                for (
                  var touchIndex = 0; touchIndex < this.touches.length; touchIndex++
                ) {
                  var touch = this.touches[touchIndex];
                  var gradient = document.createElementNS(
                    this.xmlns,
                    "radialGradient"
                  );
                  gradient.id = "liquid-gradient-" + this.id + "-" + touchIndex;
                  var start = document.createElementNS(this.xmlns, "stop");
                  start.setAttribute("stop-color", this.color3);
                  start.setAttribute("offset", "0%");
                  var stop = document.createElementNS(this.xmlns, "stop");
                  stop.setAttribute("stop-color", this.color2);
                  stop.setAttribute("offset", "100%");
                  gradient.appendChild(start);
                  gradient.appendChild(stop);
                  this.svgDefs.appendChild(gradient);
                  gradient.setAttribute("cx", touch.x / this.svgWidth);
                  gradient.setAttribute("cy", touch.y / this.svgHeight);
                  gradient.setAttribute("r", touch.force);
                  layer.path.style.fill = "url(#" + gradient.id + ")";
                }
              } else {
                layer.path.style.fill = this.color2;
              }
            } else {
              layer.path.style.fill = this.color1;
            }

            var points = layer.points;
            var commands = [];
            commands.push("M", points[0].x, points[0].y);

            for (
              var pointIndex = 1; pointIndex < points.length; pointIndex += 1
            ) {
              commands.push(
                "C",
                points[(pointIndex + 0) % points.length].cNext.x,
                points[(pointIndex + 0) % points.length].cNext.y,
                points[(pointIndex + 1) % points.length].cPrev.x,
                points[(pointIndex + 1) % points.length].cPrev.y,
                points[(pointIndex + 1) % points.length].x,
                points[(pointIndex + 1) % points.length].y
              );
            }

            commands.push("Z");
            layer.path.setAttribute("d", commands.join(" "));
          }

          this.svgText.textContent = this.text;
          this.svgText.style.fill = this.textColor;
        }
      },
      {
        key: "createPoint",
        value: function createPoint(x, y) {
          return {
            x: x,
            y: y,
            ox: x,
            oy: y,
            vx: 0,
            vy: 0
          };
        }
      },
      {
        key: "initOrigins",
        value: function initOrigins() {
          this.svg.setAttribute("width", this.svgWidth);
          this.svg.setAttribute("height", this.svgHeight);

          for (
            var layerIndex = 0; layerIndex < this.layers.length; layerIndex++
          ) {
            var layer = this.layers[layerIndex];
            var points = [];

            for (
              var x = ~~(this.height / 2); x < this.width - ~~(this.height / 2); x += this.gap
            ) {
              points.push(this.createPoint(x + this.margin, this.margin));
            }

            for (
              var alpha = ~~(this.height * 1.25); alpha >= 0; alpha -= this.gap
            ) {
              var angle = (Math.PI / ~~(this.height * 1.25)) * alpha;
              points.push(
                this.createPoint(
                  (Math.sin(angle) * this.height) / 2 +
                  this.margin +
                  this.width -
                  this.height / 2,
                  (Math.cos(angle) * this.height) / 2 +
                  this.margin +
                  this.height / 2
                )
              );
            }

            for (
              var _x = this.width - ~~(this.height / 2) - 1; _x >= ~~(this.height / 2); _x -= this.gap
            ) {
              points.push(
                this.createPoint(_x + this.margin, this.margin + this.height)
              );
            }

            for (
              var _alpha = 0; _alpha <= ~~(this.height * 1.25); _alpha += this.gap
            ) {
              var _angle = (Math.PI / ~~(this.height * 1.25)) * _alpha;

              points.push(
                this.createPoint(
                  this.height -
                  (Math.sin(_angle) * this.height) / 2 +
                  this.margin -
                  this.height / 2,
                  (Math.cos(_angle) * this.height) / 2 +
                  this.margin +
                  this.height / 2
                )
              );
            }

            layer.points = points;
          }
        }
      },
      {
        key: "mouseHandler",
        get: function get() {
          var _this2 = this;

          return function (e) {
            _this2.touches = [{
              x: e.offsetX,
              y: e.offsetY,
              force: 1
            }];
          };
        }
      },
      {
        key: "touchHandler",
        get: function get() {
          var _this3 = this;

          return function (e) {
            _this3.touches = [];

            var rect = _this3.svg.getBoundingClientRect();

            for (
              var touchIndex = 0; touchIndex < e.changedTouches.length; touchIndex++
            ) {
              var touch = e.changedTouches[touchIndex];
              var x = touch.pageX - rect.left;
              var y = touch.pageY - rect.top;

              if (
                x > 0 &&
                y > 0 &&
                x < _this3.svgWidth &&
                y < _this3.svgHeight
              ) {
                _this3.touches.push({
                  x: x,
                  y: y,
                  force: touch.force || 1
                });
              }
            }

            // e.preventDefault();
          };
        }
      },
      {
        key: "clearHandler",
        get: function get() {
          var _this4 = this;

          return function (e) {
            _this4.touches = [];
          };
        }
      },
      {
        key: "raf",
        get: function get() {
          return (
            this.__raf ||
            (this.__raf = (
              window.requestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              function (callback) {
                setTimeout(callback, 10);
              }
            ).bind(window))
          );
        }
      },
      {
        key: "svgWidth",
        get: function get() {
          return this.width + this.margin * 2;
        }
      },
      {
        key: "svgHeight",
        get: function get() {
          return this.height + this.margin * 2;
        }
      }
    ]);

    return LiquidButton;
  })();

  var redraw = function redraw() {
    button.initOrigins();
  };

  var buttons = document.getElementsByClassName("liquid-button");

  for (var buttonIndex = 0; buttonIndex < buttons.length; buttonIndex++) {
    var _button = buttons[buttonIndex];
    _button.liquidButton = new LiquidButton(_button);
  }

  //water drop animation

  // var pathLength_1 = 22; // distance fromm the initial position to the pos. the drop beginns his free fall
  var pathLength_1 = 15; // distance fromm the initial position to the pos. the drop beginns his free fall
  var durrationDropAccumulates = 5000; // time in ms the drop accumulates
  var dropAccumulatesSpeed = pathLength_1 / durrationDropAccumulates;

  // var durrationFreeFall = 500; // time of free fall
  var durrationFreeFall = 500; // time of free fall
  var pathLength_2 = 145; // distance of free fall
  var freeFallAcceleration =
    ((pathLength_2 - dropAccumulatesSpeed * durrationFreeFall) * 2) /
    (durrationFreeFall * durrationFreeFall);

  var start = null;
  var element = document.getElementById("drop");
  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;

    if (progress < durrationDropAccumulates) {
      5;
      pos = progress * dropAccumulatesSpeed;
      // formular uniform motion
      element.setAttribute("transform", "translate(0," + pos + ")");
      window.requestAnimationFrame(step);
    }
    if (
      progress >= durrationDropAccumulates &&
      progress < durrationDropAccumulates + durrationFreeFall
    ) {
      progress2 = progress - 5000;
      // formular free fall with initial speed and inital offset
      pos =
        pathLength_1 +
        progress2 * dropAccumulatesSpeed +
        0.5 * freeFallAcceleration * progress2 * progress2;
      // console.log(progress2 + " -> " + pos);
      element.setAttribute("transform", "translate(0," + pos + ")");
      window.requestAnimationFrame(step);
    }
    if (progress >= durrationDropAccumulates + durrationFreeFall) {
      start = null;
      window.requestAnimationFrame(step);
    }
  }

  function popupSuccess() {
    $('.header-main__order').addClass('popup-open');
    var popupSuccessClose = function () {
      $('.header-main__order').removeClass('popup-open');
      location.reload();
    }
    setTimeout(popupSuccessClose, 7000);
  }

  // Устанавливаем обработчик потери фокуса для всех полей ввода текста
  $("input#name, input#surname, input#email, input#phone")
    .unbind()
    .blur(function () {
      if ($(this).val() != "")
        $(this)
        .parent()
        .addClass("filled-out");
      else
        $(this)
        .parent()
        .removeClass("filled-out");

      // Для удобства записываем обращения к атрибуту и значению каждого поля в переменные
      var id = $(this).attr("id");
      var val = $(this).val();

      // После того, как поле потеряло фокус, перебираем значения id, совпадающие с id данного поля
      switch (id) {
        // Проверка поля "Имя"
        case "name":
          var rv_name = /^[a-zA-Zа-яА-Я]+$/; // используем регулярное выражение

          // Eсли длина имени больше 2 символов, оно не пустое и удовлетворяет рег. выражению,
          // то добавляем этому полю класс .not_error,
          // и ниже в контейнер для ошибок выводим слово " Принято", т.е. валидация для этого поля пройдена успешно

          if (val.length > 2 && val != "" && rv_name.test(val)) {
            $(this)
              .removeClass("error")
              .addClass("not_error");
            $(this)
              .nextAll(".form-group__error")
              .text("Прийнято")
              .css("color", "#0286c2")
              .animate({
                  paddingLeft: "10px"
                },
                400
              )
              .animate({
                  paddingLeft: "5px"
                },
                400
              );
          }

          // Иначе, мы удаляем класс not-error и заменяем его на класс error, говоря о том что поле содержит ошибку валидации,
          // и ниже в наш контейнер выводим сообщение об ошибке и параметры для верной валидации
          else {
            $(this)
              .removeClass("not_error")
              .addClass("error");
            $(this)
              .nextAll(".form-group__error")
              .text("Введіть, будь ласка ваше ім'я")
              .css("color", "red")
              .animate({
                  paddingLeft: "10px"
                },
                400
              )
              .animate({
                  paddingLeft: "5px"
                },
                400
              );
          }
          break;

          // Проверка email
        case "email":
          var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
          if (val != "" && rv_email.test(val)) {
            $(this).addClass("not_error");
            $(this)
              .nextAll(".form-group__error")
              .text("Прийнято")
              .css("color", "#0286c2")
              .animate({
                  paddingLeft: "10px"
                },
                400
              )
              .animate({
                  paddingLeft: "5px"
                },
                400
              );
          } else {
            $(this)
              .removeClass("not_error")
              .addClass("error");
            $(this)
              .nextAll(".form-group__error")
              .text("Введіть, будь ласка, ваш e-mail")
              .css("color", "red")
              .animate({
                  paddingLeft: "10px"
                },
                400
              )
              .animate({
                  paddingLeft: "5px"
                },
                400
              );
          }
          break;

          // Проверка поля "Телефон"
        case "phone":
          // if (val == "") return;
          var rv_phone = /^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/; // используем регулярное выражение

          // Eсли длина имени больше 2 символов, оно не пустое и удовлетворяет рег. выражению,
          // то добавляем этому полю класс .not_error,
          // и ниже в контейнер для ошибок выводим слово " Принято", т.е. валидация для этого поля пройдена успешно

          if (val.length > 8 && val != "" && rv_phone.test(val)) {
            $(this)
              .removeClass("error")
              .addClass("not_error");
            $(this)
              .nextAll(".form-group__error")
              .text("Прийнято")
              .css("color", "#0286c2")
              .animate({
                  paddingLeft: "10px"
                },
                400
              )
              .animate({
                  paddingLeft: "5px"
                },
                400
              );
          }

          // // Иначе, мы удаляем класс not-error и заменяем его на класс error, говоря о том что поле содержит ошибку валидации,
          // // и ниже в наш контейнер выводим сообщение об ошибке и параметры для верной валидации
          else {
            $(this)
              .removeClass("not_error")
              .addClass("error");
            $(this)
              .nextAll(".form-group__error")
              .text("Введіть, будь ласка ваш телефон")
              .css("color", "red")
              .animate({
                  paddingLeft: "10px"
                },
                400
              )
              .animate({
                  paddingLeft: "5px"
                },
                400
              );
          }
          break;
      } // end switch(...)
    }); // end blur()

  // Теперь отправим наше письмо с помощью AJAX
  $(".form form").submit(function (e) {
    // Запрещаем стандартное поведение для кнопки submit
    e.preventDefault();

    // После того, как мы нажали кнопку "Отправить", делаем проверку,
    // если кол-во полей с классом .not_error равно 3 (так как у нас всего 3 поля), то есть все поля заполнены верно,
    // выполняем наш Ajax сценарий и отправляем письмо адресату

    if ($(".not_error").length == 3) {
      // Eще одним моментом является то, что в качестве указания данных для передачи обработчику send.php, мы обращаемся $(this) к нашей форме,
      // и вызываем метод .serialize().
      // Это очень удобно, т.к. он сразу возвращает сгенерированную строку с именами и значениями выбранных элементов формы.

      $.ajax({
        url: "send.php",
        type: "post",
        data: $(this).serialize(),

        beforeSend: function () {
          $(".form form :input").attr("disabled", "disabled");
        },

        success: function () {
          $(".form form :input").removeAttr("disabled");
          $(".form form :text")
            .val("")
            .removeClass()
            .next(".form-group__error")
            .text("");
          // alert(response);
          popupSuccess();
        }
      }); // end ajax({...})
    }

    // Иначе, если количество полей с данным классом не равно значению 3, мы возвращаем false,
    // останавливая отправку сообщения в невалидной форме
    else {
      return false;
    }
  }); // end submit()

  // $('input').on('change', function () {
  //   if ($(this).val() != '') $(this).parent().addClass('filled-out');
  //   else $(this).parent().removeClass('filled-out');
  // });

  $('.tooltip-container .icon').on('mouseover', function () {
    $(this).prev().addClass('tooltip-hover');
    $(this).prev().removeClass('tooltip-out');
  });

  $('.tooltip-container .icon').on('mouseout', function () {
    $(this).prev().removeClass('tooltip-hover');
    $(this).prev().addClass('tooltip-out');
  });

  $('a[href^="#"]').click(function () {
    var elementClick = $(this).attr('href');
    var destination = $(elementClick).offset().top;
    // if ($.browser.safari) {
    //   $('body').animate({
    //     scrollTop: destination
    //   }, 1000);
    // } else {
    //   $('html').animate({
    //     scrollTop: destination
    //   }, 1000);
    // }
    $('html').animate({
      scrollTop: destination
    }, 1000);
    return false;
  });

});
define("bui/mainlayout", ['bui/common', 'bui/overlay'], function (require) {

    var BUI = require('bui/common');
    var mainlayout = BUI.Component.Controller.extend({
            /*
             * 渲染组件
             */
            renderUI: function () {
                var _self = this;
                _self._initLayout();
                _self._setLeftBar();
            },
            /*
             * 绑定事件
             */
            bindUI: function () {
                var _self = this;
                var el = _self.get("el");
                //中间滚动条处理
                if (_self.get("leftWidth") != "0") {
                    $(".layout-left", el).mouseenter(function (ev) {
                        _self._setCenterWidth();
//							  _self._setCenterHeight();
                    }).mouseleave(function (ev) {
                        _self._setCenterWidth();
//							  _self._setCenterHeight();
                    });

                    if (_self.get("resize") == true) {
                        //菜单显示隐藏
                        $(".layout-left-bar1", el).on("click", function () {
                            _self._show();
                        });
                        $(".layout-left-bar2", el).on("click", function () {
                            _self._hide();
                        });
                    }
                }
                //宽高自适应
                $(window).on("resize", function (ev) {
                    _self._setContentHeight();
                    _self._setContentWidth();
//						  _self._setCenterHeight();
                    if (_self.get("leftWidth") != "0") {
                        _self._setCenterWidth();
                    }
                });

            },
            /*
             * 项目需求功能处理
             * 初始化layout
             */
            _initLayout: function () {
                var _self = this;
                var el = _self.get("el");
                el.parent("body").addClass("bui-mainlayout-viewport");
                _self._setTopHeight();
                _self._setLeftWidth();
                _self._setContentHeight();
//				  _self._setCenterHeight();
                if (_self.get("leftWidth") != "0") {
                    _self._setContentWidth();
                    _self._setCenterWidth();
                }
            },
            _setLeftBar: function () {
                var _self = this;
                var el = _self.get("el");
                if (_self.get("leftWidth") != "0" && _self.get("resize") == true) {
                    $(".layout-content", el).append(_self.get("leftbarTpl"));
                    $(".layout-content", el).append(_self.get("leftbbarTpl"));
                }
            },
            /*
             * 设置顶部区域高度
             */
            _setTopHeight: function () {
                var _self = this,
                    el = _self.get("el");
                var topHeight = _self.get("topHeight");
                $(".layout-top", el).css("height", topHeight + "px");
            },
            /*
             * 设置左边区域宽度
             */
            _setLeftWidth: function () {
                var _self = this,
                    el = _self.get("el");
                var leftwidth = _self.get("leftWidth");
                $(".layout-left", el).css("width", leftwidth + "px");
            },
            /*
             * 设置内容区域宽度
             */
            _setContentWidth: function () {
                var _self = this,
                    el = _self.get("el");
                var windowWidth = BUI.viewportWidth();
                var centerWidth = windowWidth;
                el.css("width", windowWidth);
                $(".layout-content", el).css({"width": centerWidth + "px"});
            },
            /*
             * 设置内容区域高度
             */
            _setContentHeight: function () {
                var _self = this,
                    el = _self.get("el");
                var windowHeight = BUI.viewportHeight();
                var topHeight = _self.get("topHeight");
                var centerHeight = windowHeight - parseInt(topHeight);
                var topHeight = _self.get("topHeight");
                el.css("height", windowHeight);
                $(".layout-content", el).css({"height": centerHeight + "px", "padding-top": topHeight + "px"});
            },
            /*
             * 设置中间区域高度
             */
            _setCenterHeight: function () {
                var _self = this,
                    el = _self.get("el");
                var topHeight = _self.get("topHeight");
                var windowHeight = BUI.viewportHeight();
                var centerHeight = windowHeight - parseInt(topHeight);
                $(".layout-center", el).css("height", centerHeight + "px");
            },
            /*
             * 设置中间区域宽度
             */
            _setCenterWidth: function () {
                var _self = this,
                    el = _self.get("el");
                if (_self.get("leftWidth") != "0") {
                    if ($(".layout-left:visible", el).length) {
                        var leftWidth = _self.get("leftWidth");
                        var windowWidth = BUI.viewportWidth();
                        var centerWidth = windowWidth - parseInt(leftWidth);
                        $(".layout-center", el).css({"width": centerWidth + "px", "margin-left": leftWidth + "px"});
                    }
                    else {
                        var bar1width = $(".layout-left-bar1", el).width();
                        var windowWidth = BUI.viewportWidth();
                        var centerWidth = windowWidth - bar1width;
                        $(".layout-center", el).css({"width": centerWidth + "px", "margin-left": bar1width + "px"});
                    }
                }
                else {
                    var windowWidth = BUI.viewportWidth();
                    var centerWidth = windowWidth;
                    $(".layout-center", el).css({"width": centerWidth + "px"});
                }
            },
            /*
             * 左边区域显示
             */
            _show: function () {
                var _self = this;
                var el = _self.get("el");
                $(".layout-left", el).show();
                $(".layout-left-bar2", el).show();
                $(".layout-left-bar1", el).hide();
                _self._setCenterWidth();
            },
            /*
             * 左边区域隐藏
             */
            _hide: function () {
                var _self = this;
                var el = _self.get("el");
                $(".layout-left", el).hide();
                $(".layout-left-bar2", el).hide();
                $(".layout-left-bar1", el).show();
                _self._setCenterWidth();
            }
        },
        {
            ATTRS: {
                layoutTopCls: {
                    value: 'layout-top'
                },
                layoutContentCls: {
                    value: 'layout-content'
                },
                layoutLeftCls: {
                    value: 'layout-left'
                },
                layoutCenterCls: {
                    vaue: 'layout-center'
                },
                topHeight: {
                    value: "60"
                },
                leftWidth: {
                    value: "0"
                },
                resize: {
                    value: false
                },
                leftbarTpl: {
                    value: '<div class="layout-left-bar1"><span class="icon-arrow-right icon-white"></span></div>'
                },
                leftbbarTpl: {
                    value: '<div class="layout-left-bar2"><span class="icon-arrow-left icon-white"></span></div>'
                },
                loadingTpl: {
                    value: '<div class="bui-loading-mask" style="width: 100%; left: 0px; top: 0px; height: 100%; position: fixed;"></div>'
                }
            }
        });
    return mainlayout;
});
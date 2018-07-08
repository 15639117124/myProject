define("bui/navlist", ['bui/common', 'bui/overlay', 'bui/mainlayout'], function (require) {
    /**
     * @name BUI.NavList
     * @namespace 列表命名空间
     * @ignore
     */
    var BUI = require('bui/common'),
        UIMessage = require('bui/overlay/message');

    //相关静态默认常量
    var DEFAULT_CLASS = "dropdown";
    var UL_CLASS = "dropdown-menu";
    var SUBMENU_CLASS = "dropdown-submenu";

    var navlist = BUI.Component.Controller.extend([],
        /**
         * @lends BUI.NavList.prototype
         * @ignore
         */
        {
            /**
             * @protected
             * @ignore
             */
            renderUI: function () {
                var _self = this;
                var url = _self.get("url");
                var root = _self.get("root");
                if (!url) {
                    //静态数据配置，设置data参数时使用
                    /*
                     *  	var navMenu = new NavList({
                     srcNode : '#navlist',
                     data : [{"id":"1","url":"","text":"财务付费1","pid":""},
                     {"id":"2","url":"","text":"财务付费2","pid":""},
                     {"id":"3","url":"","text":"财务付费3","pid":""},
                     {"id":"4","url":"","text":"财务付费4","pid":""},
                     {"id":"12","url":"","text":"财务付费1-1","pid":"1"},
                     {"id":"13","url":"","text":"财务付费1-2","pid":"1"},
                     {"id":"22","url":"a.html","text":"财务付费2-1","pid":"2"},
                     {"id":"23","url":"a.html","text":"财务付费2-2","pid":"2"},
                     {"id":"14","url":"a.html","text":"财务付费1-1-1","pid":"12"},
                     {"id":"15","url":"a.html","text":"财务付费1-1-2","pid":"12"},
                     {"id":"16","url":"a.html","text":"财务付费1-1-1-1","pid":"14"},
                     {"id":"17","url":"a.html","text":"财务付费1-1-2-1","pid":"15"}
                     ]
                     }).render();
                     */
                    var records = _self._formatData(_self.get("data"));
                    _self.set("data", records);
                    _self._createDom();

                }
                else {
                    //远程调用json数组
                    /*
                     * 基础返回格式：[{"id":"","url":"","text":"","pid":""}]
                     * 可以添加更多的参数值
                     * <pre><code>
                     * 	var navMenu = new NavList({
                     srcNode : '#navlist',
                     url:"navlist.json",
                     params:{}

                     }).render();

                     *
                     * </code></pre>
                     */
                    $.ajax({
                        url: _self.get("url"),
                        data: _self.get("params"),
                        dataType: _self.get("dataType"),
                        success: function (result) {
                            if (BUI.isArray(result[root])) {
                                var records = _self._formatData(result[root]);
                                _self.set("data", records);
                                _self._createDom();
                            }
                        },
                        error: function (errMsg) {
                            UIMessage.Alert(errMsg, "error");
                        }
                    });
                }
            },
            /*
             * 创建dom树
             *
             */
            _createDom: function () {
                var _self = this;
                //数据数组
                var items = _self.get("data");
                //外部容器ID
                var contentId = _self.get("srcNode");
                //添加列表容器
                $(contentId).append(_self.get("tpl"));
                var srcNode = _self.get("srcNode");
                $(srcNode).addClass("nav-hide");
                //循环配置菜单
                BUI.each(items, function (element, index) {
                    /*
                     * 无子菜单列表构建
                     */
                    if (!_self._hasChildren(element)) {
                        //生成模板1
                        var tpl = BUI.substitute(_self.get("litpl"), element);
                        //寻找父级节点
                        if (_self._getParentNode(element['pid']).find("ul").length) {
                            //插入子节点
                            $(tpl).appendTo(_self._getParentNode(element['pid']).find("ul:first"));
                        }
                        else {
                            //根节点插入
                            $("ul.bui-nav-list", contentId).append(tpl);
                        }
                    }
                    /*
                     * 有子菜单列表构建
                     */
                    else if (_self._hasChildren(element)) {
                        //模板2
                        var tpl = BUI.substitute(_self.get("sublitpl"), element);
                        //判断有无父级节点
                        if (_self._getParentNode(element['pid']).find("ul").length) {
                            $(tpl).appendTo(_self._getParentNode(element['pid']).find("ul:first"));
                        }
                        else {
                            $("ul.bui-nav-list", contentId).append(tpl);
                        }
                        //添加子级ul容器
                        _self._addChildNode(element);
                    }
                });
                $(srcNode).removeClass("nav-hide");
                //绑定节点点击事件
                _self._bindTriggerEvent();
                _self._bindNodeEvent();
                _self._setMainIcons();
                _self.fire("afterRenderUI");
            },
            /*
             * 递归子级菜单列表
             */
            _addChildNode: function (node) {
                var _self = this;
                //获取该节点的子节点集合
                var childrenNodes = _self._getChildrenNodes(node);
                //循环配置子节点容器
                BUI.each(childrenNodes, function (element, index) {
                    //配置下级菜单ul容器
                    if (_self._getParentNode(element['pid']).find("ul").length) {
                        //可扩展
                        return true;
                    }
                    else {
                        _self._getParentNode(element['pid']).append(_self.get("ultpl"));
                    }
                });
            },
            /*
             * 判断是否存在下级菜单
             */
            _hasChildren: function (node) {
                var _self = this, haschild = false;
                var items = _self.get('data');
                BUI.each(items, function (element, index) {
                    if (element['pid'] == node['id']) {
                        haschild = true;
                        return false;
                    }
                });
                return haschild;
            },
            /*
             * 获取下级菜单
             */
            _getChildrenNodes: function (node) {
                var _self = this, childrenNodes = [];
                var items = _self.get('data');
                BUI.each(items, function (element, index) {
                    if (element['pid'] == node['id']) {
                        childrenNodes.push(element);
                    }
                });
                return childrenNodes;
            },
            /*
             * 获取上级菜单dom
             */
            _getParentNode: function (nodeId) {
                var _self = this;
                var contentId = _self.get("srcNode");
                var parentNode = contentId.find("li[data-index='" + nodeId + "']");
                return parentNode;
            },
            /**
             * 绑定节点事件
             */
            _bindNodeEvent: function () {
                var _self = this;
                var el = _self.get("el");
                var items = _self.get("data");
                el.on('click', function (ev) {
                    var item = ev.target;
                    if (item.tagName === "A") {
                        var nodeIndex = $(item).parents("li:first").data("index");
                        var node = {};
                        BUI.each(items, function (element, index) {
                            if (element['id'] == nodeIndex) {
                                node = element;
                                return false;
                            }
                        });
                        _self.fire('itemclick', {item: node});
                        if (!_self.get("isAbsolute"))
                            el.find(".dropdown:first").hide();
                    }
                });
            },
            /*
             * 映射数据
             */
            _formatData: function (items) {
                var _self = this;
                var map = _self.get("map");
                var rst = new Array();
                if (map) {
                    BUI.each(items, function (v, k) {
                        for (var o in map) {
                            rst[k] = v;
                            rst[k][map[o]] = v[o];
                            delete rst[k][o];
                        }
                    });
                    rst.record = items;
                } else {
                    rst = items;
                }
                return rst;
            },
            /**
             * 项目需求功能处理
             * 菜单悬浮显示
             */
            _bindTriggerEvent: function () {
                var _self = this;
                var el = _self.get("el");
                var triggerEvent = _self.get("triggerEvent");
                var domTarget = el.attr("data-toggle");
                if (domTarget) {
                    $("#" + domTarget).on(triggerEvent, function (ev) {
                        el.find(".dropdown:first").show();
                    });
                    el.on("mouseleave", function (ev) {
                        if (!_self.get("isAbsolute"))
                            el.find(".dropdown:first").hide();
                    });
                }
            },
            /*
             * 项目需求功能处理
             * 主菜单图标
             */
            _setMainIcons: function () {
                var _self = this,
                    el = _self.get("el"),
                    iconsList = _self.get("icons");
                $(".dropdown>ul.bui-nav-list>li", el).each(function (index, dom) {
                    var $node = $(">a:first", $(dom)),
                        iconHtml = '<span class="icon icon-';
                    iconHtml += iconsList[index] + '"></span>';
                    contentHtml = $node.html();
                    contentHtml = iconHtml + contentHtml;
                    $node.html(contentHtml);
                });
            },
            /*
             * 设置选中菜单项
             */
            selectedItem: function (nodeId) {
                var _self = this;
                var contentId = _self.get("srcNode");
                var node = contentId.find("li[data-index='" + nodeId + "'] >a");
                _self._clearSelected();
                node.addClass("active").parents("li").find("a:first").addClass("active");
            },
            /*
             * 获取父级菜单集合
             */
            getParentItems: function (node) {
                var _self = this,
                    parentItems = new Array(),
                    items = _self.get("data");
                parentItems.push(node);
                for (var i = 0; i < items.length; i++) {
                    if (items[i]['id'] == node['pid']) {
                        parentItems.push(items[i]);
                        parentNode(items[i]);
                    }
                }
                ;
                function parentNode(item) {
                    if (item['pid'] || item['pid'] != "") {
                        for (var i = 0; i < items.length; i++) {
                            if (items[i]['id'] == item['pid'])
                                parentItems.push(items[i]);
                        }
                        ;
                    }
                }

                return parentItems;
            },
            /*
             * 清除激活的菜单项
             */
            _clearSelected: function () {
                var _self = this;
                var contentId = _self.get("srcNode");
                var nodes = contentId.find("li>a");
                nodes.removeClass("actiove");
            }
        }, {
            ATTRS: {
                tpl: {
                    value: '<div class="' + DEFAULT_CLASS + ' clearfix"><ul class="bui-nav-list ' + UL_CLASS + '"></ul></div>' //dropdown默认外部容器
                },
                ultpl: {
                    value: '<ul class="' + UL_CLASS + '"></ul>' //悬浮菜单项dom模板
                },
                litpl: {
                    value: '<li data-index="{id}"><a href="javascript:void(0);" class="{activeCls}">{text}</a></li>'  //节点菜单模板
                },
                sublitpl: {
                    value: '<li  data-index="{id}" class="' + SUBMENU_CLASS + '"><a href="javascript:void(0);" class="{activeCls}">{text}<span class="icon-arrow-right"></span></a></li>' //多级节点菜单模板
                },
                icons: {
                    value: ["policy", "mana", "claim", "print", "charge", "final", "receipt", "table", "person", "feed", "money", "storage", "security", "setting"]
                },
                //远程ajax调用action配置
                url: {
                    value: ""
                },
                //远程ajax调用传参
                params: {
                    value: {}
                },
                //本地数据调用
                data: {
                    value: []
                },
                //远程ajax调用类型配置
                dataType: {
                    value: "json"
                },
                isAbsolute: {
                    value: true
                },
                root: {
                    value: "results"
                },
                map: {},
                triggerEvent: {
                    value: "mouseenter"
                },
                events: {

                    value: {
                        /**
                         * 点击标签项
                         * @event
                         * @param {Object} e 事件对象
                         */
                        'click': true,
                        /**
                         * 初始化后事件处理
                         */
                        'afterRenderUI': true
                    }
                }
            }
        });
    return navlist;
});



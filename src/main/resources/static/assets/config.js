(function ($) {

    var baseUrl = '',         //网站的根目录地址，发布到线上时使用
        jsBase = '/assets';

    function isRelative(url) {
        if (!/:/.test(url)) {
            return true;
        }
    }

    function formatUrl(url) {
        if (isRelative(url)) {
            var path = getCurrentPath();
            return path + '/' + url;
        }
        return url;
    }

    function getCurrentPath() {
        var url = location.href,
            lastIndex;
        url = url.replace(/\?.*$/, '').replace(/\#.*$/, '');
        lastIndex = url.lastIndexOf('/');
        return url.substring(0, lastIndex);
    }

    function getBaseUrl() {    //根据config.js的路径取baseUrl
        var scripts = $('script'),
            rst = '';
        $.each(scripts, function (index, script) {
            var src = script.src,
                lastIndex = src.indexOf(jsBase + '/config');
            if (lastIndex !== -1) {
                rst = src.substring(0, lastIndex);
                return false;
            }
        });
        return formatUrl(rst);
    }

    if (!baseUrl) {//如果未指定项目路径，进行匹配。
        baseUrl = getBaseUrl();
    }

    BUI.config({
        alias: {
            'common': baseUrl + jsBase + '/common',
            'module': baseUrl + jsBase + '/module'
        }
    });
    //如果设置调试状态
    BUI.setDebug(true);
})(jQuery);
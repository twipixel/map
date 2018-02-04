(function(global)
{
    function getXMLHttpRequest()
    {
        var httpRequest;
        // Old compatibility code, no longer needed.
        if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
            httpRequest = new XMLHttpRequest();
        }
        else if (window.ActiveXObject) { // IE 6 and older
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return httpRequest;
    }

    function getScriptText(src, async = true)
    {
        var xhrObj = getXMLHttpRequest();
        xhrObj.open('GET', src, async);
        xhrObj.send(null);
        if (xhrObj.status === 200) {
            return xhrObj.responseText;
        }
        return null;
    }

    function addScriptToHeadSync(src)
    {
        var text = getScriptText(src, false);

        if (text !== null) {
            var script = document.createElement('script');
            script.type = "text/javascript";
            script.text = text;
            document.head.appendChild(script);
            return true;
        }
        return false;
    }

    function addScriptToBodySync(src)
    {
        var text = getScriptText(src, false);

        if (text !== null) {
            var script = document.createElement('script');
            script.type = "text/javascript";
            script.text = text;
            document.body.appendChild(script);
            return true;
        }
        return false;
    }

    function addScriptToBodyAsync(src)
    {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = src;
        document.body.appendChild(script);
    }

    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports.getXMLHttpRequest = getXMLHttpRequest;
        module.exports.addScriptToHeadSync = addScriptToHeadSync;
        module.exports.addScriptToBodySync = addScriptToBodySync;
        module.exports.addScriptToBodyAsync = addScriptToBodyAsync;
    }
    else {
        global.getXMLHttpRequest = getXMLHttpRequest;
        global.addScriptToHeadSync = addScriptToHeadSync;
        global.addScriptToBodySync = addScriptToBodySync;
        global.addScriptToBodyAsync = addScriptToBodyAsync;
    }
})(this);


(function () {
    function clearAD() {
        $("p:contains('下载 App')").text('方圆实验室');
        $("#page .index__container__src-commonComponent-bottomOpenApp-").hide();
    }

    function getParam(dataurl2, name) {
        return dataurl2.match(new RegExp('[?&]' + name + '=([^?&]+)', 'i')) ? decodeURIComponent(RegExp.$1) : '';
    }

    function loadVip(url) {
        var myBtn = document.getElementById("myBtn");
        var myul = document.getElementById("myul");
        if (myul.style.display == "none") {
            myul.style.display = "block";
            myBtn.innerHTML = "➕";
            myBtn.style.transform = "rotateZ(45deg)"
        } else {
            myul.style.display = "none";
            myBtn.innerHTML = "▶";
            myBtn.style.transform = "rotateZ(0deg)"
        }
    }
    //以上是第二版
    //以下是第一版
    var domain = location.href.split("?");
    var ye = "<span style='display:block;float:left;width:5vw;height:5vw;font-size:2.5vw;color:#fff;line-height:5vw;text-align:center;border-radius:100%;box-shadow:0px 0px 3px #a9a9a9;background:#0078FF;margin:3.78vw 2.1vw;'>★</span>";
    var apis = [{
        "name": "冰河解析",
        "url": "http://jx.duzhiqiang.com/?url="
    }];
    var myBtn = document.createElement("div");
    myBtn.id = "myBtn";
    myBtn.innerHTML = "▶";
    myBtn.setAttribute("style", "width:12vw;height:12vw;position:fixed;bottom:25vh;right:10vw;z-index:100000;border-radius:100%;text-align:center;line-height:12vw;box-shadow:0px 1px 10px rgba(0,0,0,0.3);font-size:4.5vw;background:#fff;");
    myBtn.onclick = function () {
        loadVip(location.href);
    };
    document.body.appendChild(myBtn);
    var myul = document.createElement("ul");
    myul.id = "myul";
    myul.setAttribute("style", "display:none;background:#fff;box-shadow:0px 1px 10px rgba(0,0,0,0.3);margin:0;padding:0 4.2vw;position:fixed;bottom:35vh;right:12vw;z-index:99999;height:60vh;overflow:scroll;border-radius:1.26vw;");
    for (var i = 0; i < apis.length; i++) {
        var myli = document.createElement("li");
        var that = this;
        myli.setAttribute("style", "margin:0;padding:0;display:block;list-style:none;font-size:4.2vw;width:33.6vw;text-align:left;line-height:12.6vw;letter-spacing:0;border-bottom:1px solid #f0f0f0;position:relative;overflow:hidden;text-overflow:hidden;white-space:nowrap;");
        (function (num) {
            myli.onclick = function () {
                window.open(apis[num].url + location.href, '_blank')
            };
            myli.ontouchstart = function () {
                this.style.cssText += "color:yellow;background:#373737;border-radius:1.26vw;"
            }
            myli.ontouchend = function () {
                this.style.cssText += "color:black;background:transparent;border-radius:0;"
            }
        })(i);
        myli.innerHTML = apis[i].name;
        myul.appendChild(myli)
    }
    document.body.appendChild(myul);
    try {
        clearAD();
    } catch (e) {}
})();
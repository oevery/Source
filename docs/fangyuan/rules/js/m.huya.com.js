(function () {
    function a() {
        if (window.videoUrls.indexOf("http") != -1) {
            var url = window.videoUrls.split("&&")[0];
            fy_bridge_app.playVideo(url.replace("_1200.m3u8", "_1500.m3u8"));
        } else {
            setTimeout(function () {
                a();
            }, 2000);
        }
    }
    a();
})();
(function () {
  function a() {
    if (window.videoUrls.indexOf("http") != -1) {
      var urls = window.videoUrls.split("&&");
      for (let i = 0; i < urls.length; i++) {
        var url = urls[i];
        if (url.indexOf("/report") != -1) {
          continue;
        } else if (url.indexOf(".m3u8") != -1) {
          fy_bridge_app.playVideo(url);
          return "";
        }
      }
    }
    setTimeout(function () {
      a();
    }, 2000);
  }
  if (location.href.indexOf("/live") != -1) {
    a();
  }
})();
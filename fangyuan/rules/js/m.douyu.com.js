(function () {
  function a() {
    if (window.videoUrls.indexOf("http") != -1) {
      var url = window.videoUrls.split("&&")[0];
      if (url.indexOf("hls1a.") != -1) {
        var url1 = url.split("?")[0];
        var url2 = url.split("token=")[1].split("&")[0];
        url = url1 + "?token=" + url2;
        fy_bridge_app.playVideo(url.replace("/playlist.m3u8", ".flv").replace("hls1a", "tx2play1").replace("_2200", "_4000p"));
      } else {
        fy_bridge_app.playVideo(url);
      }
    } else {
      setTimeout(function () {
        a();
      }, 2000);
    }
  }
  a();
})();
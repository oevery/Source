(function () {
  if (document.querySelector('#mxbaiduwp')) {} else {
    if (document.domain.indexOf("pan.baidu.com") == 0) {
      //网盘界面
      var a = document.createElement('span');
      a.innerHTML = '网盘解析';
      a.id = 'mxbaiduwp';
      var c = 'font-size:3vw !important;color:#efefef !important;background:rgba(0, 0, 0, 0.5);box-sizing:border-box;text-align:center;width:20vw;height:9vw;line-height:9vw;border-radius:5%;position:fixed;bottom:13vh;left:5vw;z-index:100000000000000;';
      a.style.cssText = c;
      a.addEventListener('click', function () {
        var url = location.href.replace(/baidu/i, "baiduwp");
        window.location.href = url;
      }, false);
      document.body.appendChild(a);
    }
  }
})();
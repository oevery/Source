(function () {
    //以下是VIP解析第二版
    function showTitle(url) {
        var titleStr = "视频连接成功！点击选择解析接口";
        if (url.indexOf("iqiyi.com") != -1) {
            var iframe = document.getElementById('_if');
            if (iframe) {
                window.location.reload();
                return;
            };
            var i = document.getElementsByClassName('m-video-player-wrap')[0];
            if (typeof (i) != 'undefined') {
                i.style.height = '220px';
                i.style.color = '#fff';
                i.style.lineHeight = '15';
                i.style.position = 'static';
                i.style.paddingTop = '0%';
                i.style.background = '#000000';
                i.style.textAlign = 'center';
                i.innerHTML = '<div>' + titleStr + '</div>';
                i.addEventListener('tap', function () {
                    loadVip(window.location.href);
                })
            };
        } else if (url.indexOf("v.qq.com") != -1) {
            var i = document.getElementsByClassName('site_player')[0];
            if (typeof (i) != 'undefined') {
                i.style.height = '210px';
                i.style.background = '#000000';
                i.style.textAlign = 'center';
                i.style.color = '#fff';
                i.style.lineHeight = '14';
                i.innerHTML = '<div>' + titleStr + '</div>';
                i.addEventListener('touchstart', function (e) {
                    loadVip(window.location.href);
                })
            };
        } else if (url.indexOf("m.le.com") != -1) {
            var i = document.getElementsByClassName('playB')[0];
            if (typeof (i) != 'undefined') {
                i.style.background = '#000000';
                i.innerHTML = '<div>' + titleStr + '</div>';
                i.style.width = '100%';
                i.style.textAlign = 'center';
                i.style.lineHeight = '14';
                i.style.color = '#fff';
                i.addEventListener('touchstart', function (e) {
                    loadVip(window.location.href);
                });
            }
        } else if (url.indexOf("youku.com") != -1) {
            var i = document.getElementById('playerBox');
            if (typeof (i) != 'undefined') {
                i.style.background = '#000000';
                i.style.color = '#fff';
                i.style.textAlign = 'center';
                i.style.lineHeight = '15';
                i.innerHTML = '<div>' + titleStr + '</div>';
                i.addEventListener('touchstart', function (e) {
                    loadVip(window.location.href);
                });
            }
        } else if (url.indexOf("mgtv.com") != -1) {
            var i = document.getElementsByClassName('video-area')[0];
            if (typeof (i) != 'undefined') {
                i.style.background = '#000000';
                i.style.color = '#fff';
                i.style.textAlign = 'center';
                i.style.lineHeight = '16';
                i.innerHTML = '<div>' + titleStr + '</div>';
                i.addEventListener('click', function (e) {
                    loadVip(window.location.href);
                });
            }
        } else if (url.indexOf("sohu.com") != -1) {
            var i = document.getElementsByClassName('x-player')[0];
            var x = document.getElementById('top-poster');
            if (typeof (i) != 'undefined') {
                i.style.background = '#000000';
                i.style.color = '#fff';
                i.style.textAlign = 'center';
                i.style.lineHeight = '13';
                i.innerHTML = '<div>' + titleStr + '</div>';
                i.addEventListener('touchstart', function (e) {
                    loadVip(window.location.href);
                })
            } else if (typeof (x) != 'undefined') {
                x.style.background = '#000000';
                x.style.color = '#fff';
                x.style.height = '210px';
                x.style.textAlign = 'center';
                x.style.lineHeight = '13';
                i.innerHTML = '<div>' + titleStr + '</div>';
                x.addEventListener('click', function () {
                    loadVip(window.location.href);
                });
            }
        } else if (url.indexOf("fun.tv") != -1) {
            var myVideo = document.getElementById('m-h5v-video-1');
            if (typeof (myVideo) != 'undefined') {
                myVideo.pause()
            };
            var i = document.getElementById('m-h5v-player-1');
            if (typeof (i) != 'undefined') {
                i.style.background = '#000000';
                i.style.color = '#fff';
                i.style.lineHeight = '12';
                i.innerHTML = '<div>' + titleStr + '</div>';
                i.addEventListener('touchstart', function (e) {
                    loadVip(window.location.href);
                });
            }
        } else if (url.indexOf("baofeng.com") != -1) {
            var myVideo = document.getElementsByTagName('video')[0];
            myVideo.pause();
            var i = document.getElementById('videoplayer');
            if (typeof (i) != 'undefined') {
                i.style.background = '#000000';
                i.style.textAlign = 'center';
                i.style.color = '#fff';
                i.style.lineHeight = '17';
                i.innerHTML = '<div>' + titleStr + '</div>';
                i.addEventListener('touchstart', function (e) {
                    loadVip(window.location.href);
                });
            }
        }
    }

    function tryGetRealUrl(url) {
        var realUrl = url;
        try {
            realUrl = getRealUrl(url);
        } catch (err) {
            console.log(err);
        }
        return realUrl;
    }

    function getRealUrl(url) {
        var dataurl2 = url;
        var txurlc = dataurl2.split(":");
        var txurl = txurlc[1].slice(0, 12);
        var ykurl = txurlc[1].slice(0, 13);
        var ykdata = txurlc[1].slice(13);
        var funurl = txurlc[1].slice(0, 11);
        if (ykurl == '//m.youku.com') {
            var txurlc = dataurl2.split(":");
            var ykurl = txurlc[1].slice(0, 13);
            var ykdata = txurlc[1].slice(13);
            dataurl2 = 'http://www.youku.com' + ykdata;
        } else if (ykurl == '//m.iqiyi.com') {
            var txurlc = dataurl2.split(":");
            var ykurl = txurlc[1].slice(0, 13);
            var ykdata = txurlc[1].slice(13);
            dataurl2 = 'https://www.iqiyi.com' + ykdata;
        } else if (txurl == '//m.v.qq.com') {
            var vid = getParam(dataurl2, "vid");
            var cid = getParam(dataurl2, "cid");
            var txdata2 = dataurl2.split("?");
            var str = "play.html";
            if (txdata2[0].slice(txdata2[0].length - str.length) == str) {
                if (cid.length > 1) {
                    dataurl2 = "https://v.qq.com/x/cover/" + cid + ".html";
                    return dataurl2;
                } else if (vid.length == 11) {
                    return "https://v.qq.com/x/page/" + vid + ".html";
                }
            }
            cid = txdata2[0].slice(-20, -5);
            if (vid.length == 11) {
                dataurl2 = 'https://v.qq.com/x/cover/' + cid + '/' + vid + '.html';
            } else {
                dataurl2 = 'https://v.qq.com/x/cover/' + cid + '.html';
            }
        } else if (ykurl == '//m.le.com/vp') {
            var leurlc = dataurl2.split("_");
            var leurl = leurlc[1];
            dataurl2 = 'http://www.le.com/ptv/vplay/' + leurl;
        }
        return dataurl2;
    }

    function getParam(dataurl2, name) {
        return dataurl2.match(new RegExp('[?&]' + name + '=([^?&]+)', 'i')) ? decodeURIComponent(RegExp.$1) : '';
    }

    function loadVip(url) {
        var myBtn = document.getElementById("myBtn");
        //    	var realUrl = tryGetRealUrl(url);
        //    	console.log(realUrl);
        var myul = document.getElementById("myul");
        if (myul.style.display == "none") {
            myul.style.display = "block";
            myBtn.innerHTML = "🤔";
            myBtn.style.transform = "rotateZ(45deg)"
        } else {
            myul.style.display = "none";
            myBtn.innerHTML = "😘";
            myBtn.style.transform = "rotateZ(0deg)"
        }
    }
    //以上是第二版
    //以下是第一版
    var domain = location.href.split("?");
    var ye = "<span style='display:block;float:left;width:5vw;height:5vw;font-size:2.5vw;color:#fff;line-height:5vw;text-align:center;border-radius:100%;box-shadow:0px 0px 3px #a9a9a9;background:#0078FF;margin:3.78vw 2.1vw;'>★</span>";
    var apis = [{
            "name": "爱解析",
            "url": "http://jx.wfxzzx.cn/?url="
        },
        {
            "name": "抖播解析",
            "url": "http://video.eeeol.cn/mp4.php?url="
        },
        {
            "name": "771解析",
            "url": "http://vip.qi71.cn/?url="
        },
        {
            "name": "科技解析",
            "url": "http://ka61b.cn/jx.php?url="
        },
        {
            "name": "超能解析",
            "url": "http://jiexi.44cn.net/vipjx/?url="
        },
        {
            "name": "44云线路",
            "url": "http://jiexi.44cn.net/byg/index.php?url="
        },
        {
            "name": "bt接口",
            "url": "https://www.kkflv.com/index.php?url="
        },
        {
            "name": "dy接口",
            "url": "https://jx.dy-jx.com/?url="
        },
        {
            "name": "狸猫尊享专线",
            "url": "http://111jx.xyz/?url="
        },
        {
            "name": "360dy解析",
            "url": "http://yun.360dy.wang/jx.php?url="
        },
        {
            "name": "智能云解析",
            "url": "http://api2.club/index.php?url="
        },
        {
            "name": "m1907解析",
            "url": "http://api2.club/index.php?url="
        },
        {
            "name": "冰河解析",
            "url": "http://jiexi.duzhiqiang.com/?url="
        },
        {
            "name": "修瑶解析",
            "url": "http://api.xiuyao.me/jx/?url="
        },
        {
            "name": "920解析",
            "url": "http://api.tv920.com/vip/?url="
        },
        {
            "name": "纯净线路",
            "url": "https://jx.128sp.com/jxjx/?url="
        },
        {
            "name": "紫云智能",
            "url": "http://api.smq1.com/?url="
        },
        {
            "name": "百度oos解析",
            "url": "http://app.baiduoos.cn:2019/vip/?url="
        },
        {
            "name": "VIP免费解析",
            "url": "https://jx.hezeshi.net/ce/jlexi.php?url="
        },
        {
            "name": "yangju解析",
            "url": "https://cdn.yangju.vip/k/?url="
        },
        {
            "name": "1616解析",
            "url": "https://www.1616jx.com/jx/api.php?url="
        },
        {
            "name": "MyXin解析",
            "url": "https://www.myxin.top/jx/api/?url="
        },
        {
            "name": "大亨解析",
            "url": "http://jx.cesms.cn/?url="
        },
        {
            "name": "免费通用",
            "url": "http://jx.598110.com/?url="
        },
        {
            "name": "7usp解析",
            "url": "https://www.7usp.com/mfjx/?url="
        },
        {
            "name": "aldsw解析",
            "url": "http://jx.aldsw.cn/jx/index.php?url="
        },
        {
            "name": "陌言解析",
            "url": "http://apitvk.sskweb.cn/ckmov/qq2874678902.php?url="
        },
        {
            "name": "久久云解析",
            "url": "http://jx.99yyw.com/api/?url="
        },
        {
            "name": "三岁解析",
            "url": "http://sc.sansuib.cn/?url="
        },
        {
            "name": "芽芽智能",
            "url": "http://jx.yayaol.xyz/?url="
        },
        {
            "name": "军军影视",
            "url": "http://jx.jjvipw.cn/?url="
        },
        {
            "name": "解析接口",
            "url": "https://www.myxin.top/jx/api/?url="
        },
        {
            "name": "A.xin解析",
            "url": "http://tv.cuione.cn/?url="
        },
        {
            "name": "万能解析",
            "url": "http://api.lkdmkj.com/jx/jx00/index.php?url="
        },
        {
            "name": "免VIP智能",
            "url": "https://v.mvipsp.top/?v="
        },
        {
            "name": "瑞特解析",
            "url": "http://jx.0421v.pw/index.php?url="
        },
        {
            "name": "黑云解析",
            "url": "http://jx.daheiyun.com/?url="
        },
        {
            "name": "青山解析",
            "url": "http://api.cypay.me/?v="
        },
        {
            "name": "柠檬解析",
            "url": "http://jx.0len.cn/?url="
        },
        {
            "name": "初心解析",
            "url": "http://jx.bwcxy.com/?v="
        },
        {
            "name": "初见解析",
            "url": "http://xiaojx.two3.cn/jx/?url="
        },
        {
            "name": "黑米解析",
            "url": "https://www.heimijx.com/jx/api/?url="
        },
        {
            "name": "飞鸟云播",
            "url": "http://jx.ledboke.com/?url="
        },
        {
            "name": "傻猫解析",
            "url": "http://www.sillycat.xyz/jx/?url="
        },
        {
            "name": "517解析",
            "url": "http://cn.bjbanshan.cn/jiexi.php?url="
        },
        {
            "name": "Beaacc",
            "url": "https://beaacc.com/api.php?url="
        },
        {
            "name": "我爱解析",
            "url": "http://jx.52a.ink/?url="
        },
        {
            "name": "范特尔",
            "url": "http://jx.79it.cn/?url="
        },
        {
            "name": "OK解析",
            "url": "http://okjx.cc/?url="
        },
        {
            "name": "糖果解析",
            "url": "https://www.tg321.cn/jx/?url="
        },
        {
            "name": "雨见解析",
            "url": "http://vip.55cc.top/wabi/yujianweb.php?url="
        },
        {
            "name": "全民解析1",
            "url": "http://jx.598110.com/index.php?url="
        },
        {
            "name": "全民解析2",
            "url": "http://jx.598110.com/duo/index.php?url="
        },
        {
            "name": "全名解析3",
            "url": "http://jx.598110.com/zuida.php?url="
        },
        {
            "name": "平民解析4",
            "url": "https://apis.tianxianle.com/youku/?id="
        },
        {
            "name": "新决起",
            "url": "http://api.zuilingxian.com/jiexi.php?url="
        },
        {
            "name": "yun Parse1",
            "url": "http://jx.api.163ren.com/vod.php?url="
        },
        {
            "name": "yun Parse2",
            "url": "http://api.jx.bugxx.com/cfee/vod.php?url="
        },
        {
            "name": "17K云",
            "url": "http://17kyun.com/api.php?url="
        },
        {
            "name": "高端解析",
            "url": "http://api.51ckm.com/jx.php?url="
        },
        {
            "name": "高端解析1",
            "url": "http://api.hlglwl.com/jx.php?url="
        },
        {
            "name": "无广告",
            "url": "http://jx1.00vb.com/?url="
        },
        {
            "name": "vip免费",
            "url": "http://jx.0len.cn/?url="
        },
        {
            "name": "vip多线路",
            "url": "http://api.ledboke.com/vip/?url="
        },
        {
            "name": "ovov解析",
            "url": "http://jx.ovov.cc/?url="
        },
        {
            "name": "Duplay解析",
            "url": "http://jx.du2.cc/?url="
        },
        {
            "name": "VIP解析",
            "url": "http://api.kq1f.cn/vip/index.php?url="
        },
        {
            "name": "M3U8解析",
            "url": "http://vip.fxw.la/m3u8/index.php?url="
        },
        {
            "name": "AT520解析",
            "url": "http://at520.cn/jx/?url="
        },
        {
            "name": "乐看解析",
            "url": "http://jx.anlehe.com/?url="
        },
        {
            "name": "巢云",
            "url": "http://www.dgua.xyz/webcloud/?url="
        },
        {
            "name": "酷博",
            "url": "http://jx.x-99.cn/api.php?id="
        },
        {
            "name": "金桥解析",
            "url": "http://jqaaa.com/jx.php?url="
        },
        {
            "name": "雪狐影视",
            "url": "http://vip.gzzza.com/vip.php?url="
        },
        {
            "name": "石头云",
            "url": "http://jiexi.071811.cc/jx.php?url="
        },
        {
            "name": "那片",
            "url": "http://api.nepian.com/ckparse/?url="
        },
        {
            "name": "1717云",
            "url": "http://www.1717yun.com/jx/ty.php?url="
        },
        {
            "name": "牛巴巴",
            "url": "http://mv.688ing.com/player?url="
        },
        {
            "name": "爱看解析",
            "url": "http://aikan-tv.com/?url="
        },
        {
            "name": "FlvPS解析",
            "url": "https://api.flvsp.com/?url="
        },
        {
            "name": "速度牛",
            "url": "http://api.wlzhan.com/sudu/?url="
        },
        {
            "name": "88wx解析",
            "url": "http://vip.jlsprh.com/index.php?url="
        },
        {
            "name": "ODFLV解析",
            "url": "https://yun.odflv.com/?url="
        },
        {
            "name": "030E解析",
            "url": "https://030e.com/0302/?url="
        },
        {
            "name": "xiguaimg解析",
            "url": "https://api.xiguaimg.com/odflv105/index.php?url="
        },
        {
            "name": "660e解析",
            "url": "https://660e.com/?url="
        },
        {
            "name": "云播放",
            "url": "https://y.mt2t.com/lines?url="
        },
        {
            "name": "8090解析",
            "url": "https://www.8090g.cn/?url="
        },
        {
            "name": "WoCao解析",
            "url": "https://www.wocao.xyz/index.php?url="
        },
        {
            "name": "ccav5解析",
            "url": "http://ccav5.ml/m/jx.html?url="
        },
        {
            "name": "思古解析",
            "url": "https://api.sigujx.com/?url="
        },
        {
            "name": "神马解析",
            "url": "http://baidukan.top/jx.php?url="
        },
        {
            "name": "FreeGet解析",
            "url": "http://www.freeget.org/jx.php?url="
        }
    ];
    if (domain[0].match(".iqiyi.com") || domain[0].match(".youku.com") || domain[0].match("m.bilibili.com") || domain[0].match(".le.com") || domain[0].match(".letv.com") || domain[0].match("v.qq.com") || domain[0].match(".tudou.com") || domain[0].match(".mgtv.com") || domain[0].match(".sohu.com") || domain[0].match("m.pptv.com")) {
        var myBtn = document.createElement("div");
        myBtn.id = "myBtn";
        myBtn.innerHTML = "😘";
        myBtn.setAttribute("style", "width:12vw;height:12vw;position:fixed;bottom:18vh;right:10vw;z-index:100000;border-radius:100%;text-align:center;line-height:12vw;box-shadow:0px 1px 10px rgba(0,0,0,0.3);font-size:4.5vw;background:#fff;");
        myBtn.onclick = function () {
            loadVip(location.href);
        };
        document.body.appendChild(myBtn);
        var myul = document.createElement("ul");
        myul.id = "myul";
        myul.setAttribute("style", "display:none;background:#fff;box-shadow:0px 1px 10px rgba(0,0,0,0.3);margin:0;padding:0 4.2vw;position:fixed;bottom:28vh;right:15vw;z-index:99999;height:62vh;overflow:scroll;border-radius:5vw;");
        for (var i = 0; i < apis.length; i++) {
            var myli = document.createElement("li");
            var that = this;
            myli.setAttribute("style", "margin:0;padding:0;display:block;list-style:none;font-size:3.8vw;width:28vw;text-align:left;line-height:10vw;letter-spacing:0;border-bottom:1px solid #87cefa;position:relative;overflow:hidden;text-overflow:hidden;white-space:nowrap;");
            (function (num) {
                myli.onclick = function () {
                    window.open(apis[num].url + tryGetRealUrl(location.href), '_blank')
                };
                myli.ontouchstart = function () {
                    this.style.cssText += "color:yellow;background:#800000;border-radius:1.26vw;"
                }
                myli.ontouchend = function () {
                    this.style.cssText += "color:black;background:transparent;border-radius:0;"
                }
            })(i);
            myli.innerHTML = apis[i].name;
            myul.appendChild(myli)
        }
        document.body.appendChild(myul);
        //让视频区域显示文字，直接解析
        showTitle(location.href);
    }
})();
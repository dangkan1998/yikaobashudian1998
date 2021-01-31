window.publicTopLoad = window.publicTopLoad || [];
publicTopLoad.push(function () {
	$(window).unbind("scroll");
	$(window).bind("scroll", slibeScroll);
});

$(function () {
	slibeScroll.setFt();
	var brwp = $(".brwp"), sidebtn1 = $(".sidebtn1"), sidebtnLeft, conbx1 = $(".conbx1:eq(0)"), fastbtn = $(".fastbtn"), topbtn1 = $(".topbtn1"), topbtn2 = $(".topbtn2"), topbtn3 = $(".topbtn3");
	window.sidebtn = function (pageWidth, pageHeight, scrollHeight) {
		if (pageWidth >= brwp.width() + 2 * (sidebtn1.width() + 30)) {
			sidebtnLeft = (pageWidth - brwp.width()) / 2 - sidebtn1.width() - 30;
		} else {
			sidebtnLeft = 0;
		};
		sidebtn1.css({
			"position": "fixed",
			"right": sidebtnLeft + "px",
			"bottom": "30px"
		});
	};
});

var slibeScroll = (function () {
	var self, ele = document.documentElement, bd = document.body,
		pageWidth, pageHeight, scrollWidth, scrollHeight, bxTop, ftTop, snavTop, bxLeft,
		navwp = $(".navwp"), ft = $("#ft"), ftTop = 10000000, timeVal = 5
	snav = $(".snav"), brwp = $(".brwp"), isIE6 = !!window.ActiveXObject && !window.XMLHttpRequest;
	if (ft.size() > 0) {
		ftTop = ft.offset().top || 0;
	}
	if ($.browser.msie && $.browser.version < 9) {
		timeVal = 10;
	}
	return function () {
		self = slibeScroll;
		var preTime = self.preTime || 0, time = (self.preTime = new Date().getTime());
		self.setFt = function () {
			ft = $("#ft");
			if (ft.size() > 0) {
				ftTop = ft.offset().top || 0;
			}
		};
		if (time - preTime < timeVal) {
			self.setTm && clearTimeout(self.setTm);
			self.setTm = setTimeout(self, timeVal + 1);
			return;
		}
		pageWidth = ele.clientWidth;
		pageHeight = ele.clientHeight;
		scrollWidth = ele.scrollLeft || bd.scrollLeft;
		scrollHeight = ele.scrollTop || bd.scrollTop;
		bxTop = navwp.offset().top;
		snavTop = snav.height() + scrollHeight;
		bxLeft = brwp.offset().left - scrollWidth;
		if (!isIE6) {
			if (scrollHeight >= bxTop) {
				snav.css({
					"position": "fixed",
					"left": bxLeft + "px",
					"top": "0px"
				});
				if (snavTop >= ftTop - 3) {
					snav.css({
						"top": (ftTop - snavTop - 3) + "px"
					});
				}
			} else {
				snav.css({
					"position": "absolute",
					"left": "0px",
					"top": "-40px"
				});
			}
			sidebtn(pageWidth, pageHeight, scrollHeight) //跳到顶部
		};
	};
})();



/*左菜单效果*/
(function ($) {
	$(".snavbx p a:last").addClass("pr0");
	$(".snavbx").each(function () {
		$(this).hover(function () {
			var pageHeight2 = document.documentElement.clientHeight;
			var scrollHeight2 = document.documentElement.scrollTop || document.body.scrollTop;
			var childTop = $(this).offset().top - scrollHeight2 + $(this).find(".snav_child").height() + 14;
			$(this).addClass("snavsel");
			if (childTop >= pageHeight2) {
				$(this).find(".snav_child").css("top", pageHeight2 - childTop);
			} else {
				$(this).find(".snav_child").css("top", "0px");
			}
			$(this).find(".snav_child").show();
		}, function () {
			$(".snavbx").removeClass("snavsel");
			$(".snavbx").find(".snav_child").hide();
		})
	})
	slibeScroll();
})($)
$(window).bind("scroll resize", slibeScroll);
function sidebtn() { }
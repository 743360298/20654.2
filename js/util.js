var util = {
	options: {
		ACTIVE_SRC1: "images/mipmap-xhdpi/icon_onclick_message.png",
		NORMAL_SRC1: "images/mipmap-xhdpi/icon_message.png",
		ACTIVE_SRC2: "images/mipmap-xhdpi/icon_onclick_friend.png",
		NORMAL_SRC2: "images/mipmap-xhdpi/icon_friend.png",
		ACTIVE_SRC3: "images/mipmap-xhdpi/icon_onclick_dynamic.png",
		NORMAL_SRC3: "images/mipmap-xhdpi/icon_dynamic.png",
		ACTIVE_COLOR: "#007aff",
		NORMAL_COLOR: "#000",
		subpages: ["html/siyou.html", "html/quanzi.html"]
	},
	/**
	 *  简单封装了绘制原生view控件的方法
	 *  绘制内容支持font（文本，字体图标）,图片img , 矩形区域rect
	 */
	drawNative: function(id, styles, tags) {
		var view = new plus.nativeObj.View(id, styles, tags);
		return view;
	},
	/**
	 * 初始化首个tab窗口 和 创建子webview窗口 
	 */
	initSubpage: function(aniShow) {
		var subpage_style = {
				top: 0,
				bottom: 75
			},
			subpages = util.options.subpages,
			self = plus.webview.currentWebview(),
			temp = {};

		//兼容安卓上添加titleNView 和 设置沉浸式模式会遮盖子webview内容
		if(mui.os.android) {
			if(plus.navigator.isImmersedStatusbar()) {
				subpage_style.top += plus.navigator.getStatusbarHeight();
			}
			if(self.getTitleNView()) {
				subpage_style.top += 40;
			}

		}

		// 初始化第一个tab项为首次显示
		temp[self.id] = "true";
		mui.extend(aniShow, temp);
		// 初始化绘制首个tab按钮
		util.toggleNview(0);

		for(var i = 0, len = subpages.length; i < len; i++) {

			if(!plus.webview.getWebviewById(subpages[i])) {
				var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
				//初始化隐藏
				sub.hide();
				// append到当前父webview
				self.append(sub);
			}
		}
	},
	/**	
	 * 点击切换tab窗口 
	 */
	changeSubpage: function(targetPage, activePage, aniShow) {
		//若为iOS平台或非首次显示，则直接显示
		if(mui.os.ios || aniShow[targetPage]) {
			plus.webview.show(targetPage);
		} else {
			//否则，使用fade-in动画，且保存变量
			var temp = {};
			temp[targetPage] = "true";
			mui.extend(aniShow, temp);
			plus.webview.show(targetPage, "fade-in", 300);
		}
		//隐藏当前 除了第一个父窗口
		if(activePage !== plus.webview.getLaunchWebview()) {
			plus.webview.hide(activePage);
		}
	},
	/**
	 * 点击重绘底部tab （view控件）
	 */
	toggleNview: function(currIndex) {
		currIndex = currIndex * 2;
		// 重绘当前tag 包括icon和text，所以执行两个重绘操作
		switch(currIndex) {
			case 0:
				util.updateSubNView(0, util.options.ACTIVE_SRC1,util.options.ACTIVE_COLOR);
				util.updateSubNView(2, util.options.NORMAL_SRC2,util.options.NORMAL_COLOR);
				util.updateSubNView(4, util.options.NORMAL_SRC3,util.options.NORMAL_COLOR);
				break;
			case 2:
				util.updateSubNView(0, util.options.NORMAL_SRC1,util.options.NORMAL_COLOR);
				util.updateSubNView(2, util.options.ACTIVE_SRC2,util.options.ACTIVE_COLOR);
				util.updateSubNView(4, util.options.NORMAL_SRC3,util.options.NORMAL_COLOR);
				break;
			case 4:
				util.updateSubNView(0, util.options.NORMAL_SRC1,util.options.NORMAL_COLOR);
				util.updateSubNView(2, util.options.NORMAL_SRC2,util.options.NORMAL_COLOR);
				util.updateSubNView(4, util.options.ACTIVE_SRC3,util.options.ACTIVE_COLOR);
				break;
		}
	},
	/*
	 * 改变颜色
	 */
	changeColor: function(obj, color) {
		obj.color = color;
		return obj;
	},
	/*
	 * 利用 plus.nativeObj.View 提供的 drawText 方法更新 view 控件
	 */
	updateSubNView: function(currIndex, src, color) {
		console.log(src)
		var self = plus.webview.currentWebview(),
			nviewEvent = plus.nativeObj.View.getViewById("tabBar"), // 获取nview控件对象
			nviewObj = self.getStyle().subNViews[0], // 获取nview对象的属性
			currTag = nviewObj.tags[currIndex]; // 获取当前需重绘的tag
			currTag1 = nviewObj.tags[currIndex+1]; // 获取当前需重绘的tag

		nviewEvent.drawBitmap(src,'',currTag.position, currTag.id);
		nviewEvent.drawText(currTag1.text, currTag1.position, util.changeColor(currTag1.textStyles, color), currTag1.id);
	}
};
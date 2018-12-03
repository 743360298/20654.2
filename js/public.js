  setFz();
  //  屏幕的宽度改变之后 
  window.onresize = function () {
    setFz();
  }
  function setFz() {
    /* 
    1 获取到当前的屏幕的宽度  =  要适配的屏幕的宽度
    2 计算html字体的大小   fontsize=基础值 * 要适配的屏幕的宽度 /  设计稿的宽度
    3 打开页面 直接调用该方法  屏幕的宽度改变之后 再调用一次这个方法 就可以动态改变html的字体
     */

    // 当前屏幕的宽度
    var screenWidth = document.querySelector("html").offsetWidth;
    // 基础值
    var baseVal = 100;
    // 设计稿的宽度
    var pageWidth = 750;
    // 字体大小
    var fz = baseVal * screenWidth / pageWidth;

    document.querySelector("html").style.fontSize = fz + "px";

  }


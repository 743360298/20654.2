var div = document.querySelectorAll("infoListLi");

// 按下时间 坐标
var startTime,startX,startY;
// 按下
var addEventListener;
div.addEventListener("touchstart",function(e){
    // 1 判断手指的个数
    if(e.touches.length>1){
        return;
    }
    // 2 记录按下的时间 
    startTime = Date.now();

    // 3 按下的坐标
    startX= e.touches[0].clientX;
    startY= e.touches[0].clientY;
})
// 离开
 div.addEventListener("touchend",function(e){
    // 1 判断手指的个数
    if(e.changedTouches.length>1){
        return;
    }
    // 2计算按下的时间 800ms
    var endTime = Date.now();
    if(endTime-startTime>800){
        return;
    }
    // 3 获取离开的坐标
    var endX = e.changedTouches[0].clientX;
    var endY = e.changedTouches[0].clientY;

    // 滑动的方向
    var direction;
    // 判断滑动的距离和方向

    // 先判断水平 再判断垂直的距离和方向
    if(Math.abs(endX-startX)>5){
        // 再计算方向
        direction=endX>startX?"right":"left";
    }else if(Math.abs(endY-startY)>5){
        direction=endY>startY?"down":"up";
    }else{
        // 既没有在水平上滑动也没有在垂直上滑动 直接返回  不满足滑动的条件!!! 
        return;
    }
    // 可以成功触发事件
    console.log(direction);
})


data = [
  {
    href: './ChatRecord.html',
    images: '../images/00.png',
    friendName: '哈士奇',
    friendTime: '18:20',
    friendName2: '吃饭睡觉打豆豆',
    friendInfo: '99+',
    disturb:'../images/mipmap-xhdpi/icon_no_disturb.png'
  },
  {
    href: './ChatRecord.html',
    images: '../images/12-1.jpg',
    friendName: '柯基',
    friendTime: '18:20',
    friendName2: '吃饭睡觉打豆豆',
    friendInfo: '99+',
    disturb:'../images/mipmap-xhdpi/icon_no_disturb.png'
  },
  {
    href: './ChatRecord.html',
    images: '../images/12-1.jpg',
    friendName: ' 阿里斯加',
    friendTime: '18:20',
    friendName2: '吃饭睡觉打豆豆',
    friendInfo: '99+',
    disturb:'../images/mipmap-xhdpi/icon_no_disturb.png'
  }
];
  
var items = $('#infoListItem');
var html = '';
for(var i = 0; i < data.length ; i++){
    var obj = data[i];
    
  html +=  '<li class="infoListLi ">'+
     '<a href="'+ obj.href +'">'+
      '<div class="infoImg">'+
        '<img src="'+ obj.images +'" alt="">'+
     ' </div>'+
      '<div class="infoRight">'+
          '<div class="infoTxt1">'+
              '<span id="infoName">'+ obj.friendName+'</span>'+
              '<span>'+ obj.friendTime +'</span>'+
         ' </div>'+
         ' <div class="infoTxt2">'+
           ' <span>'+ obj.friendName2 +'</span>'+
            '<img src="'+ obj.disturb +'" alt="">'+
            '</div>'+
          '</div>'+
          '<div class="h_top">置顶</div>'+
         ' <div class="h_del">删除</div>'+
        '</a>'+
    '</li>'
}
// items.innerHTML = html;

$('#infoListItem').html(html);

// console.log(html);





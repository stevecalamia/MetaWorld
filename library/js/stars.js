(function( $ ){
  $.fn.createStar = function(){
    var sky = this;
    var type = Math.ceil(Math.random()*3);
    switch(type) {
      case 1:
        type = "blue";
        break;
      case 2:
        type = "red";
        break;
      case 3:
        type = "yellow";
        break;
    }
    var i = $(".star").length + 1;
    while ($("#star"+i).length > 0){
      i++;
    }
    var skyceiling = $("#sky").height();
    var top = Math.abs(Math.random()*(skyceiling*.66)-Math.random()*(skyceiling*.33));
    //console.log("Top:",top, "Skyceiling:",skyceiling);
    var left = Math.ceil($("#sky").width()*Math.random()); 
    var star = '<div id="star'+i+'" class="star '+type+'"></div>';
    sky.append(star);
    // Possibly a bug in Chrome or jQuery. But assigning the "top" property does not work in Chrome
    $("#star"+i).css({"top":top});
    /*console.log($("#star"+i).css("top"));*/
    $("#star"+i).css({"left":left});
    return this;
  }
})( jQuery );
(function( $ ){
  $.fn.createBldg = function(i, distance, style, floors, init){
    /*console.log("Init bldg"+i+".");*/
    
    // Define Default Values:
    if (i==undefined){
      i = $(".bldg.master").length + 1;
      while ($("#bldg"+i).length > 0) {
        /* console.log("#bldg"+i, "exists."); */
        i++;
      }
      /*console.log("New building will be named #bldg"+i+".");*/
    }
    
    if (distance == undefined) {
      distance = Math.ceil(Math.random()*$("#ground").height());
    }
    
    if (style == undefined) {
      style = "skyscraper";
    }
    
    if (floors == undefined) {
      floors = 26;
    }
    
    if (init == undefined || init == false) { init = false; } else { init = true; /*console.log("Init == true");*/ }
    
    // Define basic variables:
    ground = this;
    hzn = ground.height();
    zindex = distance*.85;
    height = floors*15+30;
    height_px = height + "px";
    scale = height / distance;
    win_per_floor = 8;
    
    bottom = (hzn/2)*(distance/hzn);  /*distance > ground.height() ? ground.height() : distance;*/
    bottom_px = bottom + "px";
    
    
    bldg = '<div id="bldg'+i+'" class="bldg '+style+'"><div id="beacon'+i+'" class="beacon"></div><div id="windows'+i+'" class="windows">';
    for (k = 1; k <= floors; k++){
      bldg += '<div id="'+i+'-floor'+k+'" class="floor">';
      for(j = 1; j <= win_per_floor; j++){
        bldg += '<div id="'+i+'-window'+j*k+'" class="window glass"></div>';
      }
      bldg += "</div>";
    }
    bldg += '<div id="doors" class="doors"><div id="left-door" class="glass door left"></div><div id="right-door" class="glass door right"></div></div></div>';
    ground.append(bldg);
    $("div#bldg"+i).css({
      "z-index" : zindex,
      "left" : ground.width()/3+"px",
      "bottom" : bottom_px,
      "height" : height_px,
      "-moz-transform":"scale("+scale+")",
      "-webkit-transform":"scale("+scale+")",
    });
    $("#beacon"+i).css("left",$("div#bldg"+i).width()/2+"px");
    if (typeof window.beacon_interval == "undefined") {
      window.beacon_interval = new Array();
    }
    window.beacon_interval[i] = setInterval(function(){ $("#beacon"+i).toggleClass("on")},Math.random()*500+1200);
    
    $("div#bldg"+i+" .window").click(function(){
      $(this).toggleClass("on");
    });
  
    $("div#bldg"+i+" .door").click(function(){
      $(this).toggleClass("open");
    });
  
    
    return $("div#bldg"+i); 
  }
})( jQuery );

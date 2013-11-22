  (function( $ ){
  $.fn.createCloud = function(i, altitude, init){
    //template function
    var cloud = function(i){
      return "<div id='cloud"+i+"' class='cloud cloud"+i+" container master'> \
        <div id='cloud"+i+"-front-container' class='cloud cloud"+i+" container minor front'> \
          <div id='cloud"+i+"-front-top' class='cloud cloud"+i+" contents front top'>&nbsp;</div> \
          <div id='cloud"+i+"-front-bottom' class='cloud cloud"+i+" contents front bottom'>&nbsp;</div> \
        </div> \
        <div id='cloud"+i+"-main-container' class='cloud cloud"+i+" container minor main'> \
          <div id='cloud"+i+"-main-top' class='cloud cloud"+i+" contents main top'>&nbsp;</div> \
          <div id='cloud"+i+"-main-mid' class='cloud cloud"+i+" contents main mid'>&nbsp;</div> \
          <div id='cloud"+i+"-main-bottom' class='cloud cloud"+i+" contents main bottom'>&nbsp;</div> \
        </div> \
        <div id='cloud"+i+"-body-mid' class='cloud cloud"+i+" contents body mid'>&nbsp;</div> \
        <div id='cloud"+i+"-body-bottom' class='cloud cloud"+i+" contents body bottom'>&nbsp;</div> \
       </div>";
    }
 // console.log("Init cloud"+i+".");
    if ($("div.cloud.container.master").length >= 10){ 
   // console.log("Too many clouds.  createCloud("+i+", "+altitude+") exiting.")
      return; 
    }
    if (init == undefined || init == false) { init = false; } else { init = true; }
    
    var sky = this;
    if (i == undefined){
      i = Math.random()*1000;
   // console.log("Cloud Iterator undefined. Using", i)
    }  
    if ($("#cloud"+i).length > 0) {
   // console.log("There was a cloud named cloud"+i+".","Getting a new name.");
      i = $("div.cloud.container.master").length + 1;
      while ($("#cloud"+i).length > 0){
     // console.log("cloud"+i, "exists.");
        i++;
      }
   // console.log("New cloud named cloud"+i, ".");
    }
    
    if (altitude == undefined){
      altitude = 100*Math.random();
    }
    var scale = altitude/sky.height();
    var zindex = Math.ceil(altitude);
    if (altitude > sky.height()) { 
   // console.log("Cloud"+i+" appears above the field of vision at", top+".", "Aborting cloud creation.");
      return;
    }
    var bottom = (altitude - 100)*.64;
    var speed = sky.height() - altitude;
 // console.log("Creating cloud"+i+":\n", "  altitude:", altitude, "\n", "  speed:", speed, "\n", "  bottom:", bottom, "\n", "  scale:", scale, "\n", "  z-index:", zindex);
    sky.append(cloud(i));
    $("div#cloud"+i).css({
      "z-index" : zindex, 
      "left" : sky.width()+"px",
      "-moz-transform":"scale("+scale+")",
      "-webkit-transform":"scale("+scale+")",
      "bottom" : bottom+"px" });
      //"top" : top+"px" });
    if (init) {
      $("div#cloud"+i).css({
        "left": Math.ceil(sky.width()*Math.random()),
      })
    }
    //$("#cloud"+i).css("bottom",top+"px");
    $("#cloud"+i).animate(
      { "left":  0-((400*scale)+100)+"px" },
      speed*1000,
      'linear',
      function(){
     // console.log("Destroying cloud"+i+".", $(this).attr("id"))
        $(this).remove(); 
      });
      
    return $("#cloud"+i);
  }
})( jQuery );

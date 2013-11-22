var myworld; 

$(document).ready(function(){
  var myworld = new World();
  
  init_infobox();
  /*
  // assign date vars:
  d = new Date();
  day = d.getDate();
  month = d.getMonth()+1;
  year = d.getYear();
  timezone = d.getTimezoneOffset();
  dst = (Math.abs(2 * timezone - (new Date(year, 0)).getTimezoneOffset() - (new Date(year, 6)).getTimezoneOffset()) > 1) ? 1 : 0;
  
  // alert(timezone);
  // do sunrise sunset calc: (of course, we need to set up a py file to do this for us to get around cross-domain restrictions)
  $.get("http://www.earthtools.org/sun/"+geoip_latitude()+"/"+geoip_longitude()+"/"+day+"/"+month+"/99/"+dst,
   function(data){
     alert(data);
     $("#sunrisesunset").append(data);
   }, 'xml'); */
  
  function window_resize(){
    myworld.reset();
  }
  
  // Define event reactions:
  $(window).resize(function() { window_resize(); });
  
  $(".pause.button").click(function(){
    $(".cloud.container.master").stop(true,false);
  });
  $(".regen.button").click(function(){ myworld.reset(); });
  $(".day.button").click(function(){ myworld.sunrise(); });
  $(".night.button").click(function(){ myworld.sunset(); });
  
  // set the click action of the minmax buttons
  $(".minmax").click(function(){
    var button = $(this);
    var panel = button.parents("section.panel");
    if (button.hasClass("maximized")) {
      panel.data("height",panel.height()); //store the original height
      panel.animate({ 'height':'12px' }, '1000', 'linear');
      button.removeClass("maximized").addClass("minimized").html("&darr;");
      button.attr("title","maximize");
    } else if (button.hasClass("minimized")) {
      panel.animate({ 'height': panel.data("height")+"px" }, '1000', 'linear');
      button.removeClass("minimized").addClass("maximized").html("_");
      button.attr("title","minimize");
    }
    return false;
  });
  
  // set the click action of the close 
  $(".button.close").click(function(){ $(this).parents("section.panel").hide(); return false; });
  $(".button.minmax").not(".intro .button.minmax").not(".features .button.minmax").click();
  
});

//----------END DOCUMENT READY --------




// World Class:

function World(){
  var self = this;
  this.self;
  this.sky;
  this.ground;
  this.cloud_master;
  this.cloud_generator; //the cloud generator
  var horizon = this.horizon = $(document).height*.34;
  
  __init();
  if (window.console) { console.log("outside __init() self.self = " + self.self); }
  
  function __init(){
    self.self = $("#world").css({
      "height": $(window).height(),
      "width": $(window).width(),
      "top":0,
      "left":0,
      "position":"absolute"
    });
    if (window.console) { console.log("inside __init() self.self = " + self.self); }
    self.sky = create_sky();
    star_genesis(50);
    cloud_genesis(10);
    self.ground = create_ground();
    bldg_genesis(1);
    
  }
  
  function create_sky(){
    if ($("#sky").length == 0) { $("body").append($("<div id='sky'></div>")); }
    return $("div#sky").css({"width":$(document).width()+"px","height":$(document).height()-horizon+"px"});
  }
  
  function star_genesis(num_stars) {
    for(i=1; i < num_stars; i++) {
      self.sky.createStar();
    }
  }
  
  function cloud_genesis(max_clouds_at_a_time) {
   for (j=1; j<=max_clouds_at_a_time; j++) {
     self.sky.createCloud(j, j*64, true);
     $("#cloud"+j).css("left",self.sky.width()*Math.random()); //position the clouds in a random place in the sky, just to start.
   }
   self.cloud_generator = setInterval(function() { self.sky.createCloud($("div.cloud.container.master").length+1, (Math.random()*self.sky.height())); }, 10000);
  }
  
  function create_ground(){
    if ($("#ground").length == 0) { $("body").append($("<div id='ground'></div>")); }
    return $("div#ground").css({"width":$(document).width()+"px","height":horizon+"px","top":self.sky.height()});
  }
  
  function bldg_genesis(num_buildings){
    for(i=1; i <= num_buildings; i++) {
      self.ground.createBldg(i, 400, "skyscraper", 26);
    }
  }
  
  this.reset = function(){
    //remove everything except the earth and sky
    $(".star").remove();
    $(".cloud").remove();
    $(".bldg").remove();
    
    //re-create everything
    __init();
  }
  
  this.sunrise = function(){
    self.self.removeClass("night").addClass("day");
  }
  
  this.sunset = function(){
    self.self.removeClass("day").addClass("night");
  }
}

// Generic Functions
function init_infobox(){
  if (navigator.userAgent.indexOf("Firefox")<1) {
    $(".notfirefox").show();
    $(".firefox").hide();
  } else {
    $(".notfirefox").hide();
    $(".firefox").show();
  }
}

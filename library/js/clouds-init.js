$(document).ready(function(){
  sky = $("div#sky").css({"width":$(document).width()+"px","height":$(document).height()*.66+"px"});
  ground = $("div#ground").css({"width":$(document).width()+"px","height":$(document).height()*.34+"px","top":sky.height()})
  for (j=1; j<=10; j++) {
   /* console.log("Initial Cloud Population"); */
   sky.createCloud(j, j*64, true);
   $("#cloud"+j).css("left",sky.width()*Math.random()); 
  }
  ethos = setInterval(function() { 
    /* console.log("Ethos creating cloud...") */
    sky.createCloud($("div.cloud.container.master").length+1, (Math.random()*sky.height())); 
    }, 10000);
});
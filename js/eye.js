$(document).ready(function(){
  deg_i = 15

  /* rgb 1 1FAAFF */  
  r1 = parseInt("0x1F");
  g1 = parseInt("0xAA");
  b1 = parseInt("0xFF");
  /* rgb 2 082D3F */
  r2 = parseInt("0x08");
  g2 = parseInt("0x2D");
  b2 = parseInt("0x3F");
  
  numsteps = 180/deg_i;
  /* console.log("num steps",numsteps) */
  for (deg=0; deg < 360; deg += deg_i) {
    if (deg <= 180){
      step = level = deg / deg_i;
    } else {
      level--;
      step++;
    }
    red = Math.ceil(level * Math.abs(r2-r1) / numsteps) + r2;
    green = Math.ceil(level * Math.abs(g2-g1) / numsteps) + g2;
    blue = Math.ceil(level * Math.abs(b2-b1) / numsteps) + b2;
    
    gradient = "-moz-radial-gradient(50% 0% 0deg, ellipse farthest-side, rgba("+red+","+green+","+blue+", 0), rgba("+red+","+green+","+blue+",0) 10%, rgba("+red+","+green+","+blue+",.5) 20%, rgba("+red+","+green+","+blue+",0) 30%, rgba("+red+","+green+","+blue+",.35) 40%, rgba("+red+","+green+","+blue+",0) 50%, rgba("+red+","+green+","+blue+",0))";
    /* console.log("step",step, "level", level,"red",red,"green",green,"blue",blue); */
    $(".iris").append("<div id='shading"+deg+"' class='shading deg"+deg+"'></div>");
    $("#shading"+deg).css({
      "-moz-transform":"rotate("+deg+"deg)",
      "background-image": gradient
    });
  }
});

function conv_deg_to_rad(deg){
  return (deg/(2*3.1415))*360;
}

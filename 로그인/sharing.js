// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

$( document ).ready(function() {
	var modes = ["none", "line", "circle", "rect", "poly", "curve", "fill", "pattern"];
    var line_color = "black";
    var line_width = 1;
    var rect_color = "white";  var img = new Image();
    var figX = 0;
    var figY = 0;
    var current_mode = modes[0];
    var poly_first = true; var pattern_first = true;
    var fill_flag = false; pattern_flag = false;
    var curve_count = 0; var cp1_x=0; var cp1_y=0; var cp2_x=0; var cp2_y=0;
    var canvas = document.getElementById("myCanvas");
    var fill_color_btn = document.getElementById("current_fill_color");
    var line_color_btn = document.getElementById("current_line_color");
    var cv = canvas.getContext("2d");
    function saveCanvas()
    {
      var link = document.createElement('a');
      link.download = "canvas.png";
      link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");;
      link.click();
    }
    function loadCanvasClicked(event)
    {
      event.preventDefault();
      document.getElementById("canvas_file").click();
    }
    function loadCanvas(file_btn)
    {
      var file = file_btn.files[0];
      var imageObj = new Image();
      imageObj.src = window.URL.createObjectURL(file);
      imageObj.onload = function(){
        cv.drawImage(imageObj, 0, 0);
      }
    }
    function changeLineWidth(width)
    {
      line_width=width;
    }
    function changeMode(btn)
    {
      current_mode = modes[btn];
      if(btn==6)
      {
        fill_flag = true;
        pattern_flag=false;
        current_mode = modes[3];
      }
    }
    function changeFillColor(btn)
    {
      rect_color = btn.style.backgroundColor;
      fill_color_btn.style.backgroundColor = rect_color;
    }
    function changeLineColor(btn)
    {
      line_color = btn.style.backgroundColor;
      line_color_btn.style.backgroundColor = line_color;
    }
    function pattern_clicked(event)
    {
      event.preventDefault();
      document.getElementById("pattern_file").click();
    }
    function loadImage(file_btn)
    {
      var file = file_btn.files[0];
      img = new Image();
      img.src = window.URL.createObjectURL(file);
      fill_flag = false;
      pattern_flag=true;
      current_mode = modes[3];
    }
    function checkMode(event)
    {
      var x = event.x - canvas.offsetLeft;
      var y = event.y - canvas.offsetTop;
      switch (current_mode)
      {
        case modes[0]: //"none"
            break;
        case modes[1]: //"line"
            cv.beginPath();
            cv.moveTo(x,y);
            break;
        case modes[2]: //"circle"
            cv.beginPath();
            figX = x;
            figY = y;
            break;
        case modes[3]: //"rect"
            cv.beginPath();
            figX = x;
            figY = y;
            break;
        case modes[4]: //"poly"
            if(poly_first==true)
            {
              cv.beginPath();
              cv.moveTo(x,y);
              figX=x;
              figY=y;
              poly_first=false;
            }
            if(event.which==3)
            {
              cv.lineTo(figX,figY);
              cv.lineWidth=line_width;
              cv.strokeStyle = line_color;
              cv.stroke();
              cv.closePath();
            }
        case modes[5]: //"curve"
            break;
        default:
            alert('mode 오류가 발생했습니다.');
            break;
      }
    }
    function completeDrawing(event)
    {
      var x = event.x - canvas.offsetLeft;
      var y = event.y - canvas.offsetTop;
      switch (current_mode) {
        case modes[0]: //"none"
            break;
        case modes[1]: //"line"
            cv.lineTo(x,y);
            cv.lineWidth=line_width;
            cv.strokeStyle = line_color;
            cv.stroke();
            cv.closePath();
            break;
        case modes[2]:  //"circle"
            var radius = Math.sqrt(Math.pow(figX-x,2)+Math.pow(figY-y,2))/2;
            cv.arc((figX+x)/2, (figY+y)/2, radius, 0, 2 * Math.PI);
            cv.lineWidth=line_width;
            cv.strokeStyle = line_color;
            cv.stroke();
            cv.closePath();
            break;
        case modes[3]: //"rect"
            if(figX==0 && figY==0)
            {
              break;
            }
            cv.rect(figX,figY,x-figX,y-figY);
            if(fill_flag)
            {
              cv.fillStyle = rect_color;
              cv.fill();
            }
            if(pattern_flag)
            {
              var pattern = cv.createPattern(img, 'repeat');
              cv.fillStyle = pattern;
              cv.fill();
            }
            cv.lineWidth = line_width;
            cv.strokeStyle = line_color;
            cv.stroke();
            cv.closePath();
            break;
        case modes[4]: //"poly"
            if(event.which==3)
            {
              poly_first = true;
              break;
            }
            cv.lineTo(x,y);
            cv.lineWidth = line_width;
            cv.strokeStyle = line_color;
            cv.stroke();
            cv.moveTo(x,y);
            break;
        case modes[5]: //"curve"
            switch (curve_count)
            {
              case 0:
                  cv.beginPath();
                  cv.moveTo(x,y);
                  curve_count += 1;
                  break;
              case 1:
                  cp1_x=x;
                  cp1_y=y;
                  curve_count += 1;
                  break;
              case 2:
                  cp2_x=x;
                  cp2_y=y;
                  curve_count += 1;
                  break;
              case 3:
                  cv.bezierCurveTo(cp1_x,cp1_y,cp2_x,cp2_y,x,y);
                  cv.lineWidth = line_width;
                  cv.strokeStyle = line_color;
                  cv.stroke();
                  cv.closePath();
                  curve_count = 0;
                  break;
              default:
                  alert("curve_count error!");
                  break;
            }
            break;
        default:
            alert('mode 오류가 발생했습니다.');
            break;
      }
    }
});

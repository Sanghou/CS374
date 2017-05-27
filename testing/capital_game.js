// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

$( document ).ready(function() {
var picture = {
 canvas : null,
 context : null
};
/**
 * 0 : 펜
 * 1 : 직선
 * 2 : 사각형
 */
var eventObject = {
 mode: 0,
 click : false,
 x: -8,
 y: -70,
};
 
 (function() {

	$('#live-chat header').on('click', function() {

		$('.chat').slideToggle(300, 'swing');
		$('.chat-message-counter').fadeToggle(300, 'swing');

	});

	$('.chat-close').on('click', function(e) {

		e.preventDefault();
		$('#live-chat').fadeOut(300);

	});

})
 
// 초기화
window.onload = function() {
 document.getElementById("loadImg").addEventListener("change", loadImg, false);
 picture.canvas = document.getElementById("canvas");
 picture.context = picture.canvas.getContext("2d");
 mouseListener();
 
 var img = new Image();
 img.onload = function(){
 	var ctx = document.getElementById("canvas").getContext("2d");
 	ctx.drawImage(img,0,0,800,450);
 }
 	img.src = "./bg_bird.jpg"
}
 
// 현재 클릭중인지 아닌지 구분?하기위한 변수 세팅
function setClickTrue(){
 eventObject.click = true;
}
function setClickFalse(){
 eventObject.click = false;
}
 
// 펜일 경우의 이벤트
function dragEvent(event) {
 
 var g = picture.context;
 
 g.moveTo(eventObject.x, eventObject.y);
 
 eventObject.x = event.x -8;
 eventObject.y = event.y -70;
 
 if (eventObject.click) {
  g.lineTo(event.x -8, event.y -70);
  g.stroke();
 }
 
}
 
// 좌표 출력
 
// 라인, 사각형 등 이전 좌표가 필요할 경우 이전좌표 세팅
function setBeforeXY(e){
 
 var g = picture.context;
 eventObject.x = e.x -8;
 eventObject.y = e.y -70;
 g.moveTo(e.x -8, e.y -70);
}
 
// setBeforeXY 에서 세팅한 좌표부터 현재 좌표까지 직선을 그림
function drawLine(e){
 
 var g = picture.context;
 
 g.lineTo(e.x-8, e.y-70);
 g.stroke();
}
 
// setBeforeXY 에서 세팅한 좌표부터 현재 좌표까지 사각형을 그림
function drawRect(e){
 
 var g = picture.context;
 g.rect(eventObject.x, eventObject.y, e.x-eventObject.x, e.y-eventObject.y);
 g.stroke();
 // g.fill(); 을 g.stroke() 대신 사용하면 속이 꽉찬 사각형을 그린다.
}
 
// 각 경우에 따라서 이벤트리스너를 달아준다.
function mouseListener(){
 var mode = Number(eventObject.mode);
 
 switch(mode){
 
 case 0:
  picture.canvas.addEventListener("mousedown",setClickTrue, false);
  picture.canvas.addEventListener("mouseup", setClickFalse, false);
  picture.canvas.addEventListener("mousemove", dragEvent, false);
  break;
  
 case 1:
  picture.canvas.addEventListener("mousedown",setBeforeXY, false);
  picture.canvas.addEventListener("mouseup", drawLine, false);
  break;
  
 case 2:
  picture.canvas.addEventListener("mousedown",setBeforeXY, false);
  picture.canvas.addEventListener("mouseup", drawRect, false);
  break;
  
 default:
  break;
 }
 
}
 
// 이벤트 리스너 제거
function removeEvent(){
 picture.canvas.removeEventListener("mousedown",setClickTrue, false);
 picture.canvas.removeEventListener("mouseup", setClickFalse, false);
 picture.canvas.removeEventListener("mousemove", dragEvent, false);
 picture.canvas.removeEventListener("mousedown",setBeforeXY, false);
 picture.canvas.removeEventListener("mouseup", drawLine, false);
 picture.canvas.removeEventListener("mouseup", drawRect, false);
}
 pen.onclick = function(){
	 removeEvent();
	eventObject.mode = 0;
	mouseListener();
 }
// 모드 체인지
line.onclick = function(){
 removeEvent();
 eventObject.mode = 1;
 mouseListener();
}
 
//////////////////////////////////////////////////////////////////////////////
// input file 로 읽어온 이미지를 canvas 에 배경으로 출력

$("input:file[name=loadImg]").change(function(e){
	var file = e.target.files[0];
	var reader = new FileReader();
	reader.onload = function(e){
 	var img = new Image();
 		img.onload = function(){
 			var ctx = document.getElementById("canvas").getContext("2d");
 			ctx.drawImage(img,0,0,700,500);
 		}
 			img.src = e.target.result; 		}
 		reader.readAsDataURL(file);
})
 
// canvas에 그려진 그림을 파일로 저장
send.onclick = function(){
var isDel = confirm("정말로 보내시겠습니까?");
  if(isDel){
   alert("디자이너에게 알람이 전달되었습니다.")
   data.value = ("");
  }
  else{
   return;
  }
}

	var pr2_qu = document.getElementById("pr2__question");
	var pr2_an = document.getElementById("pr2__answer");
	var pr2_sub = document.getElementById("pr2__submit");
	var input_store =[];
	
	function stack_table(){
		var printTable = document.getElementById('resultTable');
		var newRow = printTable.insertRow(2);
		newRow.style.borderBottom = "1px solid";
		var newCell1 = newRow.insertCell(0);
		var newCell2 = newRow.insertCell(1);
		var newCell3 = newRow.insertCell(2);
		var newInput = pr2_an.value;
		var deletebtn = document.createElement("button");
		var t = document.createTextNode("delete");
		deletebtn.appendChild(t);
		newCell2.innerHTML = newInput;
		newCell3.innerHTML = newCell3.innerHTML + '<button style="float: right;" id="delete_btn" class = "remove-me"name="btn" >Delete</button>'
		
	}
	
	
	$(document).on('click', ".remove-me", function(e){
		$(this).closest ('tr').remove ();
});
	pr2_an.focus();
	
	pr2_sub.onclick = function(){
		var isDel = confirm("정말로 추가하시겠습니까??");
		if(isDel){
			alert("디자이너에게 Task가 전달되었습니다.")
			stack_table();
		pr2_an.focus();
		pr2_an.value = "";
		}
	}
});

function preload(){
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canv");

}

var TYPE_SQUARE = 0;
var TYPE_TRIANGLE = 1;
var TYPE_CIRCLE = 2;

function setup() {
  frameRate(60);
  noStroke();

  var x=0;
  var size;
  if(windowWidth>480){
    size=60;
  }else{
    size = windowWidth/8;
  }

  var triHei = size * 1.73/2;
  while(x<windowWidth){
    var tempY = random(windowHeight+1);

    fill(getColor());
    rect(x, 0, size, tempY);

    fill(getColor());
    rect(x, tempY, size, windowHeight - tempY);

    fill(getColor());
    var shapeType = getRandomNumber(2);
    console.log(shapeType);
    switch(shapeType){
      case TYPE_SQUARE:
        rect(x, tempY-size/2, size, size);
        break;
      case TYPE_TRIANGLE:
        triangle(x, tempY, x+size, tempY, x+size/2, tempY-triHei+triHei*getRandomNumber(2));
        break;
      case TYPE_CIRCLE:
        ellipse(x+size/2, tempY, size, size);
        break;
    }

    x += size;
  }
}

function getColor(){
  var r = getRandomNumber(4)*64;
  var g = getRandomNumber(4)*64;
  var b = getRandomNumber(4)*64;

  //グレースケールの色は除外
  while(r===g && r===b){
    r = getRandomNumber(4)*64;
    g = getRandomNumber(4)*64;
    b = getRandomNumber(4)*64;
  }

  //緑系の色の割合を若干増やすため、緑要素が無い色の場合は再取得
  if(g === 0 && b > 0 && r > 0){
    r = getRandomNumber(4)*64;
    g = getRandomNumber(4)*64;
    b = getRandomNumber(4)*64;
  }

  return color(r, g, b);
}

function getRandomNumber(max){
  var num = Number(floor(random(max+1)));
  return num;
}

function draw(){
}



//ウィンドウリサイズイベント
var timer = false;
$(window).resize(function() {
    if (timer !== false) {
        clearTimeout(timer);
    }
    timer = setTimeout(function() {
        console.log('resized');
        //キャンバス再描画
        resizeCanvas(windowWidth, windowHeight);
        setup();
    }, 200);
});

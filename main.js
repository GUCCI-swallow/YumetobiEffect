/*
 * circle
 * 円軌道を描く
 */
function yumetobiEffects() {
    var cs  = document.getElementById('main');
    var ctx = cs.getContext('2d');
    var w   = cs.width;
    var h   = cs.height;
    var circles = [];
    var fillColors = ["#ffb391","#ff88d8","#f79998","#f0be52"];

    

    var Circle = function(deg,fillColor){
        this.initialize(deg,fillColor);
    }

    Circle.prototype = {
        initialize: function(deg,fillColor){
            this.x = 0;
            this.y = 0;

            //角度
            this.deg = deg || 0;

            //ラジアン
            this.rad = 0;

            //回転半径
            this.radius = w/2;
            this.size = w/10;

            this.fillColor = fillColor;
        },

        updatePos: function(){

            // 角度を増やす
            this.deg += w/100;

            //回転半径を減らす
            this.radius -= 3;

            //円のサイズを小さくする
            this.size -= w/1000;

            // 角度をラジアンに変換
            this.rad = this.deg * Math.PI / 180;

            // x座標 = 円の中心x座標 + 半径 * Cos
            this.x   = (w/2) + this.radius * Math.cos(this.rad);

            // Y座標 = 円の中心y座標 + 半径 * Sin
            this.y   = (h/2) - this.radius * Math.sin(this.rad);
            //console.log("x="+this.x+":y="+this.y);
            //

        },

        drawing: function(){
            if(this.size < 0)return false;

            //描画を始める
            ctx.beginPath();

            ctx.arc(this.x,this.y,this.size,0,Math.PI*2,false);
            ctx.fillStyle = this.fillColor;
            ctx.fill();

        },

        render: function(){
            if(this.radius <= 0)return false;

            this.updatePos();
            this.drawing();
        }

    };

    cs.addEventListener("click",function(event){
      console.log("click!");
      var initPos = Math.floor(Math.random() * 360) + 1;
      var color = fillColors[Math.floor(Math.random()*fillColors.length)+1];
      var circle = new Circle(initPos,color);
      circles.push(circle);
    },false);


    (function render() {
        ctx.clearRect(0, 0, w, h);
        //if(circles.length <= 0)return false;

        circles.forEach(function(circle){
          circle.render();
        });

        ctx.fillStyle = "yellow";
        ctx.font = "100px 'ＭＳ ゴシック'";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText("µ's",w/2,h/2-50,300);

        //アニメーションする
        requestAnimationFrame(render);
    })();

}

yumetobiEffects();

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

    

    var Circle = function(deg){
        this.initialize(deg);
    }

    Circle.prototype = {
        initialize: function(deg){
            this.x = 0;
            this.y = 0;

            //角度
            this.deg = deg || 0;

            //ラジアン
            this.rad = 0;

            //回転半径
            this.radius = 250;

        },

        updatePos: function(){

            // 角度を増やす
            this.deg += 5;

            //回転半径を減らす
            this.radius -= 3;

            // 角度をラジアンに変換
            this.rad = this.deg * Math.PI / 180;

            // x座標 = 円の中心x座標 + 半径 * Cos
            this.x   = (w/2) + this.radius * Math.cos(this.rad);

            // Y座標 = 円の中心y座標 + 半径 * Sin
            this.y   = (h/2) + this.radius * Math.sin(this.rad);
            //console.log("x="+this.x+":y="+this.y);

        },

        drawing: function(){
            //描画を始める
            ctx.beginPath();

            ctx.arc(this.x,this.y,30,0,Math.PI*2,false);
            ctx.stroke();

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
      var circle = new Circle(initPos);
      circles.push(circle);
    },false);


    (function render() {
        ctx.clearRect(0, 0, w, h);
        //if(circles.length <= 0)return false;

        circles.forEach(function(circle){
          circle.render();
        });

        //アニメーションする
        requestAnimationFrame(render);
    })();

}

yumetobiEffects();

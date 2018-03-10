// phina.js をグローバル領域に展開
phina.globalize();

// アセットを設定
var ASSETS = {
  // ねこの画像を指定
  image: {
    'cat1': 'cat.png',
    'cat2': 'cat2.png',
    'cat3': 'cat3.png',
  },
};

// MainScene クラスを定義
phina.define('MainScene', {
  superClass: 'CanvasScene',
  init: function() {
    this.superInit();
    // 背景色を指定
    this.backgroundColor = '#87CEFA';
    // ラベルを生成
    this.label = Label('麗しきねこの世界').addChildTo(this);
    this.label.x = this.gridX.center(); // x 座標
    this.label.y = this.gridY.center(); // y 座標
    this.label.fill = 'white'; // 塗りつぶし色

    // 円を定義
    var circle = CircleShape().addChildTo(this);
    circle.x = 500;
    circle.y = 300;
    circle.radius = 60;
    // 円が大きくなるよう定義
    circle.update = function(){
      this.scaleX += 0.1;
      this.scaleY += 0.1;
      if(this.scaleX > 5){
        this.scale.set(1, 1);
      }
    }

    // ハートを定義
    var heart = HeartShape().addChildTo(this);
    heart.x = 100;
    heart.y = 200;
    // 回転を定義
    heart.update = function(){
      this.rotation += 5;
    }

    // ねこAを定義
    var catA = Sprite('cat1').addChildTo(this);
    catA.x = this.gridX.center();
    catA.y = this.gridY.center();
    catA.width = 100;
    catA.height = 100;
    // ねこAがx軸に移動
    catA.vx = 5;
    catA.update = function(){
      this.x += this.vx;
      // 画面を越えないように定義
      if(this.left < 0){
        this.left = 0;
        this.vx *= -1;
      }else if(this.right > 640){
        this.right = 640;
        this.vx *= -1;
      }
    }

    // ねこBを定義
    var catB = Sprite('cat2').addChildTo(this);
    catB.x = this.gridX.center();
    catB.y = this.gridY.center();
    catB.width = 120;
    catB.height = 120;
    this.player = catB;

    // ねこCを定義
    var catC = Sprite('cat3').addChildTo(this);
    catC.x = this.gridX.center();
    catC.y = this.gridY.center();
    catC.width = 120;
    catC.height = 120;
    this.playerC = catC;

    var i;
    // 10回繰り返し
    for (i = 0; i < 10; i++) {
      // 星を定義
      var star = StarShape().addChildTo(this);
      star.x = Random.randint(0 ,640);
      star.y = Random.randint(0 ,960);
      // タッチしたら消える
      star.setInteractive(true);
      star.onpointend = function(){
        this.remove();
      };
    }

    // 障害物を定義(未完了)
    this.shapeGroup = CanvasElement().addChildTo(this);
    var j;
    for (j = 0; j < 4; j++) {
      var rect = RectangleShape({
      }).addChildTo(this.shapeGroup);
      // 位置をランダムに設定
      rect.x = Random.randint(0, 640);
      rect.y = Random.randint(0, 960);
    }
  },

  // ねこBがキーボードで移動
  update: function(app){
    var keyboard = app.keyboard;
    // 左右移動
    if(keyboard.getKey('left')){
      this.player.x -= 5;
      // this.player.scale = 1;
    }
    if(keyboard.getKey('right')){
      this.player.x += 5;
      // this.player.scale = -1;
    }
    // 上下移動
    if (keyboard.getKey('up')) {
      this.player.y -= 5;
    }
    if (keyboard.getKey('down')) {
      this.player.y += 5;
    }

    // ポインターでねこCが移動
    var p = app.pointer;
    this.playerC.x = p.x;
    this.playerC.y = p.y;
    // this.ShapeGroup.children.each(function(child){
    //   if(this.playerC.hitTestElement(child)){
    //     child.fill = 'blue';
    //   }
    // }, this);
  }
});

// メイン処理
phina.main(function() {
  // アプリケーション生成
  var app = GameApp({
    startLabel: 'main', // メインシーンから開始する
    assets: ASSETS, // アセットを読み込み
  });
  // アプリケーション実行
  app.run();
});

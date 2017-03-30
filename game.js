
(function(){
	var WIDTH = 800;
	var HEIGHT = 480;

	var _game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'game');

	var mainState = {
		preload : function(){
			this.game.load.image('bullet','img/bullet.png');
			/*
			 * Step 1: uncomment line below by removing "//" 
			 */
			//this.game.load.image('bomb_bullet', 'img/rocket.png');
			this.game.load.image('bgSpace','img/farback.jpg');
			this.game.load.image('bgSpace2','img/starfield.png');
			this.game.load.spritesheet('ship','img/Spritesheet_64x29.png',64,29,4);


			this.game.load.image('enemyship1','img/enemy_1.png');
			this.game.load.image('enemyship2','img/enemy_2.png');
			this.game.load.image('enemyship3','img/enemy_3.png');
			this.game.load.image('enemyship4','img/enemy_4.png');
			this.game.load.image('enemyship5','img/enemy_5.png');
		},

		create : function(){
			this.lastBullet = 0;
			/*
			 * Step 2: uncomment line below by removing "//"
			 */
			//this.lastBombBullet = 0;	
			this.lastEnemy = 0;
			this.lastTick = 0;
			this.speed = 100;
			this.bg1Speed = 30;
			this.bg2Speed =40;
			this.bg3Speed =50;
			this.enemySpeed = 200;
			this.bulletSpeed = 300;
			/*
			 * Step 3: uncomment line below by removing "//"
			 */
			//this.bbulletSpeed = 3000;
			this.lives = 3; 
			this.score = 0;
			/*
			 * Step 4: uncomment line below by removing "//"
			 */
			//this.bombs = 5;

			this.game.physics.startSystem(Phaser.Physics.ARCADE);

			this.bg = this.game.add.tileSprite(0,0,1782,600,'bgSpace');
			this.bg.autoScroll(-this.bg1Speed,0);

			this.bg2 = this.game.add.tileSprite(0,0,800,601,'bgSpace2');
			this.bg2.autoScroll(-this.bg2Speed,0);

			this.bg3 = this.game.add.tileSprite(0,0,800,601,'bgSpace2');
			this.bg3.autoScroll(-this.bg3Speed,0);

			this.ship = this.game.add.sprite(10,HEIGHT/2, 'ship');
			this.ship.animations.add('move');
			this.ship.animations.play('move', 20, true);
			this.game.physics.arcade.enable(this.ship, Phaser.Physics.ARCADE);

			this.bullets = this.game.add.group();
			this.bullets.enableBody = true;
			this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
			this.bullets.createMultiple(10,'bullet');			
    		this.bullets.setAll('outOfBoundsKill', true);
    		this.bullets.setAll('checkWorldBounds', true);
    		/*
    		 * Step 6: uncomment line below by removing "//"
    		 */
    		//this.bbullets = this.game.add.group();
            //this.bbullets.enableBody = true;
            //this.bbullets.physicsBodyType = Phaser.Physics.ARCADE;
            //this.bbullets.createMultiple(10, 'bomb_bullet');
            //this.bbullets.setAll('outOfBoundsKill', true);
            //this.bbullets.setAll('checkWorldBounds', true);
			this.bullets.createMultiple(10,'bullet');
			this.bullets.setAll('outOfBoundsKill', true);
			this.bullets.setAll('checkWorldBounds', true);
			this.enemies = this.game.add.group();
			this.enemies.enableBody = true;
			this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
			var style = { font: "28px Arial", fill: "#DE5F3D", align: "left" };
			this.scoreText = this.game.add.text(0,0,"Score : "+this.score,style);
			this.livesText = this.game.add.text(0,28,"Lives : "+this.lives,style);
			/*
			 * Step 5: uncomment line below by removing "//"
			 */
			//this.bombsText = this.game.add.text(0, 56, "Bombs: " + this.bombs,style);
		},

		update : function(){
			this.ship.body.velocity.setTo(0,0);
			if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && this.ship.x > 0)
			{
				this.ship.body.velocity.x = -2*this.speed;
			}
			else if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this.ship.x < (WIDTH-this.ship.width))
			{
				this.ship.body.velocity.x = this.speed;
			}
			else if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.ship.y > 0)
			{
				this.ship.body.velocity.y = -this.speed;
			}
			else if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this.ship.y < (HEIGHT-this.ship.height))
			{
				this.ship.body.velocity.y = +this.speed;
			}

			var curTime = this.game.time.now;
			/*
			 * Step 7: uncomment line below by removing "//"
			 */
			//var curBombTime = this.game.time.now;

			if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
			{
				if(curTime - this.lastBullet > 300)
				{
					this.fireBullet();
					this.lastBullet = curTime;
				}
			}
			
			/*
			 * Step 8: uncomment line below by removing "//"
			 */
			//if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER) || 	this.game.input.keyboard.isDown(Phaser.Keyboard.B) ) {
            //if (curBombTime - this.lastBombBullet > 600) {
            //      this.fireBombBullet();
            //      this.lastBombBullet = curBombTime;
            //     }
            // }


			if(curTime - this.lastEnemy > 500)
			{
				this.generateEnemy();
				this.lastEnemy = curTime;
			}

			if(curTime - this.lastTick > 10000)
			{
				if(this.speed < 500)
				{
					this.speed *= 1.1;
					this.enemySpeed *= 1.1;
					this.bulletSpeed *= 1.1;
					/*
					 * Step 10: uncomment line below by removing "//"
					 */
					//this.bbulletSpeed *= 1.1;
					
					this.bg.autoScroll(-this.bg1Speed, 0);
					this.bg2.autoScroll(-this.bg2Speed, 0);
					this.bg3.autoScroll(-this.bg3Speed, 0);
					this.lastTick = curTime;
				}
			}

			this.game.physics.arcade.collide(this.enemies, this.ship, this.enemyHitPlayer,null, this);
			this.game.physics.arcade.collide(this.enemies, this.bullets, this.enemyHitBullet,null, this);
			/*
			 * Step 11: uncomment line below by removing "//"
			 */
			//this.game.physics.arcade.collide(this.enemies, this.bbullets, this.enemyHitBBullet, null, this);
			
			
		},

		fireBullet : function(curTime){
			var bullet = this.bullets.getFirstExists(false);
			if(bullet)
			{
				bullet.reset(this.ship.x+this.ship.width,this.ship.y+this.ship.height/2);
				bullet.body.velocity.x = this.bulletSpeed;
			}
		},
		
		/*
		 * Step 9: uncomment line below by removing "//"
		 */
		//fireBombBullet : function(curTime) {
		//	var bullet = this.bbullets.getFirstExists(false);
		//	if (this.bombs > 0) {
		//		if (bullet) {
		//			bullet.reset(this.ship.x + this.ship.width, this.ship.y + this.ship.height - 100);
		//			bullet.body.velocity.x = this.bbulletSpeed;
		//			this.bombs -= 1;
		//			this.bombsText.setText("Bombs: " + this.bombs);
		//		}
		//	}
		//},
		
		

		generateEnemy : function(){
			var enemy = this.enemies.getFirstExists(false);
			if(enemy)
			{
				enemy.reset(WIDTH - 30,Math.floor(Math.random()*(HEIGHT-30)),'enemyship'+(1+Math.floor(Math.random()*5)));
			}
			else
			{
				enemy = this.enemies.create(WIDTH - 30,Math.floor(Math.random()*(HEIGHT-30)),'enemyship'+(1+Math.floor(Math.random()*5)));
			}
			enemy.body.velocity.x = -this.enemySpeed;
			enemy.outOfBoundsKill = true;
			enemy.checkWorldBounds = true;
			enemy.animations.add('move');
			enemy.animations.play('move',20,true);
		},

		enemyHitPlayer : function(player, enemy){
			if(this.enemies.getIndex(enemy) > -1)
				this.enemies.remove(enemy);
			enemy.kill();
			this.lives -= 1;
			this.livesText.setText("Lives : "+this.lives);
			if(this.lives < 0)
				this.game.state.start('menu');
		},

		enemyHitBullet : function(bullet, enemy){
			if(this.enemies.getIndex(enemy) > -1)
				this.enemies.remove(enemy);
			enemy.kill();
			bullet.kill();
			this.score += 10;
			this.scoreText.setText("Score : "+this.score);
			/*
			 * Step 12a: ADD A COMMA AFTER THE CLOSE BRACKET change from "}" to "},"
			 */
		}
		
		/*
		 * Step 12b: uncomment line below by removing "//" 
		 */
		//enemyHitBBullet : function(bullet, enemy) {
		//	var enemiesCount = 0;
		//	this.enemies.forEach(function (item) {
		//		item.kill();
		//		enemiesCount += 1;
		//	})
		//	bullet.kill();
		//	this.score += 10 * enemiesCount;
		//	this.scoreText.setText("Score: " + this.score);
		//}
		
		
			
		
	};

	var menuState = {
		preload : function(){
			this.game.load.image('bgSpace','img/farback.jpg');
		},

		create : function(){
			this.speed = 10;

			this.bg = this.game.add.tileSprite(0,0,1782,600,'bgSpace');
			this.bg.autoScroll(-this.speed,0);

			var style = { font: "48px Arial", fill: "#DE5F3D", align: "center" };
			this.title = this.game.add.text(250,170,"Space Shooter",style);

			var style2 = { font: "28px Arial", fill: "#DE5F3D", align: "center" };
			this.help = this.game.add.text(250,230,"Press `Enter` Key to start",style2);
		},

		update : function(){
			if(this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER))
				this.game.state.start('main');
		}
	};

	_game.state.add('main', mainState);
	_game.state.add('menu', menuState);
	_game.state.start('menu');
})();

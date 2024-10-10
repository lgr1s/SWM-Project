import Phaser from 'phaser';

// Настройки сцены
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Инициализация игры
const game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'src/assets/sky.png'); // Загрузим фон
    this.load.image('ground', 'src/assets/platform.png'); // Платформа
    this.load.image('star', 'src/assets/star.png'); // Пример объекта
    this.load.spritesheet('dude', 'src/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
    this.add.image(400, 300, 'sky'); // Добавляем фон

    // Пример платформ
    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    // Пример игрока
    const player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    
    // Анимация
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // Управление
    this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    // Пример управления
    if (this.cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (this.cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}

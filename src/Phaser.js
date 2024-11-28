import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        // Create a red ball with random starting position
        const randomX = Phaser.Math.Between(50, 350);
        const randomY = Phaser.Math.Between(50, 350);
        this.ball = this.add.circle(randomX, randomY, 15, 0xFF0000);
        
        // Enable physics on the ball
        this.physics.add.existing(this.ball);
        
        // Set ball properties
        this.ball.body.setCollideWorldBounds(true);
        this.ball.body.setBounce(1, 1);
        this.ball.body.setDamping(false);
        this.ball.body.setFriction(0);
        
        // Set initial velocity with consistent speed
        this.initialSpeed = 400;
        const randomAngle = Phaser.Math.FloatBetween(0, Math.PI * 2);
        const velocityX = Math.cos(randomAngle) * this.initialSpeed;
        const velocityY = Math.sin(randomAngle) * this.initialSpeed;
        this.ball.body.setVelocity(velocityX, velocityY);

        // Define button positions
        this.buttonPositions = {
            topLeft: { x: 100, y: 0 },
            topRight: { x: 300, y: 0 },
            leftTop: { x: 0, y: 100 },
            leftBottom: { x: 0, y: 300 },
            rightTop: { x: 400, y: 100 },
            rightBottom: { x: 400, y: 300 },
            bottomLeft: { x: 100, y: 400 },
            bottomRight: { x: 300, y: 400 }
        };
    }

    bounceTowards(direction) {
        // Get target button position
        const targetPos = this.buttonPositions[direction];
        if (!targetPos) return;

        // Get current ball position
        const currentX = this.ball.x;
        const currentY = this.ball.y;

        // Calculate direction vector
        const dx = targetPos.x - currentX;
        const dy = targetPos.y - currentY;

        // Normalize the vector and apply speed
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = this.initialSpeed;
        
        const velocityX = (dx / distance) * speed;
        const velocityY = (dy / distance) * speed;

        // Apply velocity to the ball
        this.ball.body.setVelocity(velocityX, velocityY);
    }
}


// Import necessary classes from PIXI
//import { Application } from 'pixi.js';

(async () => {
   // Create a new Pixi Application instance
   const app = new PIXI.Application();

   // Initialize the application asynchronously with the required options
   await app.init({
      // Application options for smaller windows on mobile
      width: window.innerWidth < 1600 ? 600 : 1600,
      height: window.innerHeight < 600 ? 640 : 1200,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1,
      view: document.createElement('canvas')
   });

   // Add the canvas that Pixi automatically created for you to the HTML document
   document.body.appendChild(app.canvas);

   /////////////////////////////////
   // Create background with a gradient
   //     const background = new PIXI.Graphics();
   const gradientTexture = createGradientTexture();
   const gradientSprite = new PIXI.Sprite(gradientTexture);
   app.stage.addChild(gradientSprite);

   // Function to create gradient texture
   function createGradientTexture() {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 640;
      canvas.height = 800;

      const gradient = ctx.createLinearGradient(0, 0, 640, 360);
      gradient.addColorStop(0, "#ff8c8c");
      gradient.addColorStop(1, "#fad0c4");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      return PIXI.Texture.from(canvas);
   }
   const rectangles = []; // Array to store all rectangles

   let x = 10; // Starting x-coordinate
   let y = 10; // Starting y-coordinate
   const size = 40; // Width and height of each rectangle
   const spacing = 50; // Spacing between rectangles

   // 1. First 11 rectangles: x stays the same, y increases
   for (let i = 0; i < 11; i++) {
      const rect = new PIXI.Graphics();
      rect.lineStyle(2, 0xffffff);
      rect.beginFill(0xff0000);
      rect.rect(0, 0, size, size); // x stays the same, y increases
      rect.endFill();
      rect.position.set(x, y + i * spacing)
      rectangles.push(rect);
      app.stage.addChild(rect);
   }

   // 2. Next 10 rectangles: y stays the same, x increases
   for (let i = 1; i <= 10; i++) {
      const rect = new PIXI.Graphics();
      rect.lineStyle(2, 0xffffff);
      rect.beginFill(0xff0000);
      rect.rect(0, 0, size, size); // y is fixed, x increases
      rect.endFill();
      rect.position.set(x + i * spacing, y + 10 * spacing)
      rectangles.push(rect);
      app.stage.addChild(rect);
   }

   // 3. Next 10 rectangles: x stays the same, y decreases
   for (let i = 1; i <= 10; i++) {
      const rect = new PIXI.Graphics();
      rect.lineStyle(2, 0xffffff);
      rect.beginFill(0xff0000);
      rect.rect(0, 0, size, size); // x is fixed, y decreases
      rect.endFill();
      rect.position.set(x + 10 * spacing, y + (10 - i) * spacing)
      rectangles.push(rect);
      app.stage.addChild(rect);
   }

   // 4. Last 9 rectangles: y stays the same, x decreases
   for (let i = 1; i <= 9; i++) {
      const rect = new PIXI.Graphics();
      rect.lineStyle(2, 0xffffff);
      rect.beginFill(0xff0000);
      rect.drawRect(0, 0, size, size); // y is fixed, x decreases
      rect.endFill();
      rect.position.set(x + (10 - i) * spacing, y)
      rectangles.push(rect);
      app.stage.addChild(rect);
   }

   let player1Position = 0; // Player 1 starts on the first rectangle
   let player2Position = 0; // Player 2 also starts on the first rectangle

   // Create player markers using PIXI.Text
   const player1 = new PIXI.Text('1', { fontSize: 24, fill: 0xffffff }); // Player 1 marker (Emoji)
   const player2 = new PIXI.Text('  2', { fontSize: 24, fill: 0xffffff }); // Player 2 marker (Letter)

   app.stage.addChild(player1);
   app.stage.addChild(player2);

   // Function to update player marker positions based on rectangle coordinates
   function updatePlayerPositions() {
      // Update Player 1's position
      player1.x = rectangles[player1Position].x + 10; // Adjust for centering
      player1.y = rectangles[player1Position].y + 10;
     
      // Update Player 2's position
      player2.x = rectangles[player2Position].x + 10;
      player2.y = rectangles[player2Position].y + 10;
   }

   // Initialize player positions
   updatePlayerPositions();

   // Create a button rectangle for moving Player 1
   const button = new PIXI.Graphics();
   button.lineStyle(2, 0xffffff); // White border
   button.beginFill(0x0000ff); // Blue fill to distinguish it as a button
   button.drawRect(200, 600, 100, 50); // x, y, width, height of the button
   button.endFill();

   // Add text label to the button
   const buttonText = new PIXI.Text('Move Player 1', { fontSize: 16, fill: 0xffffff });
   buttonText.x = 210; // Center the text in the button
   buttonText.y = 620; // Adjust to place it inside the button

   // Make the button interactive and clickable
   button.interactive = true;
   button.buttonMode = true;

   // Add the button and text to the stage
   app.stage.addChild(button);
   app.stage.addChild(buttonText);

   // Event listener to move Player 1 when the button is clicked
   button.on('pointerdown', (event) => {
      player1Position = (player1Position + 1) % rectangles.length; // Move Player 1 to the next rectangle
      updatePlayerPositions(); // Update the player positions after moving
   });
})();

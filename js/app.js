
// Import necessary classes from PIXI
//import { Application } from 'pixi.js';

(async () => {
    // Create a new Pixi Application instance
    const app = new PIXI.Application();

    // Initialize the application asynchronously with the required options
    await app.init({
      // Application options for smaller windows on mobile
      width: window.innerWidth < 800 ? 360 : 800,
      height: window.innerHeight < 600 ? 640 : 600,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1,
      view: document.createElement('canvas')
  });

// Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.canvas);
  // load the PNG asynchronously
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
  canvas.height = 360;

  const gradient = ctx.createLinearGradient(0, 0, 640, 360);
  gradient.addColorStop(0, "#ff9a9e");
  gradient.addColorStop(1, "#fad0c4");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  return PIXI.Texture.from(canvas);
}

 // Create first rectangle with border and text
const rect1 = new PIXI.Graphics();
const text1 = new PIXI.Text("text1", { fill: 0xffffff, fontSize: 24 });
rect1.lineStyle(2, 0xffffff); // White border
rect1.beginFill(0xff0000); // Red fill
rect1.drawRect(0, 0, 200, 100); // x, y, width, height
rect1.endFill();
rect1.x = 20;
rect1.y = 20;
text1.x = 50;
text1.y = 80;


// Create second rectangle below the first one
const rect2 = new PIXI.Graphics();
rect2.beginFill(0x0000ff); // Blue color
rect2.drawRect(0, 0, 200, 100); // x, y, width, height
rect2.endFill();
rect2.x = 200;
rect2.y = 200;


// Create a third rectangle acting as a button
const button = new PIXI.Graphics();
button.lineStyle(2, 0xffffff); // White border
button.beginFill(0x00ff00); // Green fill
button.drawRect(0, 0, 200, 50); // x, y, width, height
button.endFill();
button.x = 20;
button.y = 320;
button.interactive = true;
button.buttonMode = true; // Makes it look like a clickable button

const buttonText = new PIXI.Text("Toggle Text", { fill: 0xffffff, fontSize: 18 });
buttonText.x = 60;
buttonText.y = 335;

// Toggle text on rect1 when the button is clicked
let isText1 = true;
button.on("pointerdown", () => {
  text1.text = isText1 ? "text3" : "text1";
  isText1 = !isText1;
});

// Add everything to the stage
app.stage.addChild(rect1);
app.stage.addChild(text1);
app.stage.addChild(rect2);
app.stage.addChild(button);
app.stage.addChild(buttonText);
})();
const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const Composite = Matter.Composite;
const Body = Matter.Body;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

let engine, canvas, mouse, mouseConstraint;
let bubble;
let bubbles = [];
let wind = 0;
let t = 0;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  engine = Engine.create();
  engine.gravity.y = -1;
  // engine.gravity.x = -1;
  engine.gravity.scale = 0.0002;
  // 마우스 생성
  mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity();
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      angularStiffness: 0.1,
    },
  });
  // 벽
  let margin = 40;
  Composite.add(engine.world, [
    Bodies.rectangle(margin, height / 2, margin, height, { isStatic: true }),
    Bodies.rectangle(width - margin, height / 2, margin, height, {
      isStatic: true,
    }),
    Bodies.rectangle(width / 2, margin, width, margin, { isStatic: true }),
    Bodies.rectangle(width / 2, height - margin, width, margin, {
      isStatic: true,
    }),
  ]);

  Composite.add(engine.world, mouseConstraint);
  bubbles.push(new Bubble(random(width), random(height), 12));
  // bubble = new Bubble(200, 200, 50);
}

function draw() {
  Engine.update(engine);
  background(0);
  // bubble.display();
  for (let b of bubbles) {
    b.display();
  }

  wind = sin(t) * 0.001;
  t += 0.01;
  for(let b of bubbles){
    let bd = b.body;
    Body.applyForce(bd, bd.position, {x: wind, y: 0});
  }  

  if(mouseIsPressed) {
    bubbles.push(new Bubble(mouseX, mouseY, random(5, 20)));
  }
}

function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY, random(5, 20)));
}

function mouseRelased() {}

function mouseDragged() {}
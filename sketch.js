// Constantes para identificar los tipos de formas
const CRUZ = 0;
const TRIANGULO = 1;
const CIRCULO = 2;
const CUADRADO = 3;
const MOUSE_CIRCLE = 4; // Nuevo tipo: Sigue al ratón

let shapes = []; //Almacenar las formas

function setup() {
  createCanvas(windowWidth, windowHeight); // Llienzo tamaño de la ventana
  noStroke(); // Sin contornos en las formas
  generateShapes(); // Genera las formas iniciales
}

function draw() {
  background(255); // Fondo blanco
  updateShapes(); // Actualiza las formas (cambio de tamaño, movimiento, etc.)
  displayShapes(); // Muestra las formas en el lienzo
}

function generateShapes() {
  shapes = []; // Reinicia las formas
  for (let x = 50; x < width; x += 50) {
    for (let y = 50; y < height; y += 50) {
      let shapeType = floor(random(4)); //  Tipo de forma aleatorio
      let shapeSize = random(10, 40); // Tamaño inicial aleatorio
      let growthRate = random(1, 5); // Crecimiento aleatoria

      shapes.push({
        type: shapeType,
        x: x,
        y: y,
        size: shapeSize,
        maxSize: shapeSize + random(20, 50),
        growthRate: growthRate,
      });
    }
  }

  // Círculo que sigue el ratón
  shapes.push({
    type: MOUSE_CIRCLE,
    x: mouseX,
    y: mouseY,
    size: 20,
  });
}

function updateShapes() {
  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];

    if (shape.type !== MOUSE_CIRCLE) {
      shape.size += shape.growthRate;

      if (shape.size > shape.maxSize || shape.size < 0) {
        shape.growthRate *= -1; // Invierte la dirección de crecimiento al alcanzar
      }
    } else {
      // Actualiza la posición del círculo que sigue el ratón
      shape.x = mouseX;
      shape.y = mouseY;
    }
  }
}

function displayShapes() {
  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];

    if (shape.type === MOUSE_CIRCLE) {
      fill(169); // Color gris para el círculo que sigue el ratón
    } else {
      let interColor = lerpColor(
        color("blue"),
        color("orange"),
        map(mouseX, 0, width, 0, 1)
      );
      fill(interColor); // Color para otras formas basado en la posición del ratón
    }

    noStroke(); // Sin contorno en las formas

    push();
    translate(shape.x, shape.y);

    if (shape.type === CRUZ) {
      drawCross(shape.size);
    } else if (shape.type === TRIANGULO) {
      drawTriangle(shape.size);
    } else if (shape.type === CIRCULO || shape.type === MOUSE_CIRCLE) {
      drawCircle(shape.size);
    } else if (shape.type === CUADRADO) {
      drawSquare(shape.size);
    }

    pop();
  }
}

// Funciones para dibujar diferentes formas
function drawCross(size) {
  rectMode(CENTER);
  rect(0, 0, 2, size);
  rect(0, 0, size, 2);
}

function drawTriangle(size) {
  let h = (size * sqrt(3)) / 2;
  beginShape();
  vertex(0, -h / 2);
  vertex(-size / 2, h / 2);
  vertex(size / 2, h / 2);
  endShape(CLOSE);
}

function drawCircle(size) {
  ellipse(0, 0, size, size);
}

function drawSquare(size) {
  rectMode(CENTER);
  rect(0, 0, size, size);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  generateShapes(); // Reinicia las formas al cambiar el tamaño de la ventana
}

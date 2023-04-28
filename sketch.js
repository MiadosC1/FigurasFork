let tcanvas = 400; // tamaño del canvas
let t = 20; //t=tamaño de celdas
let ncel = tcanvas/t; //numcel = numero de celdas
let laberinto = []; //array laberinto

//Posiciones

//Jugador
let posx = 0;
let posy = 0;

//Meta
let metax;
let metay;

function setup() {
  createCanvas(tcanvas, tcanvas);
  noStroke(); //No bordes dibujados
  
  //pared
  laberinto = [];
  for (let x = 0;x<ncel;x+=1)
    {
      laberinto[x] = [];
      for (let y=0;y<ncel;y+=1)
        {
          laberinto[x][y] = 0; //generacion de laberinto
        }
    }
  console.table(laberinto);
  //Definir laberinto
    for (let x = 0;x<ncel;x+=2)
    {
      for (let y=0;y<ncel;y+=2)
        {
          laberinto[x][y] = 1;
          let vecinos = [];
          if (x<ncel) {vecinos.push({x: x+1,y:y})}
          if (y<ncel) {vecinos.push({x: x,y:y+1})}
          if (vecinos.length>0) 
            {
              let ve = vecinos[int(random(2))]; //vecino escogido
              laberinto[ve.x][ve.y] = 1;
            }
        }
    }
  
  metax = int(random(ncel/2))*2; //asegurar que la meta sea en piso y no en pared
  metay = int(random(ncel/2))*2;
}
//dibujar
function draw() {
  background(220);
  
  
  //laberinto relleno piso
 for (let x = 0;x<ncel;x+=1)
    {
      for (let y=0;y<ncel;y+=1)
        {
          if (laberinto[x][y]==0)
            {
              fill(0);
            } else if (laberinto[x][y] == 1)
              {
                fill(255);
              }
          rect(x*t,y*t,t,t);
        }
    }
  //dibujar

  //Jugador
  fill(0, 255, 0);
  rect(posx*t, posy*t, t, t);
  //meta
  fill (255, 0, 0);
  rect(metax*t,metay*t, t, t);
  
  //mensaje
  if (posx==metax && posy==metay)
    {
      textSize(50);
      text("Haz ganado", 50, tcanvas/2);
    }
}

function keyPressed()
{
  if (keyCode == LEFT_ARROW && posx>0)
  {
    if (laberinto[posx-1][posy]!=0)
      {
        posx -= 1; 
      }

  }
  else if (keyCode == RIGHT_ARROW && posx<ncel-1)
  {
    if (laberinto[posx+1][posy]!=0)
      {
        posx += 1;
      }
  }
  else if(keyCode == UP_ARROW && posy>0)
  {
    if (laberinto[posx][posy-1]!=0)
      {
        posy -= 1;
      }
  }
  else if(keyCode == DOWN_ARROW && posy<ncel-1)
  {
    if (laberinto[posx][posy+1]!=0)
    {
      posy += 1;
    }
  }
}

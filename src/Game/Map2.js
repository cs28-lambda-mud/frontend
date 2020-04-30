import React from "react";
import withHooks, { useRef, useLayoutEffect } from "react-with-hooks";



///////////////////////////////////////////////////////
////////// Dummy Data
//////////////////////////////////////////////////////
let locations = [
  { x: 1, y: 1, north: false, east: true, south: true, west: false, player: false },
  { x: 1, y: 2, north: true, east: true, south: true, west: true, player: false },
  { x: 1, y: 3, north: false, east: true, south: true, west: true, player: false },
  { x: 1, y: 4, north: false, east: true, south: true, west: true, player: false },
  { x: 1, y: 5, north: false, east: false, south: true, west: true, player: false },
  { x: 2, y: 1, north: false, east: true, south: true, west: false, player: false },
  // { x: 2, y: 2, north: false, east: true, south: true, west: true, player: false },
  { x: 2, y: 3, north: true, east: true, south: false, west: true, player: false },
  { x: 2, y: 4, north: true, east: false, south: true, west: true, player: false },
  { x: 2, y: 5, north: true, east: false, south: true, west: true, player: false },
  { x: 3, y: 1, north: false, east: true, south: true, west: true, player: false },
  { x: 3, y: 2, north: true, east: true, south: true, west: true, player: false },
  { x: 3, y: 3, north: false, east: true, south: true, west: true, player: false },
  // { x: 3, y: 4, north: false, east: true, south: true, west: true, player: false },
  { x: 3, y: 5, north: false, east: false, south: true, west: true, player: false },
  { x: 4, y: 1, north: false, east: true, south: true, west: false, player: false },
  // { x: 4, y: 2, north: false, east: true, south: true, west: true, player: false },
  { x: 4, y: 3, north: true, east: true, south: true, west: true, player: true},
  { x: 4, y: 4, north: true, east: false, south: true, west: true, player: false },
  { x: 4, y: 5, north: true, east: false, south: true, west: true, player: false },
  { x: 5, y: 1, north: true, east: true, south: true, west: false, player: false },
  { x: 5, y: 2, north: false, east: true, south: true, west: true, player: false },
  // { x: 5, y: 3, north: true, east: true, south: false, west: true, player: false },
  { x: 5, y: 4, north: true, east: true, south: true, west: true, player: false },
  { x: 5, y: 5, north: true, east: true, south: true, west: true, player: false }
];

let size = 50;
let start = [size, size];
let newLocations = [];
let rangeLocations = [];
let rowCount = 1;
let rowTracker = 1;
let lowest = 0;
let highest = 0;

export const Map2 = withHooks((props = {}) => {
  const {
    width = window.innerWidth,
    height = window.innerHeight,
    pixelRatio = window.devicePixelRatio
  } = props;

  const canvas = useRef(null);
  useLayoutEffect(() => {
    const ctx = canvas.current.getContext("2d");
    ///////////////////////////////////////////////////////
    //////////////////// Getting data ready
    /////////////////////////////////////////////////////
    // find number of rows
    // find min y and max y for each row
    locations.forEach((e, i) => {
      if (e.x > rowCount) {
        rowCount = e.x;
        rangeLocations.push({ min: lowest, max: highest });
        lowest = 0;
        highest = 0;
      }
      if (e.y > highest) {
        highest = e.y;
      }
      if (e.y < lowest) {
        lowest = e.y;
      }
      if (i === locations.length - 1) {
        rangeLocations.push({ min: lowest, max: highest });
      }
      console.log(rowCount, "Number of rows");
    });
    //////////////////////////////////////
    // Create array with n empty sub arrays based on total rows (highest x)
    /////////////////////////////////////////
    for (let index = 0; index < rowCount; index++) {
      newLocations.push([]);
    }
    newLocations.forEach((e, i) => {
      let index2;
      for (index2 = 0; index2 < rangeLocations[i].max; index2++) {
        newLocations[i].push({});
      }
    });
    console.log(newLocations, "Number of empty rows in array");
    console.log(rangeLocations, "min and max of each row");
    /////////////////////////////////////////////////
    // Start plugging locations into empty arrays in newLocations
    ////////////////////////////////////////////////
    locations.forEach(e => {
      newLocations[e.x - 1][e.y - 1] = e;
    });
    // Find gaps in y values and input object /w proper x/y (false directions)
    newLocations.forEach((e, i) => {
      e.forEach((ee, ii) => {
        if (!ee.y) {
          newLocations[i][ii] = {
            x: i + 1,
            y: ii + 1,
            north: false,
            east: false,
            south: false,
            west: false
          };
        }
      });
    });
    console.log(newLocations, "Ready!");
    /////////////////////////////////////////////////////////
    //////////////////////////////// Data is ready to ref and draw
    /////////////////////////////////////////////////////////
    newLocations.forEach(e => {
      ctx.beginPath();
      e.forEach(ee => {
        // First row needs this for some reason...
        /// ... if not it will be not aligned
        if (ee.x === 1 && ee.y === 1) {
          start[1] = 100;
        }
        // current x is bigger than the last x....
        // ....We're on a new row so change starting position...
        if (ee.x > rowTracker) {
          rowTracker = rowTracker + 1;
          start[0] = 50;
          start[1] = 100 * rowTracker;
        }
        if (ee.north === true) {
          ctx.moveTo(start[0], start[1]);
          ctx.lineTo(start[0], start[1] - size); // North
        }
        if (ee.east === true) {
          ctx.moveTo(start[0], start[1]);
          ctx.lineTo(start[0] + size, start[1]); // East
        }
        if (ee.south === true) {
          ctx.moveTo(start[0], start[1]);
          ctx.lineTo(start[0], start[1] + size); // South
        }
        if (ee.west === true) {
          ctx.moveTo(start[0], start[1]);
          ctx.lineTo(start[0] - size, start[1]); // West
        }
        if (ee.player){
          ctx.moveTo(start[0], start[1])
          ctx.arc(start[0],start[1],20,0*Math.PI,1.5*Math.PI, false)
          ctx.moveTo(start[0], start[1])
          ctx.arc(start[0],start[1],20,0*Math.PI,1.5*Math.PI, true)
          ctx.fill()
        }
        ctx.stroke();
        // We've finished drawing directions for this y position
        // Change the starting position to draw for next y position
        start[0] = start[0] + size * 2;
      });
    });
  });

  const dw = Math.floor(pixelRatio * width);
  const dh = Math.floor(pixelRatio * height);
  const style = { width, height };
  return( 
    <div>
      <canvas ref={canvas} width={dw} height={dh} style={style} />
    </div>
  )
});

export default Map2

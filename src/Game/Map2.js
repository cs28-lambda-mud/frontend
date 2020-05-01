import React, { useEffect, useState } from "react";
import withHooks, { useRef, useLayoutEffect } from "react-with-hooks";
import {locations} from './dummyData'


///////////////////////////////////////////////////////
////////// Dummy Data
//////////////////////////////////////////////////////

  
function swap(sourceObj, sourceKey, targetObj, targetKey) {
    var temp = sourceObj[sourceKey];
    sourceObj[sourceKey] = targetObj[targetKey];
    targetObj[targetKey] = temp;
}

locations.map(e => {
    swap(e, "x", e, "y")
})
locations.sort(function(a, b){return a.y - b.y})
console.log(locations)



let size = 8;
let start = [size, size];
let newLocations = [];
let rangeLocations = [];
let rowCount = 1;
let rowTracker = 0;
let lowest = 0;
let highest = 0;

export const Map2 = withHooks((props = {}) => {

const [position, setPosition] = useState({
    x: 2,
    y: 2
})
let trackPosition = [[],[]]
let currentRoom = {}
const {
    width = window.innerWidth,
    height = window.innerHeight,
    pixelRatio = window.devicePixelRatio
} = props;
  
  const useWindowEvent = (event, callback) => {
    useEffect(() => {
      window.addEventListener(event, callback);
      return () => window.removeEventListener(event, callback);
    }, [event, callback]);
  };

  const useGlobalKeyDown = (callback) => {
    return useWindowEvent("keydown", callback);
  };
  

  const canvas = useRef(null);
  let ctx;
  useLayoutEffect(() => {
    ctx = canvas.current.getContext("2d");
    ///////////////////////////////////////////////////////
    //////////////////// Getting data ready
    /////////////////////////////////////////////////////
    // find number of rows
    // find min y and max y for each row
    locations.forEach((e, i) => {
      if (e.y+1 > rowCount) {
        rowCount = e.y+1;
        rangeLocations.push({ min: lowest, max: highest });
        lowest = 0;
        highest = 0;
      }
      if (e.x > highest) {
        highest = e.x;
      }
      if (e.x < lowest) {
        lowest = e.x;
      }
      if (i === locations.length - 1) {
        rangeLocations.push({ min: lowest, max: highest });
      }
    //   console.log(rowCount, "Number of rows");
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
      newLocations[e.y][e.x] = e;
    });
    // Find gaps in y values and input object /w proper x/y (false directions)
    newLocations.map((e, i) => {
      e.map((ee, ii) => {
        if (JSON.stringify(ee) === JSON.stringify({})) {
          return newLocations[i][ii] = {
            x: ii,
            y: i,
            north: 0,
            east: 0,
            south: 0,
            west: 0
          };
        }
      });
    });


    ///////////////////////////////////////////////////////////
    ///////////////////////// Insert Player
    ///////////////////////////////////////////////////////////




    console.log(newLocations, "Ready!");
    /////////////////////////////////////////////////////////
    //////////////////////////////// Data is ready to ref and draw
    /////////////////////////////////////////////////////////
    newLocations.forEach((e, i) => {
      ctx.beginPath();
      ctx.fillStyle = "black"
      ctx.strokeStyle = "black"
      e.forEach((ee, ii) => {
        // First row needs this for some reason...
        /// ... if not it will be not aligned
        // if (i === 0) {
        //   start[1] = 100;
        // }
        // current x is bigger than the last x....
        // ....We're on a new row so change starting position...
        if (ee.y === rowTracker) {
          rowTracker = rowTracker + 1;
          start[1] = size;
          start[0] = (size*2) * rowTracker;
        }
        if (ee.n_to) {
          ctx.moveTo(start[0], start[1]);
          ctx.lineTo(start[0], start[1] - size); // North
        }
        if (ee.e_to) {
          ctx.moveTo(start[0], start[1]);
          ctx.lineTo(start[0] + size, start[1]); // East
        }
        if (ee.s_to) {
          ctx.moveTo(start[0], start[1]);
          ctx.lineTo(start[0], start[1] + size); // South
        }
        if (ee.w_to) {
          ctx.moveTo(start[0], start[1]);
          ctx.lineTo(start[0] - size, start[1]); // West
        }
        if (ee.x === position.x && ee.y === position.y){
          trackPosition[0] = start[0]
          trackPosition[1] = start[1]
          currentRoom = ee
          ctx.moveTo(start[0], start[1])
          ctx.arc(start[0],start[1],size*.8,0*Math.PI,1.5*Math.PI, false)
          ctx.moveTo(start[0], start[1])
          ctx.arc(start[0],start[1],size*.8,0*Math.PI,1.5*Math.PI, true)
          ctx.fill()
          console.log(currentRoom)
        }
        ctx.stroke();
        // We've finished drawing directions for this x position
        // Change the starting position to draw for next x position
        start[1] = start[1] + size * 2;
      });
    });

    
  });

  const dw = Math.floor(pixelRatio * width);
  const dh = Math.floor(pixelRatio * height);
  const style = { width, height, paddingTop: '15vh', paddingLeft: '15vw' };


////////////////////////////////////////////////////////////////
/////////////////////////////Player Input
///////////////////////////////////////////////////////////////
useGlobalKeyDown(e => {
    if (e.key === "ArrowDown"){

        if(currentRoom.s_to > 0){
            ctx.fillStyle = '#000';
            ctx.strokeStyle= '#000'
            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(trackPosition[0],trackPosition[1],25,0*Math.PI,1.5*Math.PI, false)
            ctx.arc(trackPosition[0],trackPosition[1],25,0*Math.PI,1.5*Math.PI, true)
            ctx.fill();
            ctx.stroke()
            ctx.restore()
    
            newLocations = [];
            rangeLocations = [];
            rowCount = 1;
            rowTracker = 0;
            lowest = 0;
            highest = 0;
            console.log("down!")
            setPosition({
                y: position.y,
                x: position.x+1
            })
            console.log(position)
        }

    }
    if (e.key === "ArrowUp"){

        if(currentRoom.n_to > 0){
            ctx.fillStyle = '#000';
            ctx.strokeStyle= '#000'
            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(trackPosition[0],trackPosition[1],25,0*Math.PI,1.5*Math.PI, false)
            ctx.arc(trackPosition[0],trackPosition[1],25,0*Math.PI,1.5*Math.PI, true)
            ctx.fill();
            ctx.stroke()
            ctx.restore()
    
            newLocations = [];
            rangeLocations = [];
            rowCount = 1;
            rowTracker = 0;
            lowest = 0;
            highest = 0;
            setPosition({
                y: position.y,
                x: position.x-1
            })
            console.log(position)
            console.log("up!")
        }

    }
    if (e.key === "ArrowLeft"){

        if(currentRoom.w_to > 0){
            ctx.fillStyle = '#000';
            ctx.strokeStyle= '#000'
            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(trackPosition[0],trackPosition[1],25,0*Math.PI,1.5*Math.PI, false)
            ctx.arc(trackPosition[0],trackPosition[1],25,0*Math.PI,1.5*Math.PI, true)
            ctx.fill();
            ctx.stroke()
            ctx.restore()
    
            newLocations = [];
            rangeLocations = [];
            rowCount = 1;
            rowTracker = 0;
            lowest = 0;
            highest = 0;
            setPosition({
                y: position.y-1,
                x: position.x
            })
            console.log(position)
            console.log("left!")
        }

    }
    if (e.key === "ArrowRight"){

        if(currentRoom.e_to > 0) {
            ctx.fillStyle = '#000';
            ctx.strokeStyle= '#000'
            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(trackPosition[0],trackPosition[1],25,0*Math.PI,1.5*Math.PI, false)
            ctx.arc(trackPosition[0],trackPosition[1],25,0*Math.PI,1.5*Math.PI, true)
            ctx.fill();
            ctx.stroke()
            ctx.restore()
    
            newLocations = [];
            rangeLocations = [];
            rowCount = 1;
            rowTracker = 0;
            lowest = 0;
            highest = 0;
            setPosition({
                y: position.y+1,
                x: position.x
            })
            console.log(position)
            console.log("right!")
        }

    }
});


  return( 
    <div>
        <div style={{ position: 'fixed', top: 0, width: '100%', backgroundColor: 'black', height: '10vh', color: 'white'}}>
            <h3>{currentRoom.title}</h3>
        </div>
        <canvas ref={canvas} width={dw} height={dh} style={style} />
    </div>
  )
});

export default Map2
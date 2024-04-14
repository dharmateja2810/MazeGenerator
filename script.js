const grid = document.getElementById("grid");
const MAX  = 20;
let visited = create_matrix();
const directions = [[-1, 0], [0, -1], [0, 1],[1, 0]];

// Create grid cells
for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
        let box = document.createElement("div");
        box.id = create_id(i, j);
        box.walls = [true, true, true, true]; //top right bottom left
        box.classList.add("box");
        grid.append(box);
    }
}

// Create ID for grid cells
function create_id(i, j) {
    let id = ""
    if (i <= 9) {
        id = '0'
    }
    id += String(i);
    if (j <= 9) {
        id += '0';
    }
    id += String(j);
    return id;
}

// Initialize visited matrix
function create_matrix() {
    let visited = []
    for (let i = 0; i < MAX; i++) {
        let t = [];
        for (let j = 0; j < MAX; j++) {
            t.push(0);
        }
        visited.push(t);
    }
    return visited;
}

// Shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// Traverse function to create maze
async function traverse(cur) {
    shuffleArray(directions);
    visited[cur[0]][cur[1]] = 1;
    let t = create_id(cur[0], cur[1]);
    let box = document.getElementById(t);
    box.style.backgroundColor = "cyan";
    for (const dir of directions) {
        let dx = dir[0] + cur[0];
        let dy = dir[1] + cur[1];
        if (dx >= 0 && dy >= 0 && dx < MAX && dy < MAX && !visited[dx][dy]) {
            let ne = [dx, dy];
            let boxNext = document.getElementById(create_id(ne[0], ne[1]));
            if (cur[0] - ne[0] == -1) {
                box.walls[2] = false;
                boxNext.walls[0] = false;
            }
            if (cur[0] - ne[0] == 1) {
                box.walls[0] = false;
                boxNext.walls[2] = false;
            }
            if (cur[1] - ne[1] == -1) {
                box.walls[1] = false;
                boxNext.walls[3] = false;
            }
            if (cur[1] - ne[1] == 1) {
                box.walls[3] = false;
                boxNext.walls[1] = false;
            }
            boxNext.style.backgroundColor = "red";
            await new Promise(r=>setTimeout(r,50));
            draw();
            await traverse(ne);
            

        }
    }
}

// Draw the maze
function draw() {
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            let box = document.getElementById(create_id(i, j));
            if (visited[i][j]) {
                if (!box.walls[0]) {
                    box.style.borderTop = "1px solid cyan";
                }
                if (!box.walls[1]) {
                    box.style.borderRight = "1px solid cyan";
                }
                if (!box.walls[2]) {
                    box.style.borderBottom = "1px solid cyan";
                }
                if (!box.walls[3]) {
                    box.style.borderLeft = "1px solid cyan";
                }
            }

        }
    }
}

async function start(){
    await traverse([0, 0]);
    draw();
    let s = document.getElementById(create_id(0,0));
    let e = document.getElementById(create_id(19,19));
    s.style.backgroundColor = "red";
    e.style.backgroundColor = "green";

}
start();

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let endlessCanvas = false;
let callupdates = 10;
let mouseX = mouseY = 0;
let isKeyPressed = [];
for (let i = 0; i < 256; i++) {
    isKeyPressed.push(0)
}
function isKeyDown(key) {
    for (let i = 0; i < 256; i++) {
        if (String.fromCharCode(i).toLowerCase() == key && isKeyPressed[i] == 1) {
            return 1;
        }
    }
    return 0;
}
// Events
function _keydown(event) {
    if (typeof keydown === "function") {
        isKeyPressed[event.keyCode] = 1;
        keydown(event.key);
    } else {
        isKeyPressed[event.keyCode] = 1;
    }
}
function _keyup(event) {
    if (typeof keyup === "function") {
        isKeyPressed[event.keyCode] = 0;
        keyup(event.key);
    } else {
        isKeyPressed[event.keyCode] = 0;
    }
}
window.addEventListener('keydown', _keydown);
window.addEventListener('keyup', _keyup);
function _mousedown(event) {
    if (typeof mousedown === "function") {
        mouseX = event.x;
        mouseY = event.y;
        mousedown();
    }
}
function _mouseup(event) {
    if (typeof mouseup === "function") {
        mouseX = event.x;
        mouseY = event.y;
        mouseup();
    }
}
addEventListener('mousemove', (e) => {
    mouseX = e.x;
    mouseY = e.y;
    if (typeof mousemove === 'function') mousemove();
});
function _mousemove(event) {
    if (typeof mousemove === "function") {
        mouseX = event.x;
        mouseY = event.y;
        mousemove();
    }
}
window.addEventListener('mousedown', _mousedown);
window.addEventListener('mouseup', _mouseup);
window.addEventListener('mousemove', _mousemove);

function _update() {
    if (typeof update === "function") {
        update();
    }
}

function _draw() {
    if (typeof draw === "function") {
        context.clearRect(0, 0, canvas.width, canvas.height);
        draw();
    }
    requestAnimationFrame(_draw)
}

function _setup() {
    if (endlessCanvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        window.onresize = function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
    } else {
        canvas.width = 800;
        canvas.height = 600;
    }
    setTimeout(() => {
        requestAnimationFrame(_draw);
        setInterval(_update, callupdates);
    }, 100);
}

// sprite sheet cutter
function loadSpriteSheet(src, imgsW, imgsH) {
    let img = new Image();
    img.src = src;
    let ret = [];

    img.onload = () => {
        const spriteWidth = img.width / imgsW;
        const spriteHeight = img.height / imgsH;

        for (let i = 0; i < imgsW; i++) {
            for (let j = 0; j < imgsH; j++) {
                context.drawImage(img, 0, 0);
                const pix = context.getImageData(i * spriteWidth, j * spriteHeight, spriteWidth, spriteHeight);
                const secondcanvas = document.createElement('canvas');
                const ctx = secondcanvas.getContext('2d');
                secondcanvas.width = spriteWidth;
                secondcanvas.height = spriteHeight;
                ctx.putImageData(pix, 0, 0);
                const sprite = new Image();
                sprite.src = secondcanvas.toDataURL('image/png');
                ret.push(sprite);
            }
        }
    };

    return ret;
}

// Collision functions
function areColliding(x1, y1, w1, h1, x2, y2, w2, h2) {
    if (x1 + w1 >= x2 && x2 + w2 >= x1 && y1 + h1 >= y2 && y2 + h2 >= y1) {
        return 1;
    }
    return 0;
}
function areCircleColliding(x1, y1, r1, x2, y2, r2) {
    if (Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) < r1 + r2) {
        return 1;
    }
    return 0;
}
// draw functions
function drawCircle(x, y, r, type) {
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI);
    if (type == 'stroke') context.stroke(); else if (type == 'fill') context.fill();
}
function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}
function drawPolygon(x, y, length, sides, type) {
    context.beginPath();
    context.moveTo(x + length, y);
    for (let i = 0; i < sides; i++) {
        let angle = ((Math.PI * 2) / sides) * i;
        context.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
    }
    context.closePath();
    if (type == 'stroke') context.stroke(); else if (type == 'fill') context.fill();
}
function drawImage(src, x, y, w, h) {
    let image = new Image();
    image.src = src;
    if (w == undefined || h == undefined) {
        context.drawImage(image, x, y);
    } else {
        context.drawImage(image, x, y, w, h);
    }
}
function dist(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}
function randomNum(value) { Math.floor(Math.random() * value); }
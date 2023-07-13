const sharp = require("sharp");

async function getMetadata() {
    try {
        const metadata = await sharp("./src/duck.jpg").metadata();
        console.log(metadata);
    } catch (error) {
        console.log(`An error occurred during processing: ${error}`);
    }
}

async function resizeImage() {
    try {
        await sharp("./src/duck.jpg")
            .resize({
                width: 320,
                height: 320
            })
            .toFormat("jpeg", { mozjpeg: true })
            .toFile("./src/duck-resized.jpeg");
    } catch (error) {
        console.log(error);
    }
}

async function cropImage() {
    try {
        await sharp("./src/duck.jpg")
            .extract({ width: 100, height: 100, left: 30, top: 30 })
            .toFile("./src/duck-cropped.jpg");
    } catch (error) {
        console.log(error);
    }
}

async function grayImage() {
    try {
        await sharp("./src/duck.jpg")
            .grayscale()
            .toFile("./src/duck-grayscale.jpg");
    } catch (error) {
        console.log(error);
    }
}

async function rotateImage() {
    try {
        await sharp("./src/duck.jpg")
            .rotate(33, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .toFile("./src/duck-rotated.jpg");
    } catch (error) {
        console.log(error);
    }
}

async function compositeImages() {
    try {
        await sharp("./src/background.jpg")
            .composite([
                {
                    input: "./src/duck.jpg",
                    top: 50,
                    left: 50,
                },
            ])
            .toFile("./src/duck-backgrounded.jpg");
    } catch (error) {
        console.log(error);
    }
}

async function addTextOnImage() {
    try {
        const width = 220;
        const height = 150;
        const text = "Donald";

        const svgImage = `
      <svg width="${width}" height="${height}">
        <style>
        .title { fill: #ff1; font-size: 70px; font-weight: bold;}
        </style>
        <text x="50%" y="50%" text-anchor="middle" class="title">${text}</text>
      </svg>
      `;
        const svgBuffer = Buffer.from(svgImage);
        const image = await sharp("./src/background.jpg")
            .composite([
                {
                    input: svgBuffer,
                    top: 0,
                    left: 0,
                },
            ])
            .toFile("./src/duck-overlay.jpg");
    } catch (error) {
        console.log(error);
    }
}

const tintImage = () => {
    sharp("./src/robo.png")
        .tint({ r: 255, g: 0, b: 0 })
        .toFile("./src/tint_robo.png")
}


const blurImage = () => {
    sharp("./src/robo.png")
        .blur(9)
        .toFile('./src/blur_robo.png')
}

const sharpenImage = () => {
    sharp('./src/blur_robo.png')
        .sharpen(15)
        .toFile('./src/sharpen_robo.png')
}

const flipImage = async () => {
    await sharp('./src/robo.png')
        .flip()
        .toFile('./src/flip_robo.png');
}

const flopImage = async () => {
    await sharp('./src/robo.png')
        .flop()
        .toFile('./src/flop_robo.png');
}

/* getMetadata();
resizeImage();
cropImage();
grayImage();
rotateImage();
compositeImages();
addTextOnImage();
*/


/* flipImage()
flopImage()
tintImage()
blurImage()
sharpenImage() */
const n0 = 255;
const n1 = 200;
const n2 = 160;
const n3 = 120;
const n4 = 80;
const n5 = 40;
const n6 = 0;


const leerBuffer = async () => {
    try {
        const { data, info } = await sharp("./src/mia2.jpg")
            .raw()
            .resize(90, 90)
            /*    .sharpen({
                   sigma: 1,
                   m1: 0,
                   m2: 0,
                   x1: 300,
                   y2: 15000,
                   y3: 150000,
                 }) */
            .toBuffer({ resolveWithObject: true });

        const pixelArray = new Uint8ClampedArray(data.buffer);

        /* operaciones */
        console.log(pixelArray.length);
        //        console.log(data);
        for (let i = 0; i < pixelArray.length; i=i + 3) {
            let x = parseInt((pixelArray[i] + pixelArray[i + 1] + pixelArray[i + 2]) / 3);
            //console.log(pixelArray[i] + " " + pixelArray[i + 1] +" "+ pixelArray[i + 2] +" = "+ x);
            if (x <= 40) {
                pixelArray[i] = 0;
                pixelArray[i + 1] = 0;
                pixelArray[i + 2] = 0;
            } else if (x > 40 && x <= 75) {
                pixelArray[i] = 50;
                pixelArray[i + 1] = 50;
                pixelArray[i + 2] = 50;
            } else if (x > 75 && x <= 125) {
                pixelArray[i] = 100;
                pixelArray[i + 1] = 100;
                pixelArray[i + 2] = 100;
            } else if (x > 125 && x <= 175) {
                pixelArray[i] = 150;
                pixelArray[i + 1] = 150;
                pixelArray[i + 2] = 150;
            } else if (x > 175 && x <= 225) {
                pixelArray[i] = 200;
                pixelArray[i + 1] = 200;
                pixelArray[i + 2] = 200;
            } else if (x > 225) {
                pixelArray[i] = 255;
                pixelArray[i + 1] = 255;
                pixelArray[i + 2] = 255;
            }

            //console.log(pixelArray[i]);
        }
        const { width, height, channels } = info;
        await sharp(pixelArray, { raw: { width, height, channels } })
            .toFile('./src./mia2-changed.jpg');


    } catch (error) {
        console.log(error);
    }
}

leerBuffer();

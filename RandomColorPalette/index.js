const fs = require("fs");
const path = require("path");

//store the attached color palatte in your filesystem
const randomColorPaletteInputFile = path.join(__dirname, "color_ palette.json");
const randomColorPaletteOuputFile = path.join(__dirname, "randomized_color_palette.json");

try {
    //read original json file
    const data = fs.readFileSync(randomColorPaletteInputFile, "utf8");
    const colorPalette = JSON.parse(data);

    // Random 5 unique colors
    const randomFiveColors = [];
    while (randomFiveColors.length < 5) {
        const item = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        if (!randomFiveColors.includes(item)) {
            randomFiveColors.push(item);
        }
    }
    //write randomised colors to new file
    fs.writeFileSync(randomColorPaletteOuputFile, JSON.stringify(randomFiveColors, null, 2), "utf8");
    console.log("writed the five randomized file");

    //Read the new file
    const result = fs.readFileSync(randomColorPaletteOuputFile, "utf8");
    const finalFiveColors = JSON.parse(result);
    console.log("Randomized five colors:");
    finalFiveColors.forEach(color => console.log(color));
} 
catch (err) {
    console.error("Error:", err.message);
}

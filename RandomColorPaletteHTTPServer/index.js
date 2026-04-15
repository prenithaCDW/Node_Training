const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const randomColorPaletteInputFile = path.join(__dirname, "color_palette.json");
const randomColorPaletteOuputFile = path.join(__dirname, "randomized_color_palette.json");

const server = http.createServer((req, res) => {
    if (req.url === "/colors") {
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

            //write five randomised colors to new file
            fs.writeFileSync(randomColorPaletteOuputFile, JSON.stringify(randomFiveColors, null, 2), "utf8");
            console.log("Written randomized file");

            //Read from five randomised color new file
            const result = fs.readFileSync(randomColorPaletteOuputFile, "utf8");
            const finalFiveColors = JSON.parse(result);
            console.log("Randomized five colors:");
            finalFiveColors.forEach(color => console.log(color));

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(finalFiveColors));
        }
        catch (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: err.message }));
        }
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

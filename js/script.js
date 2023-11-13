document.addEventListener("DOMContentLoaded", function () {
    const totalPokemon = 1017; // Change this number as needed
    const pokemonPerBox = 30;
    const columnsPerBox = 6;

    const container = document.getElementById("pokemonTableContainer");

    // Calculate the total number of boxes needed
    const totalBoxes = Math.ceil(totalPokemon / pokemonPerBox);

    // Populate tables with Pokemon images
    for (let box = 1; box <= totalBoxes; box++) {
        const table = document.createElement("table");
        table.className = "pokemonTable";
        table.id = `pokemonTable${box}`;

        // Create a new box for each table
        const boxDiv = document.createElement("div");
        boxDiv.className = "pokemonBox";

        // Add header to each box with Pokemon range
        const header = document.createElement("h2");
        const startRange = 1 + (box - 1) * pokemonPerBox;
        const endRange = Math.min(box * pokemonPerBox, totalPokemon);
        header.textContent = `Box ${box}  Range: ${startRange} - ${endRange}`;
        
		boxDiv.appendChild(header);
        boxDiv.appendChild(table);
        container.appendChild(boxDiv);

        // Populate each table with up to 30 Pokemon
        for (let i = startRange; i <= endRange; i++) {
            if ((i - 1) % columnsPerBox === 0) {
                // Start a new row for every 6 columns
                const newRow = table.insertRow(-1);
            }

            const currentRow = table.rows[table.rows.length - 1];
            const cell = currentRow.insertCell(-1);
            const img = document.createElement("img");

            img.loading = "lazy";
			
			let imgUrl;

			if (i > 999) {
			  imgUrl = `https://www.serebii.net/pokemon/art/${i}.png`;
			} else {
			  imgUrl = `https://www.serebii.net/pokemon/art/${String(i).padStart(3, '0')}.png`;
			}
            img.src = imgUrl;
			
            img.alt = `Pokemon ${i}`;
            cell.appendChild(img);
        }
    }
});


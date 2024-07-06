function getAdjacentTiles(world, x, y) {
    const adjacentTiles = [];
    if (x > 0) adjacentTiles.push({ x: x - 1, y: y, ...world.tiles[x - 1][y] });
    if (x < world.size.width - 1) adjacentTiles.push({ x: x + 1, y: y, ...world.tiles[x + 1][y] });
    if (y > 0) adjacentTiles.push({ x: x, y: y - 1, ...world.tiles[x][y - 1] });
    if (y < world.size.height - 1) adjacentTiles.push({ x: x, y: y + 1, ...world.tiles[x][y + 1] });
    return adjacentTiles;
}

function getPlainTiles(world) {
    return world.tiles.flatMap(row => row.filter(tile => tile.terrain === 'plain'));
}

function _classic_findPath(world, start, end) {
    // Implementación simplificada del algoritmo A*
    // Esta función debería devolver una lista de coordenadas desde 'start' hasta 'end'
    const path = [];
    // Implementar A* o cualquier otro algoritmo de pathfinding aquí
    // Por ahora, agregamos un camino directo como ejemplo
    for (let x = start.x; x <= end.x; x++) {
        for (let y = start.y; y <= end.y; y++) {
            path.push({ x, y });
        }
    }
    return path;
}
function findPath(world, start, end) {
    const openList = [];
    const closedList = [];
    const startNode = {
        x: start.x,
        y: start.y,
        g: 0,
        h: Math.abs(start.x - end.x) + Math.abs(start.y - end.y),
        f: 0,
        parent: null
    };
    startNode.f = startNode.g + startNode.h;
    openList.push(startNode);

    while (openList.length > 0) {
        // Ordenar la lista abierta por el valor de f
        openList.sort((a, b) => a.f - b.f);
        const currentNode = openList.shift();
        closedList.push(currentNode);

        // Comprobar si hemos llegado al nodo final
        if (currentNode.x === end.x && currentNode.y === end.y) {
            const path = [];
            let node = currentNode;
            while (node) {
                path.push({ x: node.x, y: node.y });
                node = node.parent;
            }
            return path.reverse();
        }

        // Generar vecinos
        const neighbors = [
            { x: currentNode.x - 1, y: currentNode.y },
            { x: currentNode.x + 1, y: currentNode.y },
            { x: currentNode.x, y: currentNode.y - 1 },
            { x: currentNode.x, y: currentNode.y + 1 }
        ];

        for (const neighbor of neighbors) {
            if (neighbor.x < 0 || neighbor.x >= world.size.width || neighbor.y < 0 || neighbor.y >= world.size.height) {
                continue; // Ignorar fuera de los límites
            }

            const neighborTile = world.tiles[neighbor.x][neighbor.y];
            // console.log(`Checking neighbor at (${neighbor.x}, ${neighbor.y}), Tile:`, neighborTile);
            if (neighborTile.terrain !== 'plain') {
                continue; // Ignorar tiles con terreno no plano
            }

            // Si ya está en la lista cerrada, ignorarlo
            if (closedList.some(node => node.x === neighbor.x && node.y === neighbor.y)) {
                continue;
            }

            const g = currentNode.g + 1;
            const h = Math.abs(neighbor.x - end.x) + Math.abs(neighbor.y - end.y);
            const f = g + h;
            const openNode = openList.find(node => node.x === neighbor.x && node.y === neighbor.y);

            if (openNode) {
                if (g < openNode.g) {
                    openNode.g = g;
                    openNode.f = f;
                    openNode.parent = currentNode;
                }
            } else {
                openList.push({
                    x: neighbor.x,
                    y: neighbor.y,
                    g,
                    h,
                    f,
                    parent: currentNode
                });
            }
        }
    }

    // console.log(`No valid path found from (${start.x}, ${start.y}) to (${end.x}, ${end.y})`);
    return null; // No se encontró un camino
}



export default {
    getAdjacentTiles,
    getPlainTiles,
    findPath
}
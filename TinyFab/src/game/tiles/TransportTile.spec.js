import { describe, it, expect, beforeEach } from 'vitest';
import TransportTile from './TransportTile';

describe('TransportTile', () => {
    let transportTile;
    let world;

    beforeEach(() => {
        world = {
            width: 5,
            height: 5,
            tiles: Array(5).fill().map(() => Array(5).fill(null))
        };
        transportTile = new TransportTile(world, { x: 0, y: 0 });
        world.tiles[0][0] = transportTile;
    });

    it('should initialize with correct properties', () => {
        expect(transportTile.constructor.type).toBe('transport');
        expect(transportTile.constructor.cost).toEqual({ wood: 4, rock: 2 });
        expect(transportTile.itemsIn).toEqual({});
        expect(transportTile.itemsOut).toEqual({});
        expect(transportTile.constructor.acceptItems).toEqual({});
        expect(transportTile.state).toEqual({
            path: [],
            goingForward: true
        });
    });

    it('should export inputs correctly', () => {
        transportTile.itemsIn = { item1: 5 };
        transportTile.exportInputs();
        expect(transportTile.itemsIn).toEqual({});
        expect(transportTile.itemsOut).toEqual({ item1: 5 });
    });

    it('should not export inputs correctly', () => {
        transportTile.itemsOut = { item1: 5 };
        transportTile.dontExportInputs();
        expect(transportTile.itemsOut).toEqual({});
        expect(transportTile.itemsIn).toEqual({ item1: 5 });
    });

    it('should move correctly according to the path', () => {
        transportTile.state.path = [
            { x: 0, y: 0, in: true, out: false },
            { x: 1, y: 0, in: false, out: false },
            { x: 2, y: 0, in: false, out: false },
            { x: 3, y: 0, in: false, out: true }
        ];

        transportTile.update();

        expect(world.tiles[0][0]).toBeNull();
        expect(world.tiles[0][1]).toBe(transportTile); 
    });

    it('should reverse direction at the end of the path', () => {
        transportTile.state.path = [
            { x: 0, y: 0, in: true, out: false },
            { x: 1, y: 0, in: false, out: false },
            { x: 2, y: 0, in: false, out: false },
            { x: 3, y: 0, in: false, out: true }
        ];

        transportTile.state.goingForward = true;
        transportTile.location = { x: 3, y: 0 };
        world.tiles[0][3] = transportTile;
        world.tiles[0][0] = null;

        transportTile.update();

        expect(world.tiles[0][3]).toBeNull();
        expect(world.tiles[0][2]).toBe(transportTile); 
    });
});
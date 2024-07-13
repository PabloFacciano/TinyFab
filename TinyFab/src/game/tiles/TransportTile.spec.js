import { describe, it, expect, beforeEach, vi } from 'vitest';
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

        expect(world.tiles[0][0].empty).toBe(true);;
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

        expect(world.tiles[0][3].empty).toBe(true);;
        expect(world.tiles[0][2]).toBe(transportTile); 
    });

    it('should stay in place if the next step is occupied', () => {
        const otherTile = new TransportTile(world, { x: 1, y: 0 });
        world.tiles[0][1] = otherTile;

        transportTile.state.path = [
            { x: 0, y: 0, in: true, out: false },
            { x: 1, y: 0, in: false, out: false }
        ];

        transportTile.update();

        expect(world.tiles[0][0]).toBe(transportTile);
        expect(world.tiles[0][1]).toBe(otherTile);
        expect(transportTile.location).toEqual({ x: 0, y: 0 });
    });

    it('should not move if path is empty', () => {
        transportTile.state.path = [];
        transportTile.update();
        expect(transportTile.location).toEqual({ x: 0, y: 0 });
        expect(world.tiles[0][0]).toBe(transportTile);
    });

    it('should handle going backward correctly', () => {
        transportTile.state.path = [
            { x: 0, y: 0, in: true, out: false },
            { x: 1, y: 0, in: false, out: false },
            { x: 2, y: 0, in: false, out: false }
        ];

        transportTile.state.goingForward = false;
        transportTile.location = { x: 2, y: 0 };
        world.tiles[0][2] = transportTile;
        world.tiles[0][1] = null;

        transportTile.update();

        expect(world.tiles[0][2].empty).toBe(true);
        expect(world.tiles[0][1]).toBe(transportTile);
    });

    // Nuevas pruebas para mejorar la cobertura

    it('should reverse direction if next step is out of bounds (forward)', () => {
        transportTile.state.path = [
            { x: 0, y: 0, in: true, out: false },
            { x: 1, y: 0, in: false, out: false }
        ];

        transportTile.state.goingForward = true;
        transportTile.location = { x: 1, y: 0 };
        world.tiles[0][1] = transportTile;
        world.tiles[0][0] = null;

        transportTile.update();

        expect(transportTile.state.goingForward).toBe(false);
        expect(world.tiles[0][1].empty).toBe(true);
        expect(world.tiles[0][0]).toBe(transportTile);
    });

    it('should reverse direction if next step is out of bounds (backward)', () => {
        transportTile.state.path = [
            { x: 0, y: 0, in: true, out: false },
            { x: 1, y: 0, in: false, out: false }
        ];

        transportTile.state.goingForward = false;
        transportTile.location = { x: 0, y: 0 };
        world.tiles[0][0] = transportTile;

        transportTile.update();

        expect(transportTile.state.goingForward).toBe(true);
        expect(world.tiles[0][0].empty).toBe(true);
        expect(world.tiles[0][1]).toBe(transportTile);
    });

});
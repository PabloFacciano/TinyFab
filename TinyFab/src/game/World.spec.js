// World.spec.js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import World from './World';
import PerlinNoise from './PerlinNoise';

describe('World', () => {
    let world;
    let perlinNoise;

    beforeEach(() => {
        perlinNoise = new PerlinNoise();
        world = new World(perlinNoise);
    });

    it('should initialize terrain and tiles as empty arrays', () => {
        expect(world.terrain).toEqual([]);
        expect(world.tiles).toEqual([]);
    });

    it('should return correct width', () => {
        world.create(5, 4);
        expect(world.width).toBe(5);
    });

    it('should return correct height when terrain is not empty', () => {
        world.create(5, 4);
        expect(world.height).toBe(4);
    });

    it('should return height as 0 when terrain is empty', () => {
        expect(world.height).toBe(0);
    });

    it('should create new world with given width and height', () => {
        world.create(2, 3);
        expect(world.terrain.length).toBe(2);
        expect(world.terrain[0].length).toBe(3);
        expect(world.tiles.length).toBe(2);
        expect(world.tiles[0].length).toBe(3);
    });

    it('should run update on non-null tiles', () => {
        const mockTile = {
            update: vi.fn(),
        };
        world.create(2, 2);
        world.tiles[0][0] = mockTile;
        world.runTick();
        expect(mockTile.update).toHaveBeenCalled();
    });
});
import { describe, it, expect, beforeEach, vi } from 'vitest';
import World from './World';

describe('World', () => {
    let world;

    beforeEach(() => {
        world = new World();
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

    it('should fill terrain with objects containing type as plain, mountain or river', () => {
        world.create(3, 3);
        for (let row of world.terrain) {
            for (let cell of row) {
                expect(['plain', 'mountain', 'river']).toContain(cell.type);
            }
        }
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
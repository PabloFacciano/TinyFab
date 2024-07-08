// PerlinNoise.spec.js

import { describe, it, expect, beforeEach } from 'vitest';
import PerlinNoise from './PerlinNoise';

describe('PerlinNoise', () => {
    let perlinNoise;

    beforeEach(() => {
        perlinNoise = new PerlinNoise();
    });

    it('should generate a number between 0 and 1 for given coordinates', () => {
        const value = perlinNoise.generate(0, 0);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(1);
    });

    it('should generate consistent values for the same coordinates', () => {
        const value1 = perlinNoise.generate(1, 1);
        const value2 = perlinNoise.generate(1, 1);
        expect(value1).toBe(value2);
    });

    it('should generate different values for different coordinates', () => {
        const value1 = perlinNoise.generate(1, 1);
        const value2 = perlinNoise.generate(2, 2);
        const value3 = perlinNoise.generate(1.1, 1.1);
        expect(value1).not.toBe(value2);
        expect(value1).not.toBe(value3);
        expect(value2).not.toBe(value3);
    });

    it('should scale the input coordinates by the frequency', () => {
        const perlinNoiseDefaultFreq = new PerlinNoise();
        const perlinNoiseHighFreq = new PerlinNoise(10);
        const value1 = perlinNoiseDefaultFreq.generate(1, 1);
        const value2 = perlinNoiseHighFreq.generate(1, 1);
        
        // With a higher frequency, the coordinates are scaled, thus generating different values
        expect(value1).not.toBe(value2);
    });

    it('should reset gradients and memory when seed is called', () => {
        perlinNoise.generate(1, 1); // Generate some values to populate gradients and memory
        perlinNoise.seed(); // Reset

        // Check that gradients and memory are empty after seeding
        expect(Object.keys(perlinNoise.gradients).length).toBe(0);
        expect(Object.keys(perlinNoise.memory).length).toBe(0);
    });
});
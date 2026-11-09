import { Vector2 } from '../mathematics/vector2.ts';
import { resultantForce, weight, DEFAULT_GRAVITY } from './forces.ts';
import { strictEqual, throws, ok } from 'node:assert';
import { test } from 'node:test';

test('two perpendicular forces with magnitudes 3N and 4N result in a force of magnitude 5N', function() {
    const forces: Vector2[] = [new Vector2(3, 0), new Vector2(0, 4)];

    strictEqual(resultantForce(forces).magnitude(), 5);
});

test('two equal but opposed forces result in 0N', function() {
    const forces: Vector2[] = [new Vector2(2,3), new Vector2(-2, -3)];

    strictEqual(resultantForce(forces).magnitude(), 0);
});

test('an empty list of forces results in vector (0, 0)', function() {
    const forces: Vector2[] = [];

    const resultant = resultantForce(forces);

    strictEqual(resultant.x, 0);
    strictEqual(resultant.y, 0);
    strictEqual(resultant.magnitude(), 0);
});

// Absolute tolerance for values of order one in these short calculations.
function assertNear(actual: number, expected: number): void {
    const tolerance = 1e-12;
    ok(Math.abs(actual - expected) <= tolerance,
        `Expected ${actual} to be within ${tolerance} of ${expected}`);
}

test('a positive mass of 10kg returns a weight of 98.1N (0, -98.1)', function() {
    const mass: number = 10;
    const massWeight: Vector2 = weight(mass, DEFAULT_GRAVITY);

    assertNear(massWeight.magnitude(), 98.1);
    strictEqual(massWeight.x, 0);
    assertNear(massWeight.y, -98.1);
});

test('a fractional mass of 2.5kg returns a weight of 24.525N (0, -24.525)', function() {
    const massWeight: Vector2 = weight(2.5, DEFAULT_GRAVITY);

    strictEqual(massWeight.x, 0);
    assertNear(massWeight.y, -24.525);
});

test('the weight follows the gravity vector of the reference frame', function() {
    // Same physics in a frame where "down" is positive y: only the datum changes.
    const invertedGravity: Vector2 = new Vector2(0, 9.81);
    const massWeight: Vector2 = weight(10, invertedGravity);

    strictEqual(massWeight.x, 0);
    assertNear(massWeight.y, 98.1);
});

test('a negative, zero, non finite or NaN mass throws RangeError', function() {
    throws(() => weight(-3, DEFAULT_GRAVITY), RangeError);
    throws(() => weight(0, DEFAULT_GRAVITY), RangeError);
    throws(() => weight(-0, DEFAULT_GRAVITY), RangeError);
    throws(() => weight(Infinity, DEFAULT_GRAVITY), RangeError);
    throws(() => weight(-Infinity, DEFAULT_GRAVITY), RangeError);
    throws(() => weight(NaN, DEFAULT_GRAVITY), RangeError);
});

test('a finite mass whose weight overflows throws RangeError', function() {
    throws(() => weight(Number.MAX_VALUE, DEFAULT_GRAVITY), RangeError);
});

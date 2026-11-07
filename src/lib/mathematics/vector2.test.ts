import { test } from 'node:test';
import { notStrictEqual, ok, strictEqual, throws } from 'node:assert';
import { Vector2 } from './vector2.ts';

test('A vector with components 3 and 4 has length 5', function () {
    const vector = new Vector2(3, 4);

    strictEqual(vector.length(), 5);
});

test('Two vectors, (3, 4) and (2, -1) when added result in the vector (5, 3)', function () {
    const vector1 = new Vector2(3, 4);
    const vector2 = new Vector2(2, -1);
    const result = vector1.add(vector2);

    strictEqual(result.x, 5);
    strictEqual(result.y, 3);

    strictEqual(vector1.x, 3);
    strictEqual(vector1.y, 4);

    strictEqual(vector2.x, 2);
    strictEqual(vector2.y, -1);
});

test('Vector2 does not accept +-Inf and NaN as components', function () {
    throws(() => new Vector2(Infinity, 0), RangeError);
    throws(() => new Vector2(-Infinity, 0), RangeError);
    throws(() => new Vector2(0, Infinity), RangeError);
    throws(() => new Vector2(0, -Infinity), RangeError);
    throws(() => new Vector2(NaN, 0), RangeError);
    throws(() => new Vector2(0, NaN), RangeError);
});

test('vector (6, -4) divided by 2 results in vector (3, -2)', function () {
    const vector = new Vector2(6, -4);
    const result = vector.divide(2);

    strictEqual(result.x, 3);
    strictEqual(result.y, -2);

    strictEqual(vector.x, 6);
    strictEqual(vector.y, -4);
});

test('divide method does not allow zero, +-Infinity and NaN as factors', function () {
    const vector = new Vector2(1, 1);
    throws(() => vector.divide(0), Error);
    throws(() => vector.divide(-0), Error);
    throws(() => vector.divide(Infinity), RangeError);
    throws(() => vector.divide(-Infinity), RangeError);
    throws(() => vector.divide(NaN), RangeError);
});

test('vector (3, 4) minus vector (2, -1) returns vector (1, 5)', function () {
    const vector1 = new Vector2(3, 4);
    const vector2 = new Vector2(2, -1);
    const result = vector1.subtract(vector2);

    strictEqual(result.x, 1);
    strictEqual(result.y, 5);

    strictEqual(vector1.x, 3);
    strictEqual(vector1.y, 4);

    strictEqual(vector2.x, 2);
    strictEqual(vector2.y, -1);
});

test('vector (3, 4) multiplied by scalar -2 returns vector (-6, -8)', function () {
    const vector = new Vector2(3, 4);
    const result = vector.multiply(-2);

    strictEqual(result.x, -6);
    strictEqual(result.y, -8);

    strictEqual(vector.x, 3);
    strictEqual(vector.y, 4);
});

test('multiply method does not accept +-Inf and NaN as factors', function () {
    const vector = new Vector2(3, 4);
    throws(() => vector.multiply(Infinity), RangeError);
    throws(() => vector.multiply(-Infinity), RangeError);
    throws(() => vector.multiply(NaN), RangeError);
});

test('multiply method accepts zero as scalar and returns vector (0, 0)', function () {
    const vector = new Vector2(3, 4);
    const result = vector.multiply(0);

    strictEqual(result.x, 0);
    strictEqual(result.y, 0);
});

test('multiply method accepts -zero as scalar and returns vector (0, 0)', function () {
    const vector = new Vector2(3, 4);
    const result = vector.multiply(-0);

    strictEqual(result.x, 0);
    strictEqual(result.y, 0);
});

test('the dot product of vector (3, 4) and vector (2, -1) is 2', function () {
    const vector1 = new Vector2(3, 4);
    const vector2 = new Vector2(2, -1);
    const result = vector1.dot(vector2);

    strictEqual(result, 2);
});

test('vector (3, 4) has a squared length of 25', function () {
    const vector = new Vector2(3, 4);
    const result = vector.lengthSquared();

    strictEqual(result, 25);
});

test('vector (0, 0) normalizes as null vector', function () {
    const vector = new Vector2(0, 0);
    const result = vector.normalize();

    strictEqual(result, null);
});

// Absolute tolerance for values of order one in these short calculations.
function assertNear(actual: number, expected: number): void {
    const tolerance = 1e-15;
    ok(Math.abs(actual - expected) <= tolerance,
        `Expected ${actual} to be within ${tolerance} of ${expected}`);
}

test('The constructor accepts finite positive, negative, fractional and zero components', function () {
    const samples = [
        { x: 0, y: 0 },
        { x: -3, y: 4 },
        { x: 0.5, y: -0.25 },
        { x: Number.MAX_VALUE, y: Number.MIN_VALUE }
    ];

    for (const { x, y } of samples) {
        const vector = new Vector2(x, y);
        strictEqual(vector.x, x);
        strictEqual(vector.y, y);
    }
});

test('Identity operations return new Vector2 instances instead of returning an operand', function () {
    const vector = new Vector2(3, -4);
    const zero = new Vector2(0, 0);
    const results = [vector.add(zero), vector.subtract(zero), vector.multiply(1), vector.divide(1)];

    for (const result of results) {
        ok(result instanceof Vector2);
        notStrictEqual(result, vector);
        notStrictEqual(result, zero);
        strictEqual(result.x, 3);
        strictEqual(result.y, -4);
    }

    strictEqual(vector.x, 3);
    strictEqual(vector.y, -4);
    strictEqual(zero.x, 0);
    strictEqual(zero.y, 0);
});

test('Addition commutes and subtraction reverses addition for exactly representable samples', function () {
    const samples = [new Vector2(0, 0), new Vector2(3, -4), new Vector2(-2, 7), new Vector2(0.5, -0.25)];

    for (const a of samples) {
        for (const b of samples) {
            const sum = a.add(b);
            const reversed = b.add(a);
            strictEqual(sum.x, reversed.x);
            strictEqual(sum.y, reversed.y);

            const recovered = sum.subtract(b);
            strictEqual(recovered.x, a.x);
            strictEqual(recovered.y, a.y);
        }
    }
});

test('Subtracting a vector from itself returns a new zero vector', function () {
    const vector = new Vector2(-3, 4);
    const result = vector.subtract(vector);

    notStrictEqual(result, vector);
    strictEqual(result.x, 0);
    strictEqual(result.y, 0);
    strictEqual(vector.x, -3);
    strictEqual(vector.y, 4);
});

test('Scaling accepts fractional multipliers and negative divisors', function () {
    const vector = new Vector2(6, -4);
    const multiplied = vector.multiply(0.5);
    const divided = vector.divide(-2);

    strictEqual(multiplied.x, 3);
    strictEqual(multiplied.y, -2);
    strictEqual(divided.x, -3);
    strictEqual(divided.y, 2);
    notStrictEqual(multiplied, vector);
    notStrictEqual(divided, vector);
    strictEqual(vector.x, 6);
    strictEqual(vector.y, -4);
});

test('Both zero scalars produce new positive-zero components for mixed-sign inputs', function () {
    const vector = new Vector2(-3, 4);

    for (const scalar of [0, -0]) {
        const result = vector.multiply(scalar);
        ok(result instanceof Vector2);
        notStrictEqual(result, vector);
        strictEqual(result.x, 0);
        strictEqual(result.y, 0);
    }

    strictEqual(vector.x, -3);
    strictEqual(vector.y, 4);
});

test('Dot products handle orthogonal, opposite and zero vectors and are symmetric', function () {
    const vector = new Vector2(3, 4);
    const other = new Vector2(-2, 5);

    strictEqual(vector.dot(new Vector2(4, -3)), 0);
    strictEqual(vector.dot(new Vector2(-3, -4)), -25);
    strictEqual(vector.dot(new Vector2(0, 0)), 0);
    strictEqual(vector.dot(vector), 25);
    strictEqual(vector.dot(other), 14);
    strictEqual(other.dot(vector), 14);
    strictEqual(vector.x, 3);
    strictEqual(vector.y, 4);
    strictEqual(other.x, -2);
    strictEqual(other.y, 5);
});

test('Lengths handle zero, axis-aligned, negative and fractional components', function () {
    strictEqual(new Vector2(0, 0).length(), 0);
    strictEqual(new Vector2(0, 0).lengthSquared(), 0);
    strictEqual(new Vector2(-3, -4).length(), 5);
    strictEqual(new Vector2(-3, -4).lengthSquared(), 25);
    strictEqual(new Vector2(-7, 0).length(), 7);
    strictEqual(new Vector2(0, -7).length(), 7);
    assertNear(new Vector2(0.3, 0.4).length(), 0.5);
    assertNear(new Vector2(0.3, 0.4).lengthSquared(), 0.25);
    assertNear(new Vector2(1, 1).length(), Math.sqrt(2));
});

test('Normalization preserves direction in every quadrant and on both axes', function () {
    const samples = [
        { x: 3, y: 4, expectedX: 0.6, expectedY: 0.8 },
        { x: -3, y: 4, expectedX: -0.6, expectedY: 0.8 },
        { x: -3, y: -4, expectedX: -0.6, expectedY: -0.8 },
        { x: 3, y: -4, expectedX: 0.6, expectedY: -0.8 },
        { x: 2, y: 0, expectedX: 1, expectedY: 0 },
        { x: -2, y: 0, expectedX: -1, expectedY: 0 },
        { x: 0, y: 2, expectedX: 0, expectedY: 1 },
        { x: 0, y: -2, expectedX: 0, expectedY: -1 }
    ];

    for (const { x, y, expectedX, expectedY } of samples) {
        const vector = new Vector2(x, y);
        const result = vector.normalize();

        ok(result instanceof Vector2);
        notStrictEqual(result, vector);
        assertNear(result.x, expectedX);
        assertNear(result.y, expectedY);
        assertNear(result.length(), 1);
        strictEqual(vector.x, x);
        strictEqual(vector.y, y);
    }
});

test('Normalizing an already unit-length vector still returns a new instance', function () {
    const vector = new Vector2(1, 0);
    const result = vector.normalize();

    ok(result instanceof Vector2);
    notStrictEqual(result, vector);
    strictEqual(result.x, 1);
    strictEqual(result.y, 0);
    strictEqual(vector.x, 1);
    strictEqual(vector.y, 0);
});

test('Zero vectors normalize to null regardless of the signs of their zero components', function () {
    strictEqual(new Vector2(-0, 0).normalize(), null);
    strictEqual(new Vector2(0, -0).normalize(), null);
    strictEqual(new Vector2(-0, -0).normalize(), null);
});

test('Length and normalization avoid intermediate square overflow and underflow', function () {
    // Regression cases for the choice of hypot rather than sqrt(lengthSquared()).
    for (const magnitude of [1e200, 1e-200]) {
        const vector = new Vector2(magnitude, 0);
        strictEqual(vector.length(), magnitude);

        const result = vector.normalize();
        ok(result instanceof Vector2);
        strictEqual(result.x, 1);
        strictEqual(result.y, 0);
        strictEqual(vector.x, magnitude);
        strictEqual(vector.y, 0);
    }
});

test('Normalization returns null when the computed length exceeds the number range', function () {
    const vector = new Vector2(Number.MAX_VALUE, Number.MAX_VALUE);

    strictEqual(vector.length(), Infinity);
    strictEqual(vector.normalize(), null);
    strictEqual(vector.x, Number.MAX_VALUE);
    strictEqual(vector.y, Number.MAX_VALUE);
});

test('Vector-valued operations reject overflowing result components on either axis', function () {
    for (const vector of [new Vector2(Number.MAX_VALUE, 0), new Vector2(0, Number.MAX_VALUE)]) {
        throws(() => vector.add(vector), RangeError);
        throws(() => vector.subtract(vector.multiply(-1)), RangeError);
        throws(() => vector.multiply(2), RangeError);
        throws(() => vector.divide(0.5), RangeError);
        ok(Number.isFinite(vector.x));
        ok(Number.isFinite(vector.y));
    }
});

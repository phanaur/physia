import { Vector2 } from '../mathematics/vector2.ts';

/**
 * Default gravitational acceleration, in m/s², as a vector of the scene's reference frame.
 *
 * The sign convention lives in this datum and not in any formula: it assumes x
 * increasing to the right and y increasing upwards, so "down" is negative y.
 */
export const DEFAULT_GRAVITY: Vector2 = new Vector2(0, -9.81);

/**
 * Returns the resultant of a list of forces, that is, their vector sum.
 *
 * Each force is a `Vector2` in newtons, and the result is a new `Vector2` in newtons.
 * An empty list returns the zero vector. The input list is not modified.
 * @throws {RangeError} If a partial sum is not finite (for example, on overflow).
 */
export function resultantForce(forces: readonly Vector2[]): Vector2 {
    // The zero vector is the neutral element of the sum, so it is also the
    // result for an empty list.
    let resultant = new Vector2(0, 0);
    for (const force of forces) {
        // Vector2 is immutable: add() returns a new vector, so the variable
        // must be reassigned (hence `let`) to keep the running total.
        resultant = resultant.add(force);
    }

    return resultant;
}

/**
 * Returns the weight `P = m·g` of a body, in newtons.
 *
 * The mass is assumed to be in kilograms and the gravity vector in m/s²; there is
 * no unit checking. The gravity is a datum of the scene, so the sign convention of
 * the reference frame is not part of this formula.
 * @throws {RangeError} If the mass is not finite or not greater than zero, or if
 * a component of the weight is not finite.
 */
export function weight(mass: number, gravity: Vector2): Vector2 {
    if (mass <= 0 || !Number.isFinite(mass)) {
        throw new RangeError("Mass should be a finite number larger than zero.");
    }

    return gravity.multiply(mass);
}
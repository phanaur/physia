/**
 * A two-dimensional vector with finite double-precision components.
 *
 * Vector-valued operations return new instances and validate their components.
 * Scalar results follow ordinary JavaScript number arithmetic and may be non-finite.
 * `readonly` prevents assignments during type checking; instances are not frozen.
 */
export class Vector2 {
    readonly x: number;
    readonly y: number;

    /** @throws {RangeError} If either component is infinite or NaN. */
    constructor(x: number, y: number) {
        if (!Number.isFinite(x) || !Number.isFinite(y)) {
            throw new RangeError("Vector components must be finite numbers.");
        }
        this.x = x;
        this.y = y;
    }

    /** Returns a new vector equal to this vector plus other. */
    add(other: Vector2): Vector2 {
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    /** Returns a new vector equal to this vector minus the other. */
    subtract(other: Vector2): Vector2 {
        return new Vector2(this.x - other.x, this.y - other.y);
    }

    /**
     * Returns a new vector scaled by a finite scalar.
     * @throws {RangeError} If the scalar or a result component is non-finite.
     */
    multiply(scalar: number): Vector2 {
        if (!Number.isFinite(scalar)){
            throw new RangeError("You can't multiply by non-finite scalars")
        } else if (scalar === 0) {
            return new Vector2(0, 0);
        }
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    /**
     * Returns a new vector divided by a finite, non-zero scalar.
     * @throws {Error} If the scalar is zero, including negative zero.
     * @throws {RangeError} If the scalar or a result component is non-finite.
     */
    divide(scalar: number): Vector2 {
        if (scalar === 0) {
            throw new Error("Division by zero is forbidden");
        } else if (!Number.isFinite(scalar)){
            throw new RangeError("You can't divide by non-finite scalars")
        }
        return new Vector2(this.x / scalar, this.y / scalar);
    }

    /** Returns the dot product of this vector and other. */
    dot(other: Vector2): number {
        return this.x * other.x + this.y * other.y;
    }

    /** Returns x squared plus y squared; this calculation may overflow or underflow. */
    magnitudeSquared(): number {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2);
    }

    /** Computes the Euclidean magnitude with hypot to avoid unnecessary intermediate overflow or underflow. */
    magnitude(): number {
        return Math.hypot(this.x, this.y);
    }

    /**
     * Returns a new vector divided by its computed magnitude.
     * Returns null if that magnitude is zero or non-finite.
     */
    normalize():Vector2 | null {
        const magnitude = this.magnitude();
        return Number.isFinite(magnitude) && magnitude > 0 ? this.divide(magnitude) : null;
    }
}

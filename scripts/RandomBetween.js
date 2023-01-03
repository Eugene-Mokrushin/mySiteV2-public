export default function Random(min, max, isFloor = true) {
    const int = (Math.random()) * (max - min + 1) + min;
    return isFloor ? Math.floor(int) : int
}
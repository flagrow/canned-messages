/**
 * Create a sort function based on a model property
 * @param {String} prop
 * @param {String} order
 * @returns {function(*, *)}
 */
export default function (prop, order = 'asc') {
    return (a, b) => {
        const value1 = a[prop]();
        const value2 = b[prop]();

        let result = 0;

        if (value1 > value2) {
            result = 1;
        } else if (value2 > value1) {
            result = -1;
        }

        if (order === 'desc') {
            result *= -1;
        }

        return result;
    }
}

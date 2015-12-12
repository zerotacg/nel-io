// source: http://stackoverflow.com/a/30733000
export function mixin( target, source ) {
    target = target.prototype;
    source = source.prototype;

    Object.getOwnPropertyNames(source).forEach(function ( name ) {
        if ( name !== "constructor" && !target[name]) {
            Object.defineProperty(target, name,
                Object.getOwnPropertyDescriptor(source, name));
        }
    });
}

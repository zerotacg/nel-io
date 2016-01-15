export default class AModel {
    static readFrom( stream ) {
        var data = this.fields
            .map(field => {
                var type = field.type;
                var name = field.name;
                console.assert(type, "Type should exist" + JSON.stringify(field));
                console.assert(type.readFrom, "Type have readFrom method" + JSON.stringify(field));
                var value = type.readFrom(stream, field);

                return { name, value };
            })
            .filter(entry => entry.name)
            .reduce(( data, entry ) => {
                data[ entry.name ] = entry.value;

                return data;
            }, {})
            ;

        return this.create(data);
    }

    static create(data) {
        return new this(data);
    }

    constructor(config) {
        Object.assign(this, config);
    }
}

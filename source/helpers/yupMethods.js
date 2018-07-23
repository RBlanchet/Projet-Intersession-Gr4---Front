import {string, mixed, addMethod} from 'yup'

function equalTo(ref, msg) {
    return mixed().test({
        name: 'equalTo',
        exclusive: false,
        message: msg || '${path} must be the same as ${reference}',
        params: {
            reference: ref.path,
        },
        test: function(value) {
            return value === this.resolve(ref);
        },
    });
}
addMethod(string, 'equalTo', equalTo);
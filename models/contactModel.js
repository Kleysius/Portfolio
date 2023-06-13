const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Le nom est obligatoire'],
        validate: {
            validator: function (val) {
                return /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(val);
            },
            message: 'Le nom n\'est pas valide, il ne doit contenir que des lettres, des chiffres, des espaces, des apostrophes, des virgules et des tirets'
        }
    },
    email: {
        type: String,
        required: [true, 'L\'email est obligatoire'],
        validate: {
            validator: function (val) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val);
            },
            message: 'L\'email n\'est pas valide, il doit contenir un @ et un ., sans espace ni caractères spéciaux'
        }
    },
    phone: {
        type: String,
        validate: {
            validator: function (val) {
                return /^[0-9]{10}$/.test(val);
            },
            message: 'Le numéro de téléphone n\'est pas valide, il doit contenir 10 chiffres, sans espace ni caractères spéciaux'
        }
    },
    subject: {
        type: String,
        validate: {
            validator: function (val) {
                return /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(val);
            },
            message: 'Le sujet n\'est pas valide, il ne doit contenir que des lettres, des chiffres, des espaces, des apostrophes, des virgules et des tirets'
        }
    },
    message: {
        type: String,
        required: [true, 'Le message est obligatoire'],
        validate: {
            validator: function (val) {
                return /^[\s\p{P}\p{L}\d?!]{1,500}$/u.test(val);
            },
            message: 'Le message n\'est pas valide, il ne doit contenir que des lettres, des chiffres, des espaces, des apostrophes, des virgules et des tirets'
        }
    },
});

const contactModel = mongoose.model('Contact', contactSchema);

module.exports = contactModel;
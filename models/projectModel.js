const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A project must have a title'],
        validate: {
            validator: function (val) {
                return /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(val);
            }
        }
    },
    url: {
        type: String,
        validate: {
            validator: function (val) {
                return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(val);
            }
        }
    },
    gitUrl: {
        type: String,
        validate: {
            validator: function (val) {
                return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(val);
            }
        }
    },
    description: {
        type: String,
        required: [true, 'A project must have a description'],
        validate: {
            validator: function (val) {
                return /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(val);
            }
        }
    },
    image: {
        type: String,
    },
    technologies: {
        type: String,
        required: [true, 'A project must have at least one technology'],
        validate: {
            validator: function (val) {
                return val.length > 0;
            }
        }
    },
});

const projectModel = mongoose.model('Project', projectSchema);

module.exports = projectModel;

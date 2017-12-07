const TAG = 'HeroModel ';

const Moogoose = require('mongoose');

const HeroSchema = new Moogoose.Schema({
        name: {
                type: String,
                trim: true
        },
        universe: {
                type: String,
                trim: true
        },
        img: {
                type: String,
                trim: true
        },
        story: {
                type: String,
                trim: true
        },
        user_id: {
                type: String,
                trim: true
        },
        date_created: {
                type: Date,
                default: Date.now
        }
});

HeroSchema.set('toJSON', {
        transform: function ( doc, ret, options ) {
                delete ret.__v;
                return ret;
        }
});

const Hero = Moogoose.model('Hero', HeroSchema);

module.exports = Hero;

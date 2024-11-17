const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    attacks: {
        type: Number,
        default: 0
    },
    ais: {
        type: Number,
        default: 0
    },
    trophies: {
        type: Number,
        default: 0
    },
    attack_trophies: {
        type: Number,
        default: 0
    },
    defense_trophies: {
        type: Number,
        default: 0
    }
});

userSchema.pre('save', async function save(next) {
    if (!this.isModified('password')){ return next() }
    try {
        const salt = await bcrypt.genSalt(Number(process.env.SALT_WORK_FACTOR));
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
})

userSchema.methods.validatePassword = async function validatePassword(data) {
    console.log(data)
    console.log(this.password)
    return await bcrypt.compare(data, this.password).then(function(err, res) {
        if (err){
            return err;
        }
        return res;
    });
};

module.exports = mongoose.model('User', userSchema);
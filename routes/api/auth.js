const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
//User model
const User = require('../../models/User');

// @route   GET  api/auth
// @desc    Get User
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        res.json(user)
    } catch (error) {
        res.status(500).send('Server error');
    }
});


// @route   POST  api/auth
// @desc    Authenticate use & get token
// @access  Public
router.post('/', [
    check('email',
        'Please include a valid email')
        .isEmail(),
    check('password',
        'Password is required'
    ).exists()
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const { email, password } = req.body;

    try {
        // See if user exists
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({errors: [{ message: 'Invalid credentials' }]});
        }

        // return json web token
        const payload = {
            user: {
                id: user.id
            }
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({errors: [{ message: 'Invalid credentials' }]});
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (error, token) => {
                if (error) throw error;

                res.json({ token });
            }
        );
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error')
    }
});

module.exports = router;
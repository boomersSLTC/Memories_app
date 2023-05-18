import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';//stores the user in the browser for some time
import User from '../models/user.js'

export const signin = async (req, res) => {
    const {email, password} = req.body
    const newUser = new User();

    try {
        const exstingUser = await User.findOne({email});

        if(!exstingUser) {
            return res.status(404).json({message: "User not found"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, exstingUser.password);

        if(!isPasswordCorrect) {
            return res.status(400).json({message: "Incorrect password"});
        }

        const token = jwt.sign({id: exstingUser._id, email: exstingUser.email}, 'test', {
            expiresIn: '1h'
        });

        res.status(200).json({result: exstingUser, token});
    } 
    catch (error) {
        res.status(500).json({message: 'Something went wrong'});
    }
}


export const signup = async (req, res) => {
    const {email, password, confirmPassword, firstName, lastName} = req.body;

    try {
        const exstingUser = await User.findOne({email});

        if(exstingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        if(password !== confirmPassword) {
            return res.status(400).json({message: 'Passwords do not match'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);//10 is the level of difficulty password is

        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`});
    
        const token = jwt.sign({id: result._id, email: result.email}, 'test', {
            expiresIn: '1h'
        });

        res.status(200).json({result, token});

    } catch (error) {
        res.status(500).json({message: 'Something went wrong'});
    }
}
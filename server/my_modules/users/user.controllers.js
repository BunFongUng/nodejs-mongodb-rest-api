import User from './user.model';
import _ from 'lodash';

export async function signUp(req, res) {
    try {
        let body = _.pick(req.body, [
            'email', 
            'first_name',
            'last_name',
            'user_name',
            'password'
        ]);

        console.log(`
            signup object
            ::::::::::::::::::::::
        `);

        console.log(JSON.stringify(body, undefined, 2));

        console.log("::::::::::::::::::::::");

        const user = await User.create(body);
        return res.status(201).json({
            status: 'success',
            data: user
        });
    } catch(err) {
        return res.status(500).json(err);
    }
};
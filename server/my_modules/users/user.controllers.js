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

        const user = await User.create(body);
        return res.status(201).json({
            status: 'success',
            data: user.toAuthJSON()
        });
    } catch(err) {
        return res.status(500).json(err);
    }
};

export function login(req, res, next) {
    res.status(200).json(req.user.toAuthJSON());
    return next();
}
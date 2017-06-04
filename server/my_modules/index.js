import userRoutes from './users/user.routes';
import { authJwt } from '../services/auth.service';

export default app => {
    app.use('/api/v1/users', userRoutes);
    app.use('/test/jwt', authJwt, (req, res) => {
        res.send('This is my authjwt test.');
    })
}
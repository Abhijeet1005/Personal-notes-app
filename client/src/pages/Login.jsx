import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (email, password) => {
        setLoading(true);
        setError('');
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthForm
            type="login"
            onSubmit={handleLogin}
            loading={loading}
            error={error}
        />
    );
};

export default Login;

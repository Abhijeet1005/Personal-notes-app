import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const Signup = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async (username, email, password) => {
        setLoading(true);
        setError('');
        try {
            await register(username, email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to sign up');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthForm
            type="signup"
            onSubmit={handleSignup}
            loading={loading}
            error={error}
        />
    );
};

export default Signup;

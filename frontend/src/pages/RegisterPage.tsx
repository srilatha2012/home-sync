import { Link } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";
function RegisterPage() {

    return (
            <main>
                <h1>Create your HomeSync acount</h1>
                <p>Register to manage your family projects and tasks.</p>
                <RegisterForm />
                <p>
                    Already have an account ? <Link to="/login">Login</Link>
                </p>
            </main>
    );
}

export default RegisterPage;
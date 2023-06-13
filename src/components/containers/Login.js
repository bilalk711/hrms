import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../../firebase";
import LoginView from "../views/Login/Login";

const Login = () => {
    const [form, setForm] = useState({email: "", password: ""});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const changeHandler = (e) => {
        setError(false);
        setForm({...form, [e.target.name]: e.target.value});
    }
    const onSubmit = async () => {
        setError(false);
        setLoading(true);
        try {
            await setPersistence(auth, browserLocalPersistence);
            await signInWithEmailAndPassword(auth, form.email, form.password);
            setLoading(false);
            navigate("/");
        }
        catch(error){
            setLoading(false);
            setError(true);
            console.log(error);
        }
    }
    return <LoginView error={error} loading={loading} onSubmit={onSubmit} form={form} changeHandler={changeHandler}/>
}

export default Login;
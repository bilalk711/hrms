import { FaSpinner } from "react-icons/fa";

const LoginView = ({error, loading, form, changeHandler, onSubmit}) => {
    return (<div className="w-screen relative h-screen bg-login">
        <div className="absolute m-auto bottom-0 top-0 left-0 right-0 w-2/5 h-4/5 bg-white max-w-xl max-h-96 rounded-md">
            <div className="h-full w-full flex flex-col p-8 justify-center text-center item-center">
                <div className="text-xl m-2 mb-8">
                    DIGIHUSTLE HRMS
                </div>
                <input name="email" disabled={loading} onChange={changeHandler} value={form.email} className="m-2 p-2 border border-gray-200" placeholder="Username"/>
                <input name="password" disabled={loading} onChange={changeHandler} value={form.password} type="password" className="m-2 p-2 border border-gray-200" placeholder="Password"/>
                <div className="cursor-pointer m p-2 text-emerald-500 text-left hover:text-emerald-600">
                    Forgot Password?
                </div>
                {error && <div className="m p-2 text-red-600 text-left">
                    Email or Password is incorrect!
                </div>}
                <button onClick={onSubmit} disabled={loading} className="m-2 p-2 bg-emerald-500 text-white text-center justify-center text-lg font-semibold rounded-lg hover:bg-emerald-600">
                    {!loading ? 
                        "LOGIN"
                        :
                    <FaSpinner size={28} className="animate-spin m-auto"/>}
                </button>
            </div>
        </div>
    </div>)
}

export default LoginView;
import { useNavigate } from 'react-router-dom';
import icon from '../../assets/google_icon.png'
import { googleProvider, auth } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";

export default function GoogleLogin({setUser}){
    const navigate = useNavigate()

    async function LoginWithGoogle(){
        try{
            await signInWithPopup(auth, googleProvider)
            setUser(auth.currentUser)
            navigate("/")
        }
        catch(err){ console.error(err)}
    }

    return(
        <>
        <span className='google-login' onClick={() => LoginWithGoogle()}>
            <img src={icon} className='icon'/>
            Sign up with Google
        </span>
        <p style={{"marginBottom":"0px","marginTop":"10px"}}>or</p>
        </>
    )
}
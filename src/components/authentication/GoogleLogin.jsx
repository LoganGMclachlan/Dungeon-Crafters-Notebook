import icon from '../../assets/google_icon.png'

export default function GoogleLogin({setUser}){
    return(
        <span className='google-login'>
            <img src={icon} className='icon'/>
            Sign up with Google
        </span>
    )
}
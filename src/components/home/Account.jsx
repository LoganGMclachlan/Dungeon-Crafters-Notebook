import { auth } from "../../config/firebase"
import { signOut } from "firebase/auth"

export default function Account({user,setUser}){
    async function Logout(){
        try{
            await signOut(auth)
            setUser(null)
        }
        catch(error){ console.error(error) }
    }

    return(
        <>
            {user.photoURL && <img src={user.photoURL} className="user-img"/>}
            <h2>{user.email}</h2>
            {user.displayName && <h2>{user.displayName}</h2>}
            <button onClick={Logout} className="form-btn">Logout</button>
        </>
    )
}
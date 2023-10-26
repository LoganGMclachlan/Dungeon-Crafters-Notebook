export default function Account({user,logout}){
    return(
        <>
            <h1>Account</h1>
            <button onClick={logout}>Logout</button>
        </>
    )
}
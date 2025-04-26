import { useAppDispatch, useAppSelector } from "../../app/store"
import { selectAllUsers, selectUsersStatus } from "../users/usersSlice"
import { useNavigate } from "react-router-dom"
import { userLoggedIn } from "@/features/auth/authSlice"
import { ECDH } from "crypto"
import { fetchUsers } from "../users/usersSlice"
import { useEffect } from "react"

interface LoginPageFormFields extends HTMLFormControlsCollection{
    username:HTMLSelectElement
}

interface LoginPageFormElement extends HTMLFormElement{
    readonly elements: LoginPageFormFields
}


export default function LoginPage(){
    const dispatch = useAppDispatch()

    const users = useAppSelector(selectAllUsers);
    const userStatus = useAppSelector(selectUsersStatus)

    useEffect(()=>{
        if(userStatus === 'idle'){
            dispatch(fetchUsers())
        }
    },[users,dispatch])
    const navigate = useNavigate();

    const handleSubmit = (e:React.FormEvent<LoginPageFormElement>)=>{
        e.preventDefault()

        const username = e.currentTarget.elements.username.value
        //console.log(e.currentTarget.elements)

        dispatch(userLoggedIn(username))
        navigate('/posts',{replace:true})
    }

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return(
        <section>
            <h2>Welcome to Tweeter!</h2>
            <h3>Please log in:</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">User:</label>
                <select name="username" id="username" required>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <button type="submit">Log In</button>
            </form>

        </section>
    )
}
import { useAppSelector } from "@/app/store";
import { selectUserById } from "../users/usersSlice";

interface PostAuthorProps {
    userId : string
    showPrefix? : boolean
}

export default function PostAuthor({userId,showPrefix = true}:PostAuthorProps){
    const author = useAppSelector(state => selectUserById(state,userId));


    return( 
        <span>
            {showPrefix ? 'by ': null}
            {author?.name ?? 'Unknown author'}
        </span>
    )
}
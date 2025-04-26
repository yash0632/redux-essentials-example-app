import { useAppDispatch } from "@/app/store";
import { ReactionName,reactionAdded,Post } from "./postsSlice";

const reactionEmoji : Record<ReactionName,string>={
    thumbsUp:"👍",
    tada:"🎉",
    heart:"❤️",
    rocket:"🚀",
    eyes:"👀"
}
interface ReactionButtonsProps{
    post:Post
}


export default function ReactionButtons({post}:ReactionButtonsProps){
    const dispatch = useAppDispatch();

    const ReactionButtons = Object.entries(reactionEmoji).map((reactionEmoji)=>{
        return(
            <button 
                key={reactionEmoji[0]} 
                onClick={()=>{
                    dispatch(reactionAdded({
                        postId:post.id,
                        reaction:reactionEmoji[0] as ReactionName
                    }))
                }}
                className="muted-button reaction-button"
            >
                {reactionEmoji[1]} {post.reactions[reactionEmoji[0] as ReactionName]}
            </button>
        )
    })

    return <div>{ReactionButtons}</div>
}
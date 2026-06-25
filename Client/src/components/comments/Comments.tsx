import { useState } from "react";
//question actions
import {useDispatch, useSelector} from "react-redux"
import {EditDeleteComment} from "./EditDeleteComment";
import {isEmpty} from "../../Utils"



export const Comments = (commentProps: any) => {

  type appDispatch = () => any

  const [commentText, setCommentText] = useState("")
  const user = useSelector((state: any) => state.userReducer)
  const question = useSelector((state:any) => state.questionReducer)
  const users = useSelector((state: any)=> state.allUsersReducer)
  const useAppDispatch = () => useDispatch<appDispatch>()
  const dispatch = useAppDispatch()

  const handleComments = (e:any) => {
      e.preventDefault()

      if (commentText) {
          addCommentQuestion(question._id, commentProps._id, user._id, commentText, user.name, dispatch)
              .then(()=> getQuestion(question._Id, dispatch))
              .then(()=> setCommentText(""))
      }
  }

return (
  <div>
      {commentProps.comments.map((comment: any)=> {
          return (
              <div key={comment._id}>
                  <div>
                      <img src={!isEmpty(users[0]) && users.map((user: any)=> {
                          if(user._id === comment.commenterId) return user.picture
                          else return null
                      })
                      .join("")
                      }
                      />
                  </div>

                  <div>
                      <h3>{comment.commenterName}</h3>
                  </div>
                  <p>{comment.text}</p>
                  <EditDeleteComment _id={comment._id}
                    questionId={comment.questionId}
                    commenterId={comment.commenterId}
                    text={comment.text}
                  />
              </div>
          )
      })}

      {user._id && (
          <form action='' onSubmit={handleComments}>
              <input
              type="text"
              name='text'
              onChange={(e)=> setCommentText(e.target.value)}
              value={commentText}
              placeholder="Laisser un commentaire"
              />
              <br/>
              <input type="submit" value="Envoyer" />
          </form>
          )
      }
  </div>
)
}

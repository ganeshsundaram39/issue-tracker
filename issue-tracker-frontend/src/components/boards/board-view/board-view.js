import React, { useEffect, useState } from "react"
import "./board-view.scss"
import Board from "react-trello"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useSnackbar } from "notistack"
import { useHistory } from "react-router-dom"

import {
  getBoardById,
  setBoardHeaderTitle,
  updateLanes,
} from "../../../state/actions/board.action"
import Loader from "../../common/loader/loader"
import {
  resetBackgroundImage,
  setBackgroundImage,
} from "../../../state/actions/app.action"

const BoardView = () => {
  const dispatch = useDispatch()
  const [lanes, setLanes] = useState({ lanes: [] })
  const [lanesLoaded, setLanesLoaded] = useState(false)

  const { boardId } = useParams()
  let history = useHistory()
  const { enqueueSnackbar } = useSnackbar()

  const onGetParticularBoardById = useSelector(
    (state) => state.board.onGetParticularBoardById
  )
  const particularBoardById = useSelector(
    (state) => state.board.particularBoardById
  )
  useEffect(() => {
    dispatch(getBoardById(boardId))
  }, [dispatch, boardId])

  useEffect(() => {
    if (!onGetParticularBoardById && particularBoardById) {
      if(particularBoardById.title && particularBoardById.boardBackgroundImg  ){
      document.title = "IssueTracker | Board | " + particularBoardById.title
      dispatch(setBoardHeaderTitle("Board | " + particularBoardById.title))
      dispatch(setBackgroundImage(particularBoardById.boardBackgroundImg))
        const { lanes } = particularBoardById
        setLanes({ lanes })
      } else {
        enqueueSnackbar('Board Not Found', { variant: "error" })
        history.push("/404")
      }
      setLanesLoaded(true)
    }
  }, [onGetParticularBoardById, particularBoardById,dispatch,history,enqueueSnackbar])

  useEffect(() => {
    document.querySelector(".board-view").scrollIntoView()
    return () => {
      dispatch(resetBackgroundImage())
    }
  }, [dispatch])



  const shouldReceiveNewData = (lanes) => {
    console.log("Board has changed")
    console.log(lanes)
    if (!onGetParticularBoardById && particularBoardById && lanesLoaded) {
      if(particularBoardById.title && particularBoardById.boardBackgroundImg  ){
      dispatch(updateLanes({boardId,lanes: lanes?.lanes}))
      }
    }
  }

  const handleCardDelete = (cardId, laneId) => {
    console.log(`Card: ${cardId} deleted from lane: ${laneId}`)
  }

  const handleCardAdd = (card, laneId) => {
    console.log(`New card added to lane ${laneId}`)
    console.log(card)
  }
  return (
    <div className="board-view">
      {onGetParticularBoardById ||!particularBoardById || !lanesLoaded? (
        <Loader backgroundColor={"transparent"} />
      ) : (
        <Board
          data={ lanes}
          draggable
          editable
          canAddLanes
          editLaneTitle
          onLaneAdd={(t) =>
            console.log("You added a line with title " + t.title)
          }
          onDataChange={shouldReceiveNewData}
          onCardDelete={handleCardDelete}
          onCardAdd={handleCardAdd}
          onCardUpdate={(cardId, data) =>
            console.log(
              `onCardUpdate: ${cardId} -> ${JSON.stringify(data, null, 2)}`
            )
          }
          onLaneUpdate={(laneId, data) =>
            console.log(`onLaneUpdate: ${laneId} -> ${data.title}`)
          }
          onCardClick={(cardId, metadata, laneId) =>
            console.log(
              `Card with id:${cardId} clicked. Card in lane: ${laneId}`
            )
          }
        />
      )}
    </div>
  )
}

export default BoardView

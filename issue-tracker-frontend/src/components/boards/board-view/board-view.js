import React, { useEffect, useState } from "react"
import "./board-view.scss"
import Board from "react-trello"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import {
  getBoardById,
  setBoardHeaderTitle,
} from "../../../state/actions/board.action"
import Loader from "../../common/loader/loader"
import {
  resetBackgroundImage,
  setBackgroundImage,
} from "../../../state/actions/app.action"

const BoardView = () => {
  const dispatch = useDispatch()
  const [lanes, setLanes] = useState({ lanes: [] })
  const { boardId } = useParams()
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
      document.title = "IssueTracker | Board | " + particularBoardById.title
      dispatch(setBoardHeaderTitle("Board | " + particularBoardById.title))
      dispatch(setBackgroundImage(particularBoardById.boardBackgroundImg))
      const { lanes } = particularBoardById
      setLanes({ lanes })
    }
  }, [onGetParticularBoardById, particularBoardById,dispatch])

  useEffect(() => {
    document.querySelector(".board-view").scrollIntoView()
    return () => {
      dispatch(resetBackgroundImage())
    }
  }, [dispatch])

  const shouldReceiveNewData = (nextData) => {
    console.log("Board has changed")
    console.log(nextData)
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
      {onGetParticularBoardById ? (
        <Loader backgroundColor={"transparent"} />
      ) : (
        <Board
          data={lanes?.lanes?.length ? lanes : { lanes: [] }}
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

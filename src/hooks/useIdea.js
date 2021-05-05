import { useReducer, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { database } from "../firebase";

const ACTIONS = {
  SELECT_IDEA: "select-idea",
  UPDATE_IDEA: "update-idea",
  SET_CHILD_IDEAS: "set-child-ideas",
};

const ROOT_IDEA = { name: "Root", id: null, path: [] };

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.SELECT_IDEA:
      return {
        ideaId: payload.ideaId,
        idea: payload.idea,
        childIdeas: [],
      };
    case ACTIONS.UPDATE_IDEA:
      return {
        ...state,
        idea: payload.idea,
      };
    case ACTIONS.SET_CHILD_IDEAS:
      return {
        ...state,
        childIdeas: payload.childIdeas,
      };
    default:
      return state;
  }
}

export function useIdea(ideaId = null, idea = null) {
  const [state, dispatch] = useReducer(reducer, {
    ideaId,
    idea,
    childIdeas: [],
  });

const { currentUser } = useAuth()

  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_IDEA, payload: { ideaId, idea } });
  }, [ideaId, idea]);

  useEffect(() => {
    if (ideaId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_IDEA,
        payload: { idea: ROOT_IDEA },
      });
    }
    database.ideas
      .doc(ideaId)
      .get()
      .then((doc) => {
        dispatch({
          type: ACTIONS.UPDATE_IDEA,
          payload: { idea: database.formatDoc(doc) },
        });
      })
      .catch(() => {
        dispatch({
          type: ACTIONS.UPDATE_IDEA,
          payload: { idea: ROOT_IDEA },
        });
      });
  }, [ideaId]);

  useEffect(() => {
    return database.ideas
      .where("parentId", "==", ideaId)
      .where("userId", "==", currentUser.uid)
      .orderBy("createdAt")
      .onSnapshot(snapshot => {
        dispatch({
          type: ACTIONS.SET_CHILD_IDEAS,
          payload: { childIdeas: snapshot.docs.map(database.formatDoc) },
        })
      })
  }, [ideaId, currentUser])

  return state;
}

import * as fromBoard from '../board/board.actions';

export interface State {
    human: string;
    ai: string;
    turn: number;
    cells: string[];
    pointsHuman: number;
    pointsAi: number;
};

const initialState: State = {
    human: 'x',
    ai: 'o',
    turn: 0,
    cells: Array(9).fill(''),
    pointsHuman: 0,
    pointsAi: 0
};

export function reducer(state = initialState, action: fromBoard.Actions): State {

    switch (action.type) {

        case fromBoard.ActionTypes.SET_CELL: {
            const cells = state.cells.slice(0);

            cells[action.payload.in] = action.payload.player;

            return Object.assign({}, state, <State>{
                cells: cells,
                turn: state.turn ? 0 : 1
            });
        }

        case fromBoard.ActionTypes.ADD_POINTS_AI: {
          let pointsAi = state.pointsAi;
          pointsAi++;
          return  Object.assign({}, state, <State>{
            pointsHuman: pointsAi
          });
        }

        case fromBoard.ActionTypes.ADD_POINTS_HUMAN: {
          let pointsHuman = state.pointsHuman;
          pointsHuman++;
          return  Object.assign({}, state, <State>{
            pointsHuman: pointsHuman
          });
        }

      default:
        return state;
    }
}

export const getCells = (state: State) => state.cells;
export const getPointsHuman = (state: State) => state.pointsHuman;
export const getPointsAI = (state: State) => state.pointsAi;

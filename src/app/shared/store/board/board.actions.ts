import { Action } from '@ngrx/store';
import { type } from '../../../shared/util';

export const ActionTypes = {
  SET_CELL: type('[Board] Set Cell'),
  AI_TURN: type('[Board] AI Turn'),
  MY_TURN: type('[Board] My Turn'),
  RESET_GAME: type('[Board] Reset Game'),

  ADD_POINTS_HUMAN: type('[Board] Add Points Human'),
  ADD_POINTS_AI: type('[Board] Add Points AI'),
};

export class addPointsHumanAction implements Action {
  type = ActionTypes.ADD_POINTS_HUMAN;
  constructor(public payload: any) { }
}

export class addPointsAIAction implements Action {
  type = ActionTypes.ADD_POINTS_AI;
  constructor(public payload: any) { }
}

export class SetCellAction implements Action {
  type = ActionTypes.SET_CELL;

  constructor(public payload: { in: number, player: string }) { }
}

export class AITurnAction implements Action {
  type = ActionTypes.AI_TURN;

  constructor(public payload?: {}) { }
}

export class MyTurnAction implements Action {
  type = ActionTypes.MY_TURN;

  constructor(public payload: { in: number }) { }
}

export class ResetGameAction implements Action {
  type = ActionTypes.RESET_GAME;

  constructor(public payload?: any) { }
}

export type Actions
  = MyTurnAction
  | AITurnAction
  | SetCellAction
  | ResetGameAction
  | addPointsHumanAction
  | addPointsAIAction
  ;

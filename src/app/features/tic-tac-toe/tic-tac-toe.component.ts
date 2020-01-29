import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { selectorPointsAi, selectorPointsHuman, State } from 'app/shared/store';
import { getBoardCells, getWinner } from '../../shared/store';
import * as fromBoard from 'app/shared/store/board/board.actions';
import { WinningModes } from 'app/shared/winner.service';

import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent {

  public cells$: Observable<string[]>;
  public pointsHuman$: Observable<number>;
  public pointsAI$: Observable<number>;

  constructor(
    public store: Store<State>) {
    this.cells$ = store.select(getBoardCells);
    this.pointsHuman$ = store.select(selectorPointsHuman);
    this.pointsAI$ = store.select(selectorPointsAi);

    store.select(getWinner)
      .filter(winner => winner == WinningModes.Win)
      .subscribe(winner => {
        this.store.dispatch(new fromBoard.addPointsHumanAction( null));
        this.pointsHuman$ = store.select(selectorPointsHuman);
      });

    store.select(getWinner)
      .filter(winner => winner == WinningModes.Lose)
      .subscribe(winner => {
        this.store.dispatch(new fromBoard.addPointsAIAction( null));
        this.pointsAI$ = store.select(selectorPointsAi);
      });
  }

  update(cell: number) {
    this.store.dispatch(new fromBoard.MyTurnAction({ in: cell }));
  }

  winning(winner: WinningModes) {

    switch (winner) {
      case WinningModes.Draw: alert('it is a draw!'); break;
      case WinningModes.Win: {
        alert('you win!');
      } break;
      case WinningModes.Lose: alert('you lose!'); break;
    }

    this.reset();
  }

  reset() {
    this.store.dispatch(new fromBoard.ResetGameAction());
  }
}

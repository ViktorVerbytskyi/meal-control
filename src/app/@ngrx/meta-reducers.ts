import { ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';

export function mr(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('State before: ', state);
    console.log('Action: ', action);

    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [mr]
  : [];

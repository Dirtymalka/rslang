import { createAction, props } from '@ngrx/store';
import { IWord } from '../../modules/shared/models/word.models';

export const fetchGroup0 = createAction(
  '[bookWords bookWords] Fetch Group0 Success',
  props<{ words: IWord[] }>(),
);

export const fetchGroup1 = createAction(
  '[bookWords bookWords] Fetch Group1 Success',
  props<{ words: IWord[] }>(),
);

export const fetchGroup2 = createAction(
  '[bookWords bookWords] Fetch Group2 Success',
  props<{ words: IWord[] }>(),
);

export const fetchGroup3 = createAction(
  '[bookWords bookWords] Fetch Group3 Success',
  props<{ words: IWord[] }>(),
);

export const fetchGroup4 = createAction(
  '[bookWords bookWords] Fetch Group4 Success',
  props<{ words: IWord[] }>(),
);

export const fetchGroup5 = createAction(
  '[bookWords bookWords] Fetch Group5 Success',
  props<{ words: IWord[] }>(),
);

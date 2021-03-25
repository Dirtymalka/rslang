export interface IGamesState {
  hangman: {
    contents?: unknown;
  };
  savanna: {
    contents?: unknown;
  };
  audioCall: {
    contents?: unknown;
  };
  sprint: {
    contents?: unknown;
  };
}

export const initialGamesState: IGamesState = {
  hangman: {},
  savanna: {},
  audioCall: {},
  sprint: {},
};

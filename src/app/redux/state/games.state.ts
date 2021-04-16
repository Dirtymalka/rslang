export interface IGamesState {
  hangman: {
    contents?: unknown;
    words?: [];
  };
  savanna: {
    contents?: unknown;
  };
  audioCall: {
    contents?: unknown;
    words?: [];
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

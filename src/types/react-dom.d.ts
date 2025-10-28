declare module 'react-dom' {
  export function useFormState<State, Payload>(
    action: (state: State, payload: Payload) => State | Promise<State>,
    initialState: State,
  ): [State, (payload: Payload) => void];

  export function useFormStatus(): {
    pending: boolean;
    data?: FormData;
    method?: string;
    action?: string;
  };
}

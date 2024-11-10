import * as React from 'react';

export type AppContextType = {
  habitsArr: string[]
  inputValue: string
  isActive: boolean
}

export const AppContext = React.createContext<
  [AppContextType, React.Dispatch<React.SetStateAction<AppContextType>>]
>([{ habitsArr: [], inputValue: '', isActive: false }, () => {}])
import { TypedUseSelectorHook,useSelector as useReduxSelector } from 'react-redux'

import { RootState } from './index'

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector

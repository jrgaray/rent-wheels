import React from 'react'
import { queries, RenderOptions, RenderResult } from '@testing-library/react'
import rootReducer from 'app/rootReducer'

export type RootState = ReturnType<typeof rootReducer>

export type WrapperOpts =
    | Pick<
          RenderOptions<typeof queries>,
          'container' | 'baseElement' | 'hydrate' | 'wrapper'
      >
    | undefined

export type CustomRenderer = (
    ui: React.ReactElement,
    options?: WrapperOpts
) => RenderResult

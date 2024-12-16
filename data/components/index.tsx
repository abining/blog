/* eslint-disable @stylistic/max-len */
/* eslint-disable @stylistic/function-paren-newline */
'use client'

import { createElement, lazy } from 'react'
import { handleComponentName } from '@/plugins/constant'
import IntersectionObserverComponent from '@/components/IntersectionObserverComponent'
import Playground from './playground'
import CodeRunner from './code-runner'
import Switcher from './switcher'
import { isPlayground } from '@/plugins/remark/code-block/playground-utils'
import { isRuner } from '@/plugins/remark/runner-utils'
import { isSwitcher } from '@/plugins/remark/code-block/switcher-utils'

const ThreeFirstScene = lazy(() => import('./three/ThreeFirstScene'))
const ThreePureFirstScene = lazy(() => import('./three/ThreePureFirstScene'))
const ThreeControlPureFirstScene = lazy(
  () => import('./three/ThreeControlPureFirstScene'),
)
const ThreeLightPureFirstScene = lazy(
  () => import('./three/ThreeLightPureFirstScene'),
)
const ThreePureLine = lazy(() => import('./three/ThreePureLine'))
const ThreePureText = lazy(() => import('./three/ThreePureText'))
const ThreePureModel = lazy(() => import('./three/ThreePureModel'))
const ThreeLearnPrimitivesBox = lazy(
  () => import('./three/ThreeLearnPrimitivesBox'),
)
const ThreeSunEarthMoon = lazy(() => import('./three/ThreeSunEarthMoon'))
const ThreeMaterialKinds = lazy(() =>
  import('./three/ThreeMaterialKinds').then((res) => ({
    default: res.ThreeMaterialKinds,
  })),
)
const ThreeMaterialKindsShininess = lazy(() =>
  import('./three/ThreeMaterialKinds').then((res) => ({
    default: res.ThreeMaterialKindsShininess,
  })),
)
const ThreeMaterialToonKind = lazy(() =>
  import('./three/ThreeMaterialKinds').then((res) => ({
    default: res.ThreeMaterialToonKind,
  })),
)
const ThreeTexture = lazy(() =>
  import('./three/ThreeTexture').then((res) => ({
    default: res.ThreeTexture,
  })),
)
const ThreeTextureMulti = lazy(() =>
  import('./three/ThreeTexture').then((res) => ({
    default: res.ThreeTextureMulti,
  })),
)
const ThreeLilGuiFirst = lazy(() => import('./three/ThreeLilGuiFirst'))
const ThreePureAmbientLight = lazy(
  () => import('./three/ThreePureAmbientLight'),
)

const Gallery = lazy(() => import('./gallery/index'))
const Iframe = lazy(() => import('./iframe/index'))

export const componentMap: Record<string, any> = {
  Playground,
  Run: CodeRunner,
  Gallery,
  Iframe,
  Switcher,
  // Three.js
  ThreeLearnPrimitivesBox,
  ThreeFirstScene,
  ThreePureFirstScene,
  ThreeControlPureFirstScene,
  ThreeLightPureFirstScene,
  ThreePureLine,
  ThreePureText,
  ThreePureModel,
  ThreeSunEarthMoon,
  ThreeMaterialKinds,
  ThreeMaterialKindsShininess,
  ThreeMaterialToonKind,
  ThreeTexture,
  ThreeTextureMulti,
  ThreeLilGuiFirst,
  ThreePureAmbientLight,
}

function CustomComponent(props: any) {
  const componentName = handleComponentName(props)
  const value = componentMap[componentName]

  if (value) {
    if (isPlayground(props) || isRuner(props) || isSwitcher(props)) {
      return createElement(value, props)
    }
    return (
      <IntersectionObserverComponent props={props}>
        {value}
      </IntersectionObserverComponent>
    )
  }
  return props.children
}

export default CustomComponent

/// <reference types="next" />
/// <reference types="next/image-types/global" />

// CSS module declarations
declare module '*.css' {
  const styles: { [className: string]: string }
  export default styles
}

// SVG as React component
declare module '*.svg' {
  import type { FC, SVGProps } from 'react'
  const ReactComponent: FC<SVGProps<SVGSVGElement>>
  export default ReactComponent
}

import { useReveal } from '../hooks/useReveal'

/**
 * Wraps children in a div that fades/slides in on first scroll.
 * `delay` staggers siblings so grids cascade instead of popping in together.
 */
export function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const [ref, visible] = useReveal()

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-visible={visible ? 'true' : 'false'}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Reveal

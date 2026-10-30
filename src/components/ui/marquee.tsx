import * as React from "react"
import { cn } from "cn"

type MarqueeProps = React.ComponentProps<"div"> & {
  /** Whether to reverse the scroll direction */
  reverse?: boolean
  /** Whether to pause the animation on hover */
  pauseOnHover?: boolean
  /** Whether to scroll vertically */
  vertical?: boolean
  /** How many times to repeat the children */
  repeat?: number
}

function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 2,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      data-slot="marquee"
      className={cn(
        "group relative overflow-hidden",
        vertical && "h-full",
        className
      )}
      {...props}
    >
      <div
        data-slot="marquee-track"
        className={cn(
          "flex w-max min-w-full shrink-0 grow-0 animate-marquee motion-reduce:animate-none [--duration:60s]",
          vertical ? "h-full w-auto flex-col" : "flex-row",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {Array.from({ length: repeat }).map((_, copy) => (
          <div
            key={copy}
            aria-hidden={copy > 0}
            data-slot="marquee-group"
            className={cn("flex shrink-0 grow-0", vertical ? "w-full flex-col" : "flex-row")}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  )
}

export { Marquee, type MarqueeProps }

"use client"

import type React from "react"

import { useEffect, useRef, useState, type RefObject } from "react"

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "zoom-out"
  | "flip-up"
  | "flip-left"

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useScrollAnimation<T extends HTMLElement>(
  options: UseScrollAnimationOptions = {},
): [RefObject<T | null>, boolean] {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return [ref, isVisible]
}

// Animation CSS classes
export const animationVariants: Record<AnimationType, { hidden: string; visible: string }> = {
  "fade-up": {
    hidden: "opacity-0 translate-y-8",
    visible: "opacity-100 translate-y-0",
  },
  "fade-down": {
    hidden: "opacity-0 -translate-y-8",
    visible: "opacity-100 translate-y-0",
  },
  "fade-left": {
    hidden: "opacity-0 translate-x-8",
    visible: "opacity-100 translate-x-0",
  },
  "fade-right": {
    hidden: "opacity-0 -translate-x-8",
    visible: "opacity-100 translate-x-0",
  },
  "zoom-in": {
    hidden: "opacity-0 scale-95",
    visible: "opacity-100 scale-100",
  },
  "zoom-out": {
    hidden: "opacity-0 scale-105",
    visible: "opacity-100 scale-100",
  },
  "flip-up": {
    hidden: "opacity-0 rotate-x-12",
    visible: "opacity-100 rotate-x-0",
  },
  "flip-left": {
    hidden: "opacity-0 rotate-y-12",
    visible: "opacity-100 rotate-y-0",
  },
}

// Animated component wrapper
interface AnimatedProps {
  children: React.ReactNode
  animation?: AnimationType
  delay?: number
  duration?: number
  className?: string
  threshold?: number
}

export function Animated({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  className = "",
  threshold = 0.1,
}: AnimatedProps) {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold })
  const variant = animationVariants[animation]

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${isVisible ? variant.visible : variant.hidden} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// Staggered animation container
interface StaggeredContainerProps {
  children: React.ReactNode
  animation?: AnimationType
  staggerDelay?: number
  duration?: number
  className?: string
  childClassName?: string
  threshold?: number
}

export function StaggeredContainer({
  children,
  animation = "fade-up",
  staggerDelay = 100,
  duration = 700,
  className = "",
  childClassName = "",
  threshold = 0.1,
}: StaggeredContainerProps) {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold })
  const variant = animationVariants[animation]
  
  // Handle undefined or null children
  if (!children) {
    return <div ref={ref} className={className} />;
  }
  
  const childrenArray = Array.isArray(children) ? children : [children]

  return (
    <div ref={ref} className={className}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={`transition-all ease-out ${isVisible ? variant.visible : variant.hidden} ${childClassName}`}
          style={{
            transitionDuration: `${duration}ms`,
            transitionDelay: `${index * staggerDelay}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

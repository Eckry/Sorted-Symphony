import { algorithms } from "./consts";

export type Algorithm = typeof algorithms[keyof typeof algorithms]

export type Block = {
  val: number
  color: string
}

export interface Configuration {
  velocity: number
  elements: number
}

export type ConfigurationVelocity = Pick<Configuration, "velocity">;
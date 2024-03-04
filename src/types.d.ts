import { algorithms, languages } from "./consts";

export type Algorithm = typeof algorithms[keyof typeof algorithms]

export type Language = typeof languages[keyof typeof languages]

export type Block = {
  val: number
  color: string
}

export interface Configuration {
  velocity: number
  elements: number
}

export type ConfigurationElements = Pick<Configuration, "elements">;
export type ConfigurationVelocity = Pick<Configuration, "velocity">;
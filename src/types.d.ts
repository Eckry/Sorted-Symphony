import { algorithms } from "./consts";

export type Algorithm = typeof algorithms[keyof typeof algorithms]

export type Block = {
  val: number
  color: string
}
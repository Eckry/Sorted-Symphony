import { algorithms } from "./consts";

export type Algorithm = typeof algorithms[keyof typeof algorithms]
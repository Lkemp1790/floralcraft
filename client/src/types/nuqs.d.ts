declare module 'nuqs' {
  export function useQueryState<T = any>(key: string, parser: any): [T, (value: T) => void]
  export function parseAsStringEnum<T extends readonly string[]>(values: T): any
  export const parseAsString: any
  export const parseAsArrayOf: (parser: any) => any
}



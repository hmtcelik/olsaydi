export interface ApiResObject{
  "date": string[]
  "value": number[]
}

export interface ChartObject{
  "date": string
  "badget": number
  "dolar": number
}

export interface ChartPayloadObjectArray{
  [index: number]: { name: string; value: number; unit: number };
}

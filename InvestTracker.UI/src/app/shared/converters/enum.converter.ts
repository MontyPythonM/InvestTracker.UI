import { EnumObject } from "../models/enum-object.model";

export const enumToObjects = (enumType: any): EnumObject[] => {
  return Object.entries(enumType)
    .filter((entry: [any, any]) => !isNaN(entry[0]))
    .map((entry: [string, any]) => {
      return { index: parseInt(entry[0]), value: entry[1] };
    })
}
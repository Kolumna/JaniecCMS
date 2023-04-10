// export const nestedObjectToArray = (obj) => {
//   const newArray = [];
//   for (const element in obj) {
//     newArray.push({
//       dane: Object.values(obj[element])[0],
//       id: Object.keys(obj[element])[0],
//     });
//   }
//   return newArray;
// };

import { objectToArrayWithId } from "./object";

export const nestedObjectToArray = (obj) => {
  const newArray = [];
  for (const element in obj) {
    newArray.push(
      objectToArrayWithId(obj[element])[0]
    );
  }
  return newArray;
};
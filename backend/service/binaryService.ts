import { Task } from "../interfaces/Task"

export default function binarySearchByNumber(
  arr: Task[],
  targetNumber: number,
): Task | null {
  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    if (arr[mid].number === targetNumber) {
      return arr[mid] // Возвращаем объект Task, если элемент найден
    } else if (arr[mid].number < targetNumber) {
      left = mid + 1 // Искать в правой половине
    } else {
      right = mid - 1 // Искать в левой половине
    }
  }

  return null // Возвращаем null, если элемент не найден
}

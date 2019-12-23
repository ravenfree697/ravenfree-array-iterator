import * as SimpleStats from 'simple-statistics'

/**
 * Remove element from array
 * @param list 
 * @param elementToRemove 
 */
export function ArrayRemove<T>(list: Array<T>, elementToRemove: T) {
    return list.filter((item: T) => item !== elementToRemove)
}

/**
 * Remove element from array by index
 * @param list 
 * @param indexToRemove 
 */
export function ArrayRemoveByIndex(list: Array<any>, indexToRemove: number) {
    return list.splice(indexToRemove, 1)
}


/**
 * Swap two element in array
 * @param list 
 * @param elementIndexToMove 
 * @param moveDirection 
 */
export function ArraySwap<T>(list: Array<T>, elementIndexToMove: number, moveDirection: 'up' | 'down') {
    if (moveDirection === 'up') {
        if (elementIndexToMove === 0)
            return { newList: list, newIndex: elementIndexToMove };
        const upper = list[elementIndexToMove - 1]
        list[elementIndexToMove - 1] = list[elementIndexToMove]
        list[elementIndexToMove] = upper;
        return { newList: list, newIndex: elementIndexToMove - 1 };
    }


    else if (moveDirection === 'down') {
        if (elementIndexToMove >= list.length - 1)
            return { newList: list, newIndex: elementIndexToMove };

        const upper = list[elementIndexToMove + 1]
        list[elementIndexToMove + 1] = list[elementIndexToMove]
        list[elementIndexToMove] = upper;

        return { newList: list, newIndex: elementIndexToMove + 1 };
    }

    else return { newList: list, newIndex: elementIndexToMove };
}

export function ArraySwapExperimental<T>(list: Array<T>, elementIndexToMove: number, moveDirection: 'up' | 'down') {
    if (moveDirection === 'up') {
      [list[elementIndexToMove+1], list[elementIndexToMove]] = [list[elementIndexToMove], list[elementIndexToMove+1]]
      return list
    }

    else if (moveDirection === 'down') {
        [list[elementIndexToMove], list[elementIndexToMove-1]] = [list[elementIndexToMove-1], list[elementIndexToMove]]
        return list
    }
}

/**
 * True clone two arrays - no reference
 * @param list 
 */
export function ArrayClone<T>(list: Array<T>) {
    return JSON.parse(JSON.stringify(list));
}

/**
 * Find number extreme in array of objects
 * @param list 
 * @param numberObjectPropertySelector 
 * @param extremeType 
 */
export function ArrayNumberExtreme<T>(list: Array<T>, numberObjectPropertySelector: (item: T) => number, extremeType: 'max' | 'min') {
    let numberValues: number[] = ExtractPropertyFromArray(list, numberObjectPropertySelector)
    return extremeType === 'max' ? SimpleStats.max(numberValues) : SimpleStats.min(numberValues)
}

/**
 * Does any of this element exist in array?
 * @param itemsList 
 * @param conditionFunc 
 */
export function ArrayAny<T>(itemsList: T[], conditionFunc: (item: T) => boolean) {
    itemsList.forEach(item => {
        if (conditionFunc(item))
            return true
    })
    return false;
}

/**
 * Extract object property from all elements in array
 * @param itemsList 
 * @param selectorFunc 
 */
export function ExtractPropertyFromArray<T, V>(itemsList: T[], selectorFunc: (item: T) => V) {
    let returnArray: V[] = []
    itemsList.forEach(item => {
        returnArray.push(selectorFunc(item))
    })
    return returnArray;
}


/**
 * Group by elements in array
 * @param ItemsList 
 * @param KeyGetterFunc 
 */
export function ArrayGroupBy<T>(ItemsList: T[], KeyGetterFunc: (item: T) => string) {
    const map = new Map<string, T[]>()
    ItemsList.forEach(item => {
        const key = KeyGetterFunc(item)
        const mapCollection = map.get(key)

        if (!mapCollection) {
            map.set(key, [item])
        }
        else {
            mapCollection.push(item)
        }
    })

    return map;
}

/**
 * Summarize all values in array
 * @param ItemsList 
 * @param NumberSelectorFunc 
 */
export function ArraySumAll<T>(ItemsList: T[], NumberSelectorFunc: (item: T) => number): number {
    let returnValue = 0;
    ItemsList.forEach(item => {
        returnValue += NumberSelectorFunc(item)
    })
    return returnValue;
}

export function ArraySortByString<T>(ItemList: T[], StringParameterSelectorFunc: (item: T) => string, isDescensing?: boolean) {
    if (!isDescensing)
        return ItemList.sort((itemA: T, ItemB: T) => {
            if (StringParameterSelectorFunc(itemA) < StringParameterSelectorFunc(ItemB)) { return -1; }
            if (StringParameterSelectorFunc(itemA) > StringParameterSelectorFunc(ItemB)) { return 1; }
            return 0;
        })
    else
        return ItemList.sort((itemA: T, ItemB: T) => {
            if (StringParameterSelectorFunc(itemA) > StringParameterSelectorFunc(ItemB)) { return -1; }
            if (StringParameterSelectorFunc(itemA) < StringParameterSelectorFunc(ItemB)) { return 1; }
            return 0;
        })
}

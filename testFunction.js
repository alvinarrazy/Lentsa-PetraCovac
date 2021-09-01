
const data = [5,5,4,2,9,7,8,4]

function getAvg(grades) {
    const total = grades.reduce((acc, c) => acc + c, 0);
    return total / grades.length;
}

var average = getAvg(data)

function getCluster() {

}

function partition(items, left, right) {
    //rem that left and right are pointers.

    let pivot = items[Math.floor((right + left) / 2)],
        i = left, //left pointer
        j = right; //right pointer

    while (i <= j) {
        //increment left pointer if the value is less than the pivot
        while (items[i] < pivot) {
            i++;
        }

        //decrement right pointer if the value is more than the pivot
        while (items[j] > pivot) {
            j--;
        }

        //else we swap.
        if (i <= j) {
            [items[i], items[j]] = [items[j], items[i]];
            i++;
            j--;
        }
    }

    //return the left pointer
    return i;
}

function quickSort(items, left, right) {
    let index;

    if (items.length > 1) {
        index = partition(items, left, right); //get the left pointer returned

        if (left < index - 1) {
            //more elements on the left side
            quickSort(items, left, index - 1);
        }

        if (index < right) {
            //more elements on the right side
            quickSort(items, index, right);
        }
    }

    return items; //return the sorted array
}
var sortedData = quickSort(data, 0, data.length -1)

function grouping(sortedData, member){
    var data = sortedData
    var newGroup = []
    var groups = {}
    var isUpperDataTurn = true
    var active = true
    while(active){
        var first = 0;
        var last = sortedData.length - 1
        if(isUpperDataTurn){
            newGroup.push(sortedData[first])
            sortedData.shift()
            data = sortedData
            isUpperDataTurn = !isUpperDataTurn
        }else{
            newGroup.push(sortedData[last])
            sortedData.pop()
            data = sortedData
            isUpperDataTurn = !isUpperDataTurn
        }
        if(newGroup.length >= member){
            groups = {
                ...groups,
                newGroup
            }
            newGroup = []
        }
        if(sortedData.length === 0){
            active = false
        }
    }
    return groups
}

//ConsoleHelper(grouping(sortedData, 3))
// ConsoleHelper(quickSort(data, 0, data.length - 1))

function binarySearch(arr, element){

    let start = 0
    let end = arr.length - 1
    let midPoint = Math.floor((start + end) / 2)

    while(arr[midPoint] !== element && start < end) {
        if (element < arr[middle]) {
            stop = middle - 1
        } else {
            end = middle + 1
        }
        midPoint = Math.floor((start + midPoint) / 2)
    }

    return (arr[midPoint] !== element) ? -1 : midPoint
}

function recursiveBinarySearch(arr, element, midPoint=Math.floor(arr.length-1)/2, start=0, end=arr.length-1){
   if(start === end){
       return arr[midPoint] === element  ?  midPoint : -1;
   }
   if(arr[midPoint] === element){
       return midPoint;
   }else if(arr[midPoint] < element){
        start = midPoint + 1;
        midPoint = Math.floor((start + end) / 2)
        return recursiveBinarySearch(arr, element, midPoint, start, end);
   }else{
        end = midPoint - 1;
        midPoint = Math.floor((start + end) / 2)
        return recursiveBinarySearch(arr, element, midPoint, start, end);
   }
}

module.exports = {
    binarySearch,
    recursiveBinarySearch
}
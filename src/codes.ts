export const codes = {
  BubbleSort: {
    javascript: `for(let i = 0; i < n; i++){
  for(let j = 0; j + 1 < n - i; j++){
    if(arr[j] > arr[j + 1]){
      let temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
    }
  }
}`,
    python: `for i in range(n):
  for j in range(n - i - 1):
    if arr[j] > arr[j + 1]:
      temp = arr[j]
      arr[j] = arr[j + 1]
      arr[j + 1] = temp`,
      
    "cpp": `for(int i = 0; i < n; i++){
  for(int j = 0; j + 1 < n - i; j++){
    if(arr[j] > arr[j + 1]){
      int temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
    }
  }
}`,
  },
  SelectionSort: {
    javascript: `for(let i = 0; i < n; i++){
  let min = i
  for(let j = i + 1; j < n; j++){
    if(arr[min] > arr[j]){
      min = j
    }
  }
  arr[i] = arr[min]
}`,
  },
  QuickSort: {},
  MergeSort: {},
  InsertionSort: {},
  HeapSort: {},
};

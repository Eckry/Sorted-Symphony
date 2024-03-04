export const codes = {
  BubbleSort: {
    javascript: `for(let i = 0; i < n; i++){
  for(let j = 0; j + 1 < n - i; j++){
    if(arr[j] > arr[j + 1]){
      [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
    }
  }
}`,
    python: `for i in range(n):
  for j in range(n - i - 1):
    if arr[j] > arr[j + 1]:
      arr[j], arr[j + 1] = arr[j + 1], arr[j]`,

    cpp: `for(int i = 0; i < n; i++){
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

  let minIdx = i;

  for(let j = i + 1; j < n; j++){
    if(arr[minIdx] > arr[j]){
      minIdx = j;
    }
  }
  
  [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
}`,
    python: `for i in range(n):

  minIdx = i

  for j in range(i + 1, n):
    if arr[j] < arr[minIdx]:
      minIdx = j

  arr[i], arr[minIdx] = arr[minIdx], arr[i]`,

    cpp: `for(int i = 0; i < n; i++){

  int minIdx = i;

  for(int j = i + 1; j < n; j++){
    if(arr[j] < arr[minIdx]){
      minIdx = j;
    }
  }

  int temp = arr[minIdx];
  arr[minIdx] = arr[i];
  arr[i] = temp;
}`,
  },
  QuickSort: {},
  MergeSort: {},
  InsertionSort: {},
  HeapSort: {},
};

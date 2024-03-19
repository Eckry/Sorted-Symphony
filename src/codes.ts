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
    java: `int n = arr.length;
int temp = 0;

for(int i = 0; i < n; i++){
  for(int j = 0; j + 1 < n - i; j++){
    if(arr[j] > arr[j + 1]){
      temp = arr[j];
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
  QuickSort: {
    javascript: `function quickSort(arr, l, r) {
  let center = Math.floor((l + r) / 2);
  let i = l;
  let j = r;
  const pivot = arr[center];
      
  while (i <= j) {
    while (arr[i] < pivot) i++;
    while (pivot < arr[j]) j--;
    
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      j--;
      i++;
    }
  }
    
  if (i < r) quickSort(arr, i, r);
  if (l < j) quickSort(arr, l, j);
}`,
python: `def quickSort(arr, l, r):
  center = (l + r) // 2
  i = l
  j = r
  pivot = arr[center]

  while i <= j:
    while arr[i] < pivot:
      i += 1
    while pivot < arr[j]:
      j -= 1
    if i <= j:
      arr[i], arr[j] = arr[j], arr[i]
      j -= 1
      i += 1

  if i < r:
      quickSort(arr, i, r)
  if l < j:
      quickSort(arr, l, j)`,
    cpp: `void quickSort(int arr[], int l, int r)
{
  int center = (l + r) / 2;
  int i = l;
  int j = r;
  int pivot = arr[center];

  while (i <= j)
  {
    while (arr[i] < pivot) i++;
    while (pivot < arr[j]) j--;

    if (i <= j)
    {
      int temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      j--;
      i++;
    }
  }
    
  if (i < r) quickSort(arr, i, r);
  if (l < j) quickSort(arr, l, j);
}`,
  },
  MergeSort: {},
  InsertionSort: {},
  HeapSort: {},
};

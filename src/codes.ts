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
  MergeSort: {
    javascript: `function merge(arr, p, q, r) {
  const n1 = q - p + 1;
  const n2 = r - q;
  const L = new Array(n1);
  const M = new Array(n2);
    
  for (let i = 0; i < n1; i++) L[i] = arr[p + i];
  for (let j = 0; j < n2; j++) M[j] = arr[q + 1 + j];
    
  let i = 0;
  let j = 0;
  let k = p;
    
  while (i < n1 && j < n2) {
    if (L[i] <= M[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = M[j];
      j++;
    }
    k++;
  }
    
  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }
    
  while (j < n2) {
    arr[k] = M[j];
    j++;
    k++;
  }
}
    
function mergeSort(arr, l, r) {
  if (l < r) {
    const m = l + Math.floor((r - l) / 2);
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}`,
    cpp: `void merge(int arr[], int p, int q, int r)
{
  int n1 = q - p + 1;
  int n2 = r - q;
  int L[n1];
  int M[n2];
    
  for (int i = 0; i < n1; i++) L[i] = arr[p + i];
  for (int j = 0; j < n2; j++) M[j] = arr[q + 1 + j];
    
  int i = 0;
  int j = 0;
  int k = p;
    
  while (i < n1 && j < n2)
  {
    if (L[i] <= M[j])
    {
      arr[k] = L[i];
      i++;
    }
    else
    {
      arr[k] = M[j];
      j++;
    }
    k++;
  }
    
  while (i < n1)
  {
    arr[k] = L[i];
    i++;
    k++;
  }
    
  while (j < n2)
  {
    arr[k] = M[j];
    j++;
    k++;
  }
}    

void mergeSort(int arr[], int l, int r)
{
  if (l < r)
  {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}`,
    python: `def merge(arr, p, q, r):
  n1 = q - p + 1
  n2 = r - q
  L = [0] * n1
  M = [0] * n2

  for i in range(n1):
    L[i] = arr[p + i]
  for j in range(n2):
    M[j] = arr[q + 1 + j]

  i = 0
  j = 0
  k = p

  while i < n1 and j < n2:
    if L[i] <= M[j]:
      arr[k] = L[i]
      i += 1
    else:
      arr[k] = M[j]
      j += 1
    k += 1

  while i < n1:
    arr[k] = L[i]
    i += 1
    k += 1

  while j < n2:
    arr[k] = M[j]
    j += 1
    k += 1


def mergeSort(arr, l, r):
  if l < r:
    m = l + (r - l) // 2
    mergeSort(arr, l, m)
    mergeSort(arr, m + 1, r)
    merge(arr, l, m, r)
`,
  },
  InsertionSort: {},
  HeapSort: {},
};

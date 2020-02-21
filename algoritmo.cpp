#include <algorithm>
#include <iostream>
using namespace std;
int main() {
  int array[] = { 23, 5, -10, 0, 0, 321, 1, 2, 99, 30 };
  size_t size = sizeof(array) / sizeof(array[0]); 
  sort(array, array + size);
  for (size_t i = 0; i < size; ++i) {
     cout << array[i] << ' ';
  }
  cout << endl;
}
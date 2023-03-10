#include <bits/stdc++.h>
using namespace std;

// Function to find a pair in the given
// array whose sum is equal to z
bool findPair(int a[], int n, int z)
{
	// Iterate through all the pairs
	for (int i = 0; i < n; i++)
		for (int j = 0; j < n; j++)

			// Check if the sum of the pair
			// (a[i], a[j]) is equal to z
			if (i != j && a[i] + a[j] == z)
				return true;

	return false;
}

// Driver Code
int main()
{
	// Given Input
	int a[] = { 1, -2, 1, 0, 5 };
	int z = 0;
	int n = sizeof(a) / sizeof(a[0]);

	// Function Call
	if (findPair(a, n, z))
		cout << "True";
	else
		cout << "False";
	return 0;
}
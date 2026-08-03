#include <iostream>
using namespace std;

int main() {
    int n;
    long long fact = 1;

    cin >> n;

    for (int i = 1; i <= 5; i++) {
        fact = fact * i;
    }

    cout << fact;

    return 0;
}
#include <iostream>
#include <stack>
using namespace std;

int main() {
    stack<int> s;
    int n, a = 0, b = 1, c;

    cout << "Enter number of terms: ";
    cin >> n;

    s.push(a);
    s.push(b);

    for (int i = 2; i < n; i++) {
        c = a + b;
        s.push(c);
        a = b;
        b = c;
    }

    cout << "Fibonacci series: ";

    while (!s.empty()) {
        cout << s.top() << " ";
        s.pop();
    }

    return 0;
}
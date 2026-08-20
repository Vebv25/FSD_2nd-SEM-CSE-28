#include <bits/stdc++.h>
using namespace std;

class Queue {
    vector<int> item;
    int rear;
    int front;
    int SIZE;
    int count;

public:
    Queue(int size) {
        SIZE = size;
        item.resize(SIZE);
        rear = -1;
        front = 0;
        count = 0;
    }

    bool IsEmpty() {
        return count == 0;
    }

    bool IsFull() {
        return count == SIZE;
    }

    void EnQueue(int x) {
        if (IsFull()) {
            cout << "OVERFLOW" << endl;
            return;
        }

        rear = (rear + 1) % SIZE;
        item[rear] = x;
        count++;
    }

    int DeQueue() {
        if (IsEmpty()) {
            cout << "UNDERFLOW" << endl;
            return -1;
        }

        int x = item[front];
        front = (front + 1) % SIZE;
        count--;

        return x;
    }
};

int main() {
    Queue Q(5);

    Q.EnQueue(1);
    Q.EnQueue(2);
    Q.EnQueue(3);
    Q.EnQueue(4);
    Q.EnQueue(5);

    cout << Q.DeQueue() << endl;
    cout << Q.DeQueue() << endl;

    Q.EnQueue(6);
    Q.EnQueue(7);

    cout << Q.DeQueue() << endl;
    cout << Q.DeQueue() << endl;
    cout << Q.DeQueue() << endl;
    cout << Q.DeQueue() << endl;
    cout << Q.DeQueue() << endl;

    return 0;
}
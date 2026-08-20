#include <iostream>
#define SIZE 10
using namespace std;

struct Queue {
    int item[SIZE];
    int rear;
    int front;
};

Queue Q;

void Initialize() {
    Q.rear = -1;
    Q.front = 0;
}

bool IsEmpty() {
    if (Q.rear - Q.front + 1 == 0) {
        return true;
    } else {
        return false;
    }
}

void EnQueue(int x) {
    if (Q.rear == SIZE - 1) {
        cout << "OVERFLOWS" << endl;
        exit(1);
    } else {
        Q.rear++;
        Q.item[Q.rear] = x;
    }
}

int DeQueue() {
    if (IsEmpty()) {
        std::cout << "UNDERFLOWS" << std::endl;
        exit(1);
    } else {
        int x = Q.item[Q.front];
        Q.front++;
        return (x);
    }
}

int main() {
    Initialize();
    EnQueue(1);
    EnQueue(2);
    EnQueue(3);
    EnQueue(4);
    EnQueue(5);
    cout << DeQueue() << endl;
    cout << DeQueue() << endl;
    cout << DeQueue() << endl;
    cout << DeQueue() << endl;
    cout << DeQueue() << endl;
    cout << DeQueue() << endl;
    cout << DeQueue() << endl;
}
#include<iostream>
#include<vector>
using namespace std;

class Stack{
public:
    vector<char> item;
    int top;

    Stack(int M){
        item.resize(M);
        top = -1;
    }

    void Push(char x){
        top++;
        item[top] = x;
    }

char Pop() {
    if (top == -1) {
        cout << "Stack Underflow" << endl;
    }
    else{
    char x = item[top];
    top--;
    return x;
}
}

    char StackTop(){
        char x = item[top];
        return x;
    }

    bool IsEmpty(){
        if(top == -1)
            return true;
        else
            return false;
    }
};

int main(){

    Stack S(6);

    S.Push('A');
    S.Push('B');
    S.Push('C');
    S.Push('D');

    char x = S.Pop();
    cout << x << endl;

    x = S.StackTop();
    cout << x << endl;

    x = S.Pop();
    cout << x << endl;

    S.Push('E');

    x = S.StackTop();
    cout << x << endl;

    x = S.Pop();
    cout << x << endl;

    x = S.Pop();
    cout << x << endl;

    x = S.Pop();
    cout << x << endl;

    x = S.Pop();
    cout << x << endl;

    return 0;
}
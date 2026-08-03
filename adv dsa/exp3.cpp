#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Stack {
    vector<char> item;
    int Top;

public:
    Stack(int s = 100) {
        item.resize(s);
        Top = -1;
    }

    void Push(char x) {
        if (Top == (int)item.size() - 1) {
            cout << "Stack Overflow" << endl;
            return;
        }
        Top++;
        item[Top] = x;
    }

    char Pop() {
        if (IsEmpty()) {
            cout << "Stack UnderFlow" << endl;
            return '\0';
        }
        char x = item[Top];
        Top--;
        return x;
    }

    bool IsEmpty() {
        return Top == -1;
    }

    char StackTop() {
        if (IsEmpty()) {
            return '\0';
        }
        return item[Top];
    }
};

bool prcd(char a, char b) {
    if (a == '^' || a == '*' || a == '/' || a == '%') {
        if (b == '^') {
            return false; 
        } else {
            return true;  
        }
    }
    if (a == '+' || a == '-') {
        if (b == '+' || b == '-') {
            return true; 
        } else {
            return false; 
        }
    }
    return false;
}

string infixToPostfix(string infix) {
    Stack s(infix.length());
    string postfix = "";

    for (size_t i = 0; i < infix.length(); i++) {
        char symbol = infix[i];

        if ((symbol >= 'a' && symbol <= 'z') || 
            (symbol >= 'A' && symbol <= 'Z') || 
            (symbol >= '0' && symbol <= '9')) {
            postfix += symbol;
        }
        else if (symbol == '(') {
            s.Push(symbol);
        }
        else if (symbol == ')') {
            while (!s.IsEmpty() && s.StackTop() != '(') {
                postfix += s.Pop();
            }
            s.Pop(); 
        }
        else {
            while (!s.IsEmpty() && s.StackTop() != '(' && prcd(s.StackTop(), symbol)) {
                postfix += s.Pop();
            }
            s.Push(symbol);
        }
    }


    while (!s.IsEmpty()) {
        postfix += s.Pop();
    }

    return postfix;
}

int main() {
    string infix;
    cout << "Enter Infix Expression (): ";
    cin >> infix;

    string postfix = infixToPostfix(infix);
    cout << "Postfix Expression: " << postfix << endl;

    return 0;
}
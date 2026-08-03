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
        if(top == item.size() - 1){
            cout << "Stack Overflow" << endl;
        }
        else{
        top++;
        item[top] = x;
    }
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

void ReverseString(string str, Stack &S)
{
    int i = 0;

    while (i < str.size())
    {
        char c = str[i];
        S.Push(c);
        i++;
    }

    while (!S.IsEmpty())
    {
        char x = S.Pop();
        cout << x;
    }

    cout << endl;
}

void Palindrome(string str, Stack &S)
{
    int i = 0;

    while (i < str.size())
    {
        char c = str[i];
        S.Push(c);
        i++;
    }

    int j = 0;

    while (j < str.size())
    {
        char x = S.StackTop();

        if (x == str[j])
        {
            S.Pop();
        }
        else
        {
            break;
        }

        j++;
    }

    if (S.IsEmpty())
        cout << "Palindrome";
    else
        cout << "Not Palindrome";
}

int main(){

    

    string str = "HELLO";
    Stack S(str.size());
    ReverseString(str, S);

    string str1;
    cout << "Enter String : ";
    cin >> str1;
    Stack S1(str1.size());
    Palindrome(str1, S1);

    return 0;
}
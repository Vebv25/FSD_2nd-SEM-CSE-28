#include <iostream>
#include <cstdarg>
using namespace std;

void display(int count, ...)
{
    va_list args;
    va_start(args, count);

    for(int i = 0; i < count; i++)
    {
        int n = va_arg(args, int);
        cout << n << " ";
    }

    va_end(args);
}

int main()
{
    display(5, 10, 20, 30, 40, 50);

    return 0;
}



















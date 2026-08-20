// #include <bits/stdc++.h>
// using namespace std;

// class Example {
//     int a, b;
//     public:
//     void geta(int, int);
//     int sum(Example, Example);
// };
// void Example::geta(int a1, int b1)
// {
//     a = a1;
//     b = b1;
// }
// int Example::sum(Example A, Example B) {
//     int s = A.a + B.a 
//     int v = A.b + B.b;
//     return(s,v);
// }
// int main(){
//     Example E1, E2, E3;
//     E1.geta(10, 20);
//     E2.geta(30, 40);
//     int r = E3.sum(E1, E2);
//     cout << r;
// }


#include <bits/stdc++.h>
using namespace std;

class Example {
    int a, b;

public:
    void geta(int, int);
    int sum(Example, Example);
};

void Example::geta(int a1, int b1)
{
    a = a1;
    b = b1;
}

int Example::sum(Example A, Example B)
{
    cout << A.a + A.b << endl;
    cout << B.a + B.b << endl;

    return (A.a + A.b) + (B.a + B.b);
}

int main()
{
    Example E1, E2, E3;

    E1.geta(10, 20);  
    E2.geta(30, 40);  

    int r = E3.sum(E1, E2);

    cout << "Total = " << r;

    return 0;
}
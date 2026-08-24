#include <iostream>
using namespace std;
class Test;
class Example {
    int a;

public:
    void geta(int);
    int sum(Example, Test);
};  

class Test {
    int b;

public:
    void getb(int);
    int getvalue();
    int sum(Example, Test);
};  
void Example::geta(int x)
{
    a = x;
}
void Test::getb(int y)
{
    b = y;
}
int Test::getvalue()
{
    return b;
}
int Example::sum(Example E1, Test T1)
{
    int res =  E1.a + T1.getvalue();
    return(res);
 }
 int main()
 {
    Example E, obj;
    E.geta(10);
    Test T;
    T.getb(20);
    int r = obj.sum(E, T);
    cout<<" The Sum is: "<< r << endl;
 }
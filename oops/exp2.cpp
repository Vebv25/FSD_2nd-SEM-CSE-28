#include <iostream>
using namespace std ;

void sum();
int sum(int, int);
float sum(int, float, int);
int main()
{
    int a, b, r1;
    float r2,  c;
    cout<<"\n Sum function without parameteres: ";
    sum();
    cout<<"\n Sum function with 2 parameters: ";
    cout<<"\n Enter the number: ";
    cin>>a>>b;
     r1= sum(a, b);
     cout<< "\n The sum is :" << ;
     cout<<"\n Sum function wit (const char [28])"\n Enter the three numbers: "
     cout << "\n Enter the three numbers: ";
     cin >> a >> b >> c;
     r2= sum(a, b, c);
     cout<<"The sum is :" << r1;
     cout<<"The sum is :" << r2;
}
void sum()
{
    int x,y,s;
    cout<< "Enter the numbers: ";
    cin >> x >> y;
    s = x+y;
    cout<<"The sum is: " << s;
}
int sum(int x, int y)
{
    int s = x+y;
    return s;
}
float sum(int x, int y, float z)
{
    float s= x + y + z;
    return (s);
}
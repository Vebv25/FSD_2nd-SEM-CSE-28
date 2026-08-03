#include <iostream>
using namespace std;

int main() {
    int a,b,c,n;
    cin>>a>>b>>n;
    cout<<a<<b;
for(int i=0;i<n-2;i++)
{
 c = a+b;
    cout<<c;
    a=b;
    b=c;
}
return 0;
}
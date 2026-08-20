#include <bits/stdc++.h>
#include<string>
using namespace std;

namespace first {
    int a =10;
}
namespace second {
    double a = 10.5;
}
int main ()
{
    string a = "c++";
    cout<<a;
    cout<<second::a;
    cout<<first::a;
}
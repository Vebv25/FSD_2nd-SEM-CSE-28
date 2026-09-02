#include <bits/stdc++.h>
using namespace std;
class Example {
  
   int a;

public:
  static void display();
  void geta(int);
};

void Example::geta(int x)
{
    a=x;

}
void Example::display(){
    // cout<<a;
}
int main(){
    Example E1;
    E1.geta(12);
    Example::display();
}
   
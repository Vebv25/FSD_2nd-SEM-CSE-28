#include <bits/stdc++.h>
using namespace std;
class Example {
    static int n;
   

public:
  void display();
};
int Example::n = 10;
void Example::display()
{
    cout<<n;

}
int main(){
    Example E1;
    E1.display();
}
   
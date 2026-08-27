#include <bits/stdc++.h>
using namespace std;

void display(){
    cout<<"end";
}
template <typename T, typename... Args>
void display(T first, Args... rest){
    cout<<first<<"/n";
    display(rest...);
}
int main(){
    display(10,20.4,"Hello",'A',true);
    return 0;
}
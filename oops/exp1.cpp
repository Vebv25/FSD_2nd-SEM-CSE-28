#include <bits/stdc++.h>
using namespace std;
int sum(int *,int *);

int main() {
	int a,b,r;
	cin>>a>>b;
	r = sum(&a,&b);
	cout<<r;
	
	return 0;
}

int sum(int *x,int *y){
    int s;
    s = *x+*y;
    return s;
}
// transpose of martix
// multiplication of matix

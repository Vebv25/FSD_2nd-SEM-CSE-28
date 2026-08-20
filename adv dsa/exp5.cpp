#include <bits/stdc++.h>
using namespace std;
class Queue{
    vector<int>item;
    int rear;
    int front;
    public:
    Queue(int SIZE){
        item.resize(SIZE);
        rear=-1;
        front=0;
        
    }
    bool IsEmpty(){
        if(rear-front+1==0){
            return true;
        }else{
            return false;
        }
        
    }
   void EnQueue(int x){
       int m=item.size();
       if(rear==m-1){
           cout<<"OVERFLOW"<<endl;
           exit(1);
       }else{
        rear++;
        item[rear]=x;
       }
    }
   int DeQueue(){
       if(rear-front+1==0){
           cout<<"UNDERFLOW";
           exit(1);
       }else{
           
       
       int x;
       x=item[front];
       front++;
       return x;
       }
       
        
    }
};

int main() {
    Queue Q(5);
    Q.EnQueue(1);
    Q.EnQueue(2);
    Q.EnQueue(3);
    Q.EnQueue(4);
    Q.EnQueue(5);
    cout<<Q.DeQueue()<<endl;
    
	

}
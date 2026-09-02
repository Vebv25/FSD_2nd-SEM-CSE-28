#include <iostream>
using namespace std;

struct node {
    int data;
    node *next;
};

node *GetNode()
{
    node *p;
    p = new node;
    return p;
}

node *Enqueue(node *PQ, int x)
{
    node *curr, *prev;

    curr = PQ;
    prev = NULL;

    node *R;
    R = GetNode();

    R->data = x;

    while (curr != NULL && x >= curr->data)
    {
        prev = curr;
        curr = curr->next;
    }

    if (prev != NULL)
    {
        prev->next = R;
        R->next = curr;
    }
    else
    {
        R->next = PQ;
        PQ = R;
    }

    return PQ;
}

int dequeue(node *&PQ)
{
    if (PQ == NULL)
    {
        cout << "Queue underflows" << endl;
        return -1;
    }

    node *p;
    p = PQ;

    int x = p->data;

    PQ = PQ->next;

    delete p;

    return x;
}

int main()
{
    node *PQ = NULL;

    PQ = Enqueue(PQ, 1);
    PQ = Enqueue(PQ, 1);
    PQ = Enqueue(PQ, 3);
    PQ = Enqueue(PQ, 5);
    PQ = Enqueue(PQ, 8);
    PQ = Enqueue(PQ, 4);

    cout << dequeue(PQ) << endl;
    cout << dequeue(PQ) << endl;
    cout << dequeue(PQ) << endl;
    cout << dequeue(PQ) << endl;
    cout << dequeue(PQ) << endl;
    cout << dequeue(PQ) << endl;

    return 0;
}
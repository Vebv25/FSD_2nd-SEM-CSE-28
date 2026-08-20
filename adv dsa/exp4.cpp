#include <iostream>
using namespace std;

struct Node {
    int data;
    struct Node *next;
};

struct Node* deleteBeginning(struct Node *head) {
    if (head == NULL) {
        printf("List is empty.\n");
        return NULL;
    }

    struct Node *temp = head;
    head = head->next;
    free(temp);

    return head;
}


void display(struct Node *head) {
    while (head != NULL) {
        printf("%d -> ", head->data);
        head = head->next;
    }
    printf("NULL\n");
}

int main() {
    
    struct Node *head = (struct Node*)malloc(sizeof(struct Node));
    head->data = 10;

    head->next = (struct Node*)malloc(sizeof(struct Node));
    head->next->data = 20;

    head->next->next = (struct Node*)malloc(sizeof(struct Node));
    head->next->next->data = 30;
    head->next->next->next = NULL;

    printf("Original List: ");
    display(head);

    head = deleteBeginning(head);

    printf("After Deletion: ");
    display(head);

    return 0;
}
// Initialize()
bool IsEmpty(Node *Top)
{
    if(Top==NULL)
    return true;
    else
    return false;
}
Node* Push(Node *Top,int x)
{
    Top=InsBeg(Top,x);
    return Top;
}
int StackTop(Node* Top)
{
    return Top -> data;
}
// pop()

int main()
{
    Node *TOP-NULL;
    Push(Top,1);
}
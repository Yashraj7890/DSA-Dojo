import { expect } from "chai";

class LinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const reverseLinkedListHandler = (fn) => {
  try {
    const tests = [[1, 2, 3, 4, 5], [5, 4, 3, 2, 1], [1, 2, 3], [1]];
    const answers = [[5, 4, 3, 2, 1], [1, 2, 3, 4, 5], [3, 2, 1], [1]];
    for (let i = 0; i < tests.length; i++) {
      const list = createLinkedList(tests[i]);

      const result = fn(list);

      if (!result || !(result instanceof LinkedList)) {
        throw new Error("Function returns unacceptable value");
      } else {
        expect(result).to.deep.equal(answers[i]);
      }
    }
    return true;
  } catch (error) {
    console.log("Error from reverseLinkedListHandler: ", error);
    throw new Error(error);
  }
};

function createLinkedList(values) {
  const head = new LinkedList(values[0]);
  let current = head;
  for (let i = 1; i < values.length; i++) {
    const node = new LinkedList(values[i]);
    current.next = node;
    current = node;
  }
  return head;
}

function getListValues(head) {
  const values = [];
  let current = head;
  while (current !== null) {
    values.push(current.value);
    current = current.next;
  }
  return values;
}

const starterCodeReverseLinkedListJS = `
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// Do not edit function name
function reverseLinkedList(head) {
  // Write your code here
};`;

export const reverseLinkedList = {
  id: "reverse-linked-list",
  title: "2. Reverse Linked List",
  problemStatement: `<p class='mt-3'>Given the <strong>head</strong> of a singly linked list, reverse the list, and return <em>the reversed list</em>.</p>`,
  examples: [
    {
      id: 0,
      inputText: "head = [1,2,3,4,5]",
      outputText: "[5,4,3,2,1]",
    },
    {
      id: 1,
      inputText: "head = [1,2,3]",
      outputText: "[3,2,1]",
    },
    {
      id: 2,
      inputText: "head = [1]",
      outputText: "[1]",
    },
  ],
  constraints: `<li class='mt-2'>The number of nodes in the list is the range <strong>[0, 5000]</strong>.</li>
<li class='mt-2'><strong>-5000 <= Node.val <= 5000</strong></li>`,
  starterCode: starterCodeReverseLinkedListJS,
  handlerFunction: reverseLinkedListHandler,
  starterFunctionName: "function reverseLinkedList(",
  order: 2,
};

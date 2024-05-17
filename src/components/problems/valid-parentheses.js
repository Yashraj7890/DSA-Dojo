import { expect } from "chai";

export const validParenthesesHandler = (fn) => {
  try {
    const tests = ["()", "()[]{}", "(]", "([)]", "{[]}"];
    const answers = [true, true, false, false, true];
    for (let i = 0; i < tests.length; i++) {
      const result = fn(tests[i]);
      if (!result || !(typeof result === "boolean")) {
        throw new Error("Function returns unacceptable value");
      } else {
        expect(result).to.deep.equal(answers[i]);
      }
    }
    return true;
  } catch (error) {
    console.error("Error from validParenthesesHandler: ", error);
    throw new Error(error);
  }
};

const starterCodeValidParenthesesJS = `function validParentheses(s) {
  // Write your code here
};`;

export const validParentheses = {
  id: "valid-parentheses",
  title: "4. Valid Parentheses",
  problemStatement: `<p class='mt-3'>Given a string <strong>s</strong> containing just the characters <strong>'('</strong>, <strong>')'</strong>, <strong>'{'</strong>, <strong>'}'</strong>, <strong>'['</strong> and <strong>']'</strong>, determine if the input string is valid.</p> <p class='mt-3'>An input string is valid if:</p> <ul> <li class='mt-2'>Open brackets must be closed by the same type of brackets.</li> <li class='mt-3'>Open brackets must be closed in the correct order.</li>
	<li class="mt-3">Every close bracket has a corresponding open bracket of the same type. </li>
	</ul>`,
  examples: [
    {
      id: 0,
      inputText: 's = "()"',
      outputText: "true",
    },
    {
      id: 1,
      inputText: 's = "()[]{}"',
      outputText: "true",
    },
    {
      id: 2,
      inputText: 's = "(]"',
      outputText: "false",
    },
    {
      id: 3,
      inputText: 's = "([)]"',
      outputText: "false",
    },
  ],
  constraints: `<li class='mt-2'><strong>1 <= s.length <= 10<sup>4</sup></strong></li>
<li class='mt-2 '><strong>s</strong> consists of parentheses only <strong class="text-md">'()[]{}'</strong>.</li>`,
  handlerFunction: validParenthesesHandler,
  starterCode: starterCodeValidParenthesesJS,
  starterFunctionName: "function validParentheses(",
  order: 4,
};

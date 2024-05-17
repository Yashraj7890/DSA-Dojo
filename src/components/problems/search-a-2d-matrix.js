import { expect } from "chai";


export const search2DMatrixHandler = (fn) => {
	try {
		const tests = [
			{
				matrix: [
					[1, 3, 5, 7],
					[10, 11, 16, 20],
					[23, 30, 34, 60],
				],
				target: 3,
			},
			{
				matrix: [
					[1, 3, 5, 7],
					[10, 11, 16, 20],
					[23, 30, 34, 60],
				],
				target: 13,
			},
		];
		const answers = [true, false];
		for (let i = 0; i < tests.length; i++) {
			const result = fn(tests[i].matrix, tests[i].target);
			
            if (!result || !(typeof result==='boolean')) {
                throw new Error("Function returns unacceptable value");
              } else {
                expect(result).to.deep.equal(answers[i]);
              }
		}
		return true;
	} catch (error) {
		console.log("Error from searchA2DMatrixHandler: ", error);
		throw new Error(error);
	}
};
const starterCodeSearch2DMatrixJS = `// Do not edit function name
function searchMatrix(matrix, target) {
  // Write your code here
};`;

export const search2DMatrix = {
	id: "search-a-2d-matrix",
	title: "5. Search a 2D Matrix",
	problemStatement: `
  <p class='mt-3'>Write an efficient algorithm that searches for a value in an <strong>m x n</strong> matrix. This matrix has the following properties:</p>
    <li class="mt-3">Integers in each row are sorted from left to right.</li>
    <li class="mt-3">The first integer of each row is greater than the last integer of the previous row.</li>
  <p class='mt-3'>Given <strong>matrix</strong>, an <strong>m x n</strong> matrix, and <strong>target</strong>, return <strong>true</strong> if <strong>target</strong> is in the matrix, and <strong>false</strong> otherwise.</p>
  `,
	examples: [
		{
			id: 0,
			inputText: `matrix = [
  [1,3,5,7],
  [10,11,16,20],
  [23,30,34,60]
], target = 3`,
			outputText: `true`,
		},
		{
			id: 1,
			inputText: `matrix = [
  [1,3,5,7],
  [10,11,16,20],
  [23,30,34,60]
], target = 13`,
			outputText: `false`,
		},
		{
			id: 2,
			inputText: `matrix = [[1]], target = 1`,
			outputText: `true`,
		},
	],
	constraints: `
  <li class='mt-2'><ststrong>m == matrix.length</ststrong></li>
  <li class='mt-2'><ststrong>n == matrix[i].length</ststrong></li>
  <li class='mt-2'><ststrong>1 <= m, n <= 100</ststrong></li>
  <li class='mt-2'><ststrong>-10<sup>4</sup> <= matrix[i][j], target <= 10<sup>4</sup></ststrong></li>
  `,
	starterCode: starterCodeSearch2DMatrixJS,
	handlerFunction: search2DMatrixHandler,
	starterFunctionName: "function searchMatrix",
	order: 5,
};
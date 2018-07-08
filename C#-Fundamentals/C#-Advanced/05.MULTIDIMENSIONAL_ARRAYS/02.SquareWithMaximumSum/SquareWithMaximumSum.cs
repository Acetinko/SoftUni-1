using System;
using System.Linq;

class SquareWithMaximumSum
{
    static void Main()
    {
        int[] input = Input();
        int rows = input[0];
        int columns = input[1];

        int[,] matrix = new int[rows, columns];

        for (int row = 0; row < matrix.GetLength(0); row++)
        {
            int[] tokensInput = Input();

            for (int col = 0; col < matrix.GetLength(1); col++)
            {
                matrix[row, col] = tokensInput[col];
            }
        }

        int sumSquare = int.MinValue;
        string[] elementsSquare = new string[2];

        for (int row = 0; row < matrix.GetLength(0) - 1; row++)
        {
            for (int col = 0; col < matrix.GetLength(1) - 1; col++)
            {
                int tmpSum = matrix[row, col] + matrix[row, col + 1] +
                    matrix[row + 1, col] + matrix[row + 1, col + 1];

                if (tmpSum > sumSquare &&
                    row + 1 < matrix.GetLength(0) &&
                    col + 1 < matrix.GetLength(1))
                {
                    sumSquare = tmpSum;
                    elementsSquare[0] = $"{matrix[row, col]} {matrix[row, col + 1]}";
                    elementsSquare[1] = $"{matrix[row + 1, col]} {matrix[row + 1, col + 1]}";
                }
            }
        }

        Console.WriteLine(String.Join("\n", elementsSquare));
        Console.WriteLine(sumSquare);
    }

    private static int[] Input()
    {
        return Console.ReadLine()
            .Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
            .Select(x => x.Trim())
            .Select(int.Parse)
            .ToArray();
    }
}
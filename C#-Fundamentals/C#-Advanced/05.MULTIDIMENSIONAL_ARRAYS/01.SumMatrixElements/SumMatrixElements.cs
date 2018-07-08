using System;
using System.Linq;

class SumMatrixElements
{
    static void Main()
    {
        int[] input = Input();
        int rows = input[0];
        int columns = input[1];

        int sumMatrix = 0;
        int[,] matrix = new int[rows, columns];

        for (int row = 0; row < matrix.GetLength(0); row++)
        {
            int[] tokensInput = Input();
            tokensInput
                .ToList()
                .ForEach(x => sumMatrix += x);

            for (int col = 0; col < matrix.GetLength(1); col++)
            {
                matrix[row, col] = tokensInput[col];
            }
        }

        Console.WriteLine(String.Join("\n", input));
        Console.WriteLine(sumMatrix);
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
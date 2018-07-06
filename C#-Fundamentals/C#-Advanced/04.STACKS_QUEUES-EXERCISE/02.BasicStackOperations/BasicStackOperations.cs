using System;
using System.Collections.Generic;
using System.Linq;

class BasicStackOperations
{
    static void Main(string[] args)
    {
        int[] firstInput = Input();
        int n = firstInput[0];
        int s = firstInput[1];
        int x = firstInput[2];

        int[] secondInput = Input();
        var stack = new Stack<int>(secondInput);

        if (stack.Count >= s)
        {
            for (int j = 0; j < s; j++)
            {
                stack.Pop();
            }
        }

        if (stack.Contains(x))
        {
            Console.WriteLine("true");
            Environment.Exit(0);
        }

        if (stack.Count == 0)
        {
            Console.WriteLine(0);
            Environment.Exit(0);
        }

        Console.WriteLine(stack.Min());
    }

    private static int[] Input()
    {
        return Console.ReadLine()
            .Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries)
            .Select(int.Parse)
            .ToArray();
    }
}

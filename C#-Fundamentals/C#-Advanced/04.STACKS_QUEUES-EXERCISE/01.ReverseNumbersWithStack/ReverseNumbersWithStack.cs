using System;
using System.Collections.Generic;
using System.Linq;

class ReverseNumbersWithStack
{
    static void Main(string[] args)
    {
        int[] inputs = Console.ReadLine()
            .Split(" ".ToArray(), StringSplitOptions.RemoveEmptyEntries)
            .Select(int.Parse)
            .ToArray();
        Stack<int> stack = new Stack<int>(inputs);

        Console.WriteLine(String.Join(" ", stack));
    }
}
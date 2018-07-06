using System;
using System.Collections.Generic;

class DecimalToBinaryConverter
{
    static void Main(string[] args)
    {
        int number = int.Parse(Console.ReadLine());
        var stack = new Stack<int>();

        if (number == 0)
        {
            Console.WriteLine(0);
            Environment.Exit(0);
        }

        while (number != 0)
        {
            stack.Push(number % 2);
            number /= 2;
        }

        while (stack.Count != 0)
        {
            Console.Write(stack.Pop());
        }

        Console.WriteLine();
    }
}

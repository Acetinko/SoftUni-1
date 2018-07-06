using System;
using System.Collections.Generic;

class ReverseStrings
{
    static void Main(string[] args)
    {
        char[] input = Console.ReadLine()
             .ToCharArray();
        Stack<char> stack = new Stack<char>(input);

        while (stack.Count != 0)
        {
            Console.Write(stack.Pop());
        }
        Console.WriteLine();
        Environment.Exit(0);
    }
}